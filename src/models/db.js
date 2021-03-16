import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import * as settings from '../settings';

let Conn;
if (process.env.NODE_ENV === 'test') {
  // Local database does not support ssl connections
  Conn = new Sequelize(settings.connectionString);
} else {
  // Initiate the database with ssl connections
  Conn = new Sequelize(settings.connectionString, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

export default Conn;
