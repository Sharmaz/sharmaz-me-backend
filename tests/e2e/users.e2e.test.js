const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { models } = require('../../libs/sequelize');
const config = require('../../config/config');

const createApp = require('../../app');

let app;
let api;
let server;
let accessToken;

beforeEach(async () => {
  app = createApp();

  server = app.listen(9000);
  api = request(app);

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

afterEach(() => {
  server.close();
});

describe('post /users', () => {
  test('should return 400 bad request, invalid role', async () => {
    const data = {
      email: 'nah@gmail.com',
      password: 'mycoolpass'
    };
  
    const { statusCode, body } = await api.post('/api/v1/users/')
      .send(data)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });

    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/role/);
  });


  test('should return 400 bad request invalid email', async () => {
    const data = {
      email: 'testmail.com',
      password: 'mycoolpass',
      role: 'user'
    };
    
    const { statusCode, body } = await api.post('/api/v1/users/')
      .send(data)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });

    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });

  test('should return 400 bad request invalid password', async () => {
    const data = {
      email: 'test@gmail.com',
      password: 'tiny',
      role: 'user'
    };
    
    const { statusCode, body } = await api.post('/api/v1/users/')
      .send(data)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });

    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/password/);
  });
});

describe('get /users/{id}', () => {
  test('should return 401 unauthorized by api key', async() => {
    const userId = '2bc34306-d83f-481a-b37d-b6967872ea36';
    const user = await models.User.findByPk(userId);
    const { statusCode } = await api.get(`/api/v1/users/${user.id}`)
    expect(statusCode).toBe(401);
  });
  test('should return an user', async() => {
    const userId = '2bc34306-d83f-481a-b37d-b6967872ea36';
    const user = await models.User.findByPk(userId);
    const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`)
      .set({
        api: config.apiKey,
      });
    expect(statusCode).toBe(200);
    expect(body.email).toBe(user.email);
  });
});
