// User Model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Article } = require('./Article');
const { ArticleLike } = require('./Article_Like');
const { Comment } = require('./Comment');
const { CommentLike } = require('./Comment_Like');

const saltRounds = 10;
// 이메일 정규 표현식
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 비밀번호 정규 표현식
const passwordRegEx = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

// Schema
// 사용자 스키마
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    match: [emailRegEx, '이메일 형식이 유효하지 않습니다.'],
  },
  password: {
    type: String,
    required: true,
    match: [passwordRegEx, '비밀번호 형식이 유효하지 않습니다.'],
  },
  // 유저 역할
  role: {
    type: Number,
    enum: [0, 1, 2], // 0 : 관리자, 1 : 중간 관리자, 2 : 사용자
    default: 2, // 기본값 : 사용자(2)
  },
  // 유저 이미지
  image: String,
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

// 사용자 계정 삭제 미들웨어
userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    await Article.deleteMany({ user_id: this._id });
    await ArticleLike.deleteMany({ user_id: this._id });
    await Comment.deleteMany({ user_id: this._id });
    await CommentLike.deleteMany({ user_id: this._id });
    next();
  }
);

// 비밀번호 비교
userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this;
  return await bcrypt.compare(plainPassword, user.password);
};

// jwt 생성
userSchema.methods.generateToken = function () {
  const user = this;
  const payload = { id: user._id.toString() };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  // user.token = token;
  // user.save();
  // // DB에 저장함과 동시에 user를 리턴
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
