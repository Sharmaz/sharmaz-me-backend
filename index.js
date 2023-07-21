const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const routerApi = require('./routes');
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

app.use(cors(options));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hello World');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
