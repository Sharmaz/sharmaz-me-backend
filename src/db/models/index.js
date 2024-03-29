const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { Job, JobSchema } = require('./jobs.model');
const { Project, ProjectSchema } = require('./projects.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
  Job.init(JobSchema, Job.config(sequelize));
  Project.init(ProjectSchema, Project.config(sequelize));

  Profile.associate(sequelize.models);
  User.associate(sequelize.models);
  Job.associate(sequelize.models);
  Project.associate(sequelize.models);
}

module.exports = setupModels;
