const express = require('express');

const usersRouter = require('./users.router');
const profilesRouter = require('./profiles.router');
const jobsRouter = require('./jobs.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/profiles', profilesRouter);
  router.use('/jobs', jobsRouter);
}

module.exports = routerApi;
