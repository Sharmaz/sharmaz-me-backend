const { randomUUID } = require('crypto');
const boom = require('@hapi/boom');
const { hash } = require('bcrypt');

const { models } = require('../libs/sequelize');

class UsersService {

  async create(data) {
    const encryptedPassword = await hash(data.password, 10);
    const newUser = await models.User.create({
      id: randomUUID(),
      ...data,
      password: encryptedPassword,
      createdAt: new Date(),
    });
    const createdUser = await models.User.findByPk(newUser.id, {
      attributes: { exclude: ['password'] },
    });
    return createdUser;
  }

  async find() {
    const users = await models.User.findAll({
      attributes: ['id', 'email', 'role'],
    });
    if(!users) {
      throw boom.notFound('Users not found');
    }
    return users;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
      include: ['profile'],
    });
    return user;
  }

  async findOne(userId) {
    const user = await models.User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: ['profile', 'jobs', 'projects'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
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
