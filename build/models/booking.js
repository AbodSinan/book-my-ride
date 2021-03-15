"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Booking = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _db = _interopRequireDefault(require("./db"));

var _user = require("./user");

var _car = require("./car");

var Booking = _db["default"].define('booking', {
  uuid: {
    type: _sequelize["default"].UUID,
    primaryKey: true,
    defaultValue: _sequelize["default"].UUIDV4
  },
  startDateTime: {
    type: _sequelize["default"].DATE,
    defaultValue: Date.now()
  },
  endDateTime: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    validate: {
      isGreaterThanOtherField: function isGreaterThanOtherField(date) {
        if (date <= this.startDateTime) {
          throw new Error('endDateTime must be greater than startDateTime.');
        }
      }
    }
  }
}, {
  Sequelize: _sequelize["default"],
  validate: {
    isBookingTimeAvailable: function isBookingTimeAvailable() {
      var _this = this;

      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var car, bookings;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _db["default"].models.car.findByPk(_this.carId);

              case 2:
                car = _context.sent;
                _context.next = 5;
                return car.getBookings({
                  where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [// The start time is inside the bounds
                  {
                    startDateTime: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [(0, _defineProperty2["default"])({}, _sequelize.Op.gt, _this.startDateTime), (0, _defineProperty2["default"])({}, _sequelize.Op.lt, _this.endDateTime)])
                  }, // The end time is inside the bounds
                  {
                    endDateTime: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [(0, _defineProperty2["default"])({}, _sequelize.Op.lt, _this.endDateTime), (0, _defineProperty2["default"])({}, _sequelize.Op.gt, _this.startDateTime)])
                  }, // The times cover the entire bounds from both directions
                  (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                    startDateTime: (0, _defineProperty2["default"])({}, _sequelize.Op.lt, _this.startDateTime)
                  }, {
                    endDateTime: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, _this.endDateTime)
                  }])])
                });

              case 5:
                bookings = _context.sent;

                if (!bookings) {
                  _context.next = 8;
                  break;
                }

                throw new Error('Booking not availble at that time');

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
}); // Relationships


exports.Booking = Booking;
Booking.belongsTo(_user.User);
Booking.belongsTo(_car.Car);

_car.Car.hasMany(Booking);

_user.User.hasMany(Booking);