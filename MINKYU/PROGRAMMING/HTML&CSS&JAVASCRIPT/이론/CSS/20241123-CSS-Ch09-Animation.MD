# HTML & CSS, JavaScript

## CSS

### Ch09. Animation

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. Animation

Animation : 요소에 적용되는 CSS 스타일을 다른 CSS 스타일로 부드럽게 전환시켜주는 기능

- `@keyframes` : 애니메이션(CSS 스타일 변화)의 중간 지점
- 트랜지션보다 큰 규모, 복잡성, 다양한 능력 -> 정밀한 효과 구현 가능

#### keyframes 정의

`@keyframes`을 통해 애니메이션 생성 가능

- from{시작} to{끝}을 통한 애니메이션 shape 생성
- 중간에 {퍼센트%}를 추가하여 중간 스타일 적용 가능

```css
@keyframes shape {
  from {
    /* 이전 속성 내용  */
    border: 1px solid transparent;
  }
  to {
    /* 다음 속성 내용 */
    border: 1px solid #000;
    border-radius: 50%;
  }
}

@keyframes background {
  from {
    background-color: red;
  }
  50% {
    background-color: green;
  }
  to {
    background-color: blue;
  }
}
```

#### 애니메이션의 속성

1. animation-name : 애니메이션 중간 상태 지정

- `@keyframes` 규칙을 이용하여 기술

2. animation-duration : 한 사이클 애니메이션이 얼마에 걸쳐 일어날지를 지정
3. animation-delay : 엘리먼트가 로드된 후, 언제 애니메시연이 시작될지를 지정
