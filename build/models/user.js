"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _faker = _interopRequireDefault(require("faker"));

var _db = _interopRequireDefault(require("./db"));

var User = _db["default"].define('user', {
  emailAddress: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    valiate: {
      isEmail: true
    }
  },
  firstName: {
    type: _sequelize["default"].STRING
  },
  lastName: {
    type: _sequelize["default"].STRING
  },
  userName: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  gender: {
    type: _sequelize["default"].ENUM('male', 'female', 'other')
  },
  password: {
    type: _sequelize["default"].STRING
  },
  isVerified: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  }
});

exports.User = User;