const express = require('express');
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

      res.render('pages/index', {
        page: { title: 'Admin Panel' },
        user,
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
    res.render('pages/login', { page: { title: 'Log In' }});
  }
);

router.get('*', (req, res) => {
  res.render('pages/404', { page: { title: '404 Not Found' }})
});

module.exports = router;
