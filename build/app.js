"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = require("express-graphql");

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));

var _passport = _interopRequireDefault(require("passport"));

var _rootSchema = _interopRequireDefault(require("./schema/rootSchema"));

var settings = _interopRequireWildcard(require("./settings"));

// Config
var APP_PORT = 3000;
var app = (0, _express["default"])();
exports.app = app;
app.use('/', (0, _expressGraphql.graphqlHTTP)({
  schema: _rootSchema["default"],
  pretty: true,
  graphiql: true
}));
app.listen(APP_PORT, function () {
  console.log("App listening on port ".concat(APP_PORT));
});