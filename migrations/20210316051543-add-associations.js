'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Car belongs to Carmodel
    await queryInterface.addColumn('Cars', 'CarModelId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'CarModels',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    // CarModel has many Cars
    await queryInterface.addColumn(
      'CarModels', // name of Source model
      'CarId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    // Car hasMany bookings
    await queryInterface.addColumn(
      'Cars', // name of Source model
      'BookingId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Bookings', // name of Target model
          key: 'uuid', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    // Booking belongsTo Car
    await queryInterface.addColumn(
      'Bookings', // name of Source model
      'CarId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cars', 'CarModelId');
    await queryInterface.removeColumn(
      'CarModels', // name of Source model
      'CarId' // key we want to remove
    );
    await queryInterface.removeColumn(
      'Cars', // name of Source model
      'BookingId' // key we want to remove
    );
    await queryInterface.removeColumn(
      'Cars', // name of Source model
      'BookingId' // key we want to remove
    );
  },
};
