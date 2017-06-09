//
//
//
var errorMiddleware = function(app, status) {

  // Catch 404 errors and throw into error handler
  app.use(function(req, res/* , next */) {
    var err = new Error('Page Not Found');
    err.status = status.NOT_FOUND;
    throw err;
  });

  // error handler
  app.use(function(err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (res.headersSent) {
      return next(err);
    }

    // render the error page
    res.status(err.status || status.INTERNAL_SERVER_ERROR);
    res.render('error');
  });

};

module.exports =  errorMiddleware;
