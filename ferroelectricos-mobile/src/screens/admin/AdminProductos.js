import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

export default function AdminProductos({ navigation }) {
  const { logout, user } = useAuth();

  // Estados Formulario Creación
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [idCategoria, setIdCategoria] = useState('1');
  const [estado, setEstado] = useState('activo');

  // Estados Lista y Búsqueda
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Estados Modal Edición
  const [modalVisible, setModalVisible] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editPrecio, setEditPrecio] = useState('');
  const [editImagen, setEditImagen] = useState('');
  const [editEstado, setEditEstado] = useState('activo');
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .order('idproducto', { ascending: false });

      if (error) throw error;
      setProductos(data || []);
    } catch (err) {
      console.log('Error obteniendo productos:', err);
    } finally {
      setCargando(false);
    }
  };

  const handleGuardarProducto = async () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert('Atención', 'Ingresa al menos el nombre y el precio.');
      return;
    }

    setGuardando(true);
    try {
      const { error } = await supabase.from('producto').insert([
        {
          nombre_producto: nombre.trim(),
          precio: parseFloat(precio),
          imagenes: imagenUrl.trim() || 'https://via.placeholder.com/150',
          idcategoria: parseInt(idCategoria) || 1,
          Estado: estado,
        },
      ]);

      if (error) throw error;

      Alert.alert('¡Éxito!', 'Producto creado correctamente.');
      setNombre('');
      setPrecio('');
      setImagenUrl('');
      obtenerProductos();
    } catch (err) {
      Alert.alert('Error al guardar', err.message);
    } finally {
      setGuardando(false);
    }
  };

  const abrirModalEditar = (prod) => {
    setProductoEdit(prod);
    setEditNombre(prod.nombre_producto || '');
    setEditPrecio(prod.precio ? prod.precio.toString() : '0');
    setEditImagen(prod.imagenes || '');
    setEditEstado(prod.Estado || 'activo');
    setModalVisible(true);
  };

  const handleActualizarProducto = async () => {
    if (!editNombre.trim() || !editPrecio.trim()) {
      Alert.alert('Atención', 'Nombre y precio no pueden estar vacíos.');
      return;
    }

    setActualizando(true);
    try {
      const { error } = await supabase
        .from('producto')
        .update({
          nombre_producto: editNombre.trim(),
          precio: parseFloat(editPrecio),
          imagenes: editImagen.trim(),
          Estado: editEstado,
        })
        .eq('idproducto', productoEdit.idproducto);

      if (error) throw error;

      Alert.alert('¡Éxito!', 'Producto actualizado correctamente.');
      setModalVisible(false);
      obtenerProductos();
    } catch (err) {
      Alert.alert('Error al actualizar', err.message);
    } finally {
      setActualizando(false);
    }
  };

  const handleEliminarProducto = (idproducto) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Deseas eliminar este producto permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('producto')
                .delete()
                .eq('idproducto', idproducto);

              if (error) throw error;
              obtenerProductos();
            } catch (err) {
              Alert.alert('Error al eliminar', err.message);
            }
          },
        },
      ]
    );
  };

  const productosFiltrados = productos.filter((p) =>
    (p.nombre_producto || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const getBadgeStyle = (est) => {
    const e = (est || '').toLowerCase();
    if (e === 'activo') return { bg: '#10B981', label: 'Activo' };
    if (e === 'pocas unidades') return { bg: '#F59E0B', label: 'Pocas Unidades' };
    if (e === 'agotado') return { bg: '#EF4444', label: 'Agotado' };
    return { bg: '#64748B', label: est || 'Inactivo' };
  };

  const renderHeader = () => (
    <View style={styles.headerForm}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topTitle}>Panel de Control</Text>
          <Text style={styles.topSub}>Hola, {user?.nombre || 'Administrador'}</Text>
        </View>
        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Formulario Registro */}
      <View style={styles.cardForm}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="add-circle-outline" size={18} color="#F59E0B" /> Registrar Nuevo Producto
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="pricetag-outline" size={18} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            placeholderTextColor="#64748B"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.rowInputs}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 6 }]}>
            <Ionicons name="cash-outline" size={18} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Precio ($)"
              placeholderTextColor="#64748B"
              value={precio}
              onChangeText={setPrecio}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1, marginLeft: 6 }]}>
            <Ionicons name="folder-outline" size={18} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="ID Cat (ej. 1)"
              placeholderTextColor="#64748B"
              value={idCategoria}
              onChangeText={setIdCategoria}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="image-outline" size={18} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="URL de la imagen (Opcional)"
            placeholderTextColor="#64748B"
            value={imagenUrl}
            onChangeText={setImagenUrl}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={handleGuardarProducto}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#0F172A" />
          ) : (
            <Text style={styles.btnGuardarText}>Guardar Producto</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Buscador de Inventario */}
      <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>
        <Ionicons name="cube-outline" size={18} color="#F59E0B" /> Inventario ({productosFiltrados.length})
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
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

  const renderProducto = ({ item }) => {
    const nombreMostrar = item.nombre_producto || 'Sin nombre';
    const imagenMostrar = item.imagenes || 'https://via.placeholder.com/150';
    const badgeInfo = getBadgeStyle(item.Estado);

    return (
      <View style={styles.itemCard}>
        <Image source={{ uri: imagenMostrar }} style={styles.itemImage} resizeMode="cover" />
        
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={1}>
            {nombreMostrar}
          </Text>
          
          <Text style={styles.itemPrice}>
            ${Number(item.precio || 0).toLocaleString('es-CO')}
          </Text>

          <View style={[styles.badge, { backgroundColor: badgeInfo.bg }]}>
            <Text style={styles.badgeText}>{badgeInfo.label}</Text>
          </View>
        </View>

        <View style={styles.actionsBox}>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => abrirModalEditar(item)}
          >
            <Ionicons name="pencil-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnEliminar}
            onPress={() => handleEliminarProducto(item.idproducto)}
          >
            <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {cargando && productos.length === 0 ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.loadingText}>Cargando inventario...</Text>
          </View>
        ) : (
          <FlatList
            data={productosFiltrados}
            keyExtractor={(item) => item.idproducto.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={renderProducto}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Modal para Editar Producto */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Producto</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#F8FAFC" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editNombre}
                  onChangeText={setEditNombre}
                  placeholderTextColor="#64748B"
                />

                <Text style={styles.label}>Precio ($):</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editPrecio}
                  onChangeText={setEditPrecio}
                  keyboardType="numeric"
                  placeholderTextColor="#64748B"
                />

                <Text style={styles.label}>URL Imagen:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editImagen}
                  onChangeText={setEditImagen}
                  autoCapitalize="none"
                  placeholderTextColor="#64748B"
                />

                <Text style={styles.label}>Estado:</Text>
                <View style={styles.estadoSelector}>
                  {['activo', 'pocas unidades', 'agotado', 'inactivo'].map((st) => (
                    <TouchableOpacity
                      key={st}
                      style={[
                        styles.chipEstado,
                        editEstado.toLowerCase() === st && styles.chipEstadoSelected,
                      ]}
                      onPress={() => setEditEstado(st)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          editEstado.toLowerCase() === st && styles.chipTextSelected,
                        ]}
                      >
                        {st}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.btnActualizar}
                  onPress={handleActualizarProducto}
                  disabled={actualizando}
                >
                  {actualizando ? (
                    <ActivityIndicator color="#0F172A" />
                  ) : (
                    <Text style={styles.btnGuardarText}>Guardar Cambios</Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
  cardForm: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
  },
  btnGuardar: {
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  btnGuardarText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 14,
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
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  itemImage: {
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#0F172A',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  itemPrice: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  actionsBox: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  btnEditar: {
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 8,
    marginRight: 6,
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 8,
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
    maxHeight: '80%',
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
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  modalInput: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    color: '#F8FAFC',
    marginBottom: 12,
  },
  estadoSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  chipEstado: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipEstadoSelected: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  chipTextSelected: {
    color: '#0F172A',
    fontWeight: '700',
  },
  btnActualizar: {
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});