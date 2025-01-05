// index.js
// 백엔드 서버의 시작 폴더

// libraries
require('dotenv').config(); // dotenv
const express = require('express'); // express
const bodyParser = require('body-parser'); // body-parser
const cookieParser = require('cookie-parser'); // cookie-parser
const mongoose = require('mongoose'); // mongoose
const cors = require('cors'); // cors
// routes
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const articleRoutes = require('./routes/article');
const articleLikeRoutes = require('./routes/article_like');
const commentRoutes = require('./routes/comment');
const commentLikeRoutes = require('./routes/comment_like');
const config = require('./config/key'); // config

// rest
const app = express();
const port = config.PORT;
const mongoURI = config.mongoURI;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // 쿠키를 포함한 요청 허용
  })
);
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
app.use(cookieParser()); // Cookie 데이터 파싱
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error));

// api endpoint
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/boards', boardRoutes);
app.use('/api/users', authRoutes); // auth 관련(회원가입, 회원탈퇴, 로그인, 로그아웃)
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/articlelikes', articleLikeRoutes);
app.use('/api/commentlikes', commentLikeRoutes);

// server start at port
app.listen(port, () =>
  console.log(`Backend Server is Running at http://localhost:${port}!`)
);
