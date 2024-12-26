// User Model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
// Schema

// 1. 글 작성자 스키마
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백 없애는 역할
    unique: 1, // 유일성 1(한개로 제약)
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // 유저 역할
  role: {
    type: Number,
    default: 0,
  },
  // 유저 이미지
  image: String,
  // 토큰
  token: {
    type: String,
  },
  // 토큰 유효 기간
  tokenExp: {
    type: Number,
  },
});

// 비밀번호 해싱 미들웨어
userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (error, salt) {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 비교
userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this;
  return await bcrypt.compare(plainPassword, user.password);
};

// jwt 생성
userSchema.methods.generateToken = function () {
  const user = this;
  const payload = { id: user._id.toJSON() };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  user.token = token;
  user.save();
  // DB에 저장함과 동시에 user를 리턴
  return token;
};

// token 복호화
userSchema.statics.findByToken = async function (token) {
  const user = this;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await user.findById(decoded.id);
    return foundUser;
  } catch (error) {
    throw error;
  }
};

// Model
const User = mongoose.model('User', userSchema);

// export
module.exports = { User };
