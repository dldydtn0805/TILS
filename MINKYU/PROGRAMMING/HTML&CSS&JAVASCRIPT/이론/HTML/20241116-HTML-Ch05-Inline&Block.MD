# HTML & CSS, JavaScript

## HTML

### Ch05. Inline Element VS Block Element

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 0. div VS span

Q. div 태그와 span 태그의 차이점은 도대체 뭘까...?!!??!?

- 둘 다 웹 페이지 `영역`을 구분하기 위해 사용하는 태그(semantic은 아님)
  - div : division의 역할 & 컨테이너의 역할
  - span : 특정 text, 문장 영역을 지정하는 역할
- 둘의 차이는 차지하는 영역의 범위
  - div : 주어진 줄을 다 차지(컨테이너의 역할)
  - span : 주어진 글자만큼만 차지(특정 아이템의 역할)

Q. 둘의 특성이 다른 이유는? display의 차이

- div : block-level element(display: block)
- span : inline-level element(display: inline)

### 1. Block-level Element

Block Element : 부모 요소의 전체 공간을 차지하는 요소

- 화면 구성, 레이아웃 등을 짤 경우 블록 레벨 요소를 사용
- 한 칸을 모두 차지 -> 세로로 나열됨
- width, height, margin 속성 적용

**<대표적인 Block 요소>**

- div
- p
- h1 ~ h6

### 2. Inline-level Element

Inline Element : 콘텐츠의 흐름을 끊지 않는 요소

- 태그에 할당된 공간만 차지
- 줄바꿈 X
- 콘텐츠 영역만큼을 차지 -> 가로로 나열
- witdh, height 속성 적용 X
- margin-top, maring-botton 적용 X
  - line-height 사용
- text-align 등의 속성 사용 불가

**<대표적인 Inline 요소>**

- span
- a
- br
- button
- img
- input
- label
- span
- textarea

### 3. CSS Diplay 속성

display : 화면에 요소가 어떻게 드러나게 될 지를 결정하는 속성

- 요소 크기를 결정하는 속성
- 기본 속성이 block인 경우, 해당 태그는 display: block;
- 기본 속성이 inline인 경우, 해당 태그는 display: inline;
- display 속성 변경 가능

#### display 속성의 종류

1. display: none; : 화면에서 사라지는 속성

- 크기 차지 X(아예 없는 취급)

2. display: block; : 가로 한 줄을 다 차지하는 block 속성

- 기본적으로 width가 자신의 컨테이너(부모 요소)의 100%

3. display: inline; : 컨텐츠를 딱 감쌀 정도만 차지하는 inline 속성

- 줄바꿈 불가
- 크기 변화 불가(width, height)

4. display: inline-block; : inline과 block의 특징을 합쳐놓은 속성

- 기본 : inline 속성(요초 자체는 inline)
- 크기 변경 가능 : block 속성(내부를 block처럼 표시)

5. display: flex; :: 레이아웃을 만들기 위해 사용하는 값

- 이후 자세히 다룰 예정
