"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimalPlaces = exports.googleClientSecret = exports.googleClientId = exports.connectionString = exports.testEnvironmentVariable = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
exports.testEnvironmentVariable = testEnvironmentVariable;
var connectionString = process.env.DATABASE_URL;
exports.connectionString = connectionString;
var googleClientId = process.env.GOOGLE_CLIENT_ID;
exports.googleClientId = googleClientId;
var googleClientSecret = process.env.GOOGLE_CLIENT_SECTRET;
exports.googleClientSecret = googleClientSecret;
var decimalPlaces = 2;
exports.decimalPlaces = decimalPlaces;