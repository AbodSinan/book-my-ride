import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
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
      return Db.models.car.findByPk(args.carId).then((car) =>
        car.createBooking({
          startDateTime: args.startDateTime,
          endDateTime: args.endDateTime,
        })
      );
    },
  },
  editBooking: {
    type: BookingSchema,
    args: {
      uuid: {
        type: new GraphQLNonNull(GraphQLString),
      },
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
    async resolve(source, args) {
      const booking = await Db.models.booking.findByPk(args.uuid);
      booking.carId = args.carId || booking.carId;
      booking.startDateTime = args.startDateTime || booking.startDateTime;
      booking.endDateTime = args.endDateTime || booking.endDateTime;
      booking.save();

      return booking;
    },
  },
  deleteBooking: {
    type: BookingSchema,
    args: {
      uuid: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(source, args) {
      return Db.models.booking
        .findByPk(uuid)
        .then((booking) => booking.destroy());
    },
  },
};
