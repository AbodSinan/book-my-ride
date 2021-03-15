"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookingSchema = void 0;

var _graphql = require("graphql");

var _graphqlIsoDate = require("graphql-iso-date");

var _carSchema = require("./carSchema");

var BookingSchema = new _graphql.GraphQLObjectType({
  name: 'booking',
  description: 'A booking instance for a car by a user',
  fields: function fields() {
    return {
      uuid: {
        type: _graphql.GraphQLString,
        resolve: function resolve(booking) {
          return booking.uuid;
        }
      },
      startDateTime: {
        type: _graphqlIsoDate.GraphQLDateTime,
        resolve: function resolve(booking) {
          return booking.startDateTime;
        }
      },
      endDateTime: {
        type: _graphqlIsoDate.GraphQLDateTime,
        resolve: function resolve(booking) {
          return booking.endDateTime;
        }
      },
      car: {
        type: _carSchema.CarSchema,
        resolve: function resolve(booking) {
          return booking.getCar();
        }
      }
    };
  }
});
exports.BookingSchema = BookingSchema;