const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');


router.post('/register', async (req, res) => {

  // VALIDATE 
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log('There is no error');

  // Checking if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('Email already exists');

  console.log('No clashed of email');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE NEW USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  console.log(user);
  
  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch(err) {
      res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {

  // VALIDATE 
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not found');

  // Is the password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);

  res.send('Logged in!');
});

module.exports = router;