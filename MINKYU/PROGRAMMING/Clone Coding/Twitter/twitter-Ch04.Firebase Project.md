# 클론 코딩

## Twitter

## Ch04. Firebase Project

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

#### Firebase 적용하기

1. Firebase 접속([https://firebase.google.com/](https://firebase.google.com/))
2. 최하단의 `시작하기` 클릭
3. `Firebase 프로젝트 만들기` 클릭
4. 프로젝트 이름 입력(nwitter)
5. Google Analytics for this project 비활성화
6. 내 프로젝트(nwitter)에 app 추가

- web 선택

7. app 등록(App nickname 작성)
8. Firebase SDK 추가[npm install firebase](https://console.firebase.google.com/project/nwitter-213bd/overview?hl=ko&fb_gclid=Cj0KCQjw_JzABhC2ARIsAPe3ynrIrb66s3MsmjjLuy8TVscFoVX-XkJBYKWHp5mbHObpciIPPIJVh5oaAg9REALw_wcB)

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_-HEsPT4aYc17E7b_JIvLHhJIHqkHths',
  authDomain: 'nwitter-213bd.firebaseapp.com',
  projectId: 'nwitter-213bd',
  storageBucket: 'nwitter-213bd.firebasestorage.app',
  messagingSenderId: '1092991846907',
  appId: '1:1092991846907:web:c0bf4ca63cd2f5e2e7235e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

9. 복사한 후 src 폴더에 `firebase.ts` 파일 생성

- 복사한 Config 내용을 해당 파일에 복사 - 붙여넣기

#### 우리가 할 것

1. 페이지

- 계정 생성 페이지
- 로그인 페이지
- 홈페이지
- 프로필 페이지

2. 기능

- Authentication 기능
- Tweet 기능
- 프로필 수정 기능
