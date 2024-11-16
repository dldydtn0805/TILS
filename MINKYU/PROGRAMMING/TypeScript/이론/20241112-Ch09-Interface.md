# TypeScript
## Ch09. Interface
출처 : [코딩 애플](https://codingapple.com/course/typescript-crash-course/)

### 1. Interface
Interface : Object자료형의 타입을 보다 편리하게 지정하기 위한 Type Alias 방식
- Object의 내부 속성 타입들을 미리 정의하기 위해 사용
- 대문자로 인터페이스명 작성, {} 내부에 타입 명시
- 한 줄 마다 콤마(,) 대신 세미콜론(;) 사용 가능
-  `extends` 키워드를 활용하여 더 큰 인터페이스에 복사 가능
    - `interface 인터페이스1 extends 인터페이스2 {새로운 속성};`
    - 이미 만들어진 인터페이스2에 새로운 속성을 추가하여 만들어진 인터페이스1을 정의한다.

#### type vs interface
type과 interface의 차이 : extends 활용 여부
1. type 
- AND 연산자(&)를 통해 두 타입 합치기 가능
- 중복선언 불가능
- 자주 사용하는 외부 라이브러리 이용 시, type 선언 덮어쓰기, 오버라이드가 편함
2. interface
- AND 연산자(&)를 통해 두 인터페이스 합치기 가능
- extends 키워드를 통해 새로운 인터페이스 복사 가능
- 중복선언 허용(extends와 같은 의미)
