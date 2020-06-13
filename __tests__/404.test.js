'use strict';
const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('sever', () => {
  it('should respond with 404 on an invalid route', () => {
    return mockRequest.get('/test').then((results) => {
      expect(results.status).toBe(404);
    });
  });
 
});