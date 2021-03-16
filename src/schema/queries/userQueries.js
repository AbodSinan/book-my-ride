import { GraphQLList } from 'graphql';

import { User } from '../../models/user';
import { UserSchema } from '../schemas/userSchema';

export const userQueries = {
  users: {
    type: new GraphQLList(UserSchema),
    description: 'Get list of all users',
    resolve(root, args) {
      return User.findAll({ where: args });
    },
  },
};
