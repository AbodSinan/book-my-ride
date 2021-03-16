'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [
      {
        googleId: '110173868908123955716',
        firstName: 'Setven',
        lastName: 'Johnson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        googleId: '112173864908123955516',
        firstName: 'Melven',
        lastName: 'Lamo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        googleId: '11217342331123955516',
        firstName: 'Jon',
        lastName: 'doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
  },
};
