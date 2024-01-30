const { JobSchema, JOB_TABLE } = require('../models/jobs.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(JOB_TABLE, JobSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(JOB_TABLE);
  }
};
