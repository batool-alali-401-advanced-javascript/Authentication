'use strict';

/**
 * Sends 500 Response
 * @param {object} req  Request 
 * @param {object} res  Response 
 * @param {function} next  middleware next()
 */
module.exports = (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.json({error:err});
};