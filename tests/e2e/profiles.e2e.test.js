const request = require('supertest');
const { describe, expect } = require('@jest/globals');
const { models } = require('../../libs/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

const createApp = require('../../app');

let app;
let api;
let server;
let accessToken;
let accessTokenUser;

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

  const newUserData = {
    email: 'ivan.robles@ivanrobles.pro',
    password: 'myawesomepassword',
    role: 'user',
  };

  await api.post('/api/v1/users/')
    .send(newUserData)
    .set({
      'Authorization': `Bearer ${accessToken}`
    });

  const loginUserData = {
    email: newUserData.email,
    password: newUserData.password,
  };

  const loginUserResponse = await api.post('/api/v1/auth/login')
    .send(loginUserData)
    .set({
      'Content-Type': 'application/json'
    });

  accessTokenUser = loginUserResponse.body.token;
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

describe('post /profiles', () => {
  test('should return 400 bad request, invalid name, at least 2 characters long', async () => {
    const data = {
      name: '',
      profilePic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg',
      about: 'The greatest and most influential scientists of all time',
      blog: 'https://wordpress.com/',
      github: 'https://github.com/',
      linkedIn: 'https://linkedin.com/',
      twitter: 'https://twitter.com/elSharmaz',
      resume: 'https://ivanrobles.pro/some_folder/resume.pdf',
    };
    const { statusCode, body } = await api.post('/api/v1/profiles/')
      .send(data)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/name/);
  });
  test('should return 400, profilePic, blog, github, linkedIn, twitter, resume must be a valid uri', async () => {
    const profileData = {
      name: 'Albert',
      profilePic: 'profile_pic',
      about: 'The greatest and most influential scientists of all time',
      blog: 'wordpress',
      github: 'github.com/',
      linkedIn: 'linkedin',
      twitter: 'twitter',
      resume: 'resume_link',
    };
    const { statusCode, body } = await api.post('/api/v1/profiles/')
      .send(profileData)
      .set({
        'Authorization': `Bearer ${accessTokenUser}`
      });
    expect(statusCode).toBe(400);
    expect(body.message).toMatch(/must be a valid uri/);
  });
  test('should return a new profile', async () => {
    const profileData = {
      name: 'Albert',
      profilePic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg',
      about: 'The greatest and most influential scientists of all time',
      blog: 'https://wordpress.com/',
      github: 'https://github.com/',
      linkedIn: 'https://linkedin.com/',
      twitter: 'https://twitter.com/',
      resume: 'https://ivanrobles.pro/some_folder/resume.pdf',
    };
    const { statusCode, body } = await api.post('/api/v1/profiles/')
      .send(profileData)
      .set({
        'Authorization': `Bearer ${accessTokenUser}`
      });
    const profile = await models.Profile.findByPk(body.id);
    expect(statusCode).toBe(201);
    expect(profile.name).toEqual(profileData.name);
    expect(profile.about).toEqual(profileData.about);
  });
});

describe('patch /profiles/{id}', () => {
  test('should return 401 unauthorized', async () => {
    const updateData = {
      twitter: 'https://twitter.com/nacosuke',
      resume: 'resume_link'
    };
    const { body } = await api.get('/api/v1/profiles/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const [ profile ] = body;
    const { statusCode } = await api.patch(`/api/v1/profiles/${profile.id}`)
      .send(updateData);

    expect(statusCode).toBe(401);
  });
  test('should return 400 bad request, resume should be a valid uri', async () => {
    const updateData = {
      twitter: 'https://twitter.com/nacosuke',
      resume: 'resume_link'
    };
    const { body } = await api.get('/api/v1/profiles/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const [ profile ] = body;
    const { statusCode, body: response } = await api.patch(`/api/v1/profiles/${profile.id}`)
      .send(updateData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });

    expect(statusCode).toBe(400);
    expect(response.message).toMatch(/resume/);
  });
  test('should return updated profile', async() => {
    const updateData = {
      twitter: 'https://twitter.com/nacosuke',
      resume: 'https://ivanrobles.pro/some_folder/resume.pdf'
    };
    const { body } = await api.get('/api/v1/profiles/')
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const [ profile ] = body;
    const { statusCode, body: response } = await api.patch(`/api/v1/profiles/${profile.id}`)
      .send(updateData)
      .set({
        'Authorization': `Bearer ${accessToken}`
      });
    const userProfile = await models.Profile.findByPk(response.profileId);

    expect(statusCode).toBe(200);
    expect(userProfile.resume).toBe(updateData.resume);
  });
});
