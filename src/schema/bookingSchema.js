import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import {
  GraphQLDateTime,
} from 'graphql-iso-date';

import {
  CarSchema,
} from './carSchema';

export const BookingSchema = new GraphQLObjectType({
  name: 'booking',
  description: 'A booking instance for a car by a user',
  fields() {
    return {
      uuid: {
        type: GraphQLString,
        resolve(booking) {
          return booking.uuid;
        }
      },
      startDateTime: {
        type: GraphQLDateTime,
        resolve(booking) {
          return booking.startDateTime;
        }
      },
      endDateTime: {
        type: GraphQLDateTime,
        resolve(booking) {
          return booking.endDateTime;
        }
      },
      car: {
        type: CarSchema,
        resolve(booking) {
          return booking.getCar();
        }
      },
    };
  }
});
