# HTML & CSS, JavaScript

## CSS

### Ch04. display

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. display 속성

display : HTML요소를 어떻게 표시할지를 결정하기 위한 속성

- HTML 요소마다 가지고 있는 기본 display 속성이 다름

#### display 속성값

1. `display: none;` : 요소를 보이지 않게 설정

- 영역 차지 X

2. `display: block;` : 요소를 block element로 변경

- 기본적으로 가로 영역을 모두 채움
- width, height 속성 지정 가능
- div, p, h1 ~ h6 태그 등이 block

3. `display: inline;` : 요소를 inline element로 변경

- 컨텐츠만큼 영역 차지
- 줄바꿈 X
- width, height 속성 지정 X
- span, a 태그 등이 inline

4. `display: inline-block;` : 요소를 inline-block element로 변경

- 요소는 inline 속성, 내부는 block 속성
  - 컨텐츠만큼 영역을 차지(inline)
  - width, height 속성 지정 가능
