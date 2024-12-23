# NODE JS

## 02. Mongo DB 연결

출처 : [인프런 : 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(John Ahn)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

### 1. Mongo DB 연결하기

#### 다운로드

1. Mongo DB 사이트 접속 [https://www.mongodb.com](https://www.mongodb.com)
2. 클러스터 만들기

- Organization 생성
- Project 생성
- Cluster 생성
  - Password, url 알고 있어야 함

3. Mongoose 설치

- Mongoose : Mongo DB를 간편하게 사용할 수 있는 Object Modeling Tool
- npm install mongoose --save

#### 어플리케이션에 Mongo DB 연결

1. mongoose 변수 생성

- const mongoose = require('mongoose');

2. 내가 만든 클러스터 url로 연결

- mongoose.connect(url 주소, {
  useNewUrlParser: true, useUnifiedTopology: true,
  }).then(() => console.log('MongoDB Connected...'))
  .catch(error => console.log(error))
  - MongoDB의 해당 클러스터와 연결된 url 주소로 연결
  - Options 설정
    - `useNewUrlParser: true` : MongoDB의 새로운 연결 문자열 형식 지원
    - `useUnifiedTopology: true` : MongoDB의 드라이버 연결 관리 방식 사용

### 2. Model & Schema

Schema : DB의 데이터 구조를 정의하는 것

- DB에 저장될 문서의 형식과 구조 정의
- 데이터 유효성, 필드 타입 및 제약 조건 등 지정 가능
  - 필드 정의 : 각 문서가 가지는 필드와 그 타입 정의
  - 유효성 검사 : 특정 필드에 대한 유효성 검사 설정
  - 기본값 설정 : 특정 필드의 기본값 설정
  - 인덱스 설정 : 검색 성능 향상을 위한 특정 필드에 대한 인덱스 설정

Model : Schema를 기반으로 한 객체

- Schema를 통해 정의된 구조를 기반으로 DB와 상호작용 할 수 있는 메서드(CRUD) 제공
- Schema를 기반으로 하여 데이터 관리
- Model을 통해 새로운 문서 인스턴스 생성 가능

#### Schema와 Model 만들기

1. models 폴더 생성 -> User.js 파일 생성
2. mongoose 정의

- `const mongoose = require('mongoose');`

2. 만들 Schema 생성

- `const 스키마명 = mongoose.Schema({스키마내용정의});`

3. 만든 Schema에 대한 Model 생성

- `const 모델명 = mongoose.model('모델이름', 스키마이름);`
  - '모델이름'이라는 이름을 가진 모델을 정의
  - 해당 모델이 '스키마이름'에 따라 데이터를 관리함

4. 다른 파일에서 사용 가능하기 위해 export

- `module.exports = { 모델명 };`

```javascript
// User Model
const mongoose = require('mongoose');

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

// Model
const User = mongoose.model('User', userSchema);

// export
module.exports = { User };
```
