//
// Endpoint for '/user'.
//
var express = require('express');
var router = express.Router();

// serve GET request for 'user' page.
router.get('/', function(req, res/* , next */) {
  res.render('user');
});

module.exports = router;
