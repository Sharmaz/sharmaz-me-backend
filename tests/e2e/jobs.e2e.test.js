const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { models } = require('../../src/libs/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

const createApp = require('../../src/app');

let app;
let api;
let server;
let accessToken;
let jobElement;

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

  const { body: jobsList } = await api.get('/api/v1/jobs/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
  [ jobElement ] = jobsList;
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
  test('should return a jobs list', async() => {
    const { statusCode, body } = await api.get('/api/v1/jobs/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });
});

describe('get /jobs/{id}', () => {
  test('should return 401 unauthorized by bearer token', async() => {
    const { statusCode } = await api.get(`/api/v1/jobs/${jobElement.id}`);
    expect(statusCode).toBe(401);
  });
  test('should return a job', async() => {
    const jobdb = await models.Job.findByPk(jobElement.id);
    const { statusCode, body } = await api.get(`/api/v1/jobs/${jobElement.id}`)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(body.name).toBe(jobdb.name);
  });
});

describe('post /jobs', () => {
  const newJobData = {
    name: 'uplift',
    dateStarted: '2020-07-01',
    dateEnded: '2021-10-01',
    description: 'It is a payment method oriented to travel agencies.',
    role: 'Software Engineer',
    details: {
      list: [
      'Added features with react with context API as a state handler. I used Bootstrap and CSS for the styles.',
      'Adapting features. In another part of the project, I worked with ClojureScript and Reagent to use React in ClojureScript. This section was stylized with LESS.',
      'Bug fixing.'
    ]}
  };
  test('should return 400 bad request, invalid name', async () => {
    const jobData = {...newJobData};
    delete jobData.name;
    const { statusCode, body } = await api.post('/api/v1/jobs/')
      .send(jobData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/name/);
  });
  test('should return 401 unauthorized', async () => {
    const { statusCode } = await api.post('/api/v1/jobs/')
      .send(newJobData);
    expect(statusCode).toBe(401);
  });
  test('should return a new job', async () => {
    const { statusCode, body } = await api.post('/api/v1/jobs/')
      .send(newJobData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const jobdb = await models.Job.findByPk(body.id);
    expect(statusCode).toBe(201);
    expect(jobdb.name).toBe(body.name);
  });
});

describe('patch /jobs/{id}', () => {
  const updateData = {
    name: 'ivanrobles.pro',
  };
  test('should return 400 bad request, name not allowed to be empty', async () => {
    const failData = {
      name: ''
    };
    const { statusCode, body } = await api.patch(`/api/v1/jobs/${jobElement.id}`)
      .send(failData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/not allowed/);
  });
  test('should return 401 unauthorized', async () => {
    const { statusCode } = await api.patch(`/api/v1/jobs/${jobElement.id}`)
      .send(updateData);
    expect(statusCode).toBe(401);
  });
  test('should return an updated job', async() => {
    const { statusCode, body } = await api.patch(`/api/v1/jobs/${jobElement.id}`)
      .send(updateData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const jobdb = await models.Job.findByPk(jobElement.id);
    expect(statusCode).toBe(200);
    expect(body.changes.name).toBe(jobdb.name);
  });
});

describe('delete /jobs/{id}', () => {
  test('should return 401 unauthorized', async () => {
    const { statusCode } = await api.delete(`/api/v1/jobs/${jobElement.id}`);
    expect(statusCode).toBe(401);
  });
  test('should return 204 no content', async () => {
    const { statusCode } = await api.delete(`/api/v1/jobs/${jobElement.id}`)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(204);
  });
});
