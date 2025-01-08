// // auth.js
// module.exports = { auth };
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

let auth = async (req, res, next) => {
  console.log('hhhalksdfjalskfjlkdas');
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // 권한이 없을 경우
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: '토큰이 없습니다.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    // 해당 토큰을 발급받은 사용자가 없을 경우
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: '해당 계정이 존재하지 않습니다.' });

    req.user = user; // 사용자 정보를 요청 객체에 추가
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: '서버 에러 발생' });
  }
};

module.exports = { auth };
