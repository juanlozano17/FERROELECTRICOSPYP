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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

export default function AdminPedidos({ navigation }) {
  const { logout } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  // Modal Detalle
  const [modalVisible, setModalVisible] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [cargandoDetalles, setCargandoDetalles] = useState(false);

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    try {
      const { data, error } = await supabase
        .from('venta')
        .select('*')
        .order('idventa', { ascending: false });

      if (error) throw error;
      setVentas(data || []);
    } catch (err) {
      console.log('Error obteniendo historial de ventas:', err);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const onRefresh = () => {
    setRefrescando(true);
    obtenerVentas();
  };

  const abrirDetalleVenta = async (venta) => {
    const idVenta = venta.idventa || venta.id_venta;
    setVentaSeleccionada(venta);
    setModalVisible(true);
    setCargandoDetalles(true);

    try {
      // Consulta a la tabla detalle_venta unida con producto
      const { data, error } = await supabase
        .from('detalle_venta')
        .select('*, producto(nombre_producto, imagenes)')
        .eq('idventa', idVenta);

      if (error) throw error;
      setDetalles(data || []);
    } catch (err) {
      console.log('Error obteniendo detalle de venta:', err);
    } finally {
      setCargandoDetalles(false);
    }
  };

  // Cálculos de Métricas KPIs
  const totalIngresos = ventas.reduce((acc, curr) => acc + (curr.total || curr.monto_total || 0), 0);
  const totalPedidos = ventas.length;
  const promedioVenta = totalPedidos > 0 ? totalIngresos / totalPedidos : 0;

  const ventasFiltradas = ventas.filter((v) => {
    const id = (v.idventa || v.id_venta || '').toString();
    return id.includes(busqueda);
  });

  const renderHeader = () => (
    <View style={styles.headerBox}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topTitle}>Historial de Ventas</Text>
          <Text style={styles.topSub}>Métricas y Transacciones</Text>
        </View>
        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de Métricas KPIs */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Ionicons name="wallet-outline" size={20} color="#10B981" />
          <Text style={styles.kpiLabel}>Total Ingresos</Text>
          <Text style={styles.kpiValue}>${totalIngresos.toLocaleString('es-CO')}</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="cart-outline" size={20} color="#3B82F6" />
          <Text style={styles.kpiLabel}>N° Pedidos</Text>
          <Text style={styles.kpiValue}>{totalPedidos}</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="stats-chart-outline" size={20} color="#F59E0B" />
          <Text style={styles.kpiLabel}>Promedio</Text>
          <Text style={styles.kpiValue}>
            ${Math.round(promedioVenta).toLocaleString('es-CO')}
          </Text>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por # Venta..."
          placeholderTextColor="#64748B"
          value={busqueda}
          onChangeText={setBusqueda}
          keyboardType="numeric"
        />
        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <Ionicons name="close-circle" size={18} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderVenta = ({ item }) => {
    const idVenta = item.idventa || item.id_venta || 'N/A';
    const totalVenta = item.total || item.monto_total || 0;
    const fechaBruta = item.fecha_venta || item.created_at;
    const fechaFormateada = fechaBruta
      ? new Date(fechaBruta).toLocaleDateString('es-CO', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Sin fecha';

    return (
      <TouchableOpacity
        style={styles.itemCard}
        onPress={() => abrirDetalleVenta(item)}
        activeOpacity={0.7}
      >
        <View style={styles.iconBox}>
          <Ionicons name="receipt-outline" size={24} color="#F59E0B" />
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>Venta #{idVenta}</Text>
          <Text style={styles.itemDate}>{fechaFormateada}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>
            ${Number(totalVenta).toLocaleString('es-CO')}
          </Text>
          <Text style={styles.viewDetailText}>Ver detalle ›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {cargando && !refrescando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.loadingText}>Cargando ventas...</Text>
          </View>
        ) : (
          <FlatList
            data={ventasFiltradas}
            keyExtractor={(item, index) =>
              (item.idventa || item.id_venta || index).toString()
            }
            ListHeaderComponent={renderHeader}
            renderItem={renderVenta}
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

        {/* Modal Detalle de Venta */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Detalle Venta #{ventaSeleccionada?.idventa || ventaSeleccionada?.id_venta}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#F8FAFC" />
                </TouchableOpacity>
              </View>

              {cargandoDetalles ? (
                <ActivityIndicator size="large" color="#F59E0B" style={{ marginVertical: 20 }} />
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {detalles.length === 0 ? (
                    <Text style={styles.emptyText}>No hay items registrados en este pedido.</Text>
                  ) : (
                    detalles.map((d, idx) => (
                      <View key={idx} style={styles.detailRow}>
                        <View style={styles.detailInfo}>
                          <Text style={styles.detailProdName}>
                            {d.producto?.nombre_producto || 'Producto sin nombre'}
                          </Text>
                          <Text style={styles.detailSub}>
                            Cantidad: {d.cantidad || 1} x ${Number(d.precio_unitario || d.precio || 0).toLocaleString('es-CO')}
                          </Text>
                        </View>
                        <Text style={styles.detailTotal}>
                          ${Number((d.cantidad || 1) * (d.precio_unitario || d.precio || 0)).toLocaleString('es-CO')}
                        </Text>
                      </View>
                    ))
                  )}

                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Venta:</Text>
                    <Text style={styles.totalValue}>
                      ${Number(ventaSeleccionada?.total || ventaSeleccionada?.monto_total || 0).toLocaleString('es-CO')}
                    </Text>
                  </View>
                </ScrollView>
              )}
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
    fontSize: 13,
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
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  itemDate: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    color: '#F59E0B',
    fontSize: 15,
    fontWeight: '800',
  },
  viewDetailText: {
    color: '#3B82F6',
    fontSize: 11,
    marginTop: 2,
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
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  detailInfo: {
    flex: 1,
    marginRight: 10,
  },
  detailProdName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  detailSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  detailTotal: {
    color: '#F59E0B',
    fontWeight: '700',
    fontSize: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#334155',
  },
  totalLabel: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  totalValue: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#94A3B8',
    textAlign: 'center',
    marginVertical: 20,
  },
});