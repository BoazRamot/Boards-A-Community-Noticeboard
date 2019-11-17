const mongoose = require('mongoose');
const keys = require('../config/keys');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongodb.dbURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected...`);
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;