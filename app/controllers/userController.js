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
      req.flash('error', 'Email not found.');
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.user_password);

    if (!isMatch) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/login');
    }

    req.session.user = {
      id: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login Error:', error);
    req.flash('error', 'Something went wrong.');
    res.redirect('/login');
  }
};
///login ffor admin
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [adminRows] = await db.query('SELECT * FROM Admin_info WHERE email = ?', [email]);
    const admin = adminRows[0];

    if (!admin) {
      return res.status(401).send('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password.');
    }

    req.session.admin = {
      id: admin.admin_ID,
      name: admin.name,
      email: admin.email
    };
    

    res.redirect('/admin');
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).send('Error logging in.');
  }
};
// User Dashboard/Profile
exports.getUserDashboard = async (req, res) => {
  const userID = req.session.user?.id;
  if (!userID) return res.redirect('/login');

  const [[user]] = await db.query('SELECT * FROM users WHERE user_id = ?', [userID]);
  const [recipes] = await db.query('SELECT * FROM recipes WHERE user_id = ?', [userID]);
  const [reviews] = await db.query('SELECT * FROM reviews WHERE user_id = ?', [userID]);
  const [posts] = await db.query('SELECT * FROM posts WHERE user_id = ?', [userID]);
  const [swaps] = await db.query('SELECT * FROM swaps WHERE user_id = ?', [userID]);

  res.render('user-profile', {
    user,
    recipes,
    reviews,
    posts,
    swaps,
    isAdmin: !!req.session.admin
  });
};
