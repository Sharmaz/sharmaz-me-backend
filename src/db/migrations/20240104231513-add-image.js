const { PROJECT_TABLE, ProjectSchema } = require('../models/projects.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PROJECT_TABLE, 'image_link', ProjectSchema.imageLink);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PROJECT_TABLE, 'image_link');
  }
};
