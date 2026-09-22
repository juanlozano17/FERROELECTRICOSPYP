import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabase';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleLogin = async () => {
    if (!correo || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    setCargando(true);
    try {
      // 1. Autenticación con Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password: password,
      });

      if (authError) throw authError;

      // 2. Consultamos directamente la tabla 'usuarios' para validar rol y estado
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', correo.trim())
        .single();

      if (userData && String(userData.activo).toLowerCase() === 'false') {
        await supabase.auth.signOut();
        Alert.alert('Cuenta inactiva', 'Tu cuenta ha sido inhabilitada por el administrador.');
        setCargando(false);
        return;
      }

      // 3. EVALUACIÓN DE ADMIN DIRECTA PARA FORZAR EL SALTO
      const emailLower = correo.trim().toLowerCase();
      const esAdminCorreo = emailLower.includes('kamellad') || emailLower.includes('kamelniguera');
      const esAdminRol = userData && (Number(userData.id_rol) === 1 || Number(userData.idrol) === 1);

      Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente en SUMILED S.A.S.');

      // 4. REDIRECCIÓN MANUAL EXACTA
      if (esAdminRol || esAdminCorreo) {
        navigation.replace('AdminDashboard'); // Salto directo al panel de control
      } else {
        navigation.replace('HomeScreen');   // Salto directo a la tienda del cliente
      }

    } catch (error) {
      console.log('Error de login:', error.message);
      Alert.alert('Error', 'Correo o contraseña incorrectos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
          <Text style={styles.backText}>Ver Catálogo</Text>
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>SUMILED S.A.S.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!mostrarPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
              <Ionicons 
                name={mostrarPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#94A3B8" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} disabled={cargando}>
            {cargando ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.btnLoginText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnAdmin} 
            onPress={() => navigation.navigate('RegisterAdminScreen')}
          >
            <Ionicons name="shield-outline" size={20} color="#F59E0B" />
            <Text style={styles.btnAdminText}>Entrar como Administrador</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerContainer} 
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.registerTextNormal}>¿No tienes cuenta? </Text>
            <Text style={styles.registerTextBold}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  innerContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  backButton: { flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 20, left: 20, gap: 8 },
  backText: { color: '#F8FAFC', fontSize: 16, fontWeight: '600' },
  headerContainer: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: '900', color: '#F8FAFC', marginBottom: 4 },
  subtitle: { fontSize: 14, fontWeight: 'bold', color: '#F59E0B', letterSpacing: 1 },
  formContainer: { gap: 16 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#F8FAFC', fontSize: 15 },
  btnLogin: {
    backgroundColor: '#F59E0B',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  btnLoginText: { color: '#0F172A', fontSize: 16, fontWeight: 'bold' },
  btnAdmin: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  btnAdminText: { color: '#F59E0B', fontSize: 15, fontWeight: 'bold' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  registerTextNormal: { color: '#94A3B8', fontSize: 14 },
  registerTextBold: { color: '#F59E0B', fontSize: 14, fontWeight: 'bold' },
});