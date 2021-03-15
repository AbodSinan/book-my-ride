"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailVerification = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _crypto = _interopRequireDefault(require("crypto"));

var _db = _interopRequireDefault(require("./db"));

var _user = _interopRequireDefault(require("./user"));

var EmailVerification = _db["default"].describe('emailVerification', {
  key: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  validTo: {
    type: _sequelize["default"].DATE
  }
}, {
  Sequelize: _sequelize["default"],
  validate: {
    singleInstancePerMinute: function singleInstancePerMinute() {
      console.log(this);
    }
  }
});

exports.EmailVerification = EmailVerification;
EmailVerification.addHook('beforeCreate', function (emailVerification, options) {
  emailVerification.key = _crypto["default"].randomBytes(20).toString('hex');
}); // Relationships

EmailVerification.belongsTo(_user["default"]);

_user["default"].hasMany(EmailVerification);