const express = require('express');
const JobsService = require('../services/jobs.service');

const router = express.Router();
const jobsService = new JobsService();

router.get('/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const job = await jobsService.findOne(jobId);
  res.json(job)
});

router.patch('/:jobId', async (req, res) => {
  const { body } = req;
  const { jobId } = req.params;
  const updatedJob = await jobsService.update(jobId, body);
  res.json(updatedJob);
});

router.delete('/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const deletedJob = await jobsService.delete(jobId);
  res.json(deletedJob);
});

module.exports = router;
