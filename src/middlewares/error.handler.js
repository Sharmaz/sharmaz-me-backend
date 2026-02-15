const config = require('../config/config');

function logErrors (err, req, res, next) {
  if (config.env === 'dev') {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if(err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

// eslint-disable-next-line no-unused-vars
function genericErrorHandler(err, req, res, next) {
  res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
  });
}

module.exports = { logErrors, boomErrorHandler, genericErrorHandler };
