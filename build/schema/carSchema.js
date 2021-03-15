"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarModelSchema = exports.CarSchema = void 0;

var _graphql = require("graphql");

var _graphqlIsoDate = require("graphql-iso-date");

var _definition = require("graphql/type/definition");

var _bookingSchema = require("./bookingSchema");

var CarSchema = new _graphql.GraphQLObjectType({
  name: 'Car',
  description: 'A single car in the inventory',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(car) {
          return car.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(car) {
          return car.name;
        }
      },
      description: {
        type: _graphql.GraphQLString,
        resolve: function resolve(car) {
          return car.description;
        }
      },
      createdAt: {
        type: _graphqlIsoDate.GraphQLDateTime,
        resolve: function resolve(car) {
          return car.createdAt;
        }
      },
      model: {
        type: CarModelSchema,
        resolve: function resolve(car) {
          return car.getCarModel();
        }
      },
      bookings: {
        type: new _definition.GraphQLList(_bookingSchema.BookingSchema),
        resolve: function resolve(car) {
          return car.getBookings();
        }
      }
    };
  }
});
exports.CarSchema = CarSchema;
var CarModelSchema = new _graphql.GraphQLObjectType({
  name: 'CarModel',
  description: 'The model of the car',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(carModel) {
          return carModel.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(carModel) {
          return carModel.name;
        }
      },
      cars: {
        type: new _definition.GraphQLList(CarSchema),
        resolve: function resolve(carModel) {
          return carModel.getCars();
        }
      }
    };
  }
});
exports.CarModelSchema = CarModelSchema;