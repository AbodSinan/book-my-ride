import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';
import * as priceUtils from '../../utils/priceUtils';

import { CarSchema } from './carSchema';
import { UserSchema } from './userSchema';

// A schema for bookings, to view related info
export const BookingSchema = new GraphQLObjectType({
  name: 'Booking',
  description: 'A booking instance for a car by a user',
  fields() {
    return {
      uuid: {
        type: GraphQLString,
        resolve(booking) {
          return booking.uuid;
        },
      },
      startDateTime: {
        type: GraphQLDateTime,
        resolve(booking) {
          return booking.startDateTime;
        },
      },
      endDateTime: {
        type: GraphQLDateTime,
        resolve(booking) {
          return booking.endDateTime;
        },
      },
      // Calculate and view the price of the
      // specific booking based on the car's hourly price
      price: {
        type: GraphQLFloat,
        async resolve(booking) {
          const car = await booking.getCar();
          return priceUtils.calculatePrice({
            hourlyPrice: car.hourlyPrice,
            startDateTime: booking.startDateTime,
            endDateTime: booking.endDateTime,
          });
        },
      },
      // Get associated fields
      car: {
        type: CarSchema,
        resolve(booking) {
          return booking.getCar();
        },
      },
      // Get associated fields
      user: {
        type: UserSchema,
        resolve(booking) {
          return booking.getUser();
        },
      },
    };
  },
});
