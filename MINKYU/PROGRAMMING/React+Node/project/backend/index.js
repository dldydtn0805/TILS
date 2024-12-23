// index.js
// 백엔드 서버의 시작 폴더
require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000; // backend server port

const url = process.env.MONGODB_URL;
const mongoose = require('mongoose');
mongoose
  .connect(url, {
    // options
    useNewUrlParser: true, // MongoDB의 새로운 연결 문자열 형식 지원
    useUnifiedTopology: true, // MongoDB의 드라이버 연결 관리 방식 사용
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error));

// api endpoint
app.get('/', (req, res) => res.send('Hello World!'));

// server start at port
app.listen(port, () =>
  console.log(`Backend Server is Running at http://localhost:${port}!`)
);
