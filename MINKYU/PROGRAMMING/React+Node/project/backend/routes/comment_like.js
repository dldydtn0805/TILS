const express = require('express');
const { auth } = require('../middleware/auth');
const { Article } = require('../models/Article');
const { ArticleLike } = require('../models/Article_Like');
const { Comment } = require('../models/Comment');
const { CommentLike } = require('../models/Comment_Like');
// /api/comments/
const router = express.Router();

// 좋아요 CRUD
// 1. 댓글에 좋아요 달기(또는 좋아요 취소)
router.post('/:commentId/like', auth, async (req, res) => {
  // 1-1. 해당 댓글 확인
  const comment = await Comment.findById(req.params.commentId);
  // 댓글이 존재하지 않는 경우
  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: '해당 댓글이 존재하지 않습니다.' });
  }
  try {
    // 1-2. 해당 댓글에 좋아요를 눌렀는지 확인
    const commentLike = await CommentLike.findOne({
      user_id: req.user._id,
      comment_id: req.params.commentId,
    });
    // 좋아요를 이미 눌렀을 경우 좋아요 취소
    if (commentLike) {
      await commentLike.remove();
      return res
        .status(204)
        .json({ success: true, message: '좋아요 삭제를 성공했습니다.' });
      // 좋아요를 누르지 않았을 경우 좋아요
    } else {
      const commentLike = new CommentLike({
        user_id: req.user._id,
        comment_id: req.params.commentId,
      });
      await commentLike.save();
      return res
        .status(201)
        .json({ success: true, message: '좋아요를 성공했습니다.' });
    }
    // 1-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

// 2. 게시글에 달린 좋아요 수 파악하기
router.get('/:commentId/likes', (req, res) => {
  try {
    // 1-1. 해당 게시글 여부 파악하기
    const comment = Comment.findById(req.params.commentId);
    // 해당 게시글이 존재하지 않을 경우
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: '해당 게시글이 존재하지 않습니다.' });
    }
    // 1-2. 해당 게시글에 달린 좋아요들 파악하기
    const commentLike = CommentLike.find({ comment_id: req.params.commentId });
    // 좋아요가 없을 경우
    if (!commentLike) {
      return res.status(200).json({
        success: true,
        message: '해당 게시글의 좋아요 수는 0개 입니다.',
        likes: 0,
      });
    }
    // 좋아요가 있을 경우
    const likes = commentLike.length;
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
