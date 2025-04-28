const db = require('./app/services/db');

(async () => {
  try {
    const [rows] = await db.query('SHOW TABLES');
    console.log('✅ Connected to database. Tables:');
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
    process.exit(1);
  }
})();
