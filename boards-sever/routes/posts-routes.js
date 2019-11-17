const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Board = require('../models/board');
const User = require('../models/user');


router
  // @route   GET api/posts/:id
  // @desc    Get posts by board id
  // @access  Public
  .get('/:id', async (req, res) => {
    try {
      // const board = await Board.findOne({ _id: req.params.id }).populate('user', ['name', 'avatar']);
      const board = await Board.findOne({ _id: req.params.id }).select('posts -_id');

      if (!board) {
        return res.status(404).json('Board not found');
      }

      res.json(board);
    } catch (error) {
      console.error(error.message);

      if (error.kind === 'ObjectId') {
        return res.status(404).send('Board not found');
      }

      res.status(400).send('Server error');
    }
  })

  // @route   POST api/posts/
  // @desc    Create post
  // @access  Private
  .post('/', auth,
    // [auth,
    //   [
    //     check('text', 'Text is required')
    //       .not()
    //       .isEmpty(),
    //   ],
    // ],
    async (req, res) => {
      const errors = await validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //const user = await User.findById(req.user.id).select('-password');
      const board = await Board.findById(req.params.board_id);
      const user = await User.findById(req.user.id);

      const newPost = {
        user: req.user.id,
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
      };

      board.posts.unshift(newPost);
      user.posts.unshift(board.posts[0]._id);

      // Add post
      try {
        await board.save();
        await user.save();
        res.json(board.posts);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    }
  )

  // @route   PUT api/boards/:board_id/post/:post_id/like
  // @desc    Like a post
  // @access  Private
  .put('/:board_id/post/:post_id/like', auth, async (req, res) => {
    try {
      const board = await Board.findById(req.params.board_id);

      if (!board) {
        return res.status(404).json('Board not found');
      }

      const post = board.posts.find(post => post._id === req.params.post_id);

      if (!post) {
        return res.status(404).json('Post not found');
      }

      //Check if the post has already been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.json({ msg: 'Post already liked' });
      }

      const postIndex = board.posts.findIndex(post => post.id === req.params.post_id);

      board.posts[postIndex].likes.unshift({ user: req.user.id });
      await board.save();
      res.json(board.posts[postIndex]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })

  // @route   POST api/boards/:board_id/pots/:post_id
  // @desc    Create comment for post
  // @access  Private
  .post(
    '/:board_id/post/:post_id',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = await validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select('-password');
      const board = await Board.findById(req.params.board_id);
      const postIndex = board.posts.findIndex(post => post._id == req.params.post_id);

      const newComment = {
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
      };

      board.posts[postIndex].comments.unshift(newComment);
    }
  );

module.exports = router;
