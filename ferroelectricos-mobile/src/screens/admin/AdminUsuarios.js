import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';

export default function AdminUsuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Estado para el modal de edición de rol
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('idusuario', { ascending: false });

      if (error) throw error;
      setUsuarios(data || []);
    } catch (error) {
      console.error('Error al obtener usuarios:', error.message);
      Alert.alert('Error', 'No se pudieron cargar los usuarios: ' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    obtenerUsuarios();
  };

  // Evalúa si el usuario está activo (soporta 'true', true o valores nulos por defecto)
  const esUsuarioActivo = (user) => {
    if (user.activo === null || user.activo === undefined) return true;
    return String(user.activo).toLowerCase() === 'true';
  };

  // --- ALTERNAR ESTADO (ACTIVAR / DESACTIVAR) ---
  const confirmarCambioEstado = (user) => {
    const estaActivo = esUsuarioActivo(user);
    const accion = estaActivo ? 'desactivar' : 'activar';
    const nombreCompleto = [user.nombre, user.apellido].filter(Boolean).join(' ') || 'este usuario';

    Alert.alert(
      `${estaActivo ? 'Desactivar' : 'Activar'} Usuario`,
      `¿Estás seguro de que deseas ${accion} la cuenta de ${nombreCompleto}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: estaActivo ? 'Desactivar' : 'Activar',
          style: estaActivo ? 'destructive' : 'default',
          onPress: () => alternarEstadoUsuario(user.idusuario, !estaActivo),
        },
      ]
    );
  };

  const alternarEstadoUsuario = async (idusuario, nuevoEstadoBool) => {
    // Guardamos 'true' o 'false' como string en minúscula para el campo varchar
    const valorActivoString = nuevoEstadoBool ? 'true' : 'false';

    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ activo: valorActivoString })
        .eq('idusuario', idusuario);

      if (error) throw error;

      Alert.alert(
        'Éxito',
        `Usuario ${nuevoEstadoBool ? 'activado' : 'desactivado'} correctamente`
      );

      // Actualizar estado local en la lista
      setUsuarios((prev) =>
        prev.map((u) => (u.idusuario === idusuario ? { ...u, activo: valorActivoString } : u))
      );
    } catch (error) {
      console.error('Error al cambiar estado del usuario:', error.message);
      Alert.alert('Error', 'No se pudo cambiar el estado: ' + error.message);
    }
  };

  // --- EDITAR ROL DE USUARIO ---
  const abrirModalEditar = (user) => {
    setUsuarioEditar(user);
    setModalVisible(true);
  };

  const cambiarRol = async (nuevoRol) => {
    if (!usuarioEditar) return;
    try {
      setGuardando(true);
      const { error } = await supabase
        .from('usuarios')
        .update({ id_rol: nuevoRol })
        .eq('idusuario', usuarioEditar.idusuario);

      if (error) throw error;

      Alert.alert('Éxito', 'Rol actualizado correctamente');
      setUsuarios((prev) =>
        prev.map((u) =>
          u.idusuario === usuarioEditar.idusuario ? { ...u, id_rol: nuevoRol } : u
        )
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar rol:', error.message);
      Alert.alert('Error', 'No se pudo cambiar el rol: ' + error.message);
    } finally {
      setGuardando(false);
    }
  };

  // Filtrado por nombre, apellido o correo
  const usuariosFiltrados = usuarios.filter((user) => {
    const texto = busqueda.toLowerCase();
    const nombre = user.nombre ? user.nombre.toLowerCase() : '';
    const apellido = user.apellido ? user.apellido.toLowerCase() : '';
    const correo = user.correo ? user.correo.toLowerCase() : '';

    return (
      nombre.includes(texto) ||
      apellido.includes(texto) ||
      correo.includes(texto)
    );
  });

  const renderUsuarioItem = ({ item }) => {
    const esAdmin = Number(item.id_rol) === 1;
    const estaActivo = esUsuarioActivo(item);
    const nombreCompleto = [item.nombre, item.apellido].filter(Boolean).join(' ');

    return (
      <View style={[styles.card, !estaActivo && styles.cardInactiva]}>
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, !estaActivo && styles.avatarInactivo]}>
            <Text style={styles.avatarText}>
              {item.nombre ? item.nombre.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.userName, !estaActivo && styles.textInactivo]}>
                {nombreCompleto || 'Usuario sin nombre'}
              </Text>
              {!estaActivo && (
                <View style={styles.badgeInactivo}>
                  <Text style={styles.badgeInactivoText}>Inactivo</Text>
                </View>
              )}
            </View>
            <Text style={styles.userEmail}>
              {item.correo || 'Sin correo electrónico'}
            </Text>
          </View>

          <View
            style={[
              styles.roleBadge,
              {
                backgroundColor: esAdmin
                  ? 'rgba(245, 158, 11, 0.15)'
                  : 'rgba(59, 130, 246, 0.15)',
              },
            ]}
          >
            <Text
              style={[
                styles.roleText,
                { color: esAdmin ? '#F59E0B' : '#3B82F6' },
              ]}
            >
              {esAdmin ? 'Admin' : 'Cliente'}
            </Text>
          </View>
        </View>

        {/* Acciones de Edición y Desactivación */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.btnEdit}
            onPress={() => abrirModalEditar(item)}
          >
            <Ionicons name="create-outline" size={16} color="#38BDF8" />
            <Text style={styles.btnEditText}>Cambiar Rol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estaActivo ? styles.btnDesactivar : styles.btnActivar}
            onPress={() => confirmarCambioEstado(item)}
          >
            <Ionicons
              name={estaActivo ? 'power-outline' : 'checkmark-circle-outline'}
              size={16}
              color={estaActivo ? '#EF4444' : '#10B981'}
            />
            <Text
              style={estaActivo ? styles.btnDesactivarText : styles.btnActivarText}
            >
              {estaActivo ? 'Desactivar' : 'Activar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#F8FAFC" />
          </TouchableOpacity>
          <Text style={styles.title}>Gestión de Usuarios</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o correo..."
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

        {/* Lista o Loader */}
        {loading && !refreshing ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.loadingText}>Cargando usuarios...</Text>
          </View>
        ) : (
          <FlatList
            data={usuariosFiltrados}
            keyExtractor={(item) =>
              item.idusuario ? item.idusuario.toString() : Math.random().toString()
            }
            renderItem={renderUsuarioItem}
            contentContainerStyle={styles.listContent}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Ionicons name="people-outline" size={48} color="#334155" />
                <Text style={styles.emptyText}>
                  {busqueda
                    ? 'No se encontraron usuarios'
                    : 'No hay usuarios registrados'}
                </Text>
              </View>
            }
          />
        )}
      </View>

      {/* MODAL CAMBIAR ROL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Rol de Usuario</Text>
            <Text style={styles.modalSubtitle}>
              {[usuarioEditar?.nombre, usuarioEditar?.apellido].filter(Boolean).join(' ') || 'Usuario'}
            </Text>

            {guardando ? (
              <ActivityIndicator size="small" color="#F59E0B" style={{ marginVertical: 20 }} />
            ) : (
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.roleOptionBtn, { borderColor: '#3B82F6' }]}
                  onPress={() => cambiarRol(2)}
                >
                  <Ionicons name="person-outline" size={18} color="#3B82F6" />
                  <Text style={[styles.roleOptionText, { color: '#3B82F6' }]}>
                    Asignar como Cliente (id_rol 2)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.roleOptionBtn, { borderColor: '#F59E0B' }]}
                  onPress={() => cambiarRol(1)}
                >
                  <Ionicons name="shield-checkmark-outline" size={18} color="#F59E0B" />
                  <Text style={[styles.roleOptionText, { color: '#F59E0B' }]}>
                    Asignar como Admin (id_rol 1)
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  btnBack: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    padding: 0,
  },
  listContent: {
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardInactiva: {
    opacity: 0.6,
    borderColor: '#1E293B',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInactivo: {
    backgroundColor: '#0F172A',
  },
  avatarText: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  textInactivo: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  userEmail: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  badgeInactivo: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeInactivoText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 10,
  },
  btnEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  btnEditText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  btnDesactivar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  btnDesactivarText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  btnActivar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  btnActivarText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: 10,
    fontSize: 14,
  },
  emptyText: {
    color: '#64748B',
    marginTop: 12,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 20,
  },
  modalButtons: {
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  roleOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#0F172A',
    gap: 8,
  },
  roleOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalCloseBtn: {
    paddingVertical: 8,
  },
  modalCloseText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});