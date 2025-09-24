const express = require('express');
const router = express.Router();
const { pool } = require('../Config/Database'); // Conexión MySQL

// GET /inventario → lista productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM inventario ORDER BY fecha_creacion DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo inventario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /inventario → crear producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, imagen_url } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    const [result] = await pool.execute(
      'INSERT INTO inventario (nombre, descripcion, cantidad, imagen_url) VALUES (?, ?, ?, ?)',
      [nombre, descripcion || null, cantidad || 0, imagen_url || null]
    );

    res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /inventario/:id → actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cantidad, imagen_url } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const [result] = await pool.execute(
      'UPDATE inventario SET nombre = ?, descripcion = ?, cantidad = ?, imagen_url = ? WHERE id = ?',
      [nombre, descripcion, cantidad, imagen_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /inventario/:id → eliminar producto
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
