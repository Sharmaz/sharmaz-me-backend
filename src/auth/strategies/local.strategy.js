const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const { compare } = require('bcrypt');

const UserService = require('../../services/users.service');

const userService = new UserService();
const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await userService.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
