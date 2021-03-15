import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLList } from 'graphql/type/definition';
import { BookingSchema } from './bookingSchema';

export const CarSchema = new GraphQLObjectType({
  name: 'Car',
  description: 'A single car in the inventory',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(car) {
          return car.id;
        },
      },
      name: {
        type: GraphQLString,
        resolve(car) {
          return car.name;
        },
      },
      description: {
        type: GraphQLString,
        resolve(car) {
          return car.description;
        },
      },
      hourlyPrice: {
        type: GraphQLFloat,
        resolve(car) {
          return car.hourlyPrice;
        },
      },
      createdAt: {
        type: GraphQLDateTime,
        resolve(car) {
          return car.createdAt;
        },
      },
      model: {
        type: CarModelSchema,
        resolve(car) {
          return car.getCarModel();
        },
      },
      bookings: {
        type: new GraphQLList(BookingSchema),
        resolve(car) {
          return car.getBookings();
        },
      },
    };
  },
});

export const CarModelSchema = new GraphQLObjectType({
  name: 'CarModel',
  description: 'The model of the car',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(carModel) {
          return carModel.id;
        },
      },
      name: {
        type: GraphQLString,
        resolve(carModel) {
          return carModel.name;
        },
      },
      cars: {
        type: new GraphQLList(CarSchema),
        resolve(carModel) {
          return carModel.getCars();
        },
      },
    };
  },
});
