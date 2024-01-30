const { ProjectSchema, PROJECT_TABLE } = require('../models/projects.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PROJECT_TABLE, ProjectSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PROJECT_TABLE);
  }
};
