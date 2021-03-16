'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      startDateTime: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      endDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isGreaterThanOtherField(date) {
            if (date <= this.startDateTime) {
              throw new Error(
                'endDateTime must be greater than startDateTime.'
              );
            }
          },
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};
