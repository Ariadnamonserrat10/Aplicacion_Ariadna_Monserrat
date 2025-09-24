// src/Pages/Inventario.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';

export default function Inventario() {

  const items = [
    { id: '1', nombre: 'Café', cantidad: 10 },
    { id: '2', nombre: 'Té', cantidad: 5 },
    { id: '3', nombre: 'Azúcar', cantidad: 20 },
    { id: '4', nombre: 'Leche', cantidad: 15 },
    { id: '5', nombre: 'Chocolate', cantidad: 8 },
    { id: '6', nombre: 'Pan', cantidad: 12 },
    { id: '7', nombre: 'Mantequilla', cantidad: 7 },
    { id: '8', nombre: 'Miel', cantidad: 9 },
    { id: '9', nombre: 'Galletas', cantidad: 25 },
    { id: '10', nombre: 'Jugo', cantidad: 18 },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Inventario</Text>

      {/* Sección de agregar item */}
      <View style={styles.addContainer}>
        <TextInput placeholder="Nombre del producto" style={styles.input} />
        <TextInput placeholder="Descripción" style={styles.input} />
        <TextInput placeholder="Cantidad" style={styles.input} keyboardType="numeric" />
        <TextInput placeholder="URL de la imagen" style={styles.input} keyboardType="url"/>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput placeholder="Buscar producto..." style={styles.searchInput} />

      {/* Lista de items en scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemQuantity}>Cantidad: {item.cantidad}</Text>
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
  itemQuantity: {
    fontSize: 14,
    color: '#6c4b3d',
    marginTop: 5,
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
