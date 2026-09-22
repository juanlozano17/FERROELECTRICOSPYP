import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

export default function ProductCard({ item, onPress, onAgregar }) {
  const sinStock = item.stock === 0 || item.Estado === 'Agotado';

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.imagenes && item.imagenes.startsWith('http')
              ? item.imagenes
              : 'https://via.placeholder.com/200?text=Sin+Imagen',
          }}
          style={[styles.cardImage, sinStock && { opacity: 0.5 }]}
          resizeMode="cover"
        />
        <View style={[styles.stockBadge, sinStock && { backgroundColor: 'rgba(239, 68, 68, 0.9)' }]}>
          <Text style={[styles.stockText, sinStock && { color: '#FFF' }]}>
            {sinStock ? 'Agotado' : (item.Estado || 'Disponible')}
          </Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.nombre} numberOfLines={2}>{item.nombre_producto}</Text>
        <Text style={styles.precio}>${Number(item.precio).toLocaleString('es-CO')}</Text>

        <TouchableOpacity
          style={[styles.btnAgregarCard, sinStock && styles.btnDisabled]}
          onPress={() => !sinStock && onAgregar(item)}
          disabled={sinStock}
        >
          <Ionicons name={sinStock ? "ban-outline" : "add"} size={16} color="#FFF" />
          <Text style={styles.btnAgregarCardText}>{sinStock ? 'Agotado' : 'Agregar'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH, backgroundColor: '#FFFFFF', borderRadius: 16,
    overflow: 'hidden', elevation: 2, shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8,
  },
  imageContainer: { position: 'relative', height: 130, backgroundColor: '#F1F5F9' },
  cardImage: { width: '100%', height: '100%' },
  stockBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  stockText: { color: '#10B981', fontSize: 9, fontWeight: '700' },
  cardInfo: { padding: 10 },
  nombre: { fontSize: 13, fontWeight: '700', color: '#1E293B', height: 36 },
  precio: { fontSize: 15, fontWeight: '800', color: '#059669', marginVertical: 4 },
  btnAgregarCard: {
    backgroundColor: '#0F172A', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 6, borderRadius: 8, marginTop: 4,
  },
  btnDisabled: { backgroundColor: '#94A3B8' },
  btnAgregarCardText: { color: '#FFF', fontSize: 11, fontWeight: '700', marginLeft: 2 },
});