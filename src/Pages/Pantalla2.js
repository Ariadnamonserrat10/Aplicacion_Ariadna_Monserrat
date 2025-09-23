import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';

export default function Pantalla2() {
  // Categorías
  const categorias = [
    { id: 1, nombre: 'Bebidas calientes', imagen: 'https://i.pinimg.com/736x/bb/f9/b1/bbf9b105eea8ba8d93548b34d1c21055.jpg' },
    { id: 2, nombre: 'Bebidas Frias', imagen: 'https://i.pinimg.com/736x/35/32/ca/3532ca198f8a6b74e9d11a1890bdf0fe.jpg' },
    { id: 3, nombre: 'Postres', imagen: 'https://i.pinimg.com/1200x/1e/d3/ae/1ed3aefb51f1221c12836c16686fbdb9.jpg' },
    { id: 4, nombre: 'Banderillas', imagen: 'https://i.pinimg.com/736x/05/42/34/054234392c66fb1246dbff5fdaac5004.jpg' },
    { id: 5, nombre: 'Pasteles', imagen: 'https://i.pinimg.com/736x/ef/74/46/ef7446f8afcdff724ebca09e01eca06e.jpg' },
    { id: 6, nombre: 'Sandwich', imagen: 'https://i.pinimg.com/1200x/01/0c/b0/010cb090073f035fa373185818c839f4.jpg' },
  ];

  // Cafés más populares
  const populares = [
    {
      id: 1,
      nombre: "Espresso",
      descripcion: "Café intenso y concentrado",
      ventas: 25,
      imagen: "https://i.pinimg.com/736x/07/b7/e9/07b7e99bb01cca8732387d18919b2b4e.jpg"
    },
    {
      id: 2,
      nombre: "Capuccino",
      descripcion: "Con espuma de leche cremosa",
      ventas: 18,
      imagen: "https://i.pinimg.com/736x/b3/02/07/b3020720caef3e806115c550dc77ce03.jpg"
    },
    {
      id: 3,
      nombre: "Latte",
      descripcion: "Suave con leche vaporizada",
      ventas: 32,
      imagen: "https://i.pinimg.com/1200x/c4/73/7e/c4737e013a673e196416210867f9b1f8.jpg"
    }
  ];

  // Función para manejar la navegación
  const handleNavigation = (itemId) => {
    console.log('Navegando a:', itemId);
    // Aquí puedes agregar tu lógica de navegación
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Imagen principal */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' }}
          style={styles.imagenPrincipal}
        />

        {/* Categorías */}
        <Text style={styles.seccionTitulo}>Categorías</Text>
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

        {/* Cafés más populares */}
        <Text style={styles.seccionTitulo}>Cafés Populares</Text>
        {populares.map(cafe => (
          <View key={cafe.id} style={styles.card}>
            <Image source={{ uri: cafe.imagen }} style={styles.imagenCard} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{cafe.nombre}</Text>
              <Text style={styles.descripcion}>{cafe.descripcion}</Text>
              <View style={styles.ventasBadge}>
                <Text style={styles.ventasTexto}>Ventas: {cafe.ventas}</Text>
              </View>
            </View>
          </View>
        ))}
        
        {/* Espacio adicional para que el contenido no quede oculto detrás del NavBar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* NavBar flotante */}
      <NavBar onNavigate={handleNavigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff8e7',
  },
  imagenPrincipal: {
    width: '100%',
    height: 220,
    marginBottom: 15
  },
  seccionTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4e342e',
    marginLeft: 15,
    marginBottom: 10
  },
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
  },
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
  },
  bottomSpacing: {
    height: 100, // Espacio para que el contenido no quede oculto detrás del NavBar
  }
});