"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingMutations = void 0;

var _graphql = require("graphql");

var _graphqlIsoDate = require("graphql-iso-date");

var _db = _interopRequireDefault(require("../../models/db"));

var _bookingSchema = require("../bookingSchema");

var bookingMutations = {
  addBooking: {
    type: _bookingSchema.BookingSchema,
    args: {
      carId: {
        type: _graphql.GraphQLInt
      },
      startDateTime: {
        type: _graphqlIsoDate.GraphQLDateTime
      },
      endDateTime: {
        type: _graphqlIsoDate.GraphQLDateTime
      }
    },
    resolve: function resolve(source, args) {
      return _db["default"].models.car.findByPk(args.carId).then(function (car) {
        return car.createBooking({
          startDateTime: args.startDateTime,
          endDateTime: args.endDateTime
        });
      });
    }
  }
};
exports.bookingMutations = bookingMutations;