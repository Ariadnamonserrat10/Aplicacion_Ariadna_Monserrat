const express = require('express');
const router = express.Router();
const multer = require('multer');
const { pool } = require('../Config/Database'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Crear categoría
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const imagen = req.file ? req.file.buffer : null;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const [result] = await pool.query(
      'INSERT INTO categorias (nombre, descripcion, imagen) VALUES (?, ?, ?)',
      [nombre, descripcion, imagen]
    );

    res.json({ id: result.insertId, nombre, descripcion });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');

    const categorias = rows.map(row => ({
      ...row,
      imagen: row.imagen ? row.imagen.toString('base64') : null
    }));

    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

// Actualizar categoría
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const imagen = req.file ? req.file.buffer : null;

    if (imagen) {
      await pool.query(
        'UPDATE categorias SET nombre = ?, descripcion = ?, imagen = ? WHERE id = ?',
        [nombre, descripcion, imagen, id]
      );
    } else {
      await pool.query(
        'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion, id]
      );
    }

    res.json({ id, nombre, descripcion });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

module.exports = router;
