# NODE JS

## 03. Body Parser & PostMan 연결하기

출처 : [인프런 : 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(John Ahn)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

### 1. PostMan

PostMan : 개발된 API 테스트를 통해 문서화 또는 공유를 도와주는 플랫폼

- URL을 통한 테스트 한계 극복
- OS에 상관없이 계정을 보유하고 있는 경우, 내가 요청한 request 히스토리, 테스트 환경 그대로 저장됨
- [https://postman.com](https://postman.com)을 통해 다운로드 가능

### 2. Body Parser

Parsing : 가지고 있는 데이터를 원하는 형태로 가공하는 과정

- Parser을 통해 수행
- bodyParser, cookieParser, JSON.parse, JSON.stringify 등 많은 파셔 종류가 존재
- 구문을 해석하는 것
  - parser : 구문 해석
  - compiler : 번역

bodyParser : API 요청에서 받은 body 값을 parsing 하는 역할을 수행하는 미들웨어

- HTTP post, put 요청 시 request body에 들어오는 데이터 값을 읽을 수 있는 구문으로 파싱
- request body로 입력해 주어 응답 과정에서 요청의 body 프로퍼티를 새롭게 쓸 수 있도록 도와줌
- body-parser라는 node.js 모듈을 통해 클라이언트 POST request body로부터 파라미터를 편리하게 추출 가능
- Express 애플리케이션과 호환성이 좋음
  - `npm install body-parser` 명령어를 통해 설치
  - `const bodyParser = require('body-parser');`를 통해 express에 붙여서 모듈 사용 가능

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
```

#### Body Parser 적용
HTTP post method를 body-parser를 적용하여 성공했다.

```javascript
// index.js
// 백엔드 서버의 시작 폴더
// require
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// other files
const { User } = require('./models/User');

// rest
const app = express();
const port = 5000; // backend server port
const url = process.env.MONGODB_URL;

app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 데이터 파싱
app.use(bodyParser.json()); // JSON 형식의 데이터 파싱

mongoose
  .connect(url)
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
    res.status(500).json({ message: '서버 오류 입니다.' });
  }
});
// server start at port
app.listen(port, () =>
  console.log(`Backend Server is Running at http://localhost:${port}!`)
);

```