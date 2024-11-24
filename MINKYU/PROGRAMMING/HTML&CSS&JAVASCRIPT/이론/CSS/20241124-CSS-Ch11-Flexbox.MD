# HTML & CSS, JavaScript

## CSS

### Ch11. Flexbox

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. Flexbox

Flexbox : 뷰포트나 요소의 크기가 불명확하거나 동적으로 변할 때에도 효율적으로 HTML 요소를 배치, 정렬, 분산 할 수 있는 방법을 제공하는 CSS3의 새로운 레이아웃 방식

- 복잡한 계산 없이 요소의 크기와 순서를 유연하게 배치할 수 있다

#### Flexbox 구성

Flexbox의 구성요소

- flex item : 배치하려고 하는 HTML 요소
- flex container : flex item들을 감싸고 있는 부모 요소

#### Flexbox 생성

flexbox를 만드는 방법 : flex item 또는 flex container에 `display: flex;` 속성 지정

- display: flex; 적용 -> flex container가 됨
  - 해당 요소의 자식 요소는 flex item
- 부모 요소가 inline인 경우 : `inline-flex` 지정

#### Flexbox 축

flex item은 주축(main axis)를 기준으로 정렬된다

- main axis : 주축
- cross axis : 주축과 수직한 축
- flex container의 `flex-direction` 속성에 의해 정의

1. `flex-direction: row;` : 주축 방향 : 왼 -> 오

- main axis : 가로 방향(왼 -> 오)
- cross axis : 세로 방향(위 -> 아래)

2. `flex-direction: column;` : 주축 방향 : 위 -> 아래

- main axis : 세로 방향(위 -> 아래)
- cross axis : 가로 방향(왼 -> 오)

#### flex container속성

flex container : 전체적인 정렬이나 흐름을 정의하는 것

0. display
1. flex-direction : flex-container의 주축(main axis) 방향을 설정하기 위한 속성

- `flex-direction: row;` : 좌 -> 우 수평 배치(기본값)
  - main axis : 가로(좌 -> 우)
  - cross axis : 세로(위 -> 아래)
- `flex-direction: row-reverse;` : 우 -> 좌 수평 배채
  - main axis : 가로(우 -> 좌)
  - cross axis : 세로(위 -> 아래)
- `flex-direction: column;` : 위 -> 아래 수직 배치

  - main axis : 세로(위 -> 아래)
  - cross axis : 가로(좌 -> 우)

- `flex-direction: column-reverse;` : 아래 -> 위 수직 배치
  - main axis : 세로(아래 -> 위)
  - cross axis : 가로(위 -> 아래)

2. flex-wrap : flex container의 여러 자식 요소들(flex items)을 한 줄 또는 여러 줄로 배치하기 위한 속성

- flex container의 width보다 flex item들의 width 합계가 클 때, 어떻게 표현할 것인가?
- `flex-wrap: nowrap;` : flex item을 개행하지 않고 1행에 배치(기본값)
  - 각 flex item들이 container에 들어갈 수 있는 크기로 축소
  - flex item들의 width 합계가 flex container의 width보다 커질 경우, `overflow: auto;`를 지정하여 가로 스크롤이 생기고 컨테이너는 넘치지 않음
- `flex-wrap: wrap;` : width 합계가 넘어갈 경우 flex item을 개행하여 여러 행에 배치
- `flex-wrap: wrap-reverse;` : wrap과 비슷한 속상이지만, 아래에서 위로 배치

3. flex-flow : flex-direction 속성과 flex-wrap 속성을 위한 단축 속성

- `flex-flow: direction속성 wrap속성;`을 통해 지정
- 기본값 : row nowrap

4. justify-content : flex container의 main axis를 기준으로 flex item들을 정렬하기 위한 속성

- `justify-content: flex-start;` : main start 기준 정렬(기본값)
- `justify-content: flex-end;` : main end 기준 정렬
- `justify-content: center;` : flex container의 중앙에 정렬
- `justify-content: space-between;` : 첫번째, 마지막 item들은 좌우 측면에 정렬, 나머지는 균등하게 정렬
- `justify-content: space-around;` : 모든 flex item들을 균등한 간격으로 정렬

5. align-content : flex container의 cross axis를 기준으로 flex item들을 정렬하기 위한 속성

- 모든 flex item들에 적용
- `align-content: strech;` : flex container의 높이(cross start ~ cross end)에 꽉찬 높이를 가짐(기본값)
- `align-content: flex-start;` : 모든 flex item들을 flex container의 cross start를 기준으로 정렬
- `align-content: flex-end;` : 모든 flex item들을 flex container의 cross end를 기준으로 정렬
- `align-content: center;` : 모든 flex item들을 flex container의 cross axix 중앙을 기준으로 정렬
- `align-content: space-between;` : 첫번째 flex item의 행은 flex container의 상단에, 마지막 flex item의 행은 flex container의 하단에 배치하고, 나머지 행은 균등 분할 공간에 배치
- `align-content: space-around;` : 모든 flex item을 균등 분할된 공간 내에 배치 정렬

6. align-items : flex item을 flex container의 cross axis로 정렬되게 하는 속성

- 모든 flex item에 적용
- flex line(align-content에 의해 지정된 기준선)을 기준으로 정렬
- `align-items: stretch;` : 모든 flex item이 flex container의 높이(cross start ~ cross end)를 가지는 것(기본값)
- `align-items: flex-start;` : 모든 flex item이 flex container의 cross start를 기준으로 정렬
- `align-items: flex-end;` : 모든 flex item이 flex container의 cross end를 기준으로 정렬
- `align-items: center;` : 모든 flex item이 flex container의 cross axis 중앙을 기준으로 정려
- `align-items: baseline;` : 모든 flex item이 flex container의 baseline을 기준으로 정렬

#### flex item 속성

1. order : flex item의 배치 순서를 지정

- HTML 코드를 변경하지 않고 재배치하기 위해 사용
- 기본 배치 순서 : flex container에 추가된 순서
- 기본값 : 0

2. flex-grow : flex item의 너비(width)에 대한 확대 인자 지정

- 기본값 : 0(음수값 : 무효 처리)

3. flex-shrink : flex item의 너비(width)에 대한 축소 인자 지정

- 기본값 : 1(음수값 : 무효 처리)

4. flex-basis : flex item의 너비 기본 단위를 지정

- 기본값 : auto

5. flex : flex-grow, flex-shrink, flex-basis 속성의 단축속성

- 기본값 : 0 1 auto
- 개별적으로 기술하는 것을 추천

6. align-self : align-items 속성보다 우선하여 개별 flex item 정렬

- 기본값 : auto
