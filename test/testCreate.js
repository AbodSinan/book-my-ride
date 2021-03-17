import { expect } from './setup';
import sinon from 'sinon';
import supertest from 'supertest';

// Variables to mock authentication
var auth;
var app;
var server;

beforeEach(function () {
  auth = require('../src/middleware/auth');
  sinon.stub(auth, 'isLoggedIn').callsFake(function (req, res, next) {
    return next();
  });

  // after you can create app:
  app = require('../src/app').app;
  server = supertest.agent(app);
});

afterEach(function () {
  auth.isLoggedIn.restore();
});

describe('User query test', () => {
  it('gets users', async () => {
    const data = '{ users{ firstName lastName } }';
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.body.data.users.length).to.equal(3);
    expect(res.status).to.equal(200);
  });
});

describe('Car tests', () => {
  it('gets cars', async () => {
    const data = '{ cars{ name description } }';
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.body.data.cars.length).to.equal(4);
    expect(res.status).to.equal(200);
  });

  it('adds car', async () => {
    const data = `mutation { addCar(
      name: "some car name"
      carModelId: 1
      hourlyPrice: 5.00
      description: "good car"
    ){ name description hourlyPrice } }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property('addCar');
    expect(res.body.data.addCar.name).to.equal('some car name');
    expect(res.body.data.addCar.description).to.equal('good car');
    expect(res.body.data.addCar.hourlyPrice).to.equal(5);
  });

  it('Edits car', async () => {
    const data = `mutation { editCar(
      id: 1
      name: "another car name"
      hourlyPrice: 7.00
      description: "some other sentence"
    ){ name description hourlyPrice } }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property('editCar');
    expect(res.body.data.editCar.name).to.equal('another car name');
    expect(res.body.data.editCar.description).to.equal('some other sentence');
    expect(res.body.data.editCar.hourlyPrice).to.equal(7);
  });

  it('Gets no available cars when not available', async () => {
    const data = `{
      availableCars(
        carModelId: 1
        startDateTime: "2021-01-02T11:31:00.000Z",
        endDateTime: "2021-01-03T11:31:00.000Z",
      ){
        id
      }
    }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.data).to.have.property('availableCars');
    expect(res.body.data.availableCars).to.be.equal(null);
  });

  it('Gets available cars outside their ranges', async () => {
    const data = `{
      availableCars(
        startDateTime: "2021-03-01T11:31:00.000Z"
        endDateTime: "2021-03-03T12:31:00.000Z"
      ){
        id
      }
    }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    console.log(res);
    expect(res.status).to.be.equal(200);
    expect(res.body.data).to.have.property('availableCars');
    expect(res.body.data.availableCars.length).to.be.equal(2);
  });

  it('deletes cars', async () => {
    const data = `mutation{
      deleteCar(id: 1){
        id
        hourlyPrice
        name
      }
    }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property('deleteCar');
  });
});

/*
describe('Booking query test', () => {
  it('Gets bookings', async () => {
    const data = `{
      bookings{
        car{
          id
        }
        startDateTime
        endDateTime
        price
      }
    }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
    expect(res.body.data.bookings.length).to.equal(3);
  });

  it('Gets Correct Price', async () => {
    const data = `{
      bookings{
        car{
          id
        }
        startDateTime
        endDateTime
        price
      }
    }`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
    expect(res.body.data.bookings[0].price).to.equal(7.27);
  });

  it('Adds bookings', async () => {
    const data = `mutation { 
      addBooking(
        CarId:2, 
        startDateTime: "2021-03-06T11:31:00.000Z", 
        endDateTime:"2021-03-07T11:31:59.000Z") { 
          price
          car{
            id
          }
          startDateTime
          endDateTime
        }}`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.body.data.startDateTime).to.be.string;
    expect(res.body.data.startDateTime).to.equal('2021-03-06T11:31:00.000Z');
    expect(res.body.data.startDateTime).to.be.string;
    expect(res.body.data.startDateTime).to.equal('2021-03-07T11:31:59.000Z');
    expect(res.body.data.price).to.equal('182.75');
  });

  it('Edits booking if available', async () => {
    const data = `mutation { 
      editBooking(
        CarId: 1, 
        startDateTime: "2021-01-07T11:31:00.000Z", 
        endDateTime:"2021-01-07T11:31:59.000Z") { 
          car {
            id
          }
          startDateTime
          endDateTime
          price
        }}`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
    expect(res.body.data.startDateTime).to.be.string;
    expect(res.body.data.startDateTime).to.equal('2021-01-07T11:31:00.000Z');
    expect(res.body.data.startDateTime).to.be.string;
    expect(res.body.data.startDateTime).to.equal('2021-01-07T11:31:59.000Z');
    expect(res.body.data.price).to.equal('7.27');
  });

  it('Deletes Bookings', async () => {
    const data = `mutation { 
      deleteBooking(
        uuid: "e682de20-eacf-4aa5-945b-2dbe452af123") { 
        }}`;
    const res = await server.post('/graphql').send({
      query: data,
    });
    expect(res.status).to.equal(200);
  });

  it('Rejects Editing bookings if not available', async () => {
    const data = `mutation { 
      editBooking(
        uuid: "e682de20-eacf-4aa5-945b-2dbe452af123"
        CarId: 2, 
        startDateTime: "2021-01-01T11:31:00.000Z", 
        endDateTime:"2021-01-07T11:31:59.000Z") { 
          car{
            id
          }
          startDateTime
          endDateTime
        }}`;
    const res = await server.post('/graphql').send({
      query: data,
    });
  });
});
*/
