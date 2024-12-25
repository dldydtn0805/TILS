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


mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error));

// api endpoint
app.get('/', (req, res) => res.send('Hello World!'));

// 사용자 등록 (post)
app.post('/register', async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: '모든 필드를 입력하세요.' });
  }
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({ message: '사용자 등록 성공', user: user });
  } catch (error) {
    console.error('Error Saving User : ', error);
    return res.status(500).json({ message: '서버 에러 발생' });
  }
});

// server start at port
app.listen(port, () =>
  console.log(`Backend Server is Running at http://localhost:${port}!`)
);
