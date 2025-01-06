// // admin.js
let admin = (requiredRole) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (role < requiredRole) {
      return next();
    }
    return res
      .status(403)
      .json({ success: false, message: '관리자 권한이 없습니다.' });
  };
};

module.exports = { admin };
