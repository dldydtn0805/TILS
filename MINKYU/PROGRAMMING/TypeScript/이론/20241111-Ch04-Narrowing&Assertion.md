# TypeScript
## Ch04. Narrowing & Assertion
출처 : [코딩 애플](https://codingapple.com/unit/how-to-install-typescript-in-local-vue-react/?id=11721)

### 0. 인트로
TypeScript의 장점 : 명확한 타입 지정
- 타입스크립트는 애매한 타입을 싫어함...

Q. 타입이 제대로 지정되지 않은 경우(Union, Any, Unknown)에 어떻게 받아들일까?

A. Defensive한 코딩 방법을 통해 타입 지정
- Narrowing
- Assertion

### 1. Narrowing
Narrowing : 조건문을 통해 타입을 하나로 정해주는 방식
- 타입을 명확하게 정해주어 에러 방지
- typeof : 타입 확인
- in, instanceof 

**<No Narrowing>**
```typescript
function 내함수(x :number | string) {
    return x + 1; // 타입스크립트 에러 발생 : x가 string일 경우 연산 불가
}
```

**<Use Narrowing>**
```typescript
function 내함수(x :number | string) {
    if (typeof x == 'number') {
        return x + 1; // 타입스크립트 에러 발생 : x가 string일 경우 연산 불가
    } else {
        return x;
    }
}
```

### 2. Assertion
Assertion : 타입을 간편하게 지정해주는 방식
- `변수명 as 변환타입` : 해당 변수를 변환타입으로 변환해 주세요.
- 타입스크립트 컴파일러가 눈감아줌!!

```typescript
function 내함수(x :number | string) {
    return (x as number) + 1;
}
```