const { randomUUID } = require('crypto');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProfilesService {

  async create(data, userId) {

    const newProfile = await models.Profile.create({
      id: randomUUID(),
      userId,
      ...data,
    })
    return newProfile;
  }

  async find(userId) {
    const profile = await models.Profile.findAll({
      where: { userId }
    });

    if(!profile || profile.length < 1) {
      throw boom.notFound('Profile not found');
    }
    return profile;
  }

  async findOne(profileId, user) {
    const profile = await models.Profile.findByPk(profileId);
    if(!profile) {
      throw boom.notFound('Profile not found');
    }
    if (profile.userId !== user.sub) {
      throw boom.unauthorized();
    }
    return profile;
  }

  async update(profileId, changes, user) {
    const profile = await this.findOne(profileId, user);
    await profile.update(changes);
    return { profileId, changes };
  }

  async delete(profileId, user) {
    const profile = await this.findOne(profileId, user);
    await profile.destroy();
  }
}

module.exports = ProfilesService;
