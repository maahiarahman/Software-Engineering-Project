const db = require('../services/db');
const bcrypt = require('bcryptjs');

// ✅ REGISTER a new user
exports.register = async (req, res) => {
    const { first_name, last_name, email, password, date_of_birth, age } = req.body;

    try {
        const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.send('User already exists. Please login instead.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (first_name, last_name, email, date_of_birth, age, user_password) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, date_of_birth, age, hashedPassword]
        );

        res.send({
            message: 'Registration successful! You can now login.',
            userID: result.insertId
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user.');
    }
};

// ✅ LOGIN user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).send('Invalid email or password. (No user found)');
        }

        if (!user.user_password) {
            console.error('⚠️ User record found but password is undefined:', user);
            return res.status(401).send('Invalid email or password. (Missing password)');
        }

        const isMatch = await bcrypt.compare(password, user.user_password);

        if (!isMatch) {
            return res.status(401).send('Invalid email or password.');
        }

        req.session.user = {
            id: user.user_ID,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`
        };
        console.log("Logged in user:", req.session.user); // Add this log to confirm user session data

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in.');
    }
};
