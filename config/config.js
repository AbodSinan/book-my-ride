var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    database: 'database_development',
    url: process.env.DATABASE_URL_DEVELOPMENT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    database: 'database_test',
    url: process.env.DATABASE_URL_TEST,
    host: '127.0.0.1',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgresql',
  },
};
