const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const { routerApi } = require('./routes');
const { logErrors, boomErrorHandler, genericErrorHandler } = require('./middlewares/error.handler');

const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(morgan(config.isProd ? 'combined' : 'dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  const whitelist = config.allowedList;

  const options = {
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not Allowed'));
      }
    }
  }

  const reactBuildPath = path.join(__dirname, '../public');

  app.use(cors(options));

  // eslint-disable-next-line global-require
  require('./auth');

  app.use(express.static(reactBuildPath));

  routerApi(app);

  app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
  });

  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(genericErrorHandler);

  return app;
}

module.exports = createApp;
