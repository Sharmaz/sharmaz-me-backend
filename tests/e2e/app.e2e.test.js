const request = require('supertest');
const express = require('express');
const { expect, beforeEach, afterEach } = require('@jest/globals');

let app;
let api;
let server;

beforeEach(() => {
  app = express();
  app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'hello!!'});
  });

  server = app.listen(9000);
  api = request(app);
})

afterEach(() => {
  server.close();
})

describe('app test', () => {
  test('get /hello endpoint', async() => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('hello!!');
  });
});
