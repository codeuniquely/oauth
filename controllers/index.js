//
// Routing
//

// use injectable libraries (app, router, debug, status, passport, config)
var routingLib = function(app, router, debug, status, passport, config, express, auth, hbs) {

  // require and inject various endpoint handling controllers
  var dashboard = require('./dashboard')(router, express, config, passport);
  var callback = require('./callback')(router, express, config, passport);
  var login = require('./login')(router, express, status, passport);
  var logout = require('./logout')(router, express, debug);
  var secure = require('./secure')(router, express, status, config, passport, auth);

  // apply the controller to the desired endpoints
  app.use('/', callback);
  app.use('/dashboard', dashboard);
  app.use('/login', login);
  app.use('/logout', logout);
  app.use('/secure', secure);
};

module.exports = routingLib;