import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

export default function AdminEnvios({ navigation }) {
  const { logout } = useAuth();
  const [envios, setEnvios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  // Estados Modal Cambio de Estado
  const [modalVisible, setModalVisible] = useState(false);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    obtenerEnvios();
  }, []);

  const obtenerEnvios = async () => {
    try {
      const { data, error } = await supabase
        .from('registro_envio')
        .select('*')
        .order('idenvio', { ascending: false });

      if (error) throw error;
      setEnvios(data || []);
    } catch (err) {
      console.log('Error obteniendo envíos:', err);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const onRefresh = () => {
    setRefrescando(true);
    obtenerEnvios();
  };

  const abrirModalEstado = (envio) => {
    setEnvioSeleccionado(envio);
    setNuevoEstado(envio.estado_envio || 'en_camino');
    setModalVisible(true);
  };

  const handleActualizarEstado = async () => {
    if (!envioSeleccionado) return;

    setActualizando(true);
    try {
      const { error } = await supabase
        .from('registro_envio')
        .update({ estado_envio: nuevoEstado })
        .eq('idenvio', envioSeleccionado.idenvio);

      if (error) throw error;

      Alert.alert('¡Éxito!', 'Estado del envío actualizado correctamente.');
      setModalVisible(false);
      obtenerEnvios();
    } catch (err) {
      Alert.alert('Error al actualizar', err.message);
    } finally {
      setActualizando(false);
    }
  };

  // Conteo rápido de métricas
  const totalEnvios = envios.length;
  const enCaminoCount = envios.filter(e => (e.estado_envio || '').toLowerCase() === 'en_camino').length;
  const entregadosCount = envios.filter(e => (e.estado_envio || '').toLowerCase() === 'entregado').length;

  const enviosFiltrados = envios.filter((e) => {
    const guia = (e.numero_guia || '').toLowerCase();
    const idVenta = (e.id_venta || '').toString();
    const term = busqueda.toLowerCase();
    return guia.includes(term) || idVenta.includes(term);
  });

  const getBadgeStyle = (est) => {
    const e = (est || '').toLowerCase();
    if (e === 'entregado') return { bg: '#10B981', label: 'Entregado', icon: 'checkmark-circle-outline' };
    if (e === 'en_camino') return { bg: '#3B82F6', label: 'En Camino', icon: 'car-outline' };
    if (e === 'pendiente') return { bg: '#F59E0B', label: 'Pendiente', icon: 'time-outline' };
    return { bg: '#EF4444', label: est || 'Cancelado', icon: 'close-circle-outline' };
  };

  const renderHeader = () => (
    <View style={styles.headerBox}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topTitle}>Gestión de Envíos</Text>
          <Text style={styles.topSub}>Seguimiento y Logística</Text>
        </View>
        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas KPIs */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Ionicons name="cube-outline" size={20} color="#F59E0B" />
          <Text style={styles.kpiLabel}>Total Envíos</Text>
          <Text style={styles.kpiValue}>{totalEnvios}</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="car-outline" size={20} color="#3B82F6" />
          <Text style={styles.kpiLabel}>En Camino</Text>
          <Text style={styles.kpiValue}>{enCaminoCount}</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
          <Text style={styles.kpiLabel}>Entregados</Text>
          <Text style={styles.kpiValue}>{entregadosCount}</Text>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por # Guía o # Venta..."
          placeholderTextColor="#64748B"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <Ionicons name="close-circle" size={18} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderEnvio = ({ item }) => {
    const badge = getBadgeStyle(item.estado_envio);
    const fechaBruta = item.fecha_envio;
    const fechaFormateada = fechaBruta
      ? new Date(fechaBruta).toLocaleDateString('es-CO', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'Sin fecha';

    return (
      <View style={styles.itemCard}>
        <View style={styles.cardHeader}>
          <View style={styles.guiaBox}>
            <Ionicons name="barcode-outline" size={18} color="#F59E0B" />
            <Text style={styles.guiaText}>{item.numero_guia || 'Sin Guía'}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Ionicons name={badge.icon} size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.badgeText}>{badge.label}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Venta Asociada:</Text> #{item.id_venta || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Fecha Envío:</Text> {fechaFormateada}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Transportadora:</Text> #{item.id_transportadora || 'N/A'}
          </Text>

          {item.dirrecion && (
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Dirección:</Text> {item.dirrecion}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.btnCambiarEstado}
          onPress={() => abrirModalEstado(item)}
        >
          <Ionicons name="create-outline" size={16} color="#F8FAFC" />
          <Text style={styles.btnText}>Cambiar Estado</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {cargando && !refrescando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.loadingText}>Cargando envíos...</Text>
          </View>
        ) : (
          <FlatList
            data={enviosFiltrados}
            keyExtractor={(item) => item.idenvio.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={renderEnvio}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refrescando}
                onRefresh={onRefresh}
                tintColor="#F59E0B"
              />
            }
          />
        )}

        {/* Modal Cambiar Estado */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Actualizar Guía {envioSeleccionado?.numero_guia}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#F8FAFC" />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Selecciona el nuevo estado:</Text>

              <View style={styles.estadoSelector}>
                {[
                  { key: 'en_camino', label: 'En Camino', bg: '#3B82F6' },
                  { key: 'entregado', label: 'Entregado', bg: '#10B981' },
                  { key: 'pendiente', label: 'Pendiente', bg: '#F59E0B' },
                  { key: 'cancelado', label: 'Cancelado', bg: '#EF4444' },
                ].map((st) => (
                  <TouchableOpacity
                    key={st.key}
                    style={[
                      styles.chipEstado,
                      nuevoEstado === st.key && { backgroundColor: st.bg, borderColor: st.bg },
                    ]}
                    onPress={() => setNuevoEstado(st.key)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        nuevoEstado === st.key && styles.chipTextSelected,
                      ]}
                    >
                      {st.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.btnActualizar}
                onPress={handleActualizarEstado}
                disabled={actualizando}
              >
                {actualizando ? (
                  <ActivityIndicator color="#0F172A" />
                ) : (
                  <Text style={styles.btnGuardarText}>Guardar Estado</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  headerBox: {
    marginBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  topTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  topSub: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '600',
  },
  btnLogout: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  kpiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  kpiLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  kpiValue: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 10,
    marginBottom: 10,
  },
  guiaBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guiaText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    marginBottom: 12,
  },
  infoText: {
    color: '#CBD5E1',
    fontSize: 13,
    marginBottom: 4,
  },
  infoLabel: {
    color: '#94A3B8',
    fontWeight: '600',
  },
  btnCambiarEstado: {
    flexDirection: 'row',
    backgroundColor: '#334155',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  btnText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: 10,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 10,
  },
  estadoSelector: {
    gap: 8,
    marginBottom: 20,
  },
  chipEstado: {
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  btnActualizar: {
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGuardarText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 14,
  },
});