import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // 1. Importas el hook
import { useAuth } from '../context/AuthContext';

export default function Header({ busqueda, onBuscar, totalItems, onOpenCart }) {
  const { user, logout } = useAuth();
  const navigation = useNavigation(); // 2. Obtienes navigation directamente

  const contactarAsesor = () => {
    const url = 'whatsapp://send?text=Hola,%20tengo%20una%20consulta%20sobre%20el%20catálogo%20de%20FERROELÉCTRICOS%20PYP&phone=573000000000';
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Asegúrate de tener WhatsApp instalado.'));
  };

  const handleUserPress = () => {
    if (user) {
      Alert.alert(
        'Mi Cuenta',
        `Sesión activa: ${user.email}`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Cerrar Sesión', style: 'destructive', onPress: logout },
        ]
      );
    } else {
      // 3. Navega sin fallo alguno
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.brandRow}>
          <TouchableOpacity style={styles.userAvatarBtn} onPress={handleUserPress} activeOpacity={0.8}>
            <Ionicons
              name={user ? "person-circle" : "person-add-outline"}
              size={26}
              color={user ? "#10B981" : "#F59E0B"}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.brandTitle}>FERROELÉCTRICOS</Text>
            <Text style={styles.brandSubtitle}>
              {user ? `Hola, ${user.nombre || user.user_metadata?.full_name || 'Cliente'}` : 'Invitado • Toca para ingresar'}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.wspHeaderBtn} onPress={contactarAsesor} activeOpacity={0.8}>
            <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart} activeOpacity={0.8}>
            <Ionicons name="cart" size={22} color="#0F172A" />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué estás buscando hoy?"
          placeholderTextColor="#94A3B8"
          value={busqueda}
          onChangeText={onBuscar}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => onBuscar('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  userAvatarBtn: {
    backgroundColor: '#1E293B',
    padding: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: { fontSize: 18, fontWeight: '900', color: '#F8FAFC', letterSpacing: 0.5 },
  brandSubtitle: { fontSize: 11, color: '#F59E0B', fontWeight: '600' },
  actionsContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wspHeaderBtn: { backgroundColor: 'rgba(37, 211, 102, 0.15)', padding: 10, borderRadius: 14 },
  cartBtn: { backgroundColor: '#F59E0B', padding: 10, borderRadius: 14, position: 'relative' },
  cartBadge: {
    position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444',
    borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  searchBox: {
    backgroundColor: '#1E293B', borderRadius: 14, paddingHorizontal: 12,
    height: 44, flexDirection: 'row', alignItems: 'center', marginTop: 14,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#F8FAFC' },
});