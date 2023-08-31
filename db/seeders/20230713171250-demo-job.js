const { JOB_TABLE } = require('../models/jobs.model');

module.exports = {
  async up (queryInterface) {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    await queryInterface.bulkInsert(JOB_TABLE, [{
      id: "5a013188-af51-4570-bd9b-fe64f047d01a",
      "user_id": "2bc34306-d83f-481a-b37d-b6967872ea36",
      name: "modcloth",
	    "date_started": "2020-07-01",
	    "date_ended": "2021-10-01",
	    description: "It is a payment method oriented to travel agencies.",
	    role: "Software Engineer",
	    details: JSON.stringify({
        list: [
          "Added features with react with context API as a state handler. I used Bootstrap and CSS for the styles.",
          "Adapting features. In another part of the project, I worked with ClojureScript and Reagent to use React in ClojureScript. This section was stylized with LESS.",
          "Bug fixing."
	      ],
      }),
    }]);
  },

  async down (queryInterface) {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    await queryInterface.bulkDelete(JOB_TABLE, null, {});
  }
};
