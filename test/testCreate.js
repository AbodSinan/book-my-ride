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
    const res = await server.post('/graphql').send({
      query: '{ users{ firstName lastName } }',
    });
    expect(res.body.data.users.length).to.equal(3);
    expect(res.status).to.equal(200);
  });
});

describe('Booking query test', () => {
  it('gets bookings', async () => {});
});
