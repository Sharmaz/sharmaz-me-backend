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
