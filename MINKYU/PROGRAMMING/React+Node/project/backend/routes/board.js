const express = require('express');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { Board } = require('../models/Board');
const { Article } = require('../models/Article');
const router = express.Router();
// /api/boards
const requiredRole = 2;

// 게시판 CRUD
// 1. 게시판 생성
router.post('/', auth, admin(requiredRole), async (req, res) => {
  const { user } = req.user;
  const { title, description } = req.body;
  // 1-1. 필수 입력 필드 확인
  // 입력 필드가 비어있을 경우
  if (!title) {
    return res.status(400).json({
      success: false,
      message: '게시판 생성에 필요한 모든 필드를 입력해 주세요.',
    });
  }

  try {
    const board = new Board({
      title: title,
      description: description || '게시판 설명이 없습니다.',
    });

    // 1-2. 위의 조건을 만족한 경우 인스턴스 생성
    await board.save();
    return res.status(201).json({
      success: true,
      message: '게시판 생성을 성공하였습니다.',
      board: board,
    });
    // 1-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: '서버 에러가 발생했습니다.' });
  }
});

// 2. 게시판 수정
router.put('/:boardId', auth, admin(requiredRole), async (req, res) => {
  const { title, description } = req.body;
  const { boardId } = req.params;
  // 2-1. 모든 필드를 입력했는지 확인
  // 비어있는 필드가 존재할 경우
  if (!title) {
    return res.status(400).json({
      success: false,
      message: '게시판 수정에 필요한 모든 필드를 입력해 주세요.',
    });
  }
  try {
    // 2-2. 해당 _id값을 가지는 게시판 찾기
    const board = await Board.findById(boardId);
    // 해당 게시글이 없을 경우
    if (!board)
      return res
        .status(404)
        .json({ success: false, message: '해당 게시판을 찾을 수 없습니다.' });

    board.title = title;
    board.description =
      description !== undefined ? description : board.description;
    await board.save();
    return res.status(200).json({
      success: true,
      message: '게시판 수정을 성공했습니다.',
      board: board,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// 3. 게시판 삭제
router.delete('/:boardId', auth, admin(requiredRole), async (req, res) => {
  const { boardId } = req.params;
  try {
    // 3-1. 해당 _id값을 가지는 게시판 확인
    // 해당 게시판이 존재하지 않을 경우
    const board = await Board.findById(boardId);
    if (!board)
      return res
        .status(404)
        .json({ success: false, message: '게시판을 찾을 수 없습니다.' });
    // 3-3. 위의 조건을 만족할 경우, 삭제
    await Board.deleteOne({ _id: board._id });
    return res
      .status(204)
      .json({ success: true, message: '게시판 삭제에 성공했습니다.' });
    // 3-4. 서버 에러가 발생했을 경우
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// 4. 게시판 전체 조회
router.get('/', async (req, res) => {
  try {
    // 4-1. 존재하는 모든 게시판 불러오기
    const boards = await Board.find();
    // 4-2. 위의 조건을 만족하는 경우 게시판들 출력
    return res.status(200).json({
      success: true,
      message: '모든 게시판 찾기에 성공했습니다.',
      boards: boards,
    });
    // 4-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});
// 5. 특정 게시판 조회
router.get('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  try {
    // 5-1. 해당 _id값을 가지는 게시판 찾기
    const board = await Board.findById(boardId);
    // 해당 게시판이 존재하지 않는 경우
    if (!board)
      return res
        .status(404)
        .json({ success: false, message: '게시판을 찾을 수 없습니다.' });
    // 5-2. 게시판을 찾은 경우 반환
    return res.status(200).json({
      success: true,
      message: '특정 게시판 찾기에 성공했습니다.',
      board: board,
    });
    // 5-3. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
