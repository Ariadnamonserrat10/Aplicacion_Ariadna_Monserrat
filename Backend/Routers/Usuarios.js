const express = require('express');
const router = express.Router();
const { pool } = require('../Config/Database'); // conexión MySQL

// Ruta POST para login
router.post('/login', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if ((!nombre && !email) || !password) {
      return res.status(400).json({ error: 'Ingresa nombre o email y contraseña' });
    }

    // Consulta que busca por nombre o email
    const query = 'SELECT * FROM usuarios WHERE (nombre = ? OR email = ?) AND password = ?';
    const [rows] = await pool.query(query, [nombre || '', email || '', password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = rows[0];

    // Modificación: mensaje personalizado con el nombre del usuario
    res.json({ message: `Bienvenido ${user.nombre}`, user });
  } catch (error) {
    console.error('Error en login:', error); 
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
