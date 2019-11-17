const express = require('express');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth-routes');
const usersRoute = require('./routes/users-routes');
const boardsRoute = require('./routes/boards-routes');
const postsRoute = require('./routes/posts-routes');
const passport = require('passport');
const passportSetup = require('./services/passport-setup');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const connectDB = require('./db/db');

const app = express();

// initialize passport
app.use(passport.initialize());

// Connect to Database
connectDB();

// Define port
const PORT = process.env.PORT || 5000;

// Init middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// Serve static files after build
// app.use(express.static('/build'));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(function(req, res, next){
//   console.log({  body: req.body  });
//   console.log({  params: req.params.latLng  });
//   console.log({  params: req.params  });
//   next();
// });
// app.param('latLng', function (req, res, next, value) {
//   console.log('CALLED ONLY ONCE with', value);
//   next()
// });
// Define routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/boards', boardsRoute);
app.use('/api/posts', postsRoute);

app.get('/', (req, res) => res.send('Api running...'));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
