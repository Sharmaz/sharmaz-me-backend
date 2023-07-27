const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const config = require('./config/config');
const { routerApi, routerViews } = require('./routes');
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

app.engine('.hbs', engine({extname: 'hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

const publicPath = path.join(__dirname, './views');

app.use(cors(options));

require('./utils/auth');

app.use('/', express.static(publicPath));

routerApi(app);
routerViews(app);

app.use(logErrors);
app.use(boomErrorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port ${port}`);
});
