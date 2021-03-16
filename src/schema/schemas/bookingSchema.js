import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';
import * as priceUtils from '../../utils/priceUtils';

import { CarSchema } from './carSchema';
import { UserSchema } from './userSchema';

export const BookingSchema = new GraphQLObjectType({
  name: 'booking',
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
      car: {
        type: CarSchema,
        resolve(booking) {
          return booking.getCar();
        },
      },
      user: {
        type: UserSchema,
        resolve(booking) {
          return booking.getUser();
        },
      },
    };
  },
});
