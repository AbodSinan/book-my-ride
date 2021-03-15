import { GraphQLInt } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import Db from '../../models/db';
import { BookingSchema } from '../bookingSchema';

export const bookingMutations = {
    addBooking: {
        type: BookingSchema,
        args: {
          carId: {
            type: GraphQLInt,
          },
          startDateTime: {
            type: GraphQLDateTime,
          },
          endDateTime: {
            type: GraphQLDateTime,
          },
        },
        resolve(source, args) {
          return Db.models.car.findByPk(args.carId).then(
            car => car.createBooking({
              startDateTime: args.startDateTime,
              endDateTime: args.endDateTime,
            })
          );
        }
      }
};