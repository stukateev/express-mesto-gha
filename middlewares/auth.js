const token = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const  { jwt } = req.cookies

  if(!jwt){
    throw next(new UnauthorizedError('Authorization required'))
  }

  const { JWT_SECRET } = process.env;

  let payload;
  try {
    payload = token.verify( jwt,JWT_SECRET );
  } catch (err) {
    throw new UnauthorizedError('Authorization required');
  }

  req.user = payload;
  next();
};