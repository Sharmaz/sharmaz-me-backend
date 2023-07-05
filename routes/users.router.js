const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users')
});

router.post('/', (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.get('/:userId', (req, res) => {
  const userId = req.params;
  res.send(`User ${userId.userId}`)
});

router.patch('/:userId', (req, res) => {
  const { body } = req;
  const { userId } = req.params;

  res.json({
    message: 'updated',
    userId,
    data: body
  });
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  res.json({
    message: 'deleted',
    userId,
  });
});

router.get('/:userId/jobs', (req, res) => {
  const userId = req.params;
  res.send(`User ${userId.userId} Jobs`)
});

router.post('/:userId/jobs', (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:userId/jobs/:jobId', (req, res) => {
  const { body } = req;
  const { jobId } = req.params;

  res.json({
    message: 'updated',
    jobId,
    data: body
  });
});

router.delete('/:userId/jobs/:jobId', (req, res) => {
  const { jobId } = req.params;

  res.json({
    message: 'deleted',
    jobId,
  });
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
