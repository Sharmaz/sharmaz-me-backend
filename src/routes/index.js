const express = require('express');

const usersRouter = require('./users.router');
const profilesRouter = require('./profiles.router');
const jobsRouter = require('./jobs.router');
const projectsRouter = require('./projects.router');
const authRouter = require('./auth.router');

const viewsRouter = require('./views.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/profiles', profilesRouter);
  router.use('/jobs', jobsRouter);
  router.use('/projects', projectsRouter);
  router.use('/auth', authRouter);
}

function routerViews(app) {
  app.use('/', viewsRouter);
}

module.exports = { routerApi, routerViews };
