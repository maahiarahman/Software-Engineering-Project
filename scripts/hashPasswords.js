// scripts/hashpasswords.js

const bcrypt = require('bcryptjs');
const db = require('../app/services/db'); // Adjust if needed

// ✅ Admin details
const adminID = 7;
const name = 'johnny depp';
const email = 'jonneydepp90s@gmail.com';
const plainPassword = 'Admin7-$%&%$';

async function updateOrInsertAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Check if admin_ID 2 already exists
    const [existing] = await db.query(
      'SELECT * FROM Admin_info WHERE admin_ID = ?',
      [adminID]
    );

    if (existing.length > 0) {
      // ✅ Update existing admin
      await db.query(
        'UPDATE Admin_info SET name = ?, email = ?, password = ? WHERE admin_ID = ?',
        [name, email, hashedPassword, adminID]
      );
      console.log(`🔁 Updated admin with ID ${adminID}`);
    } else {
      // ✅ Insert new admin with specific ID
      await db.query(
        'INSERT INTO Admin_info (admin_ID, name, email, password) VALUES (?, ?, ?, ?)',
        [adminID, name, email, hashedPassword]
      );
      console.log(`✅ Inserted new admin with ID ${adminID}`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message || error);
  } finally {
    process.exit();
  }
}

updateOrInsertAdmin();
