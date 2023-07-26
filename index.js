const express = require('express');
const cors = require('cors');
const path = require('path');
const { engine } = require('express-handlebars');
const config = require('./config/config');
const { routerApi, routerViews } = require('./routes');
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

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

const publicPath = path.join(__dirname, './views');

app.use(cors(options));

require('./utils/auth');

routerApi(app);
routerViews(app);

app.use(logErrors);
app.use(boomErrorHandler);

app.engine('.hbs', engine({extname: 'hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', express.static(publicPath));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port ${port}`);
});
