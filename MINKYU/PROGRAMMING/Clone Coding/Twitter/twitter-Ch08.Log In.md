# 클론 코딩

## Twitter

## Ch08. Log In

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Firebase Error

create-account 컴포넌트에서 회원가입 시, 발생할 수 있는 여러 에러들을 고려해 봅시다!!

- try - catch에서 catch문의 파라미터(e)를 console에 찍어보면?
- e의 타입이 FirebaseError일 경우, Post 요청을 보낼 때 Firebase에서 발생시킨 에러이다!
- FirebaseError를 import해서 살펴 보면 다음과 같다
  - string형의 code, name, message가 존재(Error를 확장시켜 만든 클래스)

```tsx
export declare class FirebaseError extends Error {
  /** The error code for this error. */
  readonly code: string;
  /** Custom data for this error. */
  customData?: Record<string, unknown> | undefined;
  /** The custom name for all FirebaseErrors. */
  readonly name: string;
  constructor(
    /** The error code for this error. */
    code: string,
    message: string,
    /** Custom data for this error. */
    customData?: Record<string, unknown> | undefined
  );
}
```

그렇다면?

1. Firebase 에러인지 파악한다
2. 해당 에러의 code를 key로 가지는 것의 value를 에러 메시지로 내보낸다

#### Firebase Auth Error code 종류

1. auth/invalid-email : 유효하지 않은 이메일
2. auth/user-not-found : 사용자 찾기 실패
3. auth/wrong-password : 일치하지 않는 비밀번호
4. auth/internal-error : 잘못된 요청(400 Bad Request)
5. auth/email-already-in-use : 이미 사용중인 이메일
6. auth/weak-password : 약한 비밀번호
7. auth/network-request-failed : 네트워크 요청 실패

결국, e의 타입이 FirebaseError일 경우(e instanceof FirebaseError), error의 값을 주어진 e의 code 속성에 따라 변경해준다

- error의 code를 통해 적절한 에러 메시지를 return하는 handleErrorMessage 함수 정의(switch - case 활용)
- 추가로, 비밀번호 확인란 만들었음!

```tsx
const handleErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/user-not-found':
      return '이메일이 일치하지 않습니다.';
    case 'auth/wrong-password':
      return '비밀번호가 일치하지 않습니다.';
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/weak-password':
      return '비밀번호는 6글자 이상이어야 합니다.';
    case 'auth/network-request-failed':
      return '네트워크 연결에 실패 하였습니다.';
    case 'auth/invalid-email':
      return '잘못된 이메일 형식입니다.';
    case 'auth/internal-error':
      return '잘못된 요청입니다.';
    default:
      return '로그인에 실패 하였습니다.';
  }
};
```

### Login 컴포넌트

Login 컴포넌트는 CreateAccount 컴포넌트와 별 다를 거 없어 보이네요...

- 복붙 On!
- 필요한 기능 : email, password로 firebase의 auth에 저장된 유저 찾은 후 로그인

### 추가 기능

1. 로그인 후 사용 가능한 페이지(home, profile) 등에 로그아웃 버튼 추가

- 버튼 클릭 시, 현재 로그인 되어 있는 계정을 signOut 시기면 됨(auth.signOut())
- 이후, /login 페이지로 navigate

2. 로그인 페이지, 계정 생성 페이지에 서로의 페이지로 이동 가능한 Link 달아주기(react-router-dom)
