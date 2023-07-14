const  { v4 } = require('uuid');

const { models } = require('../libs/sequelize');

class ProjectsService {

  async create(userId, data) {
    const newProject = await models.Project.create({
      id: v4(),
      userId,
      ...data
    });
    return newProject;
  }

  async find(userId) {
    const projects = await models.Project.findAll({
      where: { userId }
    });
    return projects;
  }

  async findOne(projectId) {
    const project = await models.Project.findByPk(projectId);
    return project;
  }

  async update(projectId, changes) {
    const project = await this.findOne(projectId);
    await project.update(changes);
    return { projectId, changes };
  }

  async delete(projectId) {
    const project = await this.findOne(projectId);
    await project.destroy();
    return { projectId };
  }
}

module.exports = ProjectsService;
