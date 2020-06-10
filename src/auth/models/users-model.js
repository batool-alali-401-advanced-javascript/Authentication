'use strict';


const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const mongoose = require('mongoose');


const SECRET = process.env.SECRET || 'batool123';

const Users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, require:true, enum: ['user','writer','editor','administrator']},
}); // I think I should use tolowwercase in the middleware

const  user = ['read'];
const writer = ['read', 'create'];
const editor = ['read, create', 'update' ];
const administrator = ['read, create', 'update', 'delete'];


Users.pre('save', async function () {
  
  //Pre middleware functions are executed one after another, when each middleware calls next.
  // beforeSave => do the hash() 
  // resource1 https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
  // resourse2 https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  this.password = await bcrypt.hash(this.password, 5);
});



Users.statics.basicAuth = function (auth) { 
// Statics defining functions that exist directly on your Model.
// resource1 https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// resourse2 https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
// compare  password with a hashed password
  let password = { username: auth.user };
  return this.findOne(password)
    .then(user => {
      return user.passwordComparator(auth.pass);
    })
    .catch(console.error);
};

Users.methods.passwordComparator = function (pass) {
  /// we can use 'this' key word
  //// resourse1: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null;
    });
};

// Users.methods.can = function (role){
//   let capabilities;
//   if (role === 'user'){
//     capabilities = user;
//   }else if (role === 'writer')
//   {
//     capabilities = writer;
//   }else if( role === 'editor'){
//     capabilities= editor;
//   }else if (role === 'administrator'){
//     capabilities=administrator;
//   }
//   return capabilities;
// };
// to use this.username
Users.methods.tokenGenerator = function () {
  let capabilities;
  // expiresIn expiresIn: expressed in seconds or a string describing a time span / 15 min = 900000 ms
  // algorithm: object containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA
  // RS256	RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm
  // resoure https://www.npmjs.com/package/jsonwebtoken
  if (this.role === 'user'){
    capabilities = user;
  }else if (this.role === 'writer')
  {
    capabilities = writer;
  }else if( this.role === 'editor'){
    capabilities= editor;
  }else if (this.role === 'administrator'){
    capabilities=administrator;
  }
  let token = 
  jwt.sign({  role: this.role, id:this._id ,capabilities: capabilities ,expiresIn:  900000, algorithm:  'RS256' }, SECRET);  return token;
};

Users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = await jwt.verify(token, SECRET);

    if (tokenObject.id) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject('User is not found!');
    }
  } catch (e) {
    return Promise.reject(e.message);
  }
};

Users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};


module.exports = mongoose.model('users', Users);