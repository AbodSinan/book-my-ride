import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import Db from './db';

export const Car = Db.define('car', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

export const CarModel = Db.define('carModel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Relationships
CarModel.hasMany(Car);
Car.belongsTo(CarModel);

// Create 10 categories containing a product
Db.sync({ force: true }).then(() => {
  _.times(2, () =>
    CarModel.create({
      name: Faker.name.firstName(),
      order: Faker.random.number(),
    }).then((carModel) => {
      _.times(5, () =>
        carModel
          .createCar({
            name: Faker.company.companyName(),
            description: Faker.lorem.paragraph(),
          })
          .then((car) => {
            _.times(5, () =>
              car.createBooking({
                uuid: Faker.random.uuid(),
                startDateTime: Faker.date.soon(),
                endDateTime: Faker.date.future(),
              })
            );
          })
      );
    })
  );
});
