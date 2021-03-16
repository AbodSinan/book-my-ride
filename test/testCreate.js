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

describe('Car query test', () => {
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
  });
});

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
