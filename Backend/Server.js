const express = require('express');
const cors = require('cors');
const { testConnection } = require('./Config/Database');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Probar conexión
testConnection();

// Rutas
const inventarioRoutes = require('./Routers/Inventario');
app.use('/inventario', inventarioRoutes);

const categoriasRoutes = require('./Routers/Categorias');
app.use('/categorias', categoriasRoutes);

const usuariosRoutes = require('./Routers/Usuarios');
app.use('/usuarios', usuariosRoutes);


// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
