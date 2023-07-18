const express = require('express');
const ProjectsService = require('../services/projects.service');

const router = express.Router();
const projectsService = new ProjectsService();

router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const projects = await projectsService.findOne(projectId);
  res.json(projects);
});

router.patch('/:projectId', async (req, res) => {
  const { body } = req;
  const { projectId } = req.params;
  const updatedProject = await projectsService.update(projectId, body);
  res.json(updatedProject);
});

router.delete('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const deletedProject = await projectsService.delete(projectId);
  res.json(deletedProject);
});

module.exports = router;
