const express = require('express');
const { checkIsCookie, checkCookieAuth } = require('../middlewares/auth.handler');

const router = express.Router();

router.get('/',
  checkCookieAuth,
  (req, res) => {
    res.render('pages/index', { page: {title: 'Admin Panel'} });
  }
);


router.get('/login',
  checkIsCookie,
  (req, res) => {
    res.render('pages/login', { page: {title: 'Log In'} });
  }
);

module.exports = router;
