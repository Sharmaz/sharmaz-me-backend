const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users')
});

router.get('/:userId', (req, res) => {
  const userId = req.params;
  res.send(`User ${userId.userId}`)
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

module.exports = router;
