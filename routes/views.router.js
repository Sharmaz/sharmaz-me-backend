const express = require('express');
const config = require('../config/config');
const { checkIsCookie, checkCookieAuth } = require('../middlewares/auth.handler');
const UsersService = require('../services/users.service');

const router = express.Router();
const usersService = new UsersService();

router.get('/',
  checkCookieAuth,
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const userRaw = await usersService.findOne(sub);
      const userString = JSON.stringify(userRaw);
      const user = JSON.parse(userString);
      let users;

      if (user.role === 'admin') {
        const usersRaw = await usersService.find();
        const usersString = JSON.stringify(usersRaw);
        users = JSON.parse(usersString);
      }

      res.render('pages/index', {
        page: { title: 'Admin Panel' },
        user,
        users,
        isProd: config.isProd,
        helpers: {
          isAdmin(role, options) {
            if(role === 'admin') {
              return options.fn(this);
            }
            return null;
          },
        },
      });
    }
    catch(error) {
      next(error);
    }
  }
);

router.get('/login',
  checkIsCookie,
  (req, res) => {
    res.render('pages/login', {
      page: { title: 'Log In' },
      isProd: config.isProd,
    });
  }
);

router.get('*', (req, res) => {
  res.render('pages/404', { page: { title: '404 Not Found' }})
});

module.exports = router;
