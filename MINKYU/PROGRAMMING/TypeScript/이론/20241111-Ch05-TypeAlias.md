# TypeScript
## Ch05. Type Alias & ReadOnly
출처 : 출처 : [코딩 애플](https://codingapple.com/course/typescript-crash-course/)

### 1. Type Alias
Type Alias : `type` 키워드를 활용하여 특정 타입을 변수화하는 것
- `type 타입명 = 지정할타입;`을 통해 Type Alias 지정
- 관습적으로 대문자로 시작, CamelCase
- ex. type MyType = string | number | undefined;

```typescript
type PeopleObjectType = {
    name :string,
    age :number,
    address :string,
};

const 나 :PeopleObjectType = {
    name : "김민규",
    age : 27,
    address : "인천 중구 신도시북로 43번길 11", 
};
```
#### Type Alias 합치기
& : 지정한 두 Type Alias를 합치는 연산자
- `type NewTypeAlias = TypeAlias1 & TypeAlias2;`를 통해 앞서 생성한 두 타입 별칭(TypeAlias1, TypeAlias2)를 하나의 타입 별칭(NewTypeAlias)로 만들 수 있다
- type을 extend 하는 방법

type 키워드는 재정의가 불가능
- 이미 생성한 하나의 타입 별칭은 다른 타입을 재할당할 수 없음
- interface 키워드를 사용 시 가능
### 2. readonly 키워드
const : 값이 변하지 않는 변수를 만들 때 사용하는 키워드
- const 변수명 = 변수값;
- 한 번 값을 할당한 경우, 해당 변수에 저장된 값을 변경 불가능
- Object 자료형을 const로 지정하여도 내부(key - value)는 변경 가능
    - Object.key = new_value;
- 즉, const는 변수의 재할당만 막아주는 키워드(object의 속성은 관여 X)

readonly : 오브젝트의 내부 속성(key)에 저장된 값을 변경 불가능하게 잠궈주는 키워드
- `readonly 키값 : 값타입`으로 지정

