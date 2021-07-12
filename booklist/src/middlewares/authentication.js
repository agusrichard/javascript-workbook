const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authentication(req, res, next) {
  let token = req.headers.authorization || ''

  if (token) {
    try {
      token = token.slice(7)
      let payload = jwt.verify(token, process.env.SECRET_KEY)
      req.userId = payload.userId
      next()
    } catch(err) {
      next()
    }
  } else {
    next()
  }
}


module.exports = { authentication }