import Sequelize, { Op } from 'sequelize';

import Conn from './db';
import { User } from './user';
import { Car } from './car';

// A model to store information related to bookings
export const Booking = Conn.define(
  'Booking',
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
        // Make sure starting date is earlier than ending date
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
      // Check on whether the booking time is available
      //NOTE: This is the central design concept
      async isBookingTimeAvailable() {
        // Retrieve the car that's meant to be booked
        const car = await Conn.models.Car.findByPk(this.CarId);
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
        // Exclude the bookings of the current instance in case of editing
        const bookingsExcludingThis = bookings.filter(
          (booking) => booking.uuid !== this.uuid
        );
        // If bookings are found, raise an error
        if (bookingsExcludingThis.length > 0) {
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
