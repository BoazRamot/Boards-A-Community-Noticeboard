const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  // board: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'board',
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  post2post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'post',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

// const Post = mongoose.model('post', postSchema);

// module.exports = Post;
module.exports = postSchema;
