require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

//const morgan = require('morgan');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const productRoutes = require('./server/routes/products');
const orderRoutes = require('./server/routes/orders');
const authRoutes = require('./server/routes/auth');
const cartRoutes = require('./server/routes/cart');
const passportConfig = require('./server/config/passport-config');

mongoose.connect(process.env.dbURL, 
  { keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true }, () => {
  console.log('connected to mLab');
});

app.set('view engine', 'ejs');

// serve static files
app.use(express.static(path.join(__dirname, '/client/build'))); 

//app.use(morgan('dev'));

app.use(session({
  secret: process.env.secret,
  cookie: {maxAge: 7200000},
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// initialise passport
app.use(passport.initialize());
app.use(passport.session());

const corsOption = {
  // in development - http://localhost:3000
  origin: 'https://shoplah.herokuapp.com/',
  credentials: true
}

// set up routes
app.use(cors(corsOption));
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/orders', orderRoutes); 
app.use('/auth', authRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
}); 

// start server
app.listen(port, () => {
  console.log('Listening to port', port);
});