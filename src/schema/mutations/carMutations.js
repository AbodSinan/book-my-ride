import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
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
      hourlyPrice: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
      carModelId: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(source, args) {
      return Db.models.carModel.findByPk(args.carModelId).then((carModel) =>
        carModel.createCar({
          name: args.name,
          description: args.description,
          hourlyPrice: args.hourlyPrice,
        })
      );
    },
  },
  editCar: {
    type: CarSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      name: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      hourlyPrice: {
        type: GraphQLFloat,
      },
      carModelId: {
        type: GraphQLInt,
      },
    },
    async resolve(source, args) {
      const car = await Db.models.car.findByPk(args.id);

      car.name = args.name || car.name;
      car.description = args.description || car.description;
      car.hourlyPrice = args.hourlyPrice || car.hourlyPrice;
      car.carModelId = args.carModelId || car.carModelId;
      car.save();

      return car;
    },
  },
  deleteCar: {
    type: CarSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(source, args) {
      return Db.models.car.findByPk(id).then((car) => car.destroy());
    },
  },
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
    },
  },
};
