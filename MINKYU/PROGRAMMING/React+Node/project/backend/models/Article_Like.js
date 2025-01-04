const mongoose = require('mongoose');

const articleLikeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ArticleLike = mongoose.model('Article_Like', articleLikeSchema);

module.exports = { ArticleLike };
