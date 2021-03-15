import Sequalize from 'sequelize';
import Faker from 'faker';
import Conn from './db';

export const User = Conn.define('user', {
  emailAddress: {
    type: Sequalize.STRING,
    allowNull: false,
    valiate: {
      isEmail: true,
    }
  },
  firstName: {
    type: Sequalize.STRING,
  },
  lastName: {
    type: Sequalize.STRING,
  },
  userName: {
    type: Sequalize.STRING,
    unique: true,
  },
  gender: {
    type: Sequalize.ENUM('male', 'female', 'other'),
  },
  password: {
    type: Sequalize.STRING,
  },
  isVerified: {
    type: Sequalize.BOOLEAN,
    defaultValue: false,
  }
});

