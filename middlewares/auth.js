const jwt = require('jsonwebtoken')
const { UNAUTHORIZED, StatusCodeError } = require('../utils/errors')

module.exports = (req, res, next) => {
  let token = ''
  if (req.cookies.jwt !== undefined) {
    token = req.cookies.jwt
  } else {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new StatusCodeError(UNAUTHORIZED)
    }
    token = authorization.replace('Bearer ', '')
  }
  const { NODE_ENV, JWT_SECRET } = process.env
  let payload
  try {
    payload =JWT_SECRET(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '1ce9ec7dd68836579e4ffcb80e1ea34ae6e9707c6b36a0c247e501d339a5ec0b'
    )
  } catch (err) {
    throw new StatusCodeError(UNAUTHORIZED)
  }
  req.user = payload
  next()
}