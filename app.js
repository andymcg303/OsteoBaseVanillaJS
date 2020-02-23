require('dotenv').config();

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// configure route requires
const indexRoutes = require('./routes/index');
const patientsRoutes = require('./routes/patients');
const interviewsRoutes = require('./routes/interviews');
const medhistsRoutes = require('./routes/medhists');
const clinicalsRoutes = require('./routes/clinicals');

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

// app configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(`${__dirname}/public`));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'I Love Rosie',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // res.locals.error = req.flash("error");
  // res.locals.success = req.flash("success");
  next();
});


// Has to be done after app.use(bodyParser)
app.use(indexRoutes);
app.use('/patients', patientsRoutes);
app.use('/patients/:id/interviews', interviewsRoutes);
app.use('/patients/:id/medhists', medhistsRoutes);
app.use('/patients/:id/clinicals', clinicalsRoutes);

app.listen(3000, () => console.log('OsteoBase Server Started'));
