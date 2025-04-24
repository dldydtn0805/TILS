# 클론 코딩

## Twitter

## Ch07. Protected Routes

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Protected Routes

앞서 우리는 App.tsx에서 route들을 설정했다.

- 그런데, 우리는 로그인 이후 사용해야 하지만 로그인이 되지 않았을 때는 로그인 화면으로 돌아가게 하고 싶다!
- Protected Route를 만들어 봅시다!

우선, Protected Route로 감싸줘야 하는 컴포넌트들

- Home
- Profile
- 이 둘은 결국 Layout으로 감싸짐 -> Layout을 ProtectedRoute로 감싸주자!

ProtectedRoute의 역할 : 파라미터로 받은 컴포넌트(child)를 화면에 렌더링 하기 전, firebase의 auth를 통해 현재 로그인이 되어 있는지 확인(auth.currentUser)

- 로그인이 되어 있지 않을 경우, 로그인 화면으로 재렌더링
- 로그인이 되어 있을 경우, 파라미터로 받은 컴포넌트 랜더링

Protected Route

```tsx
// protected-route.tsx
import { auth } from '../firebase.ts';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 현재 인증된 유저
  const user = auth.currentUser;

  // user값이 Null일 경우
  if (!user) {
    // 로그인 페이지로 Navigate
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
```

App.tsx의 route 변경

```tsx
const router = createBrowserRouter([
  // 기본 router(/ -> Layout)
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    // Layout 하위 router
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  // 계정 router
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
  // 로그인 router
  {
    path: '/login',
    element: <Login />,
  },
]);
```
