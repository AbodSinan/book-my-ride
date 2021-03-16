import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { Booking } from '../../models/booking';
import { BookingSchema } from '../schemas/bookingSchema';

export const bookingQueries = {
  userBookings: {
    type: new GraphQLList(BookingSchema),
    description: 'Get list of all bookings for the request user',
    args: {
      uuid: {
        type: GraphQLString,
      },
      startDateTime: {
        type: GraphQLDateTime,
      },
      endDateTime: {
        type: GraphQLDateTime,
      },
      CarId: {
        type: GraphQLInt,
      },
    },
    resolve(root, args, request) {
      return request.user.getBookings({ where: args });
    },
  },
  bookings: {
    type: new GraphQLList(BookingSchema),
    description: 'Get list of all bookings',
    args: {
      uuid: {
        type: GraphQLString,
      },
      startDateTime: {
        type: GraphQLDateTime,
      },
      endDateTime: {
        type: GraphQLDateTime,
      },
      CarId: {
        type: GraphQLInt,
      },
    },
    resolve(root, args) {
      return Booking.findAll({ where: args });
    },
  },
};
