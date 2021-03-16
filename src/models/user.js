import Sequelize from 'sequelize';
import Conn from './db';

export const User = Conn.define('User', {
  googleId: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});
