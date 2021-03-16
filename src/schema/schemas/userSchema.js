import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { BookingSchema } from './bookingSchema';

// The schema object of users, to view user information
export const UserSchema = new GraphQLObjectType({
  name: 'User',
  description: 'A user instance with auth info',
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
      // Get associated fields
      bookings: {
        type: new GraphQLList(BookingSchema),
        resolve(user) {
          return user.getBookings();
        },
      },
    };
  },
});
