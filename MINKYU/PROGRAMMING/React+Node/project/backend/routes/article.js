const express = require('express');
const { auth } = require('../middleware/auth');
const { Article } = require('../models/Article');
const router = express.Router();
// /api/articles

// 게시글 CRUD
// 1. 게시글 작성
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  // 1-1. 필수 입력 필드 확인
  // 입력 필드가 비어있을 경우
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: '게시글 작성에 필요한 모든 필드를 입력해 주세요.',
    });
  }

  try {
    const article = new Article({
      title: title,
      content: content,
      user_id: req.user._id,
    });

    // 1-2. 위의 조건을 만족한 경우 인스턴스 생성
    await article.save();
    return res.status(201).json({
      success: true,
      message: '게시글 작성을 성공하였습니다.',
      article: article,
    });
    // 1-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

// 2. 게시글 수정
router.put('/:articleId', auth, async (req, res) => {
  const { title, content } = req.body;
  // 2-1. 모든 필드를 입력했는지 확인
  // 비어있는 필드가 존재할 경우
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({
      success: false,
      message: '게시글 수정에 필요한 모든 필드를 입력해 주세요.',
    });
  }
  try {
    // 2-2. 해당 _id값을 가지는 게시글 찾기
    const article = await Article.findById(req.params.articleId);
    // 해당 게시글이 없을 경우
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: '해당 게시글을 찾을 수 없습니다.' });
    // 2-3. 수정 권한 확인
    if (article.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: '게시글 수정 권한이 없습니다.' });
    }

    article.title = title;
    article.content = content;
    await article.save();
    return res.status(200).json({
      success: true,
      message: '게시글 수정을 성공했습니다.',
      article: article,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// 3. 게시글 삭제
router.delete('/:articleId', auth, async (req, res) => {
  try {
    // 3-1. 해당 _id값을 가지는 게시글 확인
    // 해당 게시글이 존재하지 않을 경우
    const article = await Article.findById(req.params.articleId);
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: '게시글을 찾을 수 없습니다.' });
    // 3-2. 삭제 권한 확인
    // 해당 게시글을 삭제할 수 있는 권한이 없는 경우
    if (!article.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: '게시글 삭제 권한이 없습니다.' });
    }
    // 3-3. 위의 조건을 만족할 경우, 삭제
    await article.remove();
    return res
      .status(201)
      .json({ success: false, message: '게시글 삭제에 성공했습니다.' });
    // 3-4. 서버 에러가 발생했을 경우
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// 4. 게시글 전체 조회
router.get('/', async (req, res) => {
  try {
    // 4-1. 존재하는 모든 게시글 불러오기
    const articles = await Article.find();
    // 게시글이 존재하지 않을 경우
    if (!articles)
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    // 4-2. 위의 조건을 만족하는 경우 게시글들 출력
    return res.status(200).json({
      success: true,
      message: '모든 게시글 찾기에 성공했습니다.',
      articles: articles,
    });
    // 4-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});
// 5. 특정 게시글 조회
router.get('/:articleId', async (req, res) => {
  try {
    // 5-1. 해당 _id값을 가지는 게시글 찾기
    const article = await Article.findById(req.params.articleId);
    // 해당 게시글이 존재하지 않는 경우
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: '게시글을 찾을 수 없습니다.' });
    // 5-2. 게시글을 찾은 경우 반환
    return res.status(200).json({
      success: true,
      message: '특정 게시글 찾기에 성공했습니다.',
      article: article,
    });
    // 5-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// 6. 특정 유저가 작성한 게시글 조회
router.get('/user/:userId', async (req, res) => {
  // 6-1. 특정 사용자가 작성한 게시글들 찾기

  try {
    const articles = await Article.find({ user_id: req.params.userId });
    // 게시글이 존재하지 않을 경우
    if (!articles)
      return res
        .status(404)
        .json({ success: false, message: '게시글을 찾을 수 없습니다.' });
    // 6-3. 게시글이 존재할 경우 반환
    return res.status(200).json({
      success: true,
      message: '게시글 찾기에 성공했습니다.',
      articles: articles,
    });
    // 6-4. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
