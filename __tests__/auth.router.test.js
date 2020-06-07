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

  it('GET to /users to get all users', ()=>{
    let test = {'username': 'qusai', 'password': '123'};
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