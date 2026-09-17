import 'react-native-get-random-values';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';
import bcrypt from 'bcryptjs';

export default function RegisterAdminScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [claveSecreta, setClaveSecreta] = useState('');
  const [cargando, setCargando] = useState(false);

  // Clave Maestra actualizada para desarrollo
  const CLAVE_MAESTRA = 'kamell1612';

  const handleRegisterAdmin = async () => {
    if (!nombre || !email || !password || !claveSecreta) {
      Alert.alert('Atención', 'Por favor completa todos los campos.');
      return;
    }

    if (claveSecreta !== CLAVE_MAESTRA) {
      Alert.alert('Acceso Denegado', 'La clave de autorización es incorrecta.');
      return;
    }

    setCargando(true);
    try {
      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: nombre } },
      });

      if (authError) throw new Error(`Auth Error: ${authError.message}`);

      // 2. Hash de contraseña con Bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // 3. Insertar registro directo en la tabla 'usuarios' con rol Administrador (id_rol: 1)
      const { data: dbData, error: dbError } = await supabase
        .from('usuarios')
        .insert([
          {
            nombre: nombre,
            correo: email,
            contrasena: hashedPassword,
            id_rol: 1,
          },
        ])
        .select();

      if (dbError) throw new Error(`DB Error: ${dbError.message}`);

      // Alerta limpia sin llamadas a navigation para evitar la falla GO_BACK
      Alert.alert(
        '¡Éxito!',
        'Cuenta de Administrador creada correctamente.'
      );
    } catch (error) {
      console.log('Error completo:', error);
      Alert.alert('Error en registro', error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="shield-checkmark" size={32} color="#F59E0B" />
          <Text style={styles.brand}>FERROELÉCTRICOS</Text>
          <Text style={styles.subBrand}>PYP • Registro Administrativo</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#64748B" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#94A3B8"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo corporativo"
            placeholderTextColor="#94A3B8"
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
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={[styles.inputContainer, styles.inputKeyContainer]}>
          <Ionicons name="key-outline" size={20} color="#F59E0B" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.inputKeyText]}
            placeholder="Clave Maestra de Autorización"
            placeholderTextColor="#F59E0B"
            value={claveSecreta}
            onChangeText={setClaveSecreta}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.btnPrimary} 
          onPress={handleRegisterAdmin} 
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#0F172A" />
          ) : (
            <Text style={styles.btnPrimaryText}>Crear Cuenta Admin</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnCancel} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnCancelText}>← Volver al Inicio de Sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#1E293B', padding: 24, borderRadius: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  brand: { fontSize: 22, fontWeight: '900', color: '#F8FAFC', marginTop: 6 },
  subBrand: { fontSize: 13, color: '#F59E0B', fontWeight: '600' },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0F172A', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    marginBottom: 12, 
    height: 48 
  },
  inputKeyContainer: {
    borderWidth: 1,
    borderColor: '#F59E0B',
    marginBottom: 18,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, color: '#F8FAFC', fontSize: 14 },
  inputKeyText: { color: '#F59E0B', fontWeight: 'bold' },
  btnPrimary: { backgroundColor: '#F59E0B', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  btnPrimaryText: { color: '#0F172A', fontWeight: 'bold', fontSize: 15 },
  btnCancel: { alignItems: 'center', marginTop: 16 },
  btnCancelText: { color: '#94A3B8', fontSize: 13 },
});