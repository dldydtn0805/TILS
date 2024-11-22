# HTML & CSS, JavaScript

## CSS

### Ch06. position

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. position

position : HTML 요소를 배치하는 방법

- static, relative, absolute, fixed, sticky 등의 속성 값 설정 가능

#### position 속성값

1. 요소가 HTML 문서의 일반적인 흐름을 따르게 배치하는 position 속성값

- static : 기본 position 속성
  - top, left, bottom, right
- relative : 자신의 static 위치로부터 상대적인 위치에 배치되게끔 하는 position 속성값

2. 요소가 HTML 문서의 일반적인 흐름을 따르지 않게 배치하는 position 속성값

- absolute : static 속성값이 아닌 부모를 기준으로 배치되게끔 하는 position 속성값
  - 부모 중 static position이 아닌 경우가 없을 경우, 최상위 태그(body)가 기준이 됨
- fixed : 스크린 뷰포트(viewport)를 기준으로 하여 배치되게끔 하는 position 속성값
  - 스크롤 되어도 움직이지 않는 고정 자리를 가짐

3. 일반 흐름 + 일반적이니 않는 흐름을 합친 position 속성값

- sticky : 요소가 HTML 문서 안에서 static처럼 일반적인 흐름을 따라가다가, 스크롤 위치가 임계점에 도달할 경우, fixed로 변경되는 position 속성값

4. 3차원 속성

- z-index : 어느 객체가 앞에 나오고 뒤에 나올 지에 대한 배치 순서를 결정하는 속성
  - position(relative, absolute, fixed) 속성이 적용된 요소에서만 적용 가능
