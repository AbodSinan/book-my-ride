import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { BookingSchema } from './bookingSchema';

export const UserSchema = new GraphQLObjectType({
  name: 'User',
  description: 'A user instance',
  fields() {
    return {
      googleId: {
        type: GraphQLString,
        resolve(user) {
          return user.googleId;
        },
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        },
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        },
      },
      bookings: {
        type: new GraphQLList(BookingSchema),
        resolve(user) {
          return user.getBookings();
        },
      },
    };
  },
});
