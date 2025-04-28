const db = require('../services/db');

class User {
    static async authenticate(email, password) {
        try {
            const [users] = await db.query('SELECT * FROM users WHERE email = ? AND user_password = ?', [email, user_password]);
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Database Query Error:', error);
            throw error;
        }
    }
}

module.exports = User;

