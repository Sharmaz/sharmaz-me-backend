const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { updateJobSchema, getJobSchema, createJobSchema } = require('../schemas/job.schema');
const JobsService = require('../services/jobs.service');

const router = express.Router();
const jobsService = new JobsService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const jobs = await jobsService.find(id);
      res.json(jobs)
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(createJobSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const { body } = req;
      const newJob = await jobsService.create(id, body);
      res.status(201).json(newJob);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getJobSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const job = await jobsService.findOne(id, user);
      res.json(job)
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getJobSchema, 'params'),
  validatorHandler(updateJobSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body, user } = req;
      const { id } = req.params;
      const updatedJob = await jobsService.update(id, body, user);
      res.json(updatedJob);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getJobSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      await jobsService.delete(id, user);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
