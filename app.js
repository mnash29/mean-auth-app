const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose  = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database, { useNewUrlParser: true });

// Verify connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database ' + config.database);
});

// Error checking connection
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

// Hostname
const hostname = '127.0.0.1';

// Service port number
const port = 3000;

// CORS middleware
app.use(cors());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Anonymous passport function to build JwtStrategy
require('./config/passport')(passport);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Users route
app.use('/users', users);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start server
app.listen(port, hostname, () => {
  console.log(`Server started on http://${hostname}:${port}/`);
});