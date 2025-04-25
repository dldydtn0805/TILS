# 클론 코딩

## Twitter

## Ch10. Nav Bar

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### HamePage UI 제작하기

1. Layout 컴포넌트를 다음과 같은 styled-components CSS로 제작하기

- Wrapper
- Menu
- MenuItem

2. 기존 Layout에 네비게이션 바 추가하기

- Outlet 대신, 사용자가 로그인 했을 때 NavBar가 한 쪽 모서리에 나타나게, 반대쪽은 프로필, 로그아웃 등

3. 필요한 아이콘 찾아서 사용

- SVG vector icon 웹사이트 : [heroicons.dev](https://heroicons.dev/)
  - user, home, logout 아이콘 가져와서 사용하기 ~.~

#### styled-components 활용

우리가 필요한 컴포넌트

1. Wrapper : LayOut 전체를 감싸줄 div

- display: grid 설정
  - grid-template-columns: 1fr 4fr;

2. Menu : 필요한 메뉴들을 감싸줄 div
3. MenuItem : 각 메뉴를 감싸줄 div

- 각 MenuItem은 svg를 감싸고 있음
- 클릭 시 로그아웃 하게 도와주는 MenuItem의 className은 log-out
- hover할 경우 나타나는 Tooltip을 감싸고 있음

4. Tooltip : 각 MenuItem를 hover 했을 대 설명 div

- 상위 MenuItem을 hover할 경우 Tooltip이 오른쪽에 보여짐

```tsx
// styled components
const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
  height: 100%;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;
```
