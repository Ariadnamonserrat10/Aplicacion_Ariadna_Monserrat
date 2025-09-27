import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Inicio() {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if ((!nombre && !email) || !password) {
      Alert.alert('Error', 'Ingresa nombre o correo y la contraseña');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://10.176.146.46:3001/usuarios/login', {
        nombre,
        email,
        password
      });

      Alert.alert('Éxito', response.data.message);
      navigation.navigate('Pantalla2', { user: response.data.user });
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Inicio de Sesión</Text>

            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre"
              placeholderTextColor="#a67c52"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Correo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su correo"
              placeholderTextColor="#a67c52"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="*********"
              placeholderTextColor="#a67c52"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa947ff',
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
