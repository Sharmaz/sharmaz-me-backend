const  { v4 } = require('uuid');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProfilesService {

  async create(data, userId) {

    const newProfile = await models.Profile.create({
      id: v4(),
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

  async findOne(profileId) {
    const profile = await models.Profile.findByPk(profileId);
    if(!profile) {
      throw boom.notFound('Profile not found');
    }
    return profile;
  }

  async update(profileId, changes) {
    const profile = await this.findOne(profileId);
    await profile.update(changes);
    return { profileId, changes };
  }

  async delete(profileId) {
    const profile = await this.findOne(profileId);
    await profile.destroy();
  }
}

module.exports = ProfilesService;
