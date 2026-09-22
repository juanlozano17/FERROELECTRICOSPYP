import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import CartModal from '../components/CartModal';
import CheckoutModal from '../components/CheckoutModal';

export default function HomeScreen({ navigation, onNavigateAuth }) {
  const { user } = useAuth(); // Importamos el usuario actual

  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [cargando, setCargando] = useState(true);
  const [ordenPrecio, setOrdenPrecio] = useState('default'); // 'asc', 'desc' o 'default'

  const [productoDetalle, setProductoDetalle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [modalCarritoVisible, setModalCarritoVisible] = useState(false);
  const [modalCheckoutVisible, setModalCheckoutVisible] = useState(false);

  // Estado para la notificación Toast
  const [toastMensaje, setToastMensaje] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  async function obtenerProductos() {
    try {
      const { data, error } = await supabase.from('producto').select('*');
      if (error) throw error;
      setProductos(data || []);
      setFiltrados(data || []);
    } catch (error) {
      console.log('Error cargando productos:', error.message);
    } finally {
      setCargando(false);
    }
  }

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const aplicarFiltros = (text, catId, orden) => {
    let resultado = [...productos];
    if (catId !== 'Todas') {
      resultado = resultado.filter((item) => item.idcategoria && item.idcategoria.toString() === catId);
    }
    if (text.trim()) {
      resultado = resultado.filter((item) => item.nombre_producto?.toLowerCase().includes(text.toLowerCase()));
    }
    if (orden === 'asc') {
      resultado.sort((a, b) => Number(a.precio) - Number(b.precio));
    } else if (orden === 'desc') {
      resultado.sort((a, b) => Number(b.precio) - Number(a.precio));
    }
    setFiltrados(resultado);
  };

  // Validación de inicio de sesión antes de realizar acciones de compra
  const requerirAutenticacion = (accionExito) => {
    if (!user) {
      Alert.alert(
        'Inicia sesión para comprar',
        'Debes crear una cuenta o iniciar sesión para agregar productos al carrito.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Iniciar Sesión',
            onPress: () => {
              if (navigation) {
                navigation.navigate('LoginScreen');
              } else if (onNavigateAuth) {
                onNavigateAuth();
              }
            },
          },
        ]
      );
      return false;
    }
    accionExito();
    return true;
  };

  const agregarAlCarrito = (producto) => {
    requerirAutenticacion(() => {
      setCarrito((prev) => {
        const existe = prev.find((item) => item.idproducto === producto.idproducto);
        return existe
          ? prev.map((item) => (item.idproducto === producto.idproducto ? { ...item, cantidad: item.cantidad + 1 } : item))
          : [...prev, { ...producto, cantidad: 1 }];
      });
      mostrarToast(`¡${producto.nombre_producto} agregado! 🛒`);
    });
  };

  const abrirCarrito = () => {
    requerirAutenticacion(() => {
      setModalCarritoVisible(true);
    });
  };

  const cambiarCantidad = (idproducto, delta) => {
    setCarrito((prev) =>
      prev.map((item) => (item.idproducto === idproducto ? { ...item, cantidad: item.cantidad + delta } : item)).filter((item) => item.cantidad > 0)
    );
  };

  const limpiarCarrito = () => setCarrito([]);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.cargandoText}>Cargando catálogo...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        busqueda={busqueda}
        onBuscar={(txt) => { setBusqueda(txt); aplicarFiltros(txt, categoriaSeleccionada, ordenPrecio); }}
        totalItems={carrito.reduce((a, b) => a + b.cantidad, 0)}
        onOpenCart={abrirCarrito}
        onNavigateAuth={onNavigateAuth}
      />

      <CategoryFilter
        seleccionada={categoriaSeleccionada}
        onSelect={(catId) => { setCategoriaSeleccionada(catId); aplicarFiltros(busqueda, catId, ordenPrecio); }}
      />

      {/* Barrita de Ordenar por precio */}
      <View style={styles.sortBar}>
        <Text style={styles.sortLabel}>Ordenar por precio:</Text>
        <TouchableOpacity
          style={[styles.sortBtn, ordenPrecio === 'asc' && styles.sortBtnActive]}
          onPress={() => {
            const nuevoOrden = ordenPrecio === 'asc' ? 'default' : 'asc';
            setOrdenPrecio(nuevoOrden);
            aplicarFiltros(busqueda, categoriaSeleccionada, nuevoOrden);
          }}
        >
          <Text style={[styles.sortBtnText, ordenPrecio === 'asc' && styles.sortBtnTextActive]}>Menor a Mayor ⬆️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortBtn, ordenPrecio === 'desc' && styles.sortBtnActive]}
          onPress={() => {
            const nuevoOrden = ordenPrecio === 'desc' ? 'default' : 'desc';
            setOrdenPrecio(nuevoOrden);
            aplicarFiltros(busqueda, categoriaSeleccionada, nuevoOrden);
          }}
        >
          <Text style={[styles.sortBtnText, ordenPrecio === 'desc' && styles.sortBtnTextActive]}>Mayor a Menor ⬇️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idproducto.toString()}
        numColumns={2}
        columnWrapperStyle={styles.rowWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => { setProductoDetalle(item); setModalVisible(true); }}
            onAgregar={agregarAlCarrito}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>Sin resultados</Text>
          </View>
        }
      />

      {/* Componente Toast Flotante */}
      {toastVisible && (
        <View style={styles.toastContainer}>
          <Ionicons name="checkmark-circle" size={20} color="#10B981" style={{ marginRight: 6 }} />
          <Text style={styles.toastText} numberOfLines={1}>{toastMensaje}</Text>
        </View>
      )}

      {/* Modales */}
      <ProductDetailModal
        visible={modalVisible}
        producto={productoDetalle}
        onClose={() => setModalVisible(false)}
        onAgregar={agregarAlCarrito}
      />

      <CartModal
        visible={modalCarritoVisible}
        carrito={carrito}
        onClose={() => setModalCarritoVisible(false)}
        onCambiarCantidad={cambiarCantidad}
        onOpenCheckout={() => setModalCheckoutVisible(true)}
      />

      <CheckoutModal
        visible={modalCheckoutVisible}
        carrito={carrito}
        total={carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)}
        onClose={() => setModalCheckoutVisible(false)}
        onCompraExitosa={(idventa) => {
          limpiarCarrito();
          mostrarToast(`¡Pedido #${idventa} registrado con éxito! 📦`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' },
  cargandoText: { marginTop: 12, fontSize: 15, color: '#94A3B8' },
  sortBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 4, marginBottom: 8 },
  sortLabel: { fontSize: 11, fontWeight: '700', color: '#64748B', marginRight: 8 },
  sortBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 6 },
  sortBtnActive: { backgroundColor: '#0F172A' },
  sortBtnText: { fontSize: 10, fontWeight: '600', color: '#475569' },
  sortBtnTextActive: { color: '#F8FAFC', fontWeight: 'bold' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  rowWrapper: { justifyContent: 'space-between', marginBottom: 14 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#475569', marginTop: 8 },
  toastContainer: {
    position: 'absolute', bottom: 30, alignSelf: 'center', left: 20, right: 20,
    backgroundColor: '#0F172A', flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
  },
  toastText: { color: '#FFF', fontSize: 13, fontWeight: '600', flex: 1 },
});