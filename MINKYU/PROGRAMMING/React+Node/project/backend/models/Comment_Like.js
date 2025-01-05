const mongoose = require('mongoose');

const commentLikeSchema = mongoose.Schema({
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const CommentLike = mongoose.model('Comment_Like', commentLikeSchema);

module.exports = { CommentLike };
