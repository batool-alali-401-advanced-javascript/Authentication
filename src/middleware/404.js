'use strict';

/**
 * Sends 404 Response
 * @param {object} req  Request 
 * @param {object} res  Response 
 * @param {function} next  middleware next()
 */

module.exports = (req,res) => {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({error:'Not Found'});
};