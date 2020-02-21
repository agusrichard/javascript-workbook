const express = require('express');

app = express();

app.get('/', (req, res) => {
  res.send('<h1>Welcome!!!</h1>');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Users API
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server is running...'));
