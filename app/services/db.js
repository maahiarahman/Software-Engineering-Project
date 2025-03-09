require("dotenv").config();
const mysql = require('mysql2/promise');

const config = {
  db: {
    host: process.env.MYSQL_HOST || "db",  // ✅ Ensure MySQL connects via the container name "db"
    port: process.env.DB_PORT || 3306, 
    user: process.env.MYSQL_ROOT_USER || "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "sd2-db",
    waitForConnections: true,
    connectionLimit: 10,  // ✅ Increase pool size for better performance
    queueLimit: 0,
    socketPath: null  // ✅ Explicitly disable Unix socket usage
  },
};

const pool = mysql.createPool(config.db);

// Utility function to query the database
async function query(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error("❌ Database Query Error:", err.message);
    throw err;
  }
}

module.exports = { query };
