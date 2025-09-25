const express = require('express');
const router = express.Router();
const { pool } = require('../Config/Database'); // Conexión MySQL

// lista productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM inventario ORDER BY fecha_creacion DESC');
    
    // Convertir las imágenes BLOB a base64
    const itemsWithImages = rows.map(item => ({
      ...item,
      imagen: item.imagen ? `data:image/jpeg;base64,${item.imagen.toString('base64')}` : null
    }));
    
    res.json(itemsWithImages);
  } catch (error) {
    console.error('Error obteniendo inventario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// crear producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, imagen } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    // Convertir base64 a Buffer si hay imagen
    let imagenBuffer = null;
    if (imagen && imagen.startsWith('data:image/')) {
      const base64Data = imagen.replace(/^data:image\/[a-z]+;base64,/, '');
      imagenBuffer = Buffer.from(base64Data, 'base64');
    }

    const [result] = await pool.execute(
      'INSERT INTO inventario (nombre, descripcion, cantidad, imagen) VALUES (?, ?, ?, ?)',
      [nombre, descripcion || null, cantidad || 0, imagenBuffer]
    );

    res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cantidad, imagen, mantenerImagen } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    let query, params;
    
    if (imagen && imagen.startsWith('data:image/')) {
      // Si se envió una nueva imagen
      const base64Data = imagen.replace(/^data:image\/[a-z]+;base64,/, '');
      const imagenBuffer = Buffer.from(base64Data, 'base64');
      query = 'UPDATE inventario SET nombre = ?, descripcion = ?, cantidad = ?, imagen = ? WHERE id = ?';
      params = [nombre, descripcion, cantidad, imagenBuffer, id];
    } else if (mantenerImagen === 'false') {
      // Si se quiere eliminar la imagen
      query = 'UPDATE inventario SET nombre = ?, descripcion = ?, cantidad = ?, imagen = NULL WHERE id = ?';
      params = [nombre, descripcion, cantidad, id];
    } else {
      // Si se mantiene la imagen actual
      query = 'UPDATE inventario SET nombre = ?, descripcion = ?, cantidad = ? WHERE id = ?';
      params = [nombre, descripcion, cantidad, id];
    }

    const [result] = await pool.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM inventario WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;