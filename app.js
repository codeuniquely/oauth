/* global __dirname, module */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

// hook in babel js ????
// import { default as index, login, user } from 'routes';

// some simple routing
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var user = require('./routes/user');

// paths
var publicPath = path.resolve(__dirname, 'public');
var viewPath = path.resolve(__dirname, 'views');

var app = express();

// view engine setup
app.set('views', viewPath);
app.set('view engine', 'hbs');

// middleware
app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

// Use express session support since OAuth2 requires it
app.use(session({
  secret: 'Custom Secret Session Key',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);

// passport serialize and deserialize user funtions
passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res /* , next */ ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
