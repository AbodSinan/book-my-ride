import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import Db from '../../models/db';
import { BookingSchema } from '../schemas/bookingSchema';

export const bookingMutations = {
  addBooking: {
    type: BookingSchema,
    args: {
      CarId: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      startDateTime: {
        type: GraphQLDateTime,
      },
      endDateTime: {
        type: GraphQLDateTime,
      },
    },
    async resolve(root, args, request) {
      try {
        const car = await Db.models.Car.findByPk(args.CarId);
        const booking = await car.createBooking({
          startDateTime: args.startDateTime,
          endDateTime: args.endDateTime,
        });
        await booking.setUser(request.user);
        return booking;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  editBooking: {
    type: BookingSchema,
    args: {
      uuid: {
        type: new GraphQLNonNull(GraphQLString),
      },
      CarId: {
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
      const booking = await Db.models.Booking.findByPk(args.uuid);

      booking.CarId = args.CarId || booking.CarId;
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
      return Db.models.Booking.findByPk(args.uuid).then((booking) =>
        booking.destroy()
      );
    },
  },
};
