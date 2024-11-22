# HTML & CSS, JavaScript

## CSS

### Ch03. Box Model

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. Box Model

Box Model : 모든 HTML 요소는 박스(Box) 모양으로 구성됨을 의미하는 모델

- Document 레이아웃 계산 시, 브라우저의 렌더링 엔진은 표준 CSS Box Model을 참고
- 각각의 요소들을 박스 형태로 나타내어 브라우저에 배치
- HTML 구성 요소를 margin, border, padding, content로 구분

#### CSS Box Model 구성요소

![alt text](<images/03-01. CSS Box Model.PNG>)

1. Content : 텍스트, 이미지 등 요소의 실질적인 콘텐츠가 표시되는 영역

- 보통 태그가 차지하는 영역

2. Padding : Content 영역과 Border 영역 사이의 영역(안쪽 여백)
3. Border : Content 영역을 감싸는 테두리 영역

4. Margin : Border과 이웃하는 요소 사이의 간격(바깥쪽 여백)

- HTML 요소 세로 배치 시, 두 요소의 margin이 겹칠 경우 마진 중첩 발생
  - 마진 중첩 : 두 요소가 세로로 배치되며 각 margin이 만날 때, margin 값이 큰 쪽으로 겹쳐지는 현상

#### Box Sizing

Box Sizing : HTML요소의 너비와 높이를 계산하는 방법

- 요소의 너비(width)
  - Content width + Border width + Padding width
- 요소의 높이(height)
  - Content height + Border height + Padding height
- box-sizing 속성을 통해 변경 가능
  - `box-sizing: content-box;` : 기본 CSS 박스 크기 결정법(콘텐츠 영역을 width, height로 결정)
  - `box-sizing: border-box;` : 테두리(border)과 안쪽 여백(padding)을 요소의 크기에 포함하는 크기 결정법(width, height는 content + padding + border의 width, height)
