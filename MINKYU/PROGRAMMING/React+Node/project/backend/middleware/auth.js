// auth.js
const { User } = require('../models/User');

let auth = async (req, res, next) => {
  try {
    // 인증 처리
    // 클라이언트 쿠키로부터 토큰을 가져온다.
    let token = req.cookies.x_auth;
    if (!token) {
      return res
        .status(401)
        .json({ isAuth: false, error: true, message: 'jwt 토큰 X' });
    }
    console.log('token:', token);
    // 가져온 토큰을 복호화하여 DB에서 유저를 찾는다.
    const user = await User.findByToken(token);
    console.log('user : ', user);
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
    // 유저가 있을 경우, 인증이 성공한다.

    // 유저가 없을 경우, 인증이 실패한다.
  } catch (error) {
    console.error(error);
    return res.json({ isAuth: false, error: true });
  }
};

module.exports = { auth };
