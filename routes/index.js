const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Root Landing Page ie login
router.get('/', (req, res) => res.render('login'));

// Show Login Form
router.get('/login', (req, res) => res.render('login'));

// Show Sign Up Form
router.get('/signup', (req, res) => res.render('signup'));

// Handle Signup Logic
router.post('/signup', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      // req.flash("error", err.message);
      return res.redirect('/signup');
    }
    passport.authenticate('local')(req, res, () => {
      // req.flash("success", "Welcome to OsteoBase" + user.username);
      res.redirect('/patients');
    });
  });
});

// Handle Login Logic
router.post('/login', (req, res, next) => {
  passport.authenticate('local',
    {
      successRedirect: '/patients',
      failureRedirect: '/login',
      // failureFlash: true,
      // successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
