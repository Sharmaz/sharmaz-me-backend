const { PROFILE_TABLE, ProfileSchema } = require('../models/profile.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PROFILE_TABLE, ProfileSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PROFILE_TABLE);
  }
};
