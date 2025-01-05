// Comment Model
const mongoose = require('mongoose');
const { CommentLike } = require('./Comment_Like');

// 댓글 스키마
const commentSchema = mongoose.Schema({
  // 게시글 id
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  // 작성자 id
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // 댓글 내용
  content: {
    type: String,
    required: true,
  },
  // 작성 시간
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 최근 수정 시간
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    this.updatedAt = Date.now();
  }
  next();
});
commentSchema.pre('remove', async function (next) {
  await CommentLike.deleteMany({ comment_id: this._id });
  next();
});

// Model
const Comment = mongoose.model('Comment', commentSchema);

// export
module.exports = { Comment };
