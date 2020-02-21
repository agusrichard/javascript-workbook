const express = require('express');
const router = express.Router();
const users = require('../../Users');


// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get single user
router.get('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.send({msg: `There is no user with id:${req.params.id}`});
  }
});

// Create user
router.post('/', (req, res) => {
  const newUser = {
    id: users.length+1,
    name: req.body.name,
    email: req.body.email
  };

  if (!newUser.name && !newUser.email) {
    return res.status(400).json({msg: 'Please add name and email.'});
  } 

  users.push(newUser);
  res.json(users);
});

// Update user
router.put('/:id', (req, res) => {
  let user = users.filter(user => user.id === req.params.id);

  if (user) {
    console.log('Runned');
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
  } else {
    res.send({msg: `There is no user with id:${req.params.id}`})
  }

  res.json(users);
});



module.exports = router;