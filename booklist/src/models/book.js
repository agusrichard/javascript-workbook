const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  userId: String,
  done: { type: Boolean, default: false },
  title: String,
  author: String,
  start: { type: Date, default: Date.now },
  end: Date,
  comment: String
})

module.exports = mongoose.model('Book', bookSchema)