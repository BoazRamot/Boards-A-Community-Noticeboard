const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  console.log('token', token);

  // console.log('JSON.parse(req.body)', JSON.parse(req.body))

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwt.secret);

    req.user = decoded.user;
    console.log('req.user', req.user);
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
