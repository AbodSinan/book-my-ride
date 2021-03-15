"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarModel = exports.Car = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _lodash = _interopRequireDefault(require("lodash"));

var _faker = _interopRequireDefault(require("faker"));

var _db = _interopRequireDefault(require("./db"));

var Car = _db["default"].define('car', {
  name: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  description: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  }
});

exports.Car = Car;

var CarModel = _db["default"].define('carModel', {
  name: {
    type: _sequelize["default"].STRING,
    allowNull: false
  }
}); // Relationships


exports.CarModel = CarModel;
CarModel.hasMany(Car);
Car.belongsTo(CarModel); // Create 10 categories containing a product

_db["default"].sync({
  force: true
}).then(function () {
  _lodash["default"].times(2, function () {
    return CarModel.create({
      name: _faker["default"].name.firstName(),
      order: _faker["default"].random.number()
    }).then(function (carModel) {
      _lodash["default"].times(5, function () {
        return carModel.createCar({
          name: _faker["default"].company.companyName(),
          description: _faker["default"].lorem.paragraph()
        }).then(function (car) {
          _lodash["default"].times(5, function () {
            return car.createBooking({
              uuid: _faker["default"].random.uuid(),
              startDateTime: _faker["default"].date.soon(),
              endDateTime: _faker["default"].date.future()
            });
          });
        });
      });
    });
  });
});