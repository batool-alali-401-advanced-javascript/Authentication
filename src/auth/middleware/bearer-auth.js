const users = require('../models/users-model.js');


/**
 * bearer-auth middleware
 * @module bearer-auth
 */

module.exports = (req, res, next) => {
 
  if (!req.headers.authorization) {
    next('Invalid Login no auth headers');
  } else {
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      users
        .authenticateToken(token)
        .then((validUser) => {
          req.user = validUser;
          next();
        })
        .catch((e) => next('Invalid login', e.message));
    } else {
      next('Invalid auth header');
    }
  }
};