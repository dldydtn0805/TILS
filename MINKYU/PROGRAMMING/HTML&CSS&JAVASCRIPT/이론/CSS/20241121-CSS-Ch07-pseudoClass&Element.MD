# HTML & CSS, JavaScript

## CSS

### Ch08. Pseudo Class & Element

출처 : [짐코딩 유튜브](https://www.youtube.com/playlist?list=PLlaP-jSd-nK-ponbKDjrSn3BQG9MgHSKv)

### 1. 가상 클래스

가상 클래스(Pseudo Class) : 선택하고자 하는 HTML 요소의 특별한 상태(status)를 명시할 때 사용하는 클래스

- `선택자:가상클래스이름 {속성: 속성값;}` 형태로 사용

#### 대표적인 CSS 가상 클래스

1. `:link` : 아직 방문하지 않은 요소

- href 속성을 가진 태그(a, area, link) 중 방문하지 않은 요소 선택

2. `:visited` : 사용자가 방문한 적이 있는 링크
3. `:active` : 사용자가 활성화한 요소(ex. 버튼)을 나타냄
4. `:hover` : 사용자의 마우스 포인터가 요소 위에 올라가 있을 경우 선택됨
5. `:focus` : 양식의 입력 칸 등 포커스를 받은 요소를 나타냄

- 사용자가 요소를 클릭하거나 탭(또는 키보드의 tab 키로 선택)했을 때 발동

6. `:nth-child` : 형제 사이에서의 순서에 따른 요소 선택
7. `:not(selector) - not(selector)` : 안에 포함된 요소를 제외시킴

#### 가상 클래스 사용 시 주의사항

대표적인 가상 클래스 사용 시 권장되는 작성 순서

1. link
2. visited
3. hover
4. active

순서가 달라질 경우, 적용이 안될 수도

### 2. 가상 요소

가상 요소(Pseudo Element) : 해당 HTML 요소의 특정 부분만을 선택할 때 사용하는 요소

- `선택자::가상요소이름 {속성: 속성값;}`으로 사용

#### 대표적인 CSS 가상 요소

1. `::first-letter` : 텍스트의 첫 글자만을 선택

- 블록 레벨 요소에만 사용 가능

2. `::first-line` : 텍스트의 첫 라인만을 선택

- 블록 레벨 요소에만 사용 가능

3. `::before` : 특정 요소 내용(content) 부분 바로 앞에 다른 요소를 삽입할 때 사용
4. `::after` : 특정 요소 내용(content) 부분 바로 뒤에 다른 요소를 삽입할 때 사용
5. `::selection` : 해당 요소에서 사용자가 선택한 부분만을 선택할 때 사용
