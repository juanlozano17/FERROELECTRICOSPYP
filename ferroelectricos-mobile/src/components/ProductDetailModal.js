
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailModal({ visible, producto, onClose, onAgregar }) {
  if (!producto) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.btnCloseIcon} onPress={onClose}>
              <Ionicons name="close" size={24} color="#0F172A" />
            </TouchableOpacity>

            <Image
              source={{
                uri: producto.imagenes && producto.imagenes.startsWith('http')
                  ? producto.imagenes
                  : 'https://via.placeholder.com/300?text=Sin+Imagen',
              }}
              style={styles.modalImage}
              resizeMode="contain"
            />

            <Text style={styles.modalTitle}>{producto.nombre_producto}</Text>
            <Text style={styles.modalPrice}>${Number(producto.precio).toLocaleString('es-CO')}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionHeader}>Descripción</Text>
            <Text style={styles.modalText}>{producto.descripcion || 'Sin descripción detallada.'}</Text>

            {producto.caracteristicas ? (
              <>
                <Text style={styles.sectionHeader}>Especificaciones Técnicas</Text>
                <Text style={styles.modalText}>{producto.caracteristicas}</Text>
              </>
            ) : null}

            <TouchableOpacity
              style={styles.btnModalPrimary}
              onPress={() => {
                onAgregar(producto);
                onClose();
              }}
            >
              <Ionicons name="cart-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.btnModalPrimaryText}>Añadir al Carrito</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, maxHeight: '85%' },
  btnCloseIcon: { alignSelf: 'flex-end', padding: 4 },
  modalImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  modalPrice: { fontSize: 22, fontWeight: '900', color: '#059669', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  sectionHeader: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 4 },
  modalText: { fontSize: 13, color: '#64748B', lineHeight: 18, marginBottom: 12 },
  btnModalPrimary: { backgroundColor: '#0F172A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 14, marginTop: 10 },
  btnModalPrimaryText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});