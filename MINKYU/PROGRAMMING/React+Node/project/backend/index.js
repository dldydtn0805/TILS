// index.js
// 백엔드 서버의 시작 폴더
// require
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
// other files
const { User } = require('./models/User');

// rest
const app = express();
const port = config.PORT;
const mongoURI = config.mongoURI;
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
console.log('mongo URI : ', mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error));

// api endpoint
app.get('/', (req, res) => res.send('Hello World!'));

// 사용자 등록 (post)
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 데이터 유효성 검사
  if (!name || !email || !password) {
    return res.status(400).json({ message: '모든 필드를 입력하세요.' });
  }

  try {
    // User 객체 생성
    const user = new User({ name, email, password });
    // DB에 저장
    await user.save();
    // 성공 응답 반환
    return res.status(201).json({ message: '사용자 등록을 성공했습니다.' });
  } catch (error) {
    // 에러 처리
    console.error(error);
    console.log('hi');
    res.status(500).json({ message: '서버 오류 입니다.' });
  }
});
// server start at port
app.listen(port, () =>
  console.log(`Backend Server is Running at http://localhost:${port}!`)
);
