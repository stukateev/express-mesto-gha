const allowedCors = [
  'http://idler.studio.nomoredomains.rocks',
  'https://idler.studio.nomoredomains.rocks',
  'http://api.idler.studio.nomoredomains.rocks',
  'https://api.idler.studio.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Max-Age', 3600); // Дополнительный заголовок для кэширования результатов предварительной проверки (preflight)
    return res.status(204).end();
  }

  return next();
};