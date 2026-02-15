const { PROFILE_TABLE, ProfileSchema } = require('../models/profile.model');

module.exports = {
  async up (queryInterface) {
    const tableDesc = await queryInterface.describeTable(PROFILE_TABLE);
    if (!tableDesc.resume) {
      await queryInterface.addColumn(PROFILE_TABLE, 'resume', ProfileSchema.resume);
    }
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PROFILE_TABLE, 'resume');
  }
};
