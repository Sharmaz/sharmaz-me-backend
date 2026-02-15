const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

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

function checkIsCookie(req, res, next) {
  const accessToken = req.cookies.access_token;
  if (accessToken) {
    return res.redirect('/');
  }
  return next();
}

function checkCookieAuth(req, res, next) {
  const accessToken = req.cookies.access_token;

  jwt.verify(accessToken, config.jwtSecret, (err, data) => {
    if(err) {
      return res.redirect('/login');
    }
    req.user = data;
    return next();
  });
}

module.exports = { checkApiKey, checkRoles, checkUserIds, checkIsCookie, checkCookieAuth };
