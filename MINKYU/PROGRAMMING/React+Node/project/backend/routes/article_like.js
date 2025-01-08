const express = require('express');
const { auth } = require('../middleware/auth');
const { Article } = require('../models/Article');
const { ArticleLike } = require('../models/Article_Like');
const router = express.Router();
// /api/articlelikes

// 좋아요 CRUD
// 1. 게시글에 좋아요 달기
router.post('/:articleId', auth, async (req, res) => {
  const user = req.user;
  const { articleId } = req.params;
  const article = await Article.findById(articleId);
  if (!article) {
    return res
      .status(400)
      .json({ success: false, message: '해당 게시글이 존재하지 않습니다.' });
  }

  try {
    const articleLike = await ArticleLike.findOne({
      user_id: user._id,
      article_id: articleId,
    });
    if (articleLike) {
      await ArticleLike.deleteOne({
        user_id: user._id,
        article_id: params.articleId,
      });
      return res.status(204).json({ success: true, message: '좋아요 취소' });
    } else {
      const articleLike = new ArticleLike({
        user_id: user._id,
        article_id: articleId,
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
  const { articleId } = req.params;
  try {
    // 1-1. 해당 게시글 여부 파악하기
    const article = await Article.findById(articleId);
    // 해당 게시글이 존재하지 않을 경우
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: '해당 게시글이 존재하지 않습니다.' });
    }
    // 1-2. 해당 게시글에 달린 좋아요들 파악하기
    const articleLike = await ArticleLike.find({
      article_id: articleId,
    });
    // 좋아요가 있을 경우
    const likes = articleLike.length;
    return res.status(200).json({
      success: true,
      message: '해당 게시글의 좋아요 수는 ' + likes + '개 입니다.',
      likes: likes,
    });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

router.get('/:articleId/:userId', async (req, res) => {
  const { articleId, userId } = req.params;
  try {
    const isLike = ArticleLike.findOne({
      article_id: articleId,
      user_id: userId,
    });
    return res.status(200).json({ success: true, isLike });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
