# NODE JS

## 06. Bcrypt로 비밀번호 암호화 하기

출처 : [인프런 : 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(John Ahn)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

### 1. Bcrypt

앞서 말한 내용 : 우리는 공개되면 안되는 정보를 잘 숨겨야 한다

- .env 파일에 중요 내용을 담고, 이를 .gitignore에 추가
- development 상태인지, production 상황인지를 파악하여 /key.js에서 조건을 확인한 후 config를 연결한다

그렇다면, DB에 저장되는 중요한 정보들(회원 비밀번호 등)은 어떻게 관리해야 할까?

- Bcrypt를 이용한 비밀번호 암호화가 필요

Bcrypt : hash 함수를 이용한 정보의 단방향 암호화를 도와주는 Node.js 패키지

- 단방향 암호화 -> 복호화가 불가능(매 번 SALT 값이 달라짐)
  - SALT : 비밀번호에 임의의 고유한 무작위 값을 추가하여 해킹을 어렵게 해주는 방식
- `npm install bcrypt --save`를 통해 설치

#### Bcrypt 사용 방법

1. bcrypt 패키지 설치

- `npm install bcrypt --save`

2. bcrypt로 비밀번호 암호화

- app.post('/register') 과정에서 save 진행
- User.js에서 userSchema의 save 과정 전에 bcrypt 진행(userSchema.pre('save', function(next) ... ))
  - bcrypt를 통해 해시화된 비밀번호를 적용
  - saltRound 번호 지정(보통 10 ~ 12 저장, 커질수록 시간이 길어짐)

```javascript
const bcrypt = require('bcrypt');
const saltRound = 10; // 보통10 ~ 12로 지정
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
```
