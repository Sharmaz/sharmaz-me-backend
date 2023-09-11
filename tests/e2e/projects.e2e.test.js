const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { models } = require('../../libs/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

const createApp = require('../../app');

let app;
let api;
let server;
let accessToken;
let projectElement;

beforeAll(async () => {
  app = createApp();

  server = app.listen(9000);
  api = request(app);
  await upSeed();

  const loginData = {
    email: 'example@example.com',
    password: 'admin123'
  };

  const loginResponse = await api.post('/api/v1/auth/login')
    .send(loginData)
    .set({
      'Content-Type': 'application/json'
    });
  
  accessToken = loginResponse.body.token;

  const { body: projectList } = await api.get('/api/v1/projects/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
  [ projectElement ] = projectList;
});

afterAll(async () => {
  await downSeed();
  server.close();
});

describe('get /projects', () => {
  test('should return 401 unauthorized by bearer token', async() => {
    const { statusCode } = await api.get('/api/v1/projects/');
    expect(statusCode).toBe(401);
  });
  test('should return a projects list', async() => {
    const { statusCode, body } = await api.get('/api/v1/projects/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });
});

describe('get /projects/{id}', () => {
  test('should return 401 unauthorized by bearer token', async() => {
    const { statusCode } = await api.get(`/api/v1/projects/${projectElement.id}`);
    expect(statusCode).toBe(401);
  });
  test('should return a project', async() => {
    const projectdb = await models.Project.findByPk(projectElement.id);
    const { statusCode, body } = await api.get(`/api/v1/projects/${projectElement.id}`)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(body.name).toBe(projectdb.name);
  });
});

describe('post /projects', () => {
  const newProjectData = {
    name: 'Meh VR',
    description: 'VR Experience',
    githubLink: 'https://github.com/Sharmaz/WebDungeonVR',
    demoLink: 'https://sharmaz.github.io/WebDungeonVR/',
    tags: {
      'list': [
      'VR',
      'Web',
      'Javascript',
      'A-frame'
      ],
    },
  };
  test('should return 400 bad request, invalid name', async () => {
    const projectData = {...newProjectData};
    delete projectData.name;
    const { statusCode, body } = await api.post('/api/v1/projects/')
      .send(projectData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/name/);
  });
  test('should return 401 unauthorized', async () => {
    const { statusCode } = await api.post('/api/v1/projects/')
      .send(newProjectData);
    expect(statusCode).toBe(401);
  });
  test('should return a new project', async () => {
    const { statusCode, body } = await api.post('/api/v1/projects/')
      .send(newProjectData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const projectdb = await models.Project.findByPk(body.id);
    expect(statusCode).toBe(201);
    expect(projectdb.name).toBe(body.name);
  });
});

describe('patch /projects/{id}', () => {
  const updateData = {
    name: 'Space Dungeon VR',
  };
  test('should return 400 bad request, name not allowed to be empty', async () => {
    const failData = {
      name: ''
    };
    const { statusCode, body } = await api.patch(`/api/v1/projects/${projectElement.id}`)
      .send(failData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/not allowed/);
  });
  test('should return 401 unauthorized', async () => {
    const { statusCode } = await api.patch(`/api/v1/projects/${projectElement.id}`)
      .send(updateData);
    expect(statusCode).toBe(401);
  });
  test('should return an updated project', async() => {
    const { statusCode, body } = await api.patch(`/api/v1/projects/${projectElement.id}`)
      .send(updateData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const projectdb = await models.Project.findByPk(projectElement.id);
    expect(statusCode).toBe(200);
    expect(body.changes.name).toBe(projectdb.name);
  });
});
