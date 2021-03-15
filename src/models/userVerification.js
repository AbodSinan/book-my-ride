import Sequelize from 'sequelize';
import crypto from 'crypto';
import Conn from './db';
import Customer from './user';

export const EmailVerification = Conn.describe(
  'emailVerification',
  {
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    validTo: {
      type: Sequelize.DATE,
    },
  },
  {
    Sequelize,
    validate: {
      singleInstancePerMinute() {
        console.log(this);
      },
    },
  }
);

EmailVerification.addHook('beforeCreate', (emailVerification, options) => {
  emailVerification.key = crypto.randomBytes(20).toString('hex');
});

// Relationships
EmailVerification.belongsTo(Customer);
Customer.hasMany(EmailVerification);
