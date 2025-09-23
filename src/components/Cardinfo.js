import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Cardinfo({ cafe }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: cafe.imagen }} style={styles.imagenCard} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{cafe.nombre}</Text>
        <Text style={styles.descripcion}>{cafe.descripcion}</Text>
        <View style={styles.ventasBadge}>
          <Text style={styles.ventasTexto}>Ventas: {cafe.ventas}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff3e0",
    borderRadius: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5
  },
  imagenCard: {
    width: "100%",
    height: 180
  },
  info: {
    padding: 15
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4e342e",
    marginBottom: 5
  },
  descripcion: {
    fontSize: 14,
    color: "#6d4c41",
    marginBottom: 10
  },
  ventasBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ff9800",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15
  },
  ventasTexto: {
    fontWeight: "bold",
    color: "#fff"
  }
});
