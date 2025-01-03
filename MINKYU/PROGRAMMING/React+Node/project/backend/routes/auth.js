// /routes/auth.js
// 인증 관련 라우터
const express = require('express');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();
// /api/users

// // 이메일 중복 체크
// router.get('/email-check', async (req, res) => {
//   try {
//     const existedEmail = await User.findOne({ email: req.query.email });
//     // 중복 발생 O
//     if (existedEmail) {
//       return res.status(200).json({ success: false, message: '이메일 중복' });
//     }
//     // 중복 발생 X
//     return res.status(200).json({ success: true, message: '이메일 사용 가능' });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: '서버 에러' });
//   }
// });

// // 아이디 중복 체크
// router.get('/name-check', async (req, res) => {
//   try {
//     const existedName = await User.findOne({ name: req.query.name });
//     // 중복 발생 O
//     if (existedName)
//       return res.status(200).json({ success: false, message: '아이디 중복' });
//     // 중복 발생 X
//     return res.status(200).json({ success: true, message: '아이디 사용 가능' });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: '서버 에러' });
//   }
// });

// 1. 회원가입
router.post('/signup', async (req, res) => {
  const { email, name, password, password2 } = req.body;
  // 1-1. 모든 필드가 입력되었는지 확인한다
  // 모든 필드를 입력하지 않은 경우
  if (!email || !name || !password || !password2) {
    return res.status(400).json({ success: false, message: '모든 필드 입력' });
  }
  // 1-2. 비밀번호와 비밀번호확인이 같은이 확인한다
  // 비밀번호 확인을 실패한 경우
  if (password !== password2) {
    return res.status(400).json({ success: false, message: '비밀번호 확인' });
  }
  try {
    // 1-3. 이메일 중복이 발생했는지 확인한다
    const existedEmail = User.findOne({ email: email });
    // 중복 이메일이 존재할 경우
    if (existedEmail) {
      return res.status(400).json({
        success: false,
        message: '이메일 중복',
      });
    }
    // 1-4. 닉네임 중복이 발생했는지 확인한다
    const existedName = User.findOne({ name: name });
    // 중복 닉네임이 존재할 경우
    if (existedName) {
      return res.status(400).json({
        success: false,
        message: '닉네임 중복',
      });
    }

    // 1-5. 위의 네 가지 조건을 만족한 경우, DB에 새로운 계정을 등록한다
    const user = new User({ email, name, password });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: '사용자 등록 성공', user: user });
    // 1-6. 서버 에러가 발생했는지 확인한다
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ success: false, message: '서버 에러 발생' });
  }
});

// 2. 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // 2-1. 모든 필드가 입력되었는지 확인한다
  // 필수 입력 필드가 비어있는 경우
  if (!email || !password) {
    return res
      .status(401)
      .json({ success: false, message: '모든 필드를 입력하세요.' });
  }
  try {
    // 2-2. 해당 이메일로 가입한 사용자를 찾는다
    const user = await User.findOne({ email: email });
    // 해당 이메일로 가입한 사용자가 없을 경우
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '이메일을 확인해 주세요.',
      });
    }
    // 2-2. 해당 이메일로 가입한 사용자의 비밀번호와 입력한 비밀번호를 비교한다
    const isMatch = await user.comparePassword(password);
    // 비밀번호 입력을 잘못한 경우
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '비밀번호를 확인해 주세요.',
      });
    }
    // 2-3. 해당 사용자에게 토큰을 발급한다
    const token = user.generateToken();
    res.status(200).json({ success: true, token: token, user: user });
    // 2-4. 서버 에러가 발생했는지 확인한다
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: '서버 에러 발생' });
  }
});

// 3. 로그아웃
router.post('/logout', auth, (req, res) => {
  console.log('logout req : ', req);
  console.log('logout res : ', res);
  // 3-1. 로그아웃 처리를 한다.
  res.status(204).json({ success: true, message: '로그아웃 성공' });
});

// 4. 특정 사용자 계정 조회
router.get('/:userId', async (req, res) => {
  try {
    // 4-1. userId라는 _id값을 가지는 사용자를 찾는다
    const user = await User.findById(req.params.userId);
    // 조건에 맞는 사용자가 존재하지 않을 경우
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '계정 존재 X',
      });
    }
    // 4-2. 위의 조건이 만족하는 경우, 해당 사용자 정보 전달
    return res.status(200).json({ success: true, user: user });
    // 4-3. 서버 에러가 발생했는지 확인
  } catch {
    res.status(500).json({ success: false, message: '서버 에러 발생' });
  }
});

// 5. 계정 수정
router.put('/:userId', auth, async (req, res) => {
  const { email, name, password, password2 } = req.body;
  // 5-1. 필드 입력 확인
  // 비어있는 필드가 존재할 경우
  if (!email || !name || !password || !password2) {
    return res.status(400).json({ success: false, message: '모든 필드 입력' });
  }
  // 5-2. 비밀번호 확인
  // 비밀번호와 비밀번호확인이 다를 경우
  if (password !== password2) {
    return res.status(400).json({ success: false, message: '비밀번호 확인' });
  }
  // 5-3. 본인 계정이 맞는지 확인
  // 본인 계정이 아닐 경우
  if (req.params.userId !== req.user._id.toString()) {
    return res
      .status(401)
      .json({ success: false, message: '본인의 계정이 아닐 경우 수정 불가' });
  }
  try {
    // 5-4. 본인 계정일 경우 수정 절차 밟기
    const user = await User.findById(req.user._id);
    // 해당 계정이 존재하지 않을 경우
    if (!user) {
      return res.status(404).json({ success: false, message: '계정 존재 X' });
    }
    // 5-5. 위의 조건을 만족한 경우 계정 수정
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: '프로필 수정 성공', user: user });
    // 5-6. 서버 에러가 발생했는지 확인
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ success: false, message: '서버 에러 발생' });
  }
});

// 6. 계정 삭제
router.delete('/:userId', auth, async (req, res) => {
  // 6-1. 삭제하려는 계정이 본인 계정이 맞는지 확인
  // 본인 계정이 아닌 경우
  if (req.params.userId !== req.user._id) {
    return res.status(401).json({ success: false, message: '권한 없음' });
  }
  try {
    // 6-2. 본인의 인스턴스 불러오기
    const user = await User.findById(req.user._id);
    // 해당 계정이 존재하지 않는 경우
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: '사용자를 찾을 수 없습니다' });
    }
    // 6-3. 위의 조건을 만족한 경우, 삭제
    await user.remove();
    return res.status(204).json({ success: true, message: '계정 삭제 성공' });
    // 6-4. 서버 에러가 발생했는지 확인
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: '서버 에러 발생' });
  }
});

// 인증 확인
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

module.exports = router;
