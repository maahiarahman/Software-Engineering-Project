const bcrypt = require('bcryptjs');

(async () => {
  const plainPassword = 'pass1word'; // <- put Jennifer's real password here
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log('New hashed password:', hashed);
})();
