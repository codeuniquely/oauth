//
// Endpoint for '/secure'.
//
var request = require('request');

var secureEndpoint = function(router_x, express, status, config, passport, auth) { // , hbs) {

  var router = express.Router();

  function getProfile(token, callback) {

    var api = config.urls.userInfo;

    // curl -X GET
    //   -H "Authorization: Bearer [YOUR_TOKEN]"
    //   -H "Cache-Control: no-cache"
    //   "https://staging-auth.wallstreetdocs.com/oauth/userinfo"

    request.get(api, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token,
      },
      // auth: {
      //   'bearer': token
      // }
    }, function(err, response, body) {
      if ( err ) {
        return callback(err);
      }
      if (response.statusCode !== status.OK) {
        var error = new Error(response.statusMessage);
        error.status = response.statusCode;
        return callback(error);
      }
      callback(null, body);
    });
  }

  // =================================================
  // Expected: JSON structure returned by userInfo
  // =================================================
  // {
  //    "provider":"wsd",
  //    "id":"1c590968-54ce-44e8-bc85-79bf7ff181ad",
  //    "emails":[
  //       {
  //          "value":"codingtest@wallstreetdocs.com",
  //          "type":"default"
  //       }
  //    ],
  //    "user_type_id":4,
  //    "user_type":"Org User",
  //    "roles":[
  //    ],
  //    "scopes":"email profile",
  //    "organisation_id":1,
  //    "organisation_name":"WallStreetDocs Ltd",
  //    "organisation":{
  //       "id":1,
  //       "name":"WallStreetDocs Ltd"
  //    },
  //    "consortiums":[
  //    ],
  //    "organisations":[
  //       {
  //          "id":1,
  //          "name":"WallStreetDocs Ltd",
  //          "created_by":"5e6d8f9b-e93c-4575-a287-758c4f19c32b",
  //          "updated_by":"5e6d8f9b-e93c-4575-a287-758c4f19c32b",
  //          "deleted_at":null,
  //          "deleted_by":null,
  //          "created_at":"2016-03-03T16:39:33.058Z",
  //          "updated_at":"2016-03-03T16:39:34.278Z",
  //          "primary":true
  //       }
  //    ],
  //    "display_name":"Coding Test",
  //    "name":{
  //       "family_name":"Test",
  //       "given_name":"Coding",
  //       "middle_name":""
  //    },
  //    "photos":[
  //       "http://todo"
  //    ],
  //    "username":"codingtest",
  //    "created_at":"2016-12-06T18:34:08.470Z",
  //    "updated_at":"2017-06-09T06:52:35.753Z"
  // }
  // =================================================

  // GET request for authentication - use 'oauth2' for call
  router.get('/', auth.mustbeAuthenticated, function(req,res){
    var token = req.user.token;
    getProfile(token,function(err, profile){
      if (err) {
        res.status = err.status | status.INTERNAL_SERVER_ERROR;
        res.redirect('error', { message: err.message, error:err });
      }

      // response is a string - needs parsing
      var payload = JSON.parse(profile);

      // Just want to dump the JSON, pretty up the object
      // It will then be written in profile in a <pre> not
      // actually important here for simplicity, if you're
      // using the payload, you can get specific properties
      var pretty = JSON.stringify(payload, null, 4);

      res.render('profile', { payload:payload, profile:pretty });
    });
  });

  return router;
};

module.exports = secureEndpoint;
