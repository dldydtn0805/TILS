# TypeScript
## Ch06. Literal Type
출처 : [코딩 애플](https://codingapple.com/unit/how-to-install-typescript-in-local-vue-react/?id=11721)

### 1. Literal Type
Literal Type : 특정 글자나 숫자만 가질 수 있도록 제한을 두는 타입 지정 방법
- ex. let 방향 = 'left' | 'right';
    - '방향' 이라는 이름의 변수는 string type의 'left', 또는 'right'라는 값만 담을 수 있는 변수이다.
- 어떻게 보면 const 키워드의 업그레이드 버전
    - const : 값을 재할당 할 수 없는 변수 지정 키워드
    - literal type : 특정 값을 제외한 값을 재할당 할 수 없는 변수 키워드
- `변하는 중요한 정보`를 저장하고 싶을 때 사용

#### as const
as const : 타입을 좁은 범위로 바꿔주는 키워드
- 만약, 오브젝트 내부의 키 값에 접근하고 싶을 때
    - var 자료 = { name : 'kim' };
- 해당 오브젝트의 name 키 값을 접근하면 'kim'이 나옴
- 그런데, 함수의 파라미터로 무조건 'kim'만 받음
    - function 함수(para :'kim') {}
- 어? 그러면 자료.name을 넣어도 되겠네?
    - 안됨...!!
- 이유 : 실제로 자료.name의 타입은 'kim'이 아닌 'string'이기 때문!
- `let 오브젝트 = {} as const;`를 통해 선언
    - 1. 해당 오브젝트에 속한 키에 대응하는 타입을 value와 똑같이 바꿔줌
    - 2. 오브젝트 내부 모든 속성을 readonly로 변경

```typescript
// 문제가 되는 경우
/*
var 자료 = { name : 'kim' };
function 함수(para :'kim') {};
함수(자료.name); // 에러 발생 -> 자료.name의 타입은 실제로 'kim'이 아닌 string
*/

// as const를 사용하는 경우
var 자료 = { name : 'kim' } as const;
// 1. 오브젝트(자료)의 내부 키 값들의 타입(name)을 해당 키에 대응하는 값 그 자체('kim')으로 변경
// 2. 오브젝트 내부 모든 속성들을 readonly로 변경
```