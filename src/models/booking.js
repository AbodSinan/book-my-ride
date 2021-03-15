import Sequelize, { Op } from 'sequelize';

import Conn from './db';
import { User } from './user';
import { Car } from './car';

export const Booking = Conn.define(
  'booking',
  {
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
            throw new Error('endDateTime must be greater than startDateTime.');
          }
        },
      },
    },
  },
  {
    Sequelize,
    validate: {
      async isBookingTimeAvailable() {
        // Retrieve the car that's meant to be booked
        const car = await Conn.models.car.findByPk(this.carId);
        // Find bookings that have ends or starts within the time period
        const bookings = await car.getBookings({
          where: {
            [Op.or]: [
              // The start time is inside the bounds
              {
                startDateTime: {
                  [Op.and]: [
                    { [Op.gt]: this.startDateTime },
                    { [Op.lt]: this.endDateTime },
                  ],
                },
              },
              // The end time is inside the bounds
              {
                endDateTime: {
                  [Op.and]: [
                    { [Op.lt]: this.endDateTime },
                    { [Op.gt]: this.startDateTime },
                  ],
                },
              },
              // The times cover the entire bounds from both directions
              {
                [Op.and]: [
                  {
                    startDateTime: {
                      [Op.lte]: this.startDateTime,
                    },
                  },
                  {
                    endDateTime: {
                      [Op.gte]: this.endDateTime,
                    },
                  },
                ],
              },
            ],
          },
        });
        if (bookings.length > 0) {
          throw new Error('Booking not availble at that time');
        }
      },
    },
  }
);

// Relationships
Booking.belongsTo(User);
Booking.belongsTo(Car);
Car.hasMany(Booking);
User.hasMany(Booking);
