const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { updateProjectSchema, getProjectSchema } = require('../schemas/project.schema');
const ProjectsService = require('../services/projects.service');

const router = express.Router();
const projectsService = new ProjectsService();

router.get('/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projects = await projectsService.findOne(id);
      res.json(projects);
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProjectSchema, 'params'),
  validatorHandler(updateProjectSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedProject = await projectsService.update(id, body);
      res.json(updatedProject);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await projectsService.delete(id);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
