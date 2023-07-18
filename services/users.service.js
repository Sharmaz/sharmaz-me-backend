const  { v4 } = require('uuid');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {

  async create(data) {

    const newUser = await models.User.create({
      id: v4(),
      ...data,
      createdAt: new Date(),
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      attributes: ['id', 'email'],
    });
    if(!users) {
      throw boom.notFound('Users not found');
    }
    return users;
  }

  async findOne(userId) {
    const user = await models.User.findByPk(userId, {
      include: ['profile', 'jobs', 'projects'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(userId, changes) {
    const user = await this.findOne(userId);
    await user.update(changes);
    return { userId, changes };
  }

  async delete(userId) {
    const user = await this.findOne(userId);
    await user.destroy();
  }
}

module.exports = UsersService;
