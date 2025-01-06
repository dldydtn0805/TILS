// Board Model
const mongoose = require('mongoose');
const { Comment } = require('./Comment');
const { Article } = require('./Article');
// 게시판 스키마
const boardSchema = mongoose.Schema({
  // 게시판 제목
  title: {
    type: String,
    required: true,
    maxlength: 20,
    unique: 1,
  },
  // 게시판 설명
  description: {
    type: String,
  },
  // 생성 시간
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

boardSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('description')) {
    this.updatedAt = Date.now();
  }
  next();
});

boardSchema.pre('deleteOne', async function (next) {
  await Article.deleteMany({ board_id: this._id });
  next();
});

// Model
const Board = mongoose.model('Board', boardSchema);

// export
module.exports = { Board };
