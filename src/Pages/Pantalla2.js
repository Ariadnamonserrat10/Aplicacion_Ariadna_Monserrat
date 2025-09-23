import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import Categoria from '../components/Categorias';
import CardInfo from '../components/Cardinfo';

export default function Pantalla2() {
  const categorias = [
    { id: 1, nombre: 'Bebidas calientes', imagen: 'https://i.pinimg.com/736x/bb/f9/b1/bbf9b105eea8ba8d93548b34d1c21055.jpg' },
    { id: 2, nombre: 'Bebidas Frias', imagen: 'https://i.pinimg.com/736x/35/32/ca/3532ca198f8a6b74e9d11a1890bdf0fe.jpg' },
    { id: 3, nombre: 'Postres', imagen: 'https://i.pinimg.com/1200x/1e/d3/ae/1ed3aefb51f1221c12836c16686fbdb9.jpg' },
    { id: 4, nombre: 'Banderillas', imagen: 'https://i.pinimg.com/736x/05/42/34/054234392c66fb1246dbff5fdaac5004.jpg' },
    { id: 5, nombre: 'Pasteles', imagen: 'https://i.pinimg.com/736x/ef/74/46/ef7446f8afcdff724ebca09e01eca06e.jpg' },
    { id: 6, nombre: 'Sandwich', imagen: 'https://i.pinimg.com/1200x/01/0c/b0/010cb090073f035fa373185818c839f4.jpg' },
  ];

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

  const handleNavigation = (itemId) => {
    console.log('Navegando a:', itemId);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' }}
          style={styles.imagenPrincipal}
        />

        <Text style={styles.seccionTitulo}>Categorías</Text>
        <Categoria categorias={categorias} />

        <Text style={styles.seccionTitulo}>Cafés Populares</Text>
        {populares.map(cafe => (
          <CardInfo key={cafe.id} cafe={cafe} />
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <NavBar onNavigate={handleNavigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:
  {
    flex: 1
  },
  container:
  {
    flex: 1,
    backgroundColor: '#fff8e7'
  },
  imagenPrincipal:
  {
    width: '100%',
    height: 220,
    marginBottom: 15
  },
  seccionTitulo:
  {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4e342e',
    marginLeft: 15,
    marginBottom: 10
  },
  bottomSpacing:
  {
    height: 100
  }
});
