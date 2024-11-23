# HTML & CSS, JavaScript

## CSS

### Ch10. 반응형 웹 사이트

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. 반응형 웹 사이트

반응형 웹 사이트(Responsive Web Site) : 웹 사이트에서 PC 화면 뿐만 아니라 모바일, 태블릿, 노트북 등 여러가지 디바이스 해상도에 반응하여 각각 최적의 화면을 보여주는 홈페이지

- 뷰포트(Viewport) : 웹 브라우저에서 실제 내용이 표시되는 영역
  - 뷰포트 메타태그를 통해 메타태그 사용
  - `<meta name="viewport" content="속성1=값1, 속성2=값2, ...">`

#### 메타 뷰포트 태그 속성

1. width : 뷰포트 가로
2. height : 뷰포트 세로
3. user-scalable : 사용자 확대 / 축소 가능 여부
4. initial-scale : 초기 화면 비율
5. maximum-scale : 최대 화면 비율
6. minimum-scale : 최소 화면 비율

#### 메타 뷰포트 태그 사용법

뷰포트의 너비를 디바이스(스마트폰) 화면 너비에 맞추고, 초기 화면 배율을 1로 지정

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

#### 뷰포트 단위

1. vw(viewport width) : 1vw는 뷰포트 너비의 1%
2. vh(viewport height) : 1vh는 뷰포트 너높이의 1%
3. vmin(viewport minimum) : 뷰포트 너비, 높이 중 작은 값의 1%
4. vmax(viewport maximum) : 뷰포트 너비, 높이 중 큰 값의 1%

#### 미디어 쿼리

미디어 쿼리(media query) : 접속하는 디바이스나 뷰포트에 따라 특정 CSS 스타일을 사용하는 방법

- `@media` 키워드를 사용하여 특정 미디어에서 어떤 CSS를 적용할 것인지 지정
  - 중단점(breakpoint)를 통해 변화 지점 설정

미디어 쿼리 문법 : `@media [only | not] 미디어유형 [and 조건] * [and 조건]`

- only : 미디어쿼리를 지원하지 않는 웹 브라우저에서는 미디어 쿼리를 무시하고 실행 X
- not : not 다음 지정하는 미디어 유형 제외
- and : 조건을 여러 개 연결하여 추가

미디어 유형

- all : 모든 장치에 적합
- print : 인쇄 결과물(또는 출력 미리보기 화면)에 표시중인 문서
- screen : 화면 대상
- speech : 음성 합성장치 대상
