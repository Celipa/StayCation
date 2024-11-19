const jwt = require('jsonwebtoken')

exports.generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

//