import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { carQueries } from './queries/carQueries';
import { bookingQueries } from './queries/bookingQueries';
import { userQueries } from './queries/userQueries';
import { carModelMutations, carMutations } from './mutations/carMutations';
import { bookingMutations } from './mutations/bookingMutations';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query Object',
  fields: () => ({
    ...userQueries,
    ...carQueries,
    ...bookingQueries,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions for CRUDing models',
  fields: () => ({
    ...carMutations,
    ...carModelMutations,
    ...bookingMutations,
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
