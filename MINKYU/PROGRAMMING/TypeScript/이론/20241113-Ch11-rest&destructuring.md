# TypeScript
## Ch10. 함수 rest 파라미터와 destructuring 타입 지정
출처 : [코딩 애플](https://codingapple.com/unit/how-to-install-typescript-in-local-vue-react/?id=11721)

### 1. rest
rest : 함수에 들어오는 파라미터의 개수를 확정지을 수 없을 때 사용하는 파라미터 표기법
- 점 3개(...)를 파라미터 앞에 붙인다
- rest 파라미터 사용 시, 주어지는 파라미터는 배열에 담겨서 온다(타입 지정 신경쓰기)

```typescript
function 더하기(...x :number[]) {
    const result :number = 0;
    x.forEach((i) => {
        result += i
    })
}
```

#### rest parameter vs spread operator
spread operator : 배열(또는 오브젝트)의 괄호를 벗기기 위해 배열(또는 오브젝트) 왼쪽에 점 세개(...)를 붙이는 방법
- extend 개념이랑 비슷한 듯

```typescript
const arr :number[] = [3, 4, 5];
const new_arr :number[] = [1, 2, ..., arr]; // [1, 2, 3, 4, 5]
```

### 2. destructuring
Destructuring : JS에서 배열 또는 오브젝트 내부 데이터를 변수에 저장하고 싶을 때 사용하는 문법
- 기존 
    - const 변수 = 배열[인덱스번호];
    - const 변수 = 오브젝트.변수키값;
- destructing 사용
    - const [a, b] = ["ㅋㅋ", 100];
    - const { a, b } = { a : "zz", b : 100 };
- object destructuring의 경우, 변수 이름을 속성 이름과 맞춰주는 것이 편리