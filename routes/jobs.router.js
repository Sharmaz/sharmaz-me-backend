const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { updateJobSchema, getJobSchema } = require('../schemas/jobs.schema');
const JobsService = require('../services/jobs.service');

const router = express.Router();
const jobsService = new JobsService();

router.get('/:id',
  validatorHandler(getJobSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const job = await jobsService.findOne(id);
      res.json(job)
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getJobSchema, 'params'),
  validatorHandler(updateJobSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedJob = await jobsService.update(id, body);
      res.json(updatedJob);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getJobSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await jobsService.delete(id);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
