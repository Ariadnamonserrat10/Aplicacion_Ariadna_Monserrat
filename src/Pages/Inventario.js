import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import NavBar from '../components/NavBar';
import axios from 'axios';

// 🔹 CONFIGURACIÓN DE LA API
const API_URL = 'http://192.168.20.153:3001/api/inventario'; 

export default function Inventario() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar datos al inicio
  useEffect(() => {
    fetchInventario();
  }, []);

  const fetchInventario = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error al obtener inventario:', error);
      Alert.alert('Error', 'No se pudo cargar el inventario');
    } finally {
      setLoading(false);
    }
  };

  const agregarProducto = async () => {
    // VALIDACIONES
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre del producto es requerido');
      return;
    }

    if (cantidad && parseInt(cantidad) < 0) {
      Alert.alert('Error', 'La cantidad no puede ser negativa');
      return;
    }

    try {
      setLoading(true);
      
      //  ENVIAR DATOS CORRECTOS
      const response = await axios.post(API_URL, {
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || null,
        cantidad: parseInt(cantidad) || 0,
        imagen_url: imagen.trim() || null, 
      });

      // ÉXITO
      Alert.alert('Éxito', 'Producto agregado correctamente');
      
      // REFRESCAR LISTA COMPLETA (más confiable)
      await fetchInventario();

      // LIMPIAR INPUTS
      setNombre('');
      setDescripcion('');
      setCantidad('');
      setImagen('');

    } catch (error) {
      console.error('Error al agregar producto:', error);
      Alert.alert(
        'Error', 
        error.response?.data?.error || 'No se pudo agregar el producto'
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 NUEVA FUNCIÓN: Eliminar producto
  const eliminarProducto = async (id, nombre) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(`${API_URL}/${id}`);
              Alert.alert('Éxito', 'Producto eliminado correctamente');
              await fetchInventario(); // Refrescar lista
            } catch (error) {
              console.error('Error al eliminar producto:', error);
              Alert.alert('Error', 'No se pudo eliminar el producto');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Inventario</Text>

      {/* Sección de agregar item */}
      <View style={styles.addContainer}>
        <TextInput 
          placeholder="Nombre del producto *" 
          style={styles.input} 
          value={nombre} 
          onChangeText={setNombre}
          editable={!loading}
        />
        <TextInput 
          placeholder="Descripción" 
          style={styles.input} 
          value={descripcion} 
          onChangeText={setDescripcion}
          multiline
          editable={!loading}
        />
        <TextInput 
          placeholder="Cantidad" 
          style={styles.input} 
          keyboardType="numeric" 
          value={cantidad} 
          onChangeText={setCantidad}
          editable={!loading}
        />
        <TextInput 
          placeholder="URL de la imagen" 
          style={styles.input} 
          keyboardType="url" 
          value={imagen} 
          onChangeText={setImagen}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.addButton, loading && styles.addButtonDisabled]} 
          onPress={agregarProducto}
          disabled={loading}
        >
          <Text style={styles.addButtonText}>
            {loading ? 'Agregando...' : 'Agregar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput placeholder="Buscar producto..." style={styles.searchInput} />

      {/* MOSTRAR ESTADO DE CARGA */}
      {loading && <Text style={styles.loadingText}>Cargando...</Text>}

      {/* Lista de items en scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.length === 0 && !loading ? (
          <Text style={styles.emptyText}>No hay productos en el inventario</Text>
        ) : (
          items.map(item => (
            <View key={item.id} style={styles.item}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.nombre}</Text>
                {item.descripcion && (
                  <Text style={styles.itemDescription}>{item.descripcion}</Text>
                )}
                <Text style={styles.itemQuantity}>Cantidad: {item.cantidad}</Text>
              </View>
              
              {/*BOTONES DE ACCIÓN */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => eliminarProducto(item.id, item.nombre)}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* NavBar */}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff8e7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4e342e',
    marginBottom: 20,
    textAlign: 'center',
  },
  addContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4e342e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#583506ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#4e342e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    color: '#4e342e',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c4b3d',
    marginTop: 20,
    fontStyle: 'italic',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  item: {
    backgroundColor: '#f5e1c6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#4e342e',
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6c4b3d',
    marginTop: 2,
    fontStyle: 'italic',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6c4b3d',
    marginTop: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#f0a500',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d62828',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});