const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_CONTAINER || 'db',         // ✅ Must match docker service name
  port: process.env.DB_PORT || 3306,
  user: process.env.MYSQL_ROOT_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'nom_nom',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
