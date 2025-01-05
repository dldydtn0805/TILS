// // admin.js
let admin = (requiredRole) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (role <= requiredRole) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
};

module.exports = { admin };
