import Sequelize from 'sequelize';
import _ from 'lodash';
import Db from './db';

// A table to define models/instances of specific car (e.g. Saga SLX 1.3L)
export const Car = Db.define('Car', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  hourlyPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: '0.00',
  },
});

// A table to define car models (e.g.: Proton Saga)
export const CarModel = Db.define('CarModel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Relationships
CarModel.hasMany(Car);
Car.belongsTo(CarModel);
