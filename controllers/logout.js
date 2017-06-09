//
// Endpoint for '/logout'.
//

var logoutEndpoint = function(router_x, express, debug) {

  var router = express.Router();

  router.get('/', function(req, res/* , next */) {
    debug('logging out');
    req.logout();
    res.redirect('/dashboard');
  });

  return router;
};

module.exports = logoutEndpoint;
