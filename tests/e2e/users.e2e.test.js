const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { models } = require('../../libs/sequelize');
const config = require('../../config/config');
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

  test('should return a new user', async () => {
    const newUserData = {
      email: 'ivan.robles@ivanrobles.pro',
      password: 'myawesomepassword',
      role: 'user',
    };
    const { statusCode, body } = await api.post('/api/v1/users/')
      .send(newUserData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const user = await models.User.findByPk(body.id);
    expect(statusCode).toBe(201);
    expect(user.role).toEqual(newUserData.role);
    expect(user.email).toEqual(newUserData.email);
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

describe('get /users', () => {
  test('should return 401 unauthorized by bearer token', async() => {
    const { statusCode } = await api.get('/api/v1/users/');
    expect(statusCode).toBe(401);
  });

  test('sould return an users list', async() => {
    const { statusCode, body } = await api.get('/api/v1/users/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  })
});
