import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';

const CATEGORIAS = [
  { id: 'Todas', nombre: '🔥 Todos' },
  { id: '1', nombre: '💡 Iluminación' },
  { id: '3', nombre: '🏡 Exteriores' },
  { id: '4', nombre: '🔌 Bombillos' },
  { id: '7', nombre: '✨ Cintas LED' },
  { id: '8', nombre: '🛠️ Herramientas' },
];

export default function CategoryFilter({ seleccionada, onSelect }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catChip,
              seleccionada === cat.id && styles.catChipSelected,
            ]}
            onPress={() => onSelect(cat.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.catChipText,
                seleccionada === cat.id && styles.catChipTextSelected,
              ]}
            >
              {cat.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  catChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catChipSelected: {
    backgroundColor: '#F59E0B',
  },
  catChipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  catChipTextSelected: {
    color: '#0F172A',
    fontWeight: 'bold',
  },
});