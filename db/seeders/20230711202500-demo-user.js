const  { v4 } = require('uuid');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert(USER_TABLE, [{
      id: v4(),
      email: "example@example.com",
      password: "admin123",
      "created_at": new Date()
    }]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
