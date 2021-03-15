"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Conn = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var settings = _interopRequireWildcard(require("../settings"));

var Conn = new _sequelize["default"](settings.connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
exports.Conn = Conn;
var _default = Conn;
exports["default"] = _default;