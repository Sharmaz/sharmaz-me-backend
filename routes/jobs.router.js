const express = require('express');
const JobsService = require('../services/jobs.service');

const router = express.Router();
const jobsService = new JobsService();

router.get('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await jobsService.findOne(jobId);
    res.json(job)
  } catch(error) {
    next(error);
  }
});

router.patch('/:jobId', async (req, res, next) => {
  try {
    const { body } = req;
    const { jobId } = req.params;
    const updatedJob = await jobsService.update(jobId, body);
    res.json(updatedJob);
  } catch(error) {
    next(error);
  }
});

router.delete('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    await jobsService.delete(jobId);
    res.status(204).json();
  } catch(error) {
    next(error);
  }
});

module.exports = router;
