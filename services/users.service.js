const  { v4 } = require('uuid');

const { models } = require('../libs/sequelize');


class UsersService {
  constructor() {
    this.users = [];
  }

  async create(data) {

    const newUser = await models.User.create({
      id: v4(),
      ...data,
      createdAt: new Date(),
    })
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      attributes: ['id', 'email'],
    });
    return users;
  }

  async findOne(userId) {
    const user = await models.User.findByPk(userId, {
      attributes: ['id', 'email'],
    });
    return user;
  }

  async update(userId, changes) {
    const user = await models.User.findByPk(userId);
    await user.update(changes);
    return { userId, changes };
  }

  async delete(userId) {
    const user = await models.User.findByPk(userId);
    await user.destroy();
    return { userId };
  }
}

module.exports = UsersService;
