const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert(USER_TABLE, [{
      id: "2bc34306-d83f-481a-b37d-b6967872ea36",
      email: "example@example.com",
      password: "$2b$10$zFKfOGfw5aYBX1.QadlQS.JdyMLbr9vEF.kc5Kddt1.tIxH1atOCu",
      role: "admin",
      "created_at": new Date()
    }]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
