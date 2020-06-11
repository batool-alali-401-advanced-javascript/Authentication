'use strict';

const express = require('express');
const router = express.Router();
const permissions = require('./middleware/authorize.js');
const bearerAuth= require('./middleware/bearer-auth.js');

/**
 * router
 * @module router
 */

router.get('/secret', bearerAuth, (req,res) => { 
  res.json(req.user);
});


router.get('/read', bearerAuth, permissions('read'), (req, res) => {
  res.send('OK!');
});

router.post('/add', bearerAuth, permissions('create'), (req, res) => {
  res.send('OK!');
});

router.put('/change', bearerAuth, permissions('update'), (req, res) => {
  res.send('OK!');
});

router.delete('/remove', bearerAuth, permissions('delete'), (req, res) => {
  res.send('OK!');
});



module.exports = router;