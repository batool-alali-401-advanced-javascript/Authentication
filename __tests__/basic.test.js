const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);
describe('Authentication Model',()=>{
  it('POST to /signup to create a new user', ()=>{
    let data = {'username': 'batool', 'password': '123bb'};
    return  mockRequest.post('/signup')
      .send(data)
      .then(user=>{
        expect(user.status).toEqual(200);
      });
  });

  it('Cannot /signin  the user didnt  sign up', ()=>{
    let test = {'username': 'unknown', 'password': '123bb'};
    return mockRequest.post('/signin')
      .send(test)
      .then(data=>{
        expect(data.status).toEqual(500);
      });
  });

  it('GET to /users to get all users', ()=>{
    let test = {'username': 'batoool', 'password': '123bbb'};
    return mockRequest.post('/signup')
      .auth(test)
      .then(data=>{
        console.log(data.body);
        return mockRequest.get('/users')
          .then(result =>{
            expect(result.status).toEqual(200);
          });
      });
  });
});