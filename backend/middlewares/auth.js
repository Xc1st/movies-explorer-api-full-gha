const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/UnautorizedError');
const { authorizationNeeded } = require('../config');

const { SECRET_KEY = 'xc1st' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnautorizedError(authorizationNeeded));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(new UnautorizedError(authorizationNeeded));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
