'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Bookings', [
        {
          uuid: 'e682de20-eacf-4aa5-945b-2dbe452af123',
          CarId: 2,
          startDateTime: '2021-01-01T11:31:00.000Z',
          endDateTime: '2021-01-01T11:31:30.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: 'e682de12-dccf-4aa5-945b-2dbe452a2131',
          CarId: 2,
          startDateTime: '2021-01-02T11:31:00.000Z',
          endDateTime: '2021-01-02T12:31:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: 'e682de32-eacf-4a15-9432-2dbe3f1a2131',
          CarId: 1,
          startDateTime: '2021-01-01T11:31:00.000Z',
          endDateTime: '2021-01-02T12:31:00.000Z',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
