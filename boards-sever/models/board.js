const mongoose = require('mongoose');
const postSchema = require('./post');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true
    },
    index: {
      type: String,
      default: '2dsphere'
    }
  },
  location: {
    address: {
      type: String,
      // required: true,
    },
    info: {
      type: String,
    },
    latitude: {
      type: Number,
      // required: true,
    },
    longitude: {
      type: Number,
      // required: true,
    },
  },
  community: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  posts: [postSchema],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

boardSchema.index({geoLocation: "2dsphere"});

const Board = mongoose.model('board', boardSchema);

module.exports = Board;
