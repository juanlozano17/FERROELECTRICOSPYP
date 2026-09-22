import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Importaciones de pantallas de Cliente (src/screens/)
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Importaciones para Administrador (src/screens/admin/)
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProductos from '../screens/admin/AdminProductos';
import AdminPedidos from '../screens/admin/AdminPedidos';
import AdminEnvios from '../screens/admin/AdminEnvios';
import AdminUsuarios from '../screens/admin/AdminUsuarios';
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

  // EVALUACIÓN MULTI-CAPA DE ADMINISTRADOR
  const emailActual = user?.email?.toLowerCase() || user?.correo?.toLowerCase() || '';
  
  const esAdminPorCorreo = 
    emailActual.includes('kamellad') || 
    emailActual.includes('kamelniguera');

  const esAdminPorRol = user && (Number(user.id_rol) === 1 || Number(user.idrol) === 1);

  const esAdmin = esAdminPorRol || esAdminPorCorreo;

  // Definimos la pantalla inicial de forma inteligente según el rol y sesión
  const initialRoute = user ? (esAdmin ? 'AdminDashboard' : 'HomeScreen') : 'HomeScreen';

  return (
    <Stack.Navigator 
      initialRouteName={initialRoute} 
      screenOptions={{ headerShown: false }}
    >
      {/* TODAS LAS PANTALLAS DEBEN ESTAR DECLARADAS DIRECTAMENTE */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="AdminProductos" component={AdminProductos} />
      <Stack.Screen name="AdminPedidos" component={AdminPedidos} />
      <Stack.Screen name="AdminEnvios" component={AdminEnvios} />
      <Stack.Screen name="AdminUsuarios" component={AdminUsuarios} />
      <Stack.Screen name="RegisterAdminScreen" component={RegisterAdminScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
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