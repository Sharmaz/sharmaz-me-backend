const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { updateProjectSchema, getProjectSchema, createProjectSchema } = require('../schemas/project.schema');
const ProjectsService = require('../services/projects.service');

const router = express.Router();
const projectsService = new ProjectsService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const projects = await projectsService.find(id);
      res.json(projects);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProjectSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const { body } = req;
      const newProject = await projectsService.create(id, body);
      res.status(201).json(newProject);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const projects = await projectsService.findOne(id, user);
      res.json(projects);
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getProjectSchema, 'params'),
  validatorHandler(updateProjectSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body, user } = req;
      const { id } = req.params;
      const updatedProject = await projectsService.update(id, body, user);
      res.json(updatedProject);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      await projectsService.delete(id, user);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
