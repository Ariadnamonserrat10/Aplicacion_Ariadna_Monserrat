const mysql = require('mysql2/promise');

// Tu configuración convertida a Node.js
const dbConfig = {
  host: 'localhost',           
  port: 3306,                  
  user: 'root',                
  password: 'Ariadnita1!',      
  database: 'cafeteria_db',   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Función para probar conexión (equivalente a show-sql)
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado a cafeteria_db como root');
    connection.release();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

module.exports = { pool, testConnection };