# TypeScript
## Ch05. Type Alias & ReadOnly
출처 : [코딩 애플](https://codingapple.com/unit/how-to-install-typescript-in-local-vue-react/?id=11721)

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