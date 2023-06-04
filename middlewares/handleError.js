const UnauthorizedError = require('../utils/UnauthorizedError');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  if (err instanceof UnauthorizedError) {
    statusCode = 401;
  }
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
