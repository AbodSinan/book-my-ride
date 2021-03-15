"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = require("express-graphql");

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));

var _passport = _interopRequireDefault(require("passport"));

var _rootSchema = _interopRequireDefault(require("./schema/rootSchema"));

var settings = _interopRequireWildcard(require("./settings"));

// Config
var APP_PORT = 3000;

_passport["default"].use(new _passportGoogleOauth["default"]({
  clientID: settings.googleClientId,
  clientSecret: settings.googleClientSecret,
  callbackURL: 'http://yourdomain:3000/auth/google/callback',
  passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    googleId: profile.id
  }, function (err, user) {
    return done(err, user);
  });
}));

var app = (0, _express["default"])();
app.use('/graphql', (0, _expressGraphql.graphqlHTTP)({
  schema: _rootSchema["default"],
  pretty: true,
  graphiql: true
}));
app.get('/auth/google', _passport["default"].authenticate('google', {
  scope: ['profile']
}));
app.get('/auth/google/callback', _passport["default"].authenticate('google', {
  failureRedirect: '/login'
}), function (req, res) {
  // Successful authentication, redirect home.
  res.redirect('/graphql');
});
app.configure(function () {
  app.use(_express["default"]["static"]('public'));
  app.use(_express["default"].cookieParser());
  app.use(_express["default"].bodyParser());
  app.use(_express["default"].session({
    secret: 'keyboard cat'
  }));
  app.use(_passport["default"].initialize());
  app.use(_passport["default"].session());
  app.use(app.router);
});
app.listen(APP_PORT, function () {
  console.log("App listening on port ".concat(APP_PORT));
});