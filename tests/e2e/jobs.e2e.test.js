const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { models } = require('../../libs/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

const createApp = require('../../app');

let app;
let api;
let server;
let accessToken;

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
});

afterAll(async () => {
  await downSeed();
  server.close();
});

describe('get /jobs', () => {
  test('should return 401 unauthorized by bearer token', async() => {
    const { statusCode } = await api.get('/api/v1/jobs/');
    expect(statusCode).toBe(401);
  });
  test('sould return a jobs list', async() => {
    const { statusCode, body } = await api.get('/api/v1/jobs/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });
});

describe('get /jobs/{id}', () => {
  test('should return 401 unauthorized by api key', async() => {
    const { body: jobsList } = await api.get('/api/v1/jobs/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const [ jobElement ] = jobsList;
    const { statusCode } = await api.get(`/api/v1/jobs/${jobElement.id}`);
    expect(statusCode).toBe(401);
  });
  test('should return an user', async() => {
    const { body: jobsList } = await api.get('/api/v1/jobs/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const [ jobElement ] = jobsList;
    const jobdb = await models.Job.findByPk(jobElement.id);
    const { statusCode, body } = await api.get(`/api/v1/jobs/${jobElement.id}`)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(body.name).toBe(jobdb.name);
  });
});
