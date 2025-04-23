# 클론 코딩

## Twitter

## Ch05. Firebase Setup

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Firebase에서 필요한 기능 Setup하기

#### Authentication

1. Build -> Authentication 이동
2. 시작하기 클릭
3. Email/Password 클릭

- 다른 기능(Github Login 등)들은 추후 해 볼 예정

4. Email/Password 활성화
5. firebase.ts 파일에 auth 변수 추가 및 export

```tsx
import { getAuth } from 'firebase/auth';
export const auth = getAuth(app);
```

6. auth를 App.tsx에서 활용

- await auth.authStateReady();
  - Firebase가 쿠키와 토큰을 읽는다
  - 백엔드와 소통해서 로그인 여부를 기다린다

```tsx
const init = async () => {
  // 최초 인증 상태가 완료될 때 시작되는 Promise return
  // Firebase가 쿠키와 토큰을 읽고, 백엔드와 소통해서 로그인 여부 확인
  await auth.authStateReady();
  // firebase 기다리기 위해
  setIsLoading(false);
};
```
