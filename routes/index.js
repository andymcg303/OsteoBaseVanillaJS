const express = require('express');
const { asyncErrorHandler } = require('../middleware');
const { postRegister, postLogin, getLogout } = require('../controllers');

const router = express.Router();

// Root Landing Page ie login
router.get('/', (req, res) => res.render('login'));

// Show Login Form
router.get('/login', (req, res) => res.render('login'));

// Show Sign Up Form
router.get('/signup', (req, res) => res.render('signup'));

// Handle Signup Logic
router.post('/signup', asyncErrorHandler(postRegister));

// // Handle Login Logic
router.post('/login', postLogin);

// Logout
router.get('/logout', getLogout);

module.exports = router;
