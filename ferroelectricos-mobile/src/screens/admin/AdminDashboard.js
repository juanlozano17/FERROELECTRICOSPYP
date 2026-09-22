import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard({ navigation }) {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Panel de Administración</Text>
            <Text style={styles.subTitle}>SUMILED S.A.S.</Text>
          </View>
          <TouchableOpacity style={styles.btnLogout} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gestión del Sistema</Text>

        {/* Tarjetas de Navegación */}
        <View style={styles.grid}>
          
          {/* Botón Productos */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AdminProductos')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
              <Ionicons name="cube-outline" size={32} color="#3B82F6" />
            </View>
            <Text style={styles.cardTitle}>Productos</Text>
            <Text style={styles.cardDesc}>Gestiona inventario y catálogo</Text>
          </TouchableOpacity>

          {/* Botón Pedidos / Ventas */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AdminPedidos')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <Ionicons name="cart-outline" size={32} color="#10B981" />
            </View>
            <Text style={styles.cardTitle}>Ventas / Pedidos</Text>
            <Text style={styles.cardDesc}>Revisa los pedidos realizados</Text>
          </TouchableOpacity>

          {/* Botón Envíos */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AdminEnvios')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <Ionicons name="bus-outline" size={32} color="#F59E0B" />
            </View>
            <Text style={styles.cardTitle}>Envíos</Text>
            <Text style={styles.cardDesc}>Control y estado de despachos</Text>
          </TouchableOpacity>

          {/* Botón Usuarios */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AdminUsuarios')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
              <Ionicons name="people-outline" size={32} color="#A855F7" />
            </View>
            <Text style={styles.cardTitle}>Usuarios</Text>
            <Text style={styles.cardDesc}>Gestión de clientes y administradores</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  subTitle: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '700',
  },
  btnLogout: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 16,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94A3B8',
  },
});