// Article Model
const mongoose = require('mongoose');
const { ArticleLike } = require('./Article_Like');
const { Comment } = require('./Comment');

// 1. 글 작성자 스키마
const articleSchema = mongoose.Schema({
  // 글 제목
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  // 글 내용
  content: {
    type: String,
    required: true,
  },
  // 작성자 id
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

articleSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    this.updatedAt = Date.now();
  }
  next();
});

articleSchema.pre('deleteOne', async function (next) {
  await ArticleLike.deleteMany({ article_id: this._id });
  await Comment.deleteMany({ article_id: this._id });
  next();
});
// articleSchema.pre('deleteMany', async function (next) {
//   await ArticleLike.deleteMany({ article_id: this._id });
//   await Comment.deleteMany({ article_id: this._id });
//   next();
// });
// Model
const Article = mongoose.model('Article', articleSchema);

// export
module.exports = { Article };
