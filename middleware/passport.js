//
// Our passport middleware
//

var OAuth2Strategy = require('passport-oauth2');

var passportMiddleware = function(app, passport, session, authConfig) {

  // Use express session support since OAuth2 requires it
  app.use(session({
    secret: 'Custom Secret Session Key',
    saveUninitialized: true,
    resave: true
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  // passport serialize and deserialize user funtions
  passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    done(null, user);
  });

  console.log('passportMiddleware deserializeUser'); // eslint-disable-line no-console
  passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    done(null, user);
  });

  passport.use(new OAuth2Strategy(authConfig, function(accessToken, refreshToken, profile, done) {
    // return a user object based on this info
    done(null, { token:accessToken, refresh:refreshToken, profile:profile });
  }));
};

module.exports = passportMiddleware;
