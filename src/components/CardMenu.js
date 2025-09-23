import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CardMenu({ nombre, descripcion, color, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 14,
    color: '#fff',
  },
});
