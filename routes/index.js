//
// Endpoint for '/'.
//
var express = require('express');
var router = express.Router();

// serve GET request for home page.
router.get('/', function(req, res/* , next */) {

  var payload = {
    title: 'A simple JavaScript - Starter App',
    subtitle: 'Using Express 4, Handlebars, PassportJS, Node JS and JQuery',
    authenticated: false
  };

  if (req.isAuthenticated()) {
    payload.authenticated = true;
    payload.user = JSON.stringify(req.user, null, 4);
    // html += "<p>authenticated as user:</p>"
    // html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  }

  res.render('index', payload);
});

module.exports = router;
