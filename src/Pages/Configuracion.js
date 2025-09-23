import React, { createContext, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
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

  const handleLogout = () => {
    console.log('Cerrar sesión');
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: darkMode ? '#2c2c2c' : '#fff8e7' }]}>
      <ScrollView style={styles.container}>
        {/* Perfil */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#4e342e' }]}>Perfil</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Notificaciones */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#4e342e' }]}>Notificaciones</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Configurar Notificaciones</Text>
          </TouchableOpacity>
        </View>

        {/* Tema */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#4e342e' }]}>Tema</Text>
          <TouchableOpacity style={styles.button} onPress={toggleTheme}>
            <Text style={styles.buttonText}>
              Cambiar a {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: darkMode ? '#ff7043' : '#ff8c42' }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
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
    flex: 1
  },
  container: {
    flex: 1
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 20,
    marginTop: 55,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: {
    padding: 12,
    backgroundColor: '#f0c27b',
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#4e342e',
    fontWeight: '600'
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  bottomSpacing: {
    height: 100
  }
});
