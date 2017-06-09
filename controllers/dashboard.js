//
// Endpoint for main page.
//

var dashboardpoint = function(router_x, express, config, passport) {

  var router = express.Router();

  // open access - no auth checks - just render the page
  router.get('/', function(req, res) {
    res.render('index', config.app);
  });

  return router;
};

module.exports = dashboardpoint;
