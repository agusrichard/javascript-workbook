const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function getUserId(context) {
  if (context.userId) {
    return context.userId
  } else {
    throw new Error('Not Authenticated')
  }
}

function login(user, password) {
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      let token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY)
      return {token, user}
    } else {
      throw new Error('Wrong email or password')
    }
  } else {
    throw new Error('Wrong email or password')
  }
}

module.exports = { getUserId, login }