const express = require('express');
const rateLimit = require('express-rate-limit');

const usersRouter = require('./users.router');
const profilesRouter = require('./profiles.router');
const jobsRouter = require('./jobs.router');
const projectsRouter = require('./projects.router');
const authRouter = require('./auth.router');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { statusCode: 429, message: 'Too many requests, please try again later' },
});

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', apiLimiter, router);
  router.use('/users', usersRouter);
  router.use('/profiles', profilesRouter);
  router.use('/jobs', jobsRouter);
  router.use('/projects', projectsRouter);
  router.use('/auth', authRouter);
}

module.exports = { routerApi };
