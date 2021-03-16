import { GraphQLList } from 'graphql';

import { User } from '../../models/user';
import { UserSchema } from '../schemas/userSchema';

export const userQueries = {
  users: {
    type: new GraphQLList(UserSchema),
    resolve(root, args) {
      return User.findAll({ where: args });
    },
  },
};
