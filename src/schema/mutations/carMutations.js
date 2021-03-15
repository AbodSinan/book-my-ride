import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Db from '../../models/db';
import { CarSchema, CarModelSchema } from '../carSchema';

export const carMutations = {
  addCar: {
    type: CarSchema,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
      carModelId: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(source, args) {
      return Db.models.carModel.findByPk(args.carModelId).then(
        carModel => carModel.createCar({
          name: args.name,
          description: args.description
        })
      );
    }
  }
};

export const carModelMutations = {
  addCarModel: {
    type: CarModelSchema,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(source, args) {
      return Db.models.carModel.create({
        name: args.name,
      });
    }
  }
};
