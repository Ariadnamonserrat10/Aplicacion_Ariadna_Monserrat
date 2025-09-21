import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Inicio() {
  const [rol, setRol] = useState('Alumno'); // Alumno o Docente

  const handleLogin = () => {
    console.log('Rol seleccionado:', rol);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        {/* Selección de rol */}
        <View style={styles.rolContainer}>
          <TouchableOpacity 
            style={[styles.rolButton, rol === 'Alumno' && styles.rolSelected]} 
            onPress={() => setRol('Alumno')}
          >
            <Text style={styles.rolText}>Alumno</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.rolButton, rol === 'Docente' && styles.rolSelected]} 
            onPress={() => setRol('Docente')}
          >
            <Text style={styles.rolText}>Docente</Text>
          </TouchableOpacity>
        </View>

        {/* Campos de usuario y contraseña */}
        <Text style={styles.label}>Usuario:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su usuario"
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="*********"
          secureTextEntry
        />

        {/* Botón de inicio */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
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
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#003366',
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
  },
  rolContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rolButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    backgroundColor: '#99c2ff',
    marginHorizontal: 10,
  },
  rolSelected: {
    backgroundColor: '#3366ff',
  },
  rolText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#cce0ff',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#003366',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 25,
    backgroundColor: '#3366ff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
