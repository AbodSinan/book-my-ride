import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { Op } from 'sequelize';
import { GraphQLDateTime } from 'graphql-iso-date';

import { CarSchema, CarModelSchema } from './carSchema';
import { Car, CarModel } from '../models/car';
import { carModelMutations, carMutations } from './mutations/carMutations';
import { Booking } from '../models/booking';
import { BookingSchema } from './bookingSchema';
import { bookingMutations } from './mutations/bookingMutations';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query Object',
  fields: () => ({
    cars: {
      type: new GraphQLList(CarSchema),
      resolve(root, args) {
        return Car.findAll({ where: args });
      }
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
              '$bookings.endDateTime$': { [Op.lt]: args.startDateTime},
            }
          },
          include: {
            model: Booking,
            as: 'bookings',
          }
        });
        return cars

      }
    },
    bookings: {
      type: new GraphQLList(BookingSchema),
      resolve(root, args) {
        return Booking.findAll({ where: args });
      }
    },
    carModels: {
      type: new GraphQLList(CarModelSchema),
      resolve(root, args) {
        return CarModel.findAll({ where: args });
      }
    },
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions for CRUDing models',
  fields() {
    return {
      ...carMutations,
      ...carModelMutations,
      ...bookingMutations,
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
