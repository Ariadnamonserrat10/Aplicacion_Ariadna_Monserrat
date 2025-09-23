import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import Categoria from '../components/Categorias';

export default function Menu() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const categorias = [
    { id: 1, nombre: 'Bebidas calientes', imagen: 'https://i.pinimg.com/736x/bb/f9/b1/bbf9b105eea8ba8d93548b34d1c21055.jpg' },
    { id: 2, nombre: 'Bebidas Frias', imagen: 'https://i.pinimg.com/736x/35/32/ca/3532ca198f8a6b74e9d11a1890bdf0fe.jpg' },
    { id: 3, nombre: 'Postres', imagen: 'https://i.pinimg.com/1200x/1e/d3/ae/1ed3aefb51f1221c12836c16686fbdb9.jpg' },
    { id: 4, nombre: 'Banderillas', imagen: 'https://i.pinimg.com/736x/05/42/34/054234392c66fb1246dbff5fdaac5004.jpg' },
    { id: 5, nombre: 'Pasteles', imagen: 'https://i.pinimg.com/736x/ef/74/46/ef7446f8afcdff724ebca09e01eca06e.jpg' },
    { id: 6, nombre: 'Sandwich', imagen: 'https://i.pinimg.com/1200x/01/0c/b0/010cb090073f035fa373185818c839f4.jpg' },
  ];

  const cafes = [
    { id: 1, nombre: 'Espresso', tipo: 'Café', precio: 50, imagen: 'https://i.pinimg.com/736x/07/b7/e9/07b7e99bb01cca8732387d18919b2b4e.jpg', categoriaId: 1 },
    { id: 2, nombre: 'Latte', tipo: 'Café', precio: 70, imagen: 'https://i.pinimg.com/1200x/c4/73/7e/c4737e013a673e196416210867f9b1f8.jpg', categoriaId: 1 },
    { id: 3, nombre: 'Cappuccino', tipo: 'Café', precio: 65, imagen: 'https://i.pinimg.com/736x/b3/02/07/b3020720caef3e806115c550dc77ce03.jpg', categoriaId: 1 },
    { id: 4, nombre: 'Mocha', tipo: 'Café', precio: 80, imagen: 'https://i.pinimg.com/736x/07/b7/e9/07b7e99bb01cca8732387d18919b2b4e.jpg', categoriaId: 1 },
    { id: 5, nombre: 'Caramel Latte', tipo: 'Café', precio: 75, imagen: 'https://i.pinimg.com/1200x/c4/73/7e/c4737e013a673e196416210867f9b1f8.jpg', categoriaId: 1 },
  ];

  const renderCafe = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.cardImage} />
      <Text style={styles.cardNombre}>{item.nombre}</Text>
      <Text style={styles.cardTipo}>{item.tipo}</Text>
      <Text style={styles.cardPrecio}>${item.precio}</Text>
    </TouchableOpacity>
  );

  const cafesFiltrados = categoriaSeleccionada
    ? cafes.filter(cafe => cafe.categoriaId === categoriaSeleccionada)
    : cafes;

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={cafesFiltrados}
        renderItem={renderCafe}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={
          <>
            {/* Search bar */}
            <View style={styles.searchContainer}>
              <TextInput placeholder="Buscar" style={styles.searchInput} />
            </View>

            {/* Categorías con imágenes */}
            <Categoria categorias={categorias} onSelect={setCategoriaSeleccionada} />
          </>
        }
      />

      {/* NavBar */}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#d9c9a3',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 15,
    marginTop: 45,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff8f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#fff3e0',
    flex: 0.48,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4e342e',
    textAlign: 'center',
  },
  cardTipo: {
    fontSize: 12,
    color: '#7b5e57',
    marginVertical: 2,
  },
  cardPrecio: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c67c00',
  },
});
