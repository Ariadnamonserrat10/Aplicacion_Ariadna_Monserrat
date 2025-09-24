const express = require('express');
const cors = require('cors');
const { testConnection } = require('./Config/Database');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Probar conexión
testConnection();

// Rutas → monta el router
const inventarioRoutes = require('./Routers/Inventario');
app.use('/inventario', inventarioRoutes);

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
