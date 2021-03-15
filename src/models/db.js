import Sequelize from 'sequelize';

import * as settings from '../settings';

export const Conn = new Sequelize(settings.connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default Conn;
