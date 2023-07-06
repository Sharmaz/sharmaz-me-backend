const express = require('express');

const UsersService = require('../services/users.service');
const JobsService = require('../services/jobs.service');

const router = express.Router();
const usersService = new UsersService();
const jobsService = new JobsService();

router.get('/', (req, res) => {
  const users = usersService.find();
  res.json(users);
});

router.post('/', (req, res) => {
  const { body } = req;
  const newUser = usersService.create(body);
  res.status(201).json(newUser);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = usersService.findOne(userId);
  res.json(user);
});

router.patch('/:userId', (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  const user = usersService.update(userId, body);
  res.json(user);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = usersService.delete(userId);
  res.json(user);
});

router.get('/:userId/jobs', (req, res) => {
  const { userId } = req.params;
  const jobs = jobsService.find(userId);
  res.send(jobs)
});

router.get('/:userId/jobs/:jobId', (req, res) => {
  const { userId, jobId } = req.params;
  const jobs = jobsService.findOne(userId, jobId);
  res.send(jobs)
});

router.post('/:userId/jobs', (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  const newJob = jobsService.create(userId, body);
  res.status(201).json(newJob);
});

router.patch('/:userId/jobs/:jobId', (req, res) => {
  const { body } = req;
  const { jobId } = req.params;
  const updatedJob = jobsService.update(jobId, body);
  res.json(updatedJob);
});

router.delete('/:userId/jobs/:jobId', (req, res) => {
  const { jobId } = req.params;

  const deletedJob = jobsService.delete(jobId);
  res.json(deletedJob);
});

router.get('/:userId/projects', (req, res) => {
  const userId = req.params;
  res.send(`User ${userId.userId} Projects`)
});

router.post('/:userId/projects', (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:userId/projects/:projectId', (req, res) => {
  const { body } = req;
  const { projectId } = req.params;

  res.json({
    message: 'updated',
    projectId,
    data: body
  });
});

router.delete('/:userId/projects/:projectId', (req, res) => {
  const { projectId } = req.params;

  res.json({
    message: 'deleted',
    projectId,
  });
});

module.exports = router;
