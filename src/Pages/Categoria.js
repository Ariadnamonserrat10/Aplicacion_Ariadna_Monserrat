import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import NavBar from '../components/NavBar';

const API_URL = 'http://192.168.0.107:3001/categorias';

export default function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCategorias(); }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCategorias(response.data);
    } catch (error) {
      console.error('Error obteniendo categorías:', error);
      Alert.alert('Error', 'No se pudo cargar las categorías');
    } finally { setLoading(false); }
  };

  const seleccionarImagen = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la galería');

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1,1], quality: 0.7 });
    if (!result.canceled) setImagen(result.assets[0]);
  };

  const limpiarFormulario = () => { setNombre(''); setDescripcion(''); setImagen(null); setEditId(null); };

  const handleGuardar = async () => {
    if (!nombre.trim()) return Alert.alert('Error', 'El nombre es requerido');
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('nombre', nombre.trim());
      formData.append('descripcion', descripcion.trim());
      if (imagen?.uri) {
        formData.append('imagen', {
          uri: imagen.uri,
          type: 'image/jpeg',
          name: 'categoria.jpg'
        });
      }

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        Alert.alert('Éxito', 'Categoría actualizada');
      } else {
        await axios.post(API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        Alert.alert('Éxito', 'Categoría agregada');
      }

      limpiarFormulario();
      fetchCategorias();
    } catch (error) {
      console.error('Error guardando categoría:', error);
      Alert.alert('Error', 'No se pudo guardar la categoría');
    } finally { setLoading(false); }
  };

  const handleEditar = (categoria) => {
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion || '');
    setImagen(categoria.imagen ? { uri: `data:image/jpeg;base64,${categoria.imagen}` } : null);
    setEditId(categoria.id);
  };

  const handleEliminar = (id) => {
    Alert.alert('Confirmar eliminación', '¿Deseas eliminar esta categoría?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => { await axios.delete(`${API_URL}/${id}`); fetchCategorias(); } }
    ]);
  };

  const categoriasFiltradas = categorias.filter(cat => cat.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Categorías</Text>

      <View style={{ marginBottom: 15 }}>
        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
        <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
        <TouchableOpacity onPress={seleccionarImagen} style={{ backgroundColor: '#583506', padding: 12, borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#fff' }}>{imagen ? 'Imagen seleccionada' : 'Seleccionar imagen'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGuardar} style={{ backgroundColor: '#583506', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: '#fff' }}>{editId ? 'Guardar cambios' : 'Agregar'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput placeholder="Buscar..." value={busqueda} onChangeText={setBusqueda} style={{ borderWidth: 1, padding: 10, marginBottom: 15 }} />

      <ScrollView>
        {categoriasFiltradas.map(cat => (
          <View key={cat.id} style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#f5e1c6', padding: 15, borderRadius: 8, alignItems: 'center' }}>
            {cat.imagen && <Image source={{ uri: `data:image/jpeg;base64,${cat.imagen}` }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />}
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{cat.nombre}</Text>
              <Text>{cat.descripcion}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEditar(cat)} style={{ backgroundColor: '#f0a500', padding: 8, borderRadius: 5, marginRight: 10 }}>
                <Text style={{ color: '#fff' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEliminar(cat.id)} style={{ backgroundColor: '#d62828', padding: 8, borderRadius: 5 }}>
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

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
  scrollContainer: {
    paddingBottom: 100, // Para que no tape el NavBar
  },
  item: {
    backgroundColor: '#f5e1c6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#4e342e',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
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
  },
});
