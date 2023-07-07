const express = require('express');

const UsersService = require('../services/users.service');
const JobsService = require('../services/jobs.service');
const ProjectsService = require('../services/projects.service');

const router = express.Router();
const usersService = new UsersService();
const jobsService = new JobsService();
const projectsService = new ProjectsService();

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
  const updatedUser = usersService.update(userId, body);
  res.json(updatedUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const deletedUser = usersService.delete(userId);
  res.json(deletedUser);
});

router.get('/:userId/jobs', (req, res) => {
  const { userId } = req.params;
  const jobs = jobsService.find(userId);
  res.json(jobs)
});

router.get('/:userId/jobs/:jobId', (req, res) => {
  const { userId, jobId } = req.params;
  const jobs = jobsService.findOne(userId, jobId);
  res.json(jobs)
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
  const { userId } = req.params;
  const projects = projectsService.find(userId);
  res.json(projects);
});

router.get('/:userId/projects/:projectId', (req, res) => {
  const { userId, projectId } = req.params;
  const projects = projectsService.findOne(userId, projectId);
  res.json(projects);
});

router.post('/:userId/projects', (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  const newProject = projectsService.create(userId, body);
  res.status(201).json(newProject);
});

router.patch('/:userId/projects/:projectId', (req, res) => {
  const { body } = req;
  const { projectId } = req.params;
  const updatedProject = projectsService.update(projectId, body);
  res.json(updatedProject);
});

router.delete('/:userId/projects/:projectId', (req, res) => {
  const { projectId } = req.params;
  const deletedProject = projectsService.delete(projectId);
  res.json(deletedProject);
});

module.exports = router;
