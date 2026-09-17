import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    setCargando(true);
    try {
      const data = await login(email, password);
      
      // Si el inicio de sesión es exitoso, redirigimos directamente a HomeScreen
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (err) {
      Alert.alert('Error de Inicio de Sesión', err.message || 'Credenciales incorrectas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        
        {/* Botón para regresar al catálogo sin loguearse */}
        <TouchableOpacity style={styles.btnVolver} onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
          <Text style={styles.btnVolverText}>Ver Catálogo</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>FERROELÉCTRICOS PyP</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#64748B"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!mostrarPassword}
            />
            <TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
              <Ionicons
                name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btnIngresar}
            onPress={handleLogin}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.btnIngresarText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Navegación directa al Registro de Usuario */}
          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.registerText}>
              ¿No tienes cuenta? <Text style={styles.registerHighlight}>Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
    justifyContent: 'center',
  },
  btnVolver: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
    gap: 8,
  },
  btnVolverText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: '700',
    marginTop: 4,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#334155',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
  },
  btnIngresar: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnIngresarText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  btnRegister: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  registerHighlight: {
    color: '#F59E0B',
    fontWeight: '700',
  },
});