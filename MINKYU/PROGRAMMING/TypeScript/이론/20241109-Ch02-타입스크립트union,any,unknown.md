# TypeScript
## Ch02. Union, Any, Unknown 타입
출처 : 출처 : [코딩 애플](https://codingapple.com/course/typescript-crash-course/)

### 1. 애매한 타입 설정
Q. 만약 변수에 들어갈 값들의 타입이 확실하지 않을 경우?
- 해당 변수에 string이 들어가는지, number가 들어가는지 모르겠어!
A. 여러 가지 타입을 통해 설정 가능하다
- Union
- Any
- Unknown

#### Union Type
Union Type : `|`연산자(OR)를 활용하여 여러 타입을 설정 가능
- let 변수명 :type1 | type2 | ... | typeN = 변수값;
- let 변수명 :(type1 | type2 | ... | typeN) = 변수값;
- 해당 변수에는 `|` 연산자로 이은 타입들에 해당하는 변수들만 저장 가능

**array, object에 적용하기**
1. array type에 union 적용
- let 배열명 :(type1 | type2 | ... | typeN)[] = 배열;
2. object type에 union 적용
- let 객체명 :{ key1 : (type11 | .. | type1N), key2 : (type21 | ... | type2N), ... } = 객체;

**변수에 정의된 Union Type vs Array, Object에 정의된 Union Type**
1. 변수에 정의된 Union Type : 할당과 동시에 OR 역할이 사라짐
2. Array, Object에 정의된 Union Type : 할당과 상관없이 OR 역할 유지

#### Any Type
Any Type : 아무 자료형이나 집어넣을 수 있는 타입
- let 변수명 :any = 변수값;
- 변수값의 타입을 변경해도 에러 발생 X
- 장점 : 진짜 아무렇게나 자료형 사용 가능
- 단점 : 타입 관련 버그 발생 시, 추적이 어렵고, TS를 쓰는 의미가 사라짐

#### Unknown Type
Unknown Type : Any와 비슷하게 아무 자료형이나 집어넣을 수 있는 타입
- 장점 : any Type보다 안정성 도모 가능
    - Unknown Type은 이미 정해진 자료형이 있는 변수화 상호작용 불가능
    - ex
    - let age :unknown = 1;
    - age + 1; // 에러 발생(age는 unknown, 1은 number)

Unknown 활용 방법
- 타입스크립트의 코딩 방법 : 내가 조작하려는 변수의 타입이 무엇인지 확실하게 알아야 한다
- narrowing 또는 assertion을 활용하여 unknown type의 변수를 조작하자
