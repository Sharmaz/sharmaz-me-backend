const { PROJECT_TABLE } = require('../models/projects.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(PROJECT_TABLE, [{
      id: "7a013188-af51-4570-bd9b-fe64f047d01f",
      "user_id": "2bc34306-d83f-481a-b37d-b6967872ea36",
      name: "The Sharmaz Theme",
	    description: "Ghost CMS Theme",
	    "github_link": "https://github.com/",
      "demo_link": "https://ivanrobles.pro",
	    tags: JSON.stringify({
        list: [
          "VR",
          "Web",
          "Javascript",
          "A-frame"
	    ]}),
    }]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(PROJECT_TABLE, null, {});
  }
};
