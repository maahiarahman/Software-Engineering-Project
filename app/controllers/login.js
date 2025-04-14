const bcrypt = require('bcrypt');

// Assuming you already extracted email and password
const email = req.body.email;
const enteredPassword = req.body.password;

const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

if (user.rows.length > 0) {
  const userFromDb = user.rows[0];
  const match = await bcrypt.compare(enteredPassword, userFromDb.user_password);

  if (match) {
    // ✅ Password correct – log the user in
    req.session.user = userFromDb;
    res.redirect('/dashboard'); // or wherever
  } else {
    res.send('❌ Incorrect password.');
  }
} else {
  res.send('❌ No user with that email.');
}
