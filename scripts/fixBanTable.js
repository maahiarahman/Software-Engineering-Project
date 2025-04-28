const db = require('../app/services/db');

async function fixPrimaryKey() {
  try {
    await db.query(`
      ALTER TABLE Banned_users 
      DROP PRIMARY KEY,
      MODIFY COLUMN ban_ID INT NOT NULL AUTO_INCREMENT,
      ADD PRIMARY KEY (ban_ID);
    `);
    console.log("✅ Primary key updated: ban_ID is now AUTO_INCREMENT and primary key.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing primary key:", error);
    process.exit(1);
  }
}

fixPrimaryKey();
