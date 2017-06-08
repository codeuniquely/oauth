//
// OAuth2
//

var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');

// Authorisation configuration (as per spec)
var authConfig = {
  authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
  tokenURL: 'hhttps://staging-auth.wallstreetdocs.com/oauth/token',
  clientID: 'coding_test',
  clientSecret: 'bwZm5XC6HTlr3fcdzRnD',
  callbackURL: 'http://localhost:3000'
};

passport.use(new OAuth2Strategy(authConfig, function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

// middleware functions
function mustbeAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // denied. redirect to login
  res.redirect('/login');
}

// exports.isAuthenticated = passport.authenticate('client-basic', { session : false });
