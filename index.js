const express = require('express');
const routerApi = require('./routes');
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
