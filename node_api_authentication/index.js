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

// Middleware
app.use(express.json());

// Import route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

// Routes middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, () => console.log('Server is up and running...'));