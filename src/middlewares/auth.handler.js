const boom = require('@hapi/boom');
const config = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers.api;
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const { user } = req;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden());
    }
  }
}

function checkUserIds(req, res, next) {
  const { user } = req;
  const { id } = req.params;
  if (user.sub === id || user.role !== 'user') {
    next();
  } else {
    next(boom.forbidden());
  }
}

module.exports = { checkApiKey, checkRoles, checkUserIds };
