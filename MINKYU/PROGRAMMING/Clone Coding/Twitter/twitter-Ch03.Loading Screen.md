# 클론 코딩

## Twitter

## Ch03. Loading Screen

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Loading Screen 세팅

Loading Screen은 굉장히 중요한 기능

- 1초도 안걸려서 보통 렌더링이 완료되지만, 그 사이에 무엇인가 필요함
- 그 필요한 것을 Loading 화면으로 채워주는 기능을 적용하기
  - useEffect, useState를 활용하여 isLoading 변수를 통해 적용

1. loading-screen.tsx 생성하기

- styled-components를 통해 Wrapper, Text 정의
- 이런 식으로 styled.태그``를 통해 스타일 컴포넌트를 정의 가능하다!!

```tsx
import { styled } from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;
```

- 정의한 두 컴포넌트를 LoadingScreen 컴포넌트에 적용 및 export

```tsx
function LoadingScreen() {
  return (
    <>
      <Wrapper>
        <Text>Loading...</Text>
      </Wrapper>
    </>
  );
}

export default LoadingScreen;
```

2. 생성한 LoadingScreen 컴포넌트를 App.tsx에 적용 및 useState, useEffect를 활용하여 로딩화면 띄우기

- 삼항 연산자 활용하여 띄울 tsx 선택

```tsx
import { useEffect, useState } from 'react';

// routes
import LoadingScreen from './components/loading-screen.tsx';

function App() {
  // 현재 로딩중인지에 대한 여부를 담은 boolean형 변수
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // isLoading의 값을 false로 변경해 주는 비동기 함수
  const init = async () => {
    // firebase 기다리기 위해
    setIsLoading(false);
  };

  // useEffect에 init() 호출 -> 렌더링 될 때 init()이 호출되게 하기
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
```
