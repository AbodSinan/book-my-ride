import { GraphQLList } from 'graphql';

import { Booking } from '../../models/booking';
import { BookingSchema } from '../schemas/bookingSchema';

export const bookingQueries = {
  userBookings: {
    type: new GraphQLList(BookingSchema),
    resolve(root, args, request) {
      return request.user.getBookings({ where: args });
    },
  },
  bookings: {
    type: new GraphQLList(BookingSchema),
    resolve(root, args) {
      return Booking.findAll({ where: args });
    },
  },
};
