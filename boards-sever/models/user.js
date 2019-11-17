const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  avatar: {
    type: String,
  },
  boards: [{
    type: Schema.Types.ObjectId,
    ref: 'board',
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;