'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('CarModels', [
        {
          id: 1,
          name: 'Bently SLX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Saga LX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
    try {
      await queryInterface.bulkInsert('Cars', [
        {
          id: 1,
          name: "mike's vently",
          description: '5.2L SUV',
          hourlyPrice: 5.5,
          CarModelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'our favorite',
          description: '5.2L SUV',
          hourlyPrice: 7.0,
          CarModelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'not this',
          description: '1.3L poop',
          hourlyPrice: 2.4,
          CarModelId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'lel',
          description: '1.3L poop',
          hourlyPrice: 1.7,
          CarModelId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cars', null, {});
    await queryInterface.bulkDelete('CarModels', null, {});
  },
};
