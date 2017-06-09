var config = {
  app: {
    title: 'A simple JavaScript starter app',
    subtitle: 'using NodeJS, Express 4, Handlebars, Passport and JQuery',
  },

  urls: {
    authorization: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
    token: 'https://staging-auth.wallstreetdocs.com/oauth/token',
    userInfo: 'https://staging-auth.wallstreetdocs.com/oauth/userinfo',
  },

  auth: {
    clientID: 'coding_test',
    clientSecret: 'bwZm5XC6HTlr3fcdzRnD',
    authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
    tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
    callbackURL: 'http://localhost:3000'
  },

  redirects: {
    successRedirect: '/secure',
    failureRedirect: '/login'
  }

};

module.exports = config;
