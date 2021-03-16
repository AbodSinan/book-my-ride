import { GraphQLList, GraphQLInt, GraphQLString, GraphQLFloat } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { Op } from 'sequelize';

import { Booking } from '../../models/booking';
import { Car, CarModel } from '../../models/car';
import { CarSchema, CarModelSchema } from '../schemas/carSchema';

export const carQueries = {
  cars: {
    type: new GraphQLList(CarSchema),
    args: {
      id: {
        type: GraphQLInt,
      },
      name: {
        type: GraphQLString,
      },
      hourlyPrice: {
        type: GraphQLFloat,
      },
    },
    resolve(root, args) {
      return Car.findAll({ where: args });
    },
  },
  availableCars: {
    type: new GraphQLList(CarSchema),
    args: {
      carModelId: {
        type: GraphQLInt,
      },
      startDateTime: {
        type: GraphQLDateTime,
      },
      endDateTime: {
        type: GraphQLDateTime,
      },
    },
    async resolve(root, args) {
      const cars = await Car.findAll({
        where: {
          [Op.or]: {
            '$bookings.startDateTime$': { [Op.gt]: args.endDateTime },
            '$bookings.endDateTime$': { [Op.lt]: args.startDateTime },
          },
        },
        include: {
          model: Booking,
          as: 'bookings',
        },
      });
      return cars;
    },
  },
  carModels: {
    type: new GraphQLList(CarModelSchema),
    resolve(root, args) {
      return CarModel.findAll({ where: args });
    },
  },
};
