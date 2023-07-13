const SequelizeMock = require('sequelize-mock');

const UsersService = require('../services/users.service');

const usersService = new UsersService();

jest.mock('../db/models/user.model.js', () => {
  
  const dbMock = new SequelizeMock();
  return dbMock.define('User', {
    id: "2bc34306-d83f-481a-b37d-b6967872ea36",
    email: "example@example.com",
    password: "admin123",
    "created_at": new Date()
  });
});

describe('Test sequelize mocking', () => {
  it('Shoud get value from mock', async () => {
    const user = await usersService.findOne('2bc34306-d83f-481a-b37d-b6967872ea36');
    expect(user.email).toEqual('example@example.com');
  });
});
