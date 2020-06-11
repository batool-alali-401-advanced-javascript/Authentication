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
      console.log('TOKEN', token);
      console.log('req.user',req.user);
      users
        .authenticateToken(token)
        .then((validUser) => {
          console.log('validuser',validUser);
          console.log('req.user2',req.user);
          req.user = validUser;
          next();
        })
        .catch((e) => next('Invalid login', e.message));
    } else {
      next('Invalid auth header');
    }
  }
};