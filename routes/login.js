//
// Endpoint for '/login'.
//
var express = require('express');
var passport = require('passport');
var router = express.Router();

var config = {
  // failureFlash: true,
  successRedirect: '/',  // '/home',
  failureRedirect: '/login'
};

// serve 'login' view
router.get('/', function(req, res) {
  res.render('login');
});

// router.post('/login', passport.authenticate('local'), function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.redirect('/users/' + req.user.username);
// });

// router.get('/auth/example',
//   passport.authenticate('oauth2'));

// router.get('/auth/example/callback',
//   passport.authenticate('oauth2', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

// router.post('/', passport.authenticate('oauth2', config), function(req,res) {
//   console.log('LOGIN REQ'); // eslint-disable-line no-console
// });

router.post('/', passport.authenticate('oauth2', config), function(req,res) {

  var userId = req.body.userField;
  var password = req.body.passField;

  if (typeof userId === 'undefined' || typeof password === 'undefined') {
    throw new Error('You must provide a userID and Password');
  }

  // console.log('WELL FUCK ME !!!'); // eslint-disable-line no-console
});

module.exports = router;
