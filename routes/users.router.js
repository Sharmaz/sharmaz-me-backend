const express = require('express');

const UsersService = require('../services/users.service');
const JobsService = require('../services/jobs.service');
const ProjectsService = require('../services/projects.service');
const ProfilesService = require('../services/profiles.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');
const { createProfileSchema } = require('../schemas/profile.schema');
const { createJobSchema } = require('../schemas/job.schema');
const { createProjectSchema } = require('../schemas/project.schema');

const router = express.Router();
const usersService = new UsersService();
const jobsService = new JobsService();
const projectsService = new ProjectsService();
const profilesService = new ProfilesService();

router.get('/', async (req, res, next) => {
  try {
    const users = await usersService.find();
    res.json(users);
  } catch(error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newUser = await usersService.create(body);
      res.status(201).json(newUser);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findOne(id);
      res.json(user);
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedUser = await usersService.update(id, body);
      res.json(updatedUser);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await usersService.delete(id);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id/profiles',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const profiles = await profilesService.find(id);
      res.json(profiles);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/:id/profiles',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(createProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const newProfile = await profilesService.create(body, id);
      res.status(201).json(newProfile);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id/jobs',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const jobs = await jobsService.find(id);
      res.json(jobs)
    } catch(error) {
      next(error);
    }
  }
);

router.post('/:id/jobs',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(createJobSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const newJob = await jobsService.create(id, body);
      res.status(201).json(newJob);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id/projects',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projects = await projectsService.find(id);
      res.json(projects);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/:id/projects',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(createProjectSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const newProject = await projectsService.create(id, body);
      res.status(201).json(newProject);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
