import React from 'react';
import { StyleSheet, Text, View, Modal, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartModal({ visible, carrito, onClose, onCambiarCantidad, onOpenCheckout }) {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="cart-outline" size={22} color="#F59E0B" />
              <Text style={styles.title}>Tu Carrito</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {carrito.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={50} color="#64748B" />
              <Text style={styles.emptyText}>El carrito está vacío</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={carrito}
                keyExtractor={(item) => item.idproducto.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.itemRow}>
                    <Image
                      source={{
                        uri: item.imagenes && item.imagenes.startsWith('http')
                          ? item.imagenes
                          : 'https://via.placeholder.com/100',
                      }}
                      style={styles.itemImg}
                    />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemNombre} numberOfLines={1}>{item.nombre_producto}</Text>
                      <Text style={styles.itemPrecio}>${Number(item.precio).toLocaleString('es-CO')}</Text>
                    </View>

                    <View style={styles.cantidadRow}>
                      <TouchableOpacity style={styles.btnCant} onPress={() => onCambiarCantidad(item.idproducto, -1)}>
                        <Ionicons name="remove" size={14} color="#FFF" />
                      </TouchableOpacity>
                      <Text style={styles.cantText}>{item.cantidad}</Text>
                      <TouchableOpacity style={styles.btnCant} onPress={() => onCambiarCantidad(item.idproducto, 1)}>
                        <Ionicons name="add" size={14} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />

              <View style={styles.footer}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalAmount}>${total.toLocaleString('es-CO')}</Text>
                </View>

                {/* Botón que abre el Checkout */}
                <TouchableOpacity
                  style={styles.btnCheckout}
                  onPress={() => {
                    onClose(); // Cierra el carrito
                    onOpenCheckout(); // Abre el modal de datos de pago
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnCheckoutText}>Proceder al Pago ➔</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0F172A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%', minHeight: '40%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  emptyText: { color: '#94A3B8', fontSize: 14, marginTop: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', padding: 10, borderRadius: 12, marginBottom: 10 },
  itemImg: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#334155' },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemNombre: { color: '#F8FAFC', fontSize: 13, fontWeight: '600' },
  itemPrecio: { color: '#10B981', fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  cantidadRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', borderRadius: 8, padding: 4 },
  btnCant: { backgroundColor: '#334155', padding: 4, borderRadius: 6 },
  cantText: { color: '#FFF', paddingHorizontal: 8, fontWeight: 'bold', fontSize: 12 },
  footer: { borderTopWidth: 1, borderTopColor: '#1E293B', paddingTop: 14, marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { color: '#94A3B8', fontSize: 15 },
  totalAmount: { color: '#10B981', fontSize: 20, fontWeight: '900' },
  btnCheckout: { backgroundColor: '#F59E0B', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnCheckoutText: { color: '#0F172A', fontWeight: 'bold', fontSize: 15 },
});