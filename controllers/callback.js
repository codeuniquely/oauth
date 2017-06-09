//
// Endpoint for callback from Auth Services.
//

var callbackEndpoint = function(router_x, express, config, passport) {

  var router = express.Router();

  //
  // OPTIONALLY: Do not want to add aditional middleware if no 'code' in queryString,
  // but if there is, then you need to run it through passport.authenticate('oauth2')
  //
  // if (!req.code) {
  //   call like this  => router.get('/', function(req, res/* , next */) {
  // } else {
  //   call like this  => router.get('/', passport.authenticate('oauth2', config.redirects), function(req, res/* , next */) {
  // }
  //
  //
  // But, doing it like this WILL NOT WORK ...
  //
  // function middleware(req, res, next) {
  //   if (req.query && req.query.code) {
  //     return passport.authenticate('oauth2', config.redirects);
  //   }
  //   next();
  // }

  //
  // THIS ALSO WONT WORK BECAUSE passport.authenticate on '/code'
  // causes a callback to this function passing in a the same code
  // which causes this redirect again and we loop
  // router.get('/code', passport.authenticate('oauth2', config.redirects));
  //
  // router.get('/', function(req, res) {
  //   if (req.query && req.query.code) {
  //     return res.redirect('/code');
  //   }
  //   res.render('index', config.app);
  // });

  // SO - The callback from OAuth comes back here
  router.get('/', passport.authenticate('oauth2', config.redirects), function(req, res) {
    res.render('index', config.app);
  });

  return router;
};

module.exports = callbackEndpoint;
