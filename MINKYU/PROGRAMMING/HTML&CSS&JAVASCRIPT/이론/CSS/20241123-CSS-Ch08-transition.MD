# HTML & CSS, JavaScript

## CSS

### Ch08. Transition

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. Transition

Transition : 속성 값이 변할 때, 부드럽게 전환될 수 있도록 도와주는 기능

#### Transition의 속성

1. `transition-property` : 어떤 속성에 트랜지션 효과를 적용할 것인지를 지정

- `transition-property: <속성1>, <속성2>;` 같은 방법으로 지정
- `transition-property: all;` : 모든 속성 지정(all은 생략 가능)
- `transition-property: none;` : 지정 X

2. `transition-duration` : 트랜지션 효과 지속 시간 지정(초 단위)
3. `transition-delay` : 지정한 초 만큼 기다렸다 실행 하는 방법
4. `transition-timing-function` : 트랜지션이 시작하면서 끝날 때의 타이밍(속도)를 지정

- linear : 시작과 끝의 속도가 일정
- ease-in : 천천히 시작, 빠르게 끝
- ease-out : 빠르게 시작, 천천히 끝

#### Transition 단축 속성 지정

앞서 배운 속성들을 단축 지정 하는 방법

- `transition: all 2s ease-in;` :
