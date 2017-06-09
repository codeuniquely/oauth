/* global __dirname, module */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var status = require('http-status');
var debug = require('debug')('oauth:app');

var hbs = require('hbs');

// paths
var publicPath = path.resolve(__dirname, 'public');
var viewPath = path.resolve(__dirname, 'views');
var partialsPath = path.resolve(__dirname, 'views', 'partials');

var app = express();
var router = express.Router();

// register partials - would do them them all in one go
// but there is only one
hbs.registerPartials(partialsPath);

// view engine setup
app.set('views', viewPath);
app.set('view engine', 'hbs');

// configure third party middleware
app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

// load the config file
var config = require('./config');

// passport / oauth middleware wrapers
require('./middleware/passport')(app, passport, session, config.auth);

// authentication middleware
var auth = require('./middleware/auth')();

// load all the controllers
require('./controllers')(app, router, debug, status, passport, config, express, auth, hbs);

// force initial load onto '/dashboard'
// app.use(function(req,res) {
//   res.redirect('/dashboard');
// });

// handle errors (last)
require('./middleware/errors')(app,status);

module.exports = app;
