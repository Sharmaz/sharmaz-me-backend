const request = require('supertest');
const { describe, expect, test } = require('@jest/globals');
const { models } = require('../../src/libs/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

const createApp = require('../../src/app');

let app;
let api;
let server;

const userId = '2bc34306-d83f-481a-b37d-b6967872ea36';

beforeAll(async () => {
  app = createApp();

  server = app.listen(9000);
  api = request(app);
  await upSeed();
});

afterAll(async () => {
  await downSeed();
  server.close();
});

describe('post /login', () => {
  test('should return 400 bad request', async () => {
    const loginData = {
      password: 'abcd1234'
    }
    const { statusCode, body } = await api.post('/api/v1/auth/login').send(loginData);
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });
  test('should return 401 unauthorized', async () => {
    const loginData = {
      email: 'example@example.com',
      password: 'abcd1234'
    }
    const { statusCode } = await api.post('/api/v1/auth/login').send(loginData);
    expect(statusCode).toBe(401);
  });
  test('should return 200', async () => {
    const user = await models.User.findByPk(userId);
    const loginData = {
      email: 'example@example.com',
      password: 'admin123'
    }
    const { statusCode, body } = await api.post('/api/v1/auth/login').send(loginData);
    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(user.email);
    expect(body.token).toBeTruthy();
    expect(body.user.password).toBeUndefined();
  });
});
