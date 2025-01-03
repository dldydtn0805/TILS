const express = require('express');
const { auth } = require('../middleware/auth');
const { Article } = require('../models/Article');
const { Comment } = require('../models/Comment');
const router = express.Router();
// app.use('/api/articles/:articleId/comments', commentRoutes);
// 댓글 CRUD

// 1. 특정 게시글에 달린 댓글들 조회
router.get('/', async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: '해당 게시글이 존재하지 않습니다.' });
    }
    const comments = await Comment.find({ article_id: req.params.articleId });
    if (!comments) {
      return res.status(404).json({
        success: false,
        message: '해당 게시글에 달린 댓글이 존재하지 않습니다.',
      });
    }
    return res.status(200).json({
      success: true,
      message: '게시글에 달린 댓글들 조회를 성공했습니다.',
      comments: comments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

// 2. 댓글 달기
router.post('/', auth, async (req, res) => {
  // 2-1. 입력 필드 확인
  const content = req.body.content;
  // 필수 입력 필드를 입력하지 않은 경우
  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: '필수 입력 필드를 작성해 주세요.' });
  }
  try {
    // 2-2. 댓글 생성
    const comment = new Comment({
      user_id: req.user._id,
      article_id: req.params.articleId,
      content: content,
    });
    await comment.save();
    return res.status(201).json({
      success: true,
      message: '댓글 작성을 성공했습니다.',
      comment: comment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

// 3. 댓글 수정하기
router.put('/:commentId', auth, async (req, res) => {
  // 3-1. 권환 확인
  const comment = await Comment.findById(req.params.commentId);
  if (comment.user_id.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      success: false,
      message: '권한이 존재하지 않습니다.',
    });
  }
  // 3-2. 입력 필드 확인
  const content = req.body.content;
  // 필수 입력 필드를 입력하지 않은 경우
  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: '필수 입력 필드를 작성해 주세요.' });
  }
  try {
    // 3-3. 댓글 수정
    comment.content = content;
    await comment.save();
    return res.status(200).json({
      success: true,
      message: '댓글 수정을 성공했습니다.',
      comment: comment,
    });
    // 3-4. 서버 에러 확인
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});
// 4. 댓글 삭제하기
router.delete('/:commentId', auth, async (req, res) => {
  // 4-1. 권환 확인
  const comment = await Comment.findById(req.params.commentId);
  if (comment.user_id.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      success: false,
      message: '권한이 존재하지 않습니다.',
    });
  }
  try {
    // 4-2. 댓글 삭제
    await comment.remove();
    return res.status(204).json({
      success: true,
      message: '댓글 삭제를 성공했습니다.',
    });
    // 4-3. 서버 에러 확인
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
