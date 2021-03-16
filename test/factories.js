import faker from 'faker';
import { Car, CarModel } from '../src/models/car';
import { Booking } from '../src/models/booking';
import { carMutations } from '../src/schema/mutations/carMutations';

const CarModelObject = async (props = {}) => {
  const defaultProps = {
    name: faker.company.companyName(),
  };
  return Object.assign({}, defaultProps, props);
};

export async function CarModelFactory(props = {}) {
  return CarModel.create(await CarModelObject(props));
}

const CarObject = async (props = {}) => {
  const defaultProps = {
    name: faker.name.middleName(),
    description: faker.lorem.paragraph(),
    hourlyPrice: faker.random.float({ min: 5, max: 10 }),
  };
  return Object.assign({}, defaultProps, props);
};

export async function CarFactory(props = {}) {
  if (props.carModelId) {
    try {
      const carModel = await CarModel.findByPk(props.carModelId);
      const car = await carModel.createCar(await CarObject());
      return car;
    } catch (err) {
      console.log(err);
    }
  } else {
    const car = await Car.create(await CarObject(props));
    return car;
  }
}

const BookingObject = async (props = {}) => {
  const defaultProps = {
    uuid: faker.random.uuid(),
    startDateTime: faker.date.soon(),
    endDateTime: faker.date.future(),
    hourlyPrice: faker.random.float({ min: 5, max: 10 }),
  };
  return Object.assign({}, defaultProps, props);
};

export async function BookingFactory(props = {}) {
  try {
    const car = await CarCar.findByPk(props.CarId);
    const booking = await car.createBooking(await BookingObject());
    return booking;
  } catch (err) {
    console.log(err);
  }
}
