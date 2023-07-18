const express = require('express');

const UsersService = require('../services/users.service');
const JobsService = require('../services/jobs.service');
const ProjectsService = require('../services/projects.service');
const ProfilesService = require('../services/profiles.service');

const router = express.Router();
const usersService = new UsersService();
const jobsService = new JobsService();
const projectsService = new ProjectsService();
const profilesService = new ProfilesService();

router.get('/', async (req, res) => {
  const users = await usersService.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { body } = req;
  const newUser = await usersService.create(body);
  res.status(201).json(newUser);
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.findOne(userId);
  res.json(user);
});

router.patch('/:userId', async (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  const updatedUser = await usersService.update(userId, body);
  res.json(updatedUser);
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await usersService.delete(userId);
  res.json(deletedUser);
});

router.get('/:userId/profiles', async (req, res) => {
  const { userId } = req.params;
  const profiles = await profilesService.find(userId);
  res.json(profiles);
});

router.post('/:userId/profiles', async (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  const newProfile = await profilesService.create(body, userId);
  res.status(201).json(newProfile);
});

router.get('/:userId/jobs', async (req, res) => {
  const { userId } = req.params;
  const jobs = await jobsService.find(userId);
  res.json(jobs)
});

router.post('/:userId/jobs', async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  const newJob = await jobsService.create(userId, body);
  res.status(201).json(newJob);
});

router.get('/:userId/projects', async (req, res) => {
  const { userId } = req.params;
  const projects = await projectsService.find(userId);
  res.json(projects);
});

router.post('/:userId/projects', async (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  const newProject = await projectsService.create(userId, body);
  res.status(201).json(newProject);
});

module.exports = router;
