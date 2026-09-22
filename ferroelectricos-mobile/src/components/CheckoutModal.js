import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal({ visible, carrito, total, onClose, onCompraExitosa }) {
  const { user } = useAuth();

  const [calle, setCalle] = useState('');
  const [ciudad, setCiudad] = useState('Bogotá');
  const [telefono, setTelefono] = useState('');
  const [medioPago, setMedioPago] = useState('NEQUI'); // Valor por defecto
  const [cargando, setCargando] = useState(false);

  const procesarCompra = async () => {
    if (!calle || !ciudad || !telefono) {
      Alert.alert('Datos incompletos', 'Por favor llena la dirección, ciudad y teléfono de contacto.');
      return;
    }

    setCargando(true);

    try {
      // 1. Insertar la Venta en Supabase
      const { data: ventaData, error: ventaError } = await supabase
        .from('venta')
        .insert([
          {
            total: total,
            fecha: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (ventaError) throw ventaError;
      const idventa = ventaData.idventa || ventaData.id;

      // 2. Insertar los productos en Detalle Venta
      const detalles = carrito.map((item) => ({
        idventa: idventa,
        idproducto: item.idproducto,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      }));

      const { error: detalleError } = await supabase.from('detalle_venta').insert(detalles);
      if (detalleError) throw detalleError;

      // 3. Insertar el Registro de Envío (con tus campos exactos)
      const { error: envioError } = await supabase.from('registro_envio').insert([
        {
          idventa: idventa,
          calle: calle,
          ciudad: ciudad,
          telefono: telefono,
          estado_envio: 'Pendiente',
        },
      ]);

      if (envioError) throw envioError;

      Alert.alert('¡Pedido Confirmado! 🎉', `Tu orden #${idventa} ha sido registrada con éxito.`, [
        {
          text: 'Entendido',
          onPress: () => {
            onCompraExitosa(idventa);
            onClose();
          },
        },
      ]);
    } catch (error) {
      console.log('Error procesando la compra:', error);
      Alert.alert('Error', error.message || 'No se pudo procesar la compra. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Finalizar Compra</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Sección Dirección de Envío */}
            <Text style={styles.sectionTitle}>📍 Dirección de Entrega</Text>

            <TextInput
              style={styles.input}
              placeholder="Dirección (Ej: Cra 15 # 90-20)"
              placeholderTextColor="#94A3B8"
              value={calle}
              onChangeText={setCalle}
            />

            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              placeholderTextColor="#94A3B8"
              value={ciudad}
              onChangeText={setCiudad}
            />

            <TextInput
              style={styles.input}
              placeholder="Teléfono de contacto"
              placeholderTextColor="#94A3B8"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            {/* Sección Medio de Pago */}
            <Text style={styles.sectionTitle}>💳 Medio de Pago</Text>
            <View style={styles.pagoOptions}>
              {['NEQUI', 'PSE', 'TARJETA', 'CONTRA_ENTREGA'].map((metodo) => (
                <TouchableOpacity
                  key={metodo}
                  style={[styles.pagoBtn, medioPago === metodo && styles.pagoBtnSelected]}
                  onPress={() => setMedioPago(metodo)}
                >
                  <Text style={[styles.pagoText, medioPago === metodo && styles.pagoTextSelected]}>
                    {metodo.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Resumen Final */}
            <View style={styles.resumenContainer}>
              <Text style={styles.resumenText}>Total a pagar:</Text>
              <Text style={styles.resumenTotal}>${Number(total).toLocaleString('es-CO')}</Text>
            </View>

            <TouchableOpacity style={styles.btnConfirmar} onPress={procesarCompra} disabled={cargando}>
              {cargando ? (
                <ActivityIndicator color="#0F172A" />
              ) : (
                <Text style={styles.btnConfirmarText}>Confirmar y Pagar</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0F172A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '85%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#F59E0B', marginTop: 14, marginBottom: 10 },
  input: { backgroundColor: '#1E293B', color: '#F8FAFC', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 10 },
  pagoOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pagoBtn: { backgroundColor: '#1E293B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: 'transparent' },
  pagoBtnSelected: { borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.15)' },
  pagoText: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },
  pagoTextSelected: { color: '#F59E0B', fontWeight: 'bold' },
  resumenContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#1E293B' },
  resumenText: { color: '#94A3B8', fontSize: 14 },
  resumenTotal: { color: '#10B981', fontSize: 20, fontWeight: '900' },
  btnConfirmar: { backgroundColor: '#F59E0B', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  btnConfirmarText: { color: '#0F172A', fontWeight: 'bold', fontSize: 15 },
});