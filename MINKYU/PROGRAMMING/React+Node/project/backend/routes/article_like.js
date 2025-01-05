const express = require('express');
const { auth } = require('../middleware/auth');
const { Article } = require('../models/Article');
const { ArticleLike } = require('../models/Article_Like');
const router = express.Router();
// /api/articlelikes

// 좋아요 CRUD
// 1. 게시글에 좋아요 달기
router.post('/:articleId', auth, async (req, res) => {
  const article = await Article.findById(req.params.articleId);
  if (!article) {
    return res
      .status(400)
      .json({ success: false, message: '해당 게시글이 존재하지 않습니다.' });
  }

  try {
    const articleLike = await ArticleLike.findOne({
      user_id: req.user._id,
      article_id: req.params.articleId,
    });
    if (articleLike) {
      await ArticleLike.deleteOne({
        user_id: req.user._id,
        article_id: req.params.articleId,
      });
      return res.status(204).json({ success: true, message: '좋아요 취소' });
    } else {
      const articleLike = new ArticleLike({
        user_id: req.user._id,
        article_id: req.params.articleId,
      });
      await articleLike.save();
      return res.status(201).json({ succes: true, message: '좋아요 성공' });
    }
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

// 2. 게시글에 달린 좋아요 수 파악하기
router.get('/:articleId', async (req, res) => {
  try {
    // 1-1. 해당 게시글 여부 파악하기
    const article = await Article.findById(req.params.articleId);
    // 해당 게시글이 존재하지 않을 경우
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: '해당 게시글이 존재하지 않습니다.' });
    }
    // 1-2. 해당 게시글에 달린 좋아요들 파악하기
    const articleLike = await ArticleLike.find({
      article_id: req.params.articleId,
    });
    // 좋아요가 없을 경우
    if (!articleLike) {
      return res.status(200).json({
        success: true,
        message: '해당 게시글의 좋아요 수는 0개 입니다.',
        likes: 0,
      });
    }
    // 좋아요가 있을 경우
    const likes = articleLike.length;
    return res.status(200).json({
      success: true,
      message: '해당 게시글의 좋아요 수는 ' + likes + '개 입니다.',
      likes: likes,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
