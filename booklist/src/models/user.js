const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  fullname: String,
  password: String,
  books: [String]
})


module.exports = mongoose.model('User', userSchema)