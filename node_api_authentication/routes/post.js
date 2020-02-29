const router = require('express').Router();
const verifyToken = require('./verifyToken');
const User = require('../model/User');


router.set('/', verifyToken, (req, res) => {
  res.send(req.user);
  const user = User.findOne({ _id: req.user });
  res.send(user)
})


module.exports = router;