class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Authorization required';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;