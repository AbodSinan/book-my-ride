"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carModelMutations = exports.carMutations = void 0;

var _graphql = require("graphql");

var _db = _interopRequireDefault(require("../../models/db"));

var _carSchema = require("../carSchema");

var carMutations = {
  addCar: {
    type: _carSchema.CarSchema,
    args: {
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      description: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      carModelId: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    },
    resolve: function resolve(source, args) {
      return _db["default"].models.carModel.findByPk(args.carModelId).then(function (carModel) {
        return carModel.createCar({
          name: args.name,
          description: args.description
        });
      });
    }
  }
};
exports.carMutations = carMutations;
var carModelMutations = {
  addCarModel: {
    type: _carSchema.CarModelSchema,
    args: {
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    resolve: function resolve(source, args) {
      return _db["default"].models.carModel.create({
        name: args.name
      });
    }
  }
};
exports.carModelMutations = carModelMutations;