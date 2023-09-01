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
  }

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

describe('get /profiles', () => {
  test('should return 401 unauthorized by bearer token', async() => {
    const { statusCode } = await api.get('/api/v1/profiles/');
    expect(statusCode).toBe(401);
  });
  test('sould return current user profile', async() => {
    const { statusCode, body } = await api.get('/api/v1/profiles/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(body.length).toBe(1);
  });
});

describe('get /profiles/{id}', () => {
  test('should return 401 unauthorized by api key', async() => {
    const { body } = await api.get('/api/v1/profiles/')
    .set({
      'Authorization': `Bearer ${accessToken}`
    });
    const [ profile ] = body;
    const { statusCode } = await api.get(`/api/v1/profiles/${profile.id}`)
    expect(statusCode).toBe(401);
  });
  test('should return a profile', async() => {
    const { body } = await api.get('/api/v1/profiles/')
    .set({
      'Authorization': `Bearer ${accessToken}`
    });
    const [ profile ] = body;
    const dbProfile = await models.Profile.findByPk(profile.id);
    const response = await api.get(`/api/v1/profiles/${profile.id}`)
    .set({
      'Authorization': `Bearer ${accessToken}`
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(dbProfile.name);
  });
});
