require('dotenv').config();

const express = require('express');

const createError = require('http-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const favicon = require('serve-favicon');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');

// configure route requires
const indexRoutes = require('./routes/index');
const patientsRoutes = require('./routes/patients');
const interviewsRoutes = require('./routes/interviews');
const medhistsRoutes = require('./routes/medhists');
const clinicalsRoutes = require('./routes/clinicals');
const documentsRoutes = require('./routes/documents');

const app = express();

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to DB!');
}).catch((err) => {
  console.log('ERROR:', err.message);
});

mongoose.set('useFindAndModify', false);

// addresses 302 get favicon error
app.use(favicon(path.join(__dirname, 'public/images/icons', 'favicon.ico')));


// app configuration
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(`${__dirname}/public`));

//  Configure Sessions before Passport
app.use(session({
  secret: 'I Love Rosie!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pre-route middleware, set local variables
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  // set success message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});


// Mount Routes, Has to be done after app.use(bodyParser)
app.use(indexRoutes);
app.use('/patients', patientsRoutes);
app.use('/patients/:id/interviews', interviewsRoutes);
app.use('/patients/:id/medhists', medhistsRoutes);
app.use('/patients/:id/clinicals', clinicalsRoutes);
app.use('/patients/:id/documents', documentsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');  
});

module.exports = app;

