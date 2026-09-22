import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Importaciones de pantallas públicas y de cliente
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Importaciones para Administrador
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProductos from '../screens/admin/AdminProductos';
import AdminPedidos from '../screens/admin/AdminPedidos';
import AdminEnvios from '../screens/admin/AdminEnvios';
import RegisterAdminScreen from '../screens/admin/RegisterAdminScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. SI ES ADMINISTRADOR -> RUTAS DE ADMIN */}
      {user && user.id_rol === 1 ? (
        <>
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="AdminProductos" component={AdminProductos} />
          <Stack.Screen name="AdminPedidos" component={AdminPedidos} />
          <Stack.Screen name="AdminEnvios" component={AdminEnvios} />
        </>
      ) : (
        /* 2. VISITANTES O CLIENTES REGISTRADOS -> RUTAS PÚBLICAS Y DE CLIENTE */
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="RegisterAdminScreen" component={RegisterAdminScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0F172A' 
  },
});