const  BAD_REQUEST = require('../utils/BadRequestError')
const  CONFLICT = require('../utils/ConflictError')
const  FORBIDDEN = require('../utils/ForbiddenError')
const  NOT_FOUND = require('../utils/NotFoundError')
const  SERVER_ERROR = require('../utils/ServerError')
const  UNAUTHORIZED = require('../utils/UnauthorizedError')


const handleError = (err, next) => {
  switch (err.name) {
    case 'CastError':
    case 'ValidationError':
      next(BAD_REQUEST)
      return
    case 'DocumentNotFoundError':
      next(NOT_FOUND('Item with specified id not found'))
      return
    case 'MongoServerError':
      if (err.code === 11000)
        next(
            CONFLICT('User with this email is already registered')
        )
      else next(SERVER_ERROR('Mongo Server Error'))
      return
    default:
      break
  }
  next(err)
}

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  handleError, }