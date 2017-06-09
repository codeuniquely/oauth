//
// Endpoint for '/login'.
//

var loginEndpoint = function(router_x, express, status, passport) {

  var config = {
    successRedirect: '/secure',
    failureRedirect: '/login'
  };

  var router = express.Router();

  // GET request for authentication - use 'oauth2' for call
  router.get('/', passport.authenticate('oauth2', config));

  return router;
};

module.exports = loginEndpoint;
