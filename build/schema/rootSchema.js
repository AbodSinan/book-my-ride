"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

var _sequelize = require("sequelize");

var _graphqlIsoDate = require("graphql-iso-date");

var _carSchema = require("./carSchema");

var _car = require("../models/car");

var _carMutations = require("./mutations/carMutations");

var _booking = require("../models/booking");

var _bookingSchema = require("./bookingSchema");

var _bookingMutations = require("./mutations/bookingMutations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'Root Query Object',
  fields: function fields() {
    return {
      cars: {
        type: new _graphql.GraphQLList(_carSchema.CarSchema),
        resolve: function resolve(root, args) {
          return _car.Car.findAll({
            where: args
          });
        }
      },
      availableCars: {
        type: new _graphql.GraphQLList(_carSchema.CarSchema),
        args: {
          carModelId: {
            type: _graphql.GraphQLInt
          },
          startDateTime: {
            type: _graphqlIsoDate.GraphQLDateTime
          },
          endDateTime: {
            type: _graphqlIsoDate.GraphQLDateTime
          }
        },
        resolve: function resolve(root, args) {
          return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
            var cars;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _car.Car.findAll({
                      where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, {
                        '$bookings.startDateTime$': (0, _defineProperty2["default"])({}, _sequelize.Op.gt, args.endDateTime),
                        '$bookings.endDateTime$': (0, _defineProperty2["default"])({}, _sequelize.Op.lt, args.startDateTime)
                      }),
                      include: {
                        model: _booking.Booking,
                        as: 'bookings'
                      }
                    });

                  case 2:
                    cars = _context.sent;
                    return _context.abrupt("return", cars);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      },
      bookings: {
        type: new _graphql.GraphQLList(_bookingSchema.BookingSchema),
        resolve: function resolve(root, args) {
          return _booking.Booking.findAll({
            where: args
          });
        }
      },
      carModels: {
        type: new _graphql.GraphQLList(_carSchema.CarModelSchema),
        resolve: function resolve(root, args) {
          return _car.CarModel.findAll({
            where: args
          });
        }
      }
    };
  }
});
var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions for CRUDing models',
  fields: function fields() {
    return _objectSpread(_objectSpread(_objectSpread({}, _carMutations.carMutations), _carMutations.carModelMutations), _bookingMutations.bookingMutations);
  }
});
var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});
var _default = Schema;
exports["default"] = _default;