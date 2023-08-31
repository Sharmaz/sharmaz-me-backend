const { PROFILE_TABLE } = require('../models/profile.model');

module.exports = {
  async up ({ context: queryInterface }) {
    await queryInterface.bulkInsert(PROFILE_TABLE, [{
      id: "2a013188-af51-4570-bd9b-fe64f047d01f",
      "user_id": "2bc34306-d83f-481a-b37d-b6967872ea36",
      name: "Albert Einsten",
      "profile_pic": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/360px-Albert_Einstein_Head.jpg",
      about: "The greatest and most influential scientists of all time",
      blog: "htps://wordpress.com/",
      github: "https://github.com/",
      linkedIn: "https://linkedin.com/",
      twitter: "https://twitter.com/"
    }], {});
  },

  async down ({ context: queryInterface }) {
    await queryInterface.bulkDelete(PROFILE_TABLE, null, {});
  }
};
