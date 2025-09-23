import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

export default function Categoria({ categorias }) {
  return (
    <FlatList
      data={categorias}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriasContainer}
      renderItem={({ item }) => (
        <View style={styles.categoriaCard}>
          <Image source={{ uri: item.imagen }} style={styles.categoriaImagen} />
          <Text style={styles.categoriaNombre}>{item.nombre}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  categoriasContainer: {
    paddingHorizontal: 10,
    paddingBottom: 15
  },
  categoriaCard: {
    alignItems: 'center',
    marginRight: 15
  },
  categoriaImagen: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5
  },
  categoriaNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6d4c41'
  }
});
