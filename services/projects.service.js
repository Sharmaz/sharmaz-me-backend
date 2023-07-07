const  { v4 } = require('uuid');

class ProjectsService {
  constructor() {
    this.projects = [];
  }

  create(userId, data) {
    const newProject = {
      id: v4(),
      userId,
      ...data
    }
    this.projects.push(newProject);
    return newProject;
  }

  find(userId) {
    return this.projects.filter(project => project.userId === userId);
  }

  findOne(userId, projectId) {
    const projects = this.projects.filter(project => project.userId === userId);
    return projects.find((project) => project.id === projectId);
  }

  update(projectId, changes) {
    const projectIndex = this.projects.findIndex((project) => project.id === projectId);
    
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    const project = this.projects[projectIndex];
    this.projects[projectIndex] = {
      ...project,
      ...changes
    };

    return this.projects[projectIndex];
  }

  delete(projectId) {
    const projectIndex = this.projects.findIndex((project) => project.id === projectId);
  
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }

    this.projects.splice(projectIndex, 1);
    return { projectId };
  }
}

module.exports = ProjectsService;
