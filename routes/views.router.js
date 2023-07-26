const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/login', (req, res) => {
  res.render('pages/login', { page: {title: 'Log In'} });
});

module.exports = router;
