import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        {/* Campos de usuario y contraseña */}
        <Text style={styles.label}>Usuario:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su usuario"
          placeholderTextColor="#a67c52"
        />
        <Text style={styles.label}>Carreo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su Correo"
          placeholderTextColor="#a67c52"
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="*********"
          placeholderTextColor="#a67c52"
          secureTextEntry
        />

        {/* Botón de inicio */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate("Pantalla2")}
        >
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa947ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff8e1', 
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#533818ff', 
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#000000ff', 
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#724a0e5e', 
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#533720ff', 
    fontSize: 16,
  },
  loginButton: {
    marginTop: 25,
    backgroundColor: '#53380fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffffff', 
    fontWeight: 'bold',
    fontSize: 18,
  },
});
