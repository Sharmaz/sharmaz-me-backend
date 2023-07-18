const  { v4 } = require('uuid');

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
    const profiles = await models.Profile.findAll({
      where: { userId }
    });
    return profiles;
  }

  async findOne(profileId) {
    const profile = await models.Profile.findByPk(profileId);
    return profile;
  }

  async update(profileId, changes) {
    const profile = await models.Profile.findByPk(profileId);
    await profile.update(changes);
    return { profileId, changes };
  }

  async delete(profileId) {
    const profile = await models.Profile.findByPk(profileId);
    await profile.destroy();
    return { profileId };
  }
}

module.exports = ProfilesService;
