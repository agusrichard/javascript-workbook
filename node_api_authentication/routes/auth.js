const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');


router.post('/register', async (req, res) => {

  // VALIDATE 
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log('There is no error');

  // Checking if the user is already in the database
  // const emailExist = await User.findOne({email: req.body.email})
  // if (emailExist) return res.status(400).send('Email already exists');

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
    res.send(savedUser);
  } catch(err) {
      res.status(400).send(err);
  }
});

module.exports = router;