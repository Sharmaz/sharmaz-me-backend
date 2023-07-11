const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));

  Profile.associate(sequelize.models);
}

module.exports = setupModels;
