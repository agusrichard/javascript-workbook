const express = require('express');
const app = express();


// Import route
const authRoute = require('./routes/auth.js');


// Routes middleware
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('Server is up and running...'));