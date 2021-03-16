import Sequelize from 'sequelize';
import Conn from './db';

// A simplified model to store user information keeping in mind auth strategy
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
