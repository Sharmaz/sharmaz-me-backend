const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { upSeed, downSeed } = require('./utils/umzug');

const createApp = require('../../src/app');

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


describe('get /', () => {
  test('should return 302 redirected to /login', async() => {
    const { statusCode } = await api.get('/');
    expect(statusCode).toBe(302);
  });
  test('should return 200 OK', async () => {
    const { statusCode } = await api.get('/')
      .set({
        'Cookie': [`access_token=${accessToken}`],
      });
      expect(statusCode).toBe(200);
  });
});

describe('get /login', () => {
  test('should return 200 OK and the login view', async() => {
    const { statusCode } = await api.get('/login');
    expect(statusCode).toBe(200);
  });
});

describe('get /logout', () => {
  test('should return 302 redirected to /login', async() => {
    const { statusCode } = await api.get('/logout')
      .set({
        'Cookie': [`access_token=${accessToken}`],
      });
    expect(statusCode).toBe(302);
  });
});

describe('get /*', () => {
  test('should return 404 not found', async() => {
    const { statusCode } = await api.get('/whatever');
    expect(statusCode).toBe(404);
  });
});
