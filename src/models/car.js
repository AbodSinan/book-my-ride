import Sequelize from 'sequelize';
import _ from 'lodash';
import Db from './db';

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
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: '0.00',
  },
});

export const CarModel = Db.define('CarModel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Relationships
CarModel.hasMany(Car);
Car.belongsTo(CarModel);
