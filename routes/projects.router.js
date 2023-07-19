const express = require('express');
const ProjectsService = require('../services/projects.service');

const router = express.Router();
const projectsService = new ProjectsService();

router.get('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const projects = await projectsService.findOne(projectId);
    res.json(projects);
  } catch(error) {
    next(error);
  }
});

router.patch('/:projectId', async (req, res, next) => {
  try {
    const { body } = req;
    const { projectId } = req.params;
    const updatedProject = await projectsService.update(projectId, body);
    res.json(updatedProject);
  } catch(error) {
    next(error);
  }
});

router.delete('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await projectsService.delete(projectId);
    res.status(204).json();
  } catch(error) {
    next(error);
  }
});

module.exports = router;
