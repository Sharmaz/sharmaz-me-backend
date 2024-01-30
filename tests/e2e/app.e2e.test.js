const request = require('supertest');
const { expect, beforeEach, afterEach } = require('@jest/globals');

const createApp = require('../../src/app');

let app;
let api;
let server;

beforeEach(() => {
  app = createApp();

  server = app.listen(9000);
  api = request(app);
});

afterEach(() => {
  server.close();
});

describe('app test', () => {
  test('get /', async() => {
    const response = await api.get('/');
    expect(response).toBeTruthy();
  });
});
