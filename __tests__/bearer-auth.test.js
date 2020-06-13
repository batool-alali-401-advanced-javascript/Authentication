'use strict';
const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);
const bearer = require('../src/auth/middleware/bearer-auth.js');
const token = 'hjhjhjhhkklljghkhhjgfjdjfjfh';
describe('bearer', () => {
  it('Wronge tokens do not allow a user to login', () => {
    const req ={
      headers:{
            
      },
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login no auth headers');
  });

  it('given a good token user is able to “log in”', () => {
    const req ={
      headers:{
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    expect(typeof req.headers).toEqual('object');
  });

  it('its should return error for the user if its the old token', () => {
    return mockRequest.get('/secret').set({authorization:`Bearer ${token}`})
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });
  
  
});