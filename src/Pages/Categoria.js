// src/Pages/Categoria.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';

export default function Categoria() {
  // Datos de ejemplo para mostrar en el diseño
  const categorias = [
    { id: '1', nombre: 'Bebidas calientes' },
    { id: '2', nombre: 'Bebidas frías' },
    { id: '3', nombre: 'Postres' },
    { id: '4', nombre: 'Sandwiches' },
    { id: '5', nombre: 'Ensaladas' },
    { id: '6', nombre: 'Snacks' },
    { id: '7', nombre: 'Helados' },
    { id: '8', nombre: 'Panadería' },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Categorías</Text>

      {/* Sección de agregar categoría */}
      <View style={styles.addContainer}>
        <TextInput placeholder="Nombre de la categoría" style={styles.input} />
        <TextInput placeholder="Descripción" style={styles.input} />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput placeholder="Buscar categoría..." style={styles.searchInput} />

      {/* Lista de categorías */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categorias.map(cat => (
          <View key={cat.id} style={styles.item}>
            <Text style={styles.itemText}>{cat.nombre}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* NavBar */}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff8e7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4e342e',
    marginBottom: 20,
    textAlign: 'center',
  },
  addContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4e342e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#583506ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#4e342e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100, // Para que no tape el NavBar
  },
  item: {
    backgroundColor: '#f5e1c6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#4e342e',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#f0a500',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d62828',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
