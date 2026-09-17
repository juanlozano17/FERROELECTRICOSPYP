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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabase';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleRegister = async () => {
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena los campos obligatorios.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);
    try {
      // 1. Crear el usuario en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            nombre: nombre.trim(),
            telefono: telefono.trim(),
            id_rol: 2, // Rol de cliente por defecto
          },
        },
      });

      if (error) throw error;

      // 2. Si el registro crea sesión de inmediato o requiere ir al inicio
      Alert.alert('¡Cuenta Creada!', 'Registro exitoso. Ya estás logueado.', [
        {
          text: 'Continuar',
          onPress: () => {
            // Reinicia la pila de navegación para ir directo a HomeScreen
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
          },
        },
      ]);
    } catch (err) {
      Alert.alert('Error en el Registro', err.message || 'No se pudo crear la cuenta.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          
          <TouchableOpacity style={styles.btnVolver} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
            <Text style={styles.btnVolverText}>Volver</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>FERROELÉCTRICOS PyP</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#64748B" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#64748B"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

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
              <Ionicons name="call-outline" size={20} color="#64748B" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Teléfono (Opcional)"
                placeholderTextColor="#64748B"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña (mínimo 6 caracteres)"
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
              style={styles.btnRegistrar}
              onPress={handleRegister}
              disabled={cargando}
            >
              {cargando ? (
                <ActivityIndicator color="#0F172A" />
              ) : (
                <Text style={styles.btnRegistrarText}>Registrarme e Iniciar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.loginText}>
                ¿Ya tienes una cuenta? <Text style={styles.loginHighlight}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  btnVolver: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  btnVolverText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
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
  btnRegistrar: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnRegistrarText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  btnLogin: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  loginHighlight: {
    color: '#F59E0B',
    fontWeight: '700',
  },
});