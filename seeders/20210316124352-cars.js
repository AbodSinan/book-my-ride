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
          name: "mike's vently",
          description: '5.2L SUV',
          hourlyPrice: '5.50',
          CarModelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'our favorite',
          description: '5.2L SUV',
          hourlyPrice: '7.00',
          CarModelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'not this',
          description: '1.3L poop',
          hourlyPrice: '2.40',
          CarModelId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'lel',
          description: '1.3L poop',
          hourlyPrice: '1.70',
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
