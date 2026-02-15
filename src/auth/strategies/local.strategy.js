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
        return done(boom.unauthorized(), false);
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return done(boom.unauthorized(), false);
      }
      const { password: _, ...userData } = user.toJSON();
      return done(null, userData);
    } catch(error) {
      return done(error, false);
    }
  }
);

module.exports = LocalStrategy;
