const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Init app
const app = express();

// Env config
dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('Connected to db!')
);


// Import route
const authRoute = require('./routes/auth.js');

// Middleware
app.use(express.json());

// Routes middleware
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('Server is up and running...'));