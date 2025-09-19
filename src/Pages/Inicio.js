import React, { useReducer, createContext, useContext } from 'react';
import { StyleSheet, View, Text, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Cardinfo from '../components/Cardinfo';

// Contexto y reducer para el color de fondo
const ColorContext = createContext();
const reducer = (state, action) => {
  switch(action.type){
    case 'CAMBIAR_COLOR':
      return { color: '#' + Math.floor(Math.random()*16777215).toString(16) };
    default:
      return state;
  }
}

// Botón para cambiar color usando context
function BotonCambiarColor() {
  const { dispatch } = useContext(ColorContext);
  return (
    <TouchableOpacity 
      style={styles.colorButton} 
      onPress={() => dispatch({ type: 'CAMBIAR_COLOR' })}
    >
      <Text style={styles.colorButtonText}>Cambiar Fondo</Text>
    </TouchableOpacity>
  );
}

const Inicio = () => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, { color: '#cfaecfff' });

  return (
    <ColorContext.Provider value={{ state, dispatch }}>
      <View style={[styles.main, { backgroundColor: state.color }]}>

        {/* AppBar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Principal")}>
            <FontAwesome name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Ariadna</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Botón justo debajo del AppBar */}
        <View style={styles.actionContainer}>
          <BotonCambiarColor />
        </View>

        {/* Card info */}
        <View style={{ marginTop: 20 }}>
          <Cardinfo />
        </View>

        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navItem}>
            <FontAwesome name="home" size={20} color="#000" />
            <Text style={styles.navText}>Inicio</Text>
          </View>
          <View style={styles.navItem}>
            <FontAwesome name="search" size={20} />
            <Text style={styles.navText}>Buscar</Text>
          </View>
          <View style={styles.navItem}>
            <FontAwesome name="user" size={20} />
            <Text style={styles.navText}>Perfil</Text>
          </View>
          <View style={styles.navItem}>
            <FontAwesome name="gear" size={20} />
            <Text style={styles.navText}>Configuración</Text>
          </View>
        </View>
      </View>
    </ColorContext.Provider>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  appBar: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'cursive',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  actionContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    alignSelf: 'flex-start', // lo hace alineado a la izquierda
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.3,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#58113bff',
    marginTop: 4,
  },
  colorButton: {
    backgroundColor: '#6b104dff',
    padding: 10,
    borderRadius: 10,
  },
  colorButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
