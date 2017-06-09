//
// our authentication middleware
//

var auth = function() {

  // middleware functions
  function mustbeAuthenticated(req, res, next) {
    var user = req.user;
    if (user) {
      return next();
    }
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  }

  return {
    mustbeAuthenticated: mustbeAuthenticated
  };

};

module.exports = auth;
