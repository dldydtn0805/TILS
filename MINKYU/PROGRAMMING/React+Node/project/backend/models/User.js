// User Model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  }
});
// Model
const User = mongoose.model('User', userSchema);

// export
module.exports = { User };
