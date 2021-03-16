module.exports = {
  development: {
    database: 'database_development',
    url:
      'postgres://rrvmqoalyfqnen:0bcae98d54a54e9d53c39f3bdc47edafacb61b2e3458fa376fbc1d5c9ea5f876@ec2-52-21-252-142.compute-1.amazonaws.com:5432/dfv6jdm9e4f6ti',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: 'postgres',
    password: 'Pololocoxxx1',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgresql',
  },
};
