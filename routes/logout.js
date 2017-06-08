//
// Endpoint for '/logout'.
//
var express = require('express');
// var auth = require('../middleware/auth');

// get the router
var router = express.Router();

// handle GET for  '/logout'
router.get('/', function(req, res) {
  console.log('logging out'); // eslint-disable-line no-console
  req.logout();
  res.redirect('/');
});

module.exports = router;
