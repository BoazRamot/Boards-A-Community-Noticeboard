const passport = require('passport/lib');
const User = require('../models/user');
const googleStrategy = require('./googleStrategy');
const localStrategy = require('./localStrategy');

passport.use(googleStrategy);
// passport.use('register',localStrategy);

