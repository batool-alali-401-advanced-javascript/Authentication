'use strict';

const express = require('express');
const router = express.Router();

const Users = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');
const oauth = require('./middleware/oauth.js');


router.post('/signup', (req, res) => {
  let newUser = new Users(req.body);
  newUser.save()
    .then(user => {
      let token = newUser.tokenGenerator(user);
      res.status(200).send(token);
    }).catch((err) => res.status(403).send(err.message));
});
  
router.post('/signin', basicAuth, (req, res) => {
  console.log(req.token ,'isSignin');
  res.status(200).send(req.token);
});
  
router.get('/users',(req, res) => {
  Users.list()
    .then(users=>{
      res.status(200).json(users);
    });
});

router.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
});

module.exports = router;