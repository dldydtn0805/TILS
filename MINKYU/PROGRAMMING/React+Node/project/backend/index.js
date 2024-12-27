// index.js
// 백엔드 서버의 시작 폴더

// libraries
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const cors = require('cors');
// other files
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
// rest
const app = express();
const port = config.PORT;

const mongoURI = config.mongoURI;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
app.use(cookieParser()); // Cookie 데이터 파싱
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error));

// api endpoint
app.get('/', (req, res) => res.send('Hello World!'));

// 1. 사용자 등록 (post)
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

// 2. login
app.post('/api/users/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: '모든 필드를 입력하세요.' });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    // 해당 이메일을 가진 사용자가 없을 경우, 로그인 실패
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    // 해당 이메일을 가진 사용자와 비밀번호가 일치하지 않는 경우, 로그인 실패
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }
    //
    const token = user.generateToken();
    res
      .cookie('x_auth', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      })
      .status(200)
      .json({ loginSuccess: true, _id: user._id });
  } catch (error) {
    console.error('Error Logging in : ', error);
    return res.status(500).json({ message: '서버 에러 발생' });
  }
});

// 3. auth
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 4. logout
app.get('/api/users/logout', auth, (req, res) => {
  res.clearCookie('x_auth').status(200).json({ logoutSuccess: true });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// server start at port
app.listen(port, () =>
  console.log(`Backend Server is Running at http://localhost:${port}!`)
);
