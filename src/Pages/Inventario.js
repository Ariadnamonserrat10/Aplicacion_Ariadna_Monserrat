import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import NavBar from '../components/NavBar';
import axios from 'axios';

// URL de la API
const API_URL = 'http://192.168.0.107:3001/inventario';

export default function Inventario() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [eliminarImagen, setEliminarImagen] = useState(false);

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

  const seleccionarImagen = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true, // importante para enviar base64
    });

    if (!result.canceled) {
      setImagenSeleccionada(result.assets[0]);
      setEliminarImagen(false);
    }
  };

  const tomarFoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para usar la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImagenSeleccionada(result.assets[0]);
      setEliminarImagen(false);
    }
  };

  const mostrarOpcionesImagen = () => {
    Alert.alert(
      'Seleccionar Imagen',
      'Elige una opción:',
      [
        { text: 'Galería', onPress: seleccionarImagen },
        { text: 'Cámara', onPress: tomarFoto },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setCantidad('');
    setImagenSeleccionada(null);
    setEliminarImagen(false);
  };

  const agregarProducto = async () => {
    if (!nombre.trim()) return Alert.alert('Error', 'El nombre del producto es requerido');
    if (cantidad && parseInt(cantidad) < 0) return Alert.alert('Error', 'La cantidad no puede ser negativa');

    try {
      setLoading(true);
      await axios.post(API_URL, {
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || '',
        cantidad: parseInt(cantidad) || 0,
        imagen: imagenSeleccionada ? `data:image/jpeg;base64,${imagenSeleccionada.base64}` : null
      });

      Alert.alert('Éxito', 'Producto agregado correctamente');
      limpiarFormulario();
      await fetchInventario();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      Alert.alert('Error', error.response?.data?.error || 'No se pudo agregar el producto');
    } finally {
      setLoading(false);
    }
  };

  const abrirEditar = (item) => {
    setEditId(item.id);
    setNombre(item.nombre);
    setDescripcion(item.descripcion || '');
    setCantidad(item.cantidad.toString());
    setImagenSeleccionada(item.imagen ? { uri: item.imagen } : null);
    setEliminarImagen(false);
    setEditModalVisible(true);
  };

  const guardarEdicion = async () => {
    if (!nombre.trim()) return Alert.alert('Error', 'El nombre del producto es requerido');

    try {
      setLoading(true);

      await axios.put(`${API_URL}/${editId}`, {
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || '',
        cantidad: parseInt(cantidad) || 0,
        imagen: imagenSeleccionada?.base64 ? `data:image/jpeg;base64,${imagenSeleccionada.base64}` : null,
        mantenerImagen: eliminarImagen ? 'false' : 'true',
      });

      Alert.alert('Éxito', 'Producto actualizado correctamente');
      setEditModalVisible(false);
      limpiarFormulario();
      await fetchInventario();
    } catch (error) {
      console.error('Error al actualizar:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id, nombre) => {
    Alert.alert('Confirmar eliminación', `¿Eliminar "${nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: async () => {
          try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            Alert.alert('Éxito', 'Producto eliminado correctamente');
            await fetchInventario();
          } catch (error) {
            console.error('Error al eliminar:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto');
          } finally { setLoading(false); }
        }
      }
    ]);
  };

  const eliminarImagenSeleccionada = () => {
    setImagenSeleccionada(null);
    setEliminarImagen(true);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Inventario</Text>

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

        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={mostrarOpcionesImagen} disabled={loading}>
            <Text style={styles.imageButtonText}>
              {imagenSeleccionada ? 'Cambiar imagen' : 'Seleccionar imagen'}
            </Text>
          </TouchableOpacity>

          {imagenSeleccionada && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: imagenSeleccionada.uri }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeImageButton} onPress={eliminarImagenSeleccionada}>
                <Text style={styles.removeImageText}>✕ Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.addButton, loading && styles.addButtonDisabled]}
          onPress={agregarProducto}
          disabled={loading}
        >
          <Text style={styles.addButtonText}>{loading ? 'Procesando...' : 'Agregar'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.length === 0 && !loading ? (
          <Text style={styles.emptyText}>No hay productos en el inventario</Text>
        ) : (
          items.map(item => (
            <View key={item.id} style={styles.item}>
              <View style={styles.itemHeader}>
                {item.imagen && <Image source={{ uri: item.imagen }} style={styles.itemImage} />}
                <View style={styles.itemContent}>
                  <Text style={styles.itemText}>{item.nombre}</Text>
                  {item.descripcion && <Text style={styles.itemDescription}>{item.descripcion}</Text>}
                  <Text style={styles.itemQuantity}>Cantidad: {item.cantidad}</Text>
                </View>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.editButton} onPress={() => abrirEditar(item)} disabled={loading}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarProducto(item.id, item.nombre)} disabled={loading}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal de edición */}
      <Modal animationType="slide" transparent visible={editModalVisible} onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Producto</Text>

            <TextInput placeholder="Nombre del producto *" style={styles.input} value={nombre} onChangeText={setNombre} editable={!loading} />
            <TextInput placeholder="Descripción" style={styles.input} value={descripcion} onChangeText={setDescripcion} multiline editable={!loading} />
            <TextInput placeholder="Cantidad" style={styles.input} keyboardType="numeric" value={cantidad} onChangeText={setCantidad} editable={!loading} />

            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={mostrarOpcionesImagen} disabled={loading}>
                <Text style={styles.imageButtonText}>Cambiar imagen</Text>
              </TouchableOpacity>
              {imagenSeleccionada && (
                <View style={styles.imagePreview}>
                  <Image source={{ uri: imagenSeleccionada.uri }} style={styles.previewImage} />
                  <TouchableOpacity style={styles.removeImageButton} onPress={eliminarImagenSeleccionada}>
                    <Text style={styles.removeImageText}>✕ Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setEditModalVisible(false); limpiarFormulario(); }}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveButton, loading && styles.addButtonDisabled]} onPress={guardarEdicion} disabled={loading}>
                <Text style={styles.saveButtonText}>{loading ? 'Guardando...' : 'Guardar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <NavBar />
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper:
  {
    flex: 1,
    backgroundColor: '#fff8e7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title:
  {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4e342e',
    marginBottom: 20,
    textAlign: 'center',
  },
  addContainer:
  {
    marginBottom: 15,
  },
  input:
  {
    borderWidth: 1,
    borderColor: '#4e342e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  imageContainer:
  {
    marginBottom: 10,
  },
  imageButton:
  {
    backgroundColor: '#8d6e63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText:
  {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  imagePreview:
  {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  previewImage:
  {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#4e342e',
  },
  removeImageButton:
  {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  removeImageText:
  {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  addButton:
  {
    backgroundColor: '#583506ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled:
  {
    backgroundColor: '#a0a0a0',
  },
  addButtonText:
  {
    color: '#fff',
    fontWeight: '600',
  },
  scrollContainer:
  {
    paddingBottom: 100,
  },

  item:
  {
    backgroundColor: '#f5e1c6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemHeader:
  {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemImage:
  {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#4e342e',
  },
  itemContent:
  {
    flex: 1,
  },
  itemText:
  {
    fontSize: 16,
    color: '#4e342e',
    fontWeight: '600'
  },
  itemDescription:
  {
    fontSize: 14,
    color: '#6c4b3d',
    marginTop: 2,
    fontStyle: 'italic'
  },
  itemQuantity:
  {
    fontSize: 14,
    color: '#6c4b3d',
    marginTop: 5
  },
  buttons:
  {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  editButton:
  {
    backgroundColor: '#f0a500',
    padding: 8,
    borderRadius: 5,
    marginRight: 10
  },
  deleteButton:
  {
    backgroundColor: '#d62828',
    padding: 8,
    borderRadius: 5
  },
  buttonText:
  {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12
  },
  emptyText:
  {
    textAlign: 'center',
    color: '#6c4b3d',
    marginTop: 20,
    fontStyle: 'italic'
  },

  modalOverlay:
  {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent:
  {
    backgroundColor: '#fff8e7',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'stretch',
    width: '90%',
    maxHeight: '80%'
  },
  modalTitle:
  {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4e342e',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtons:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cancelButton:
  {
    backgroundColor: '#757575',
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center'
  },
  saveButton:
  {
    backgroundColor: '#583506ff',
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center'
  },
  cancelButtonText:
  {
    color: '#fff',
    fontWeight: '600'
  },
  saveButtonText:
  {
    color: '#fff',
    fontWeight: '600'
  },
});
