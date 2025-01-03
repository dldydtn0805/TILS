const mongoose = require('mongoose');

const commentLikeSchema = mongoose.Schema({
  user_id: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  comment_id: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentLike = mongoose.model('Comment_Like', commentLikeSchema);

module.exports = { CommentLike };
