import React, { createContext, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/NavBar';

// --- CONTEXTO: TemaConf ---
export const TemaConf = createContext();

const TemaProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log('Tema actualizado:', darkMode ? 'Oscuro' : 'Claro');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <TemaConf.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </TemaConf.Provider>
  );
};

// --- PANTALLA CONFIGURACIÓN ---
const Configuracion = () => {
  const { darkMode, toggleTheme } = useContext(TemaConf);
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Principal'); // Navega a la pantalla Principal
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: darkMode ? '#1e1e1e' : '#fff8e7' }]}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* PERFIL */}
        <View style={[styles.section, styles.profileSection, { backgroundColor: darkMode ? '#2c2c2c' : '#fff3e0' }]}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/8f/a8/18/8fa8184a71f1ee865ac8e1ca3d2cfcf7.jpg' }}
            style={styles.profileImage}
          />
          <Text style={[styles.profileName, { color: darkMode ? '#fff' : '#4e342e' }]}>Ariadna Aparicio</Text>
          <Text style={[styles.profileEmail, { color: darkMode ? '#ccc' : '#7b5e57' }]}>ariadna@example.com</Text>
          <TouchableOpacity style={[styles.button, { marginTop: 15 }]}>
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* NOTIFICACIONES */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#4e342e' }]}>Notificaciones</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Configurar Notificaciones</Text>
          </TouchableOpacity>
        </View>

        {/* TEMA */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#4e342e' }]}>Tema</Text>
          <TouchableOpacity style={styles.button} onPress={toggleTheme}>
            <Text style={styles.buttonText}>
              Cambiar a {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CERRAR SESIÓN */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: darkMode ? '#ff7043' : '#ff8c42' }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <NavBar />
    </View>
  );
};

export default function ConfiguracionConTema() {
  return (
    <TemaProvider>
      <Configuracion />
    </TemaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 45,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    padding: 12,
    backgroundColor: '#f0c27b',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4e342e',
    fontWeight: '600',
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
