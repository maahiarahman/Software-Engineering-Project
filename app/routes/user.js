const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Auth
router.get('/register', (req, res) => res.render('register'));
router.post('/register', userController.register);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', userController.login);

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Profile/Dashboard
router.get('/dashboard', userController.getUserDashboard);

module.exports = router;
