const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validatorHandler = require('../middlewares/validator.handler');
const { loginUserSchema } = require('../schemas/user.schema');

const router = express.Router();

router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  passport.authenticate('local', { session: false }),

  async (req, res, next) => {
    try {
      const { user } = req;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res
        .cookie('access_token', token,
          {
            sameSite: true,
            maxAge : (1000 * 60 * 60 *24),
          }
        )
        .json({
          user,
          token,
        });
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
