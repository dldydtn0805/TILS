# TypeScript
## Ch10. Narrowing 할 수 있는 방법
출처 : [코딩 애플](https://codingapple.com/course/typescript-crash-course/)

### 1. Narrowing 주의사항
Narrowing 사용 시 주의사항
- undefined에 대한 처리 
- 복잡한 object 자료 narrowing

#### && 연산자
&& : if문을 간편하게 쓰기 위한 방식
- 처음으로 등장하는 falsy 값(ex. null, undefined, NaN 등)을 찾아주고, 없을 경우 마지막 값을 남겨주는 연산자
- `변수1 && 변수2 && 변수3 &&... && 변수N` : 변수1 ~ 변수N중 처음으로 falsy 값을 발견하면 해당 값을, 없을 경우 마지막 값(변수N)을 남겨줌
- `if (변수 && typeof 변수 === "타입") {}` 이런 식으로 많이 사용
    - 변수가 undefined인 경우 실행 X(undefined가 남음)
    - 변수가 null인 경우 실행 X(null이 남음)

#### in 연산자
in : object 자료와 키 값을 연결해주는 연산자
- `if (키값 in 오브젝트) {}` 이런 식으로 많이 사용
- 서로 배타적인 속성을 가져오는 경우 사용하는 것이 좋음

#### instanceof 키워드
instanceof : 어떠한 클래스로부터 생산된(new) 객체에 대해, 해당 객체의 부모 클래스를 확인하기 위해 사용하는 키워드
- `if (인스턴스 instanceof 클래스)` : 인스턴스가 클래스로부터 만들어졌는지에 대한 참/거짓
