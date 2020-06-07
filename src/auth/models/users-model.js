'use strict';


const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const mongoose = require('mongoose');


const SECRET = process.env.SECRET || 'batool123';

const Users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});


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


// to use this._id
Users.methods.tokenGenerator = function () {
  let token = jwt.sign({ id: this._id }, SECRET);
  return token;
};

Users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};

module.exports = mongoose.model('users', Users);