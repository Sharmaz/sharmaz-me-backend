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
      const userModel = await usersService.findOne(sub);
      const user = userModel.get({ plain: true });
      let users;

      if (user.role === 'admin') {
        const usersModels = await usersService.find();
        users = usersModels.map((u) => u.get({ plain: true }));
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

router.get('/logout',
  checkCookieAuth,
  (req, res) => {
    res
      .clearCookie('access_token')
      .status(200)
      .redirect('/');
  }
);

router.get('*', (req, res) => {
  res
    .status(404)
    .render('pages/404', { page: { title: '404 Not Found' }});
});

module.exports = router;
