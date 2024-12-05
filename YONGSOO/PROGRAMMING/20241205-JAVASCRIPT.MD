# MODULE

- HTML 파일 내에 <script></script> 태그를 사용해서 JS를 사용한다

- `type="module"` 속성으로 JS 내에서 IMPORT 기능을 활성화 할 수 있다

## BUILD PROCESS

- REACT 내에 따로 script 태그가 없는데도 JS가 작동하는 이유는 백그라운드 빌드 프로세스 때문이다.

- PACKAGE.JSON 파일의 dependencies를 보면 react-scripts가 있고 html 수정을 한다.

- 개발 서버가 소스코드를 변환하고 HTML를 수정하는 것이다.

### WHY

1. 처리되지 않은 리액트 코드는 브라우저에서 실행할 수 없기 때문인데, 그것은 리액트의 JSX 기능이다. [표준 JS 기능이 아니므로 정상 작동하지 않는다]

2. 작성한 코드가 프로덕션을 위해 최적화되지 않았기 때문이다, 즉 충분히 간소화되지 않았다.  [작성한 코드의 변수 혹은 함수 이름이 짧게  변형되지 않았다는 것]

## IMPORT && EXPORT



- 내보낼 파일의 변수의 앞에 export 키워드를 둔다

`export let apiKey = "fdafdafewqafka"; `

- 가져올 파일에서 import 키워드를 사용한다

`import { apiKey } from "./util";` // [리액트 빌드 프로세스는 자동으로 확장자를 추가해준다]



### DEFAULT



- 내보낼 파일에서 변수를 두지 않고 값을 export 한다 [파일별로 하나의 default export만 존재할 수 있다]

`export default "fdafdafewqafka"`

- 가져올 파일에서 작명을 하고 import  한다 [export 할때 변수 명을 지정해주지 않았기 때문에]



### OJECT IMPORT



- 여러 변수를 EXPORT 할 경우 객체 상태로 IMPORT 할 수 있다

`import * as util from "./util"`



### AS



- IMPORT 할때 변수명이 마음에 들지 않을 경우 AS로 수정 가능하다

`import { abc as content, apiKey } from "./util";`

## 변수



- 값을 저장하는 데이터 컨테이너, 원하는 이름을 할당 할 수 있다

- 이 이름을 식별자로 값을 사용할 수 있다

- 값을 재사용할 수 있고, 코드 가독성을 높인다

- JS에서는 일반적으로 카멜케이스를 사용한다

`let userMessage = "hello world"`

- 사용할수있는 특수문자는 $와 _뿐이다

- 숫자를 사용할수있지만 맨 앞에 둘수없다



## 상수



- 변수와 마찬가지로 데이터 컨테이너이지만, 값을 변경할 수 없다는 차이가 있다 [읽기 전용]

`const userMessage = "hello world";`

- 코드에 의도를 명확하게 하기 위해서는 다시 할당하지 않을 값에는 const를 사용하는 것이 좋다

## +

- 숫자 연산과 문자 연산 동시에 가능하다

`console.log("hello"+"world")`

`console.log(10+5)`



## 비교 연산자

- boolean 값이 return된다

`console.log(10 === 5);`

- 조건 식에서 자주 사용된다

```js

if (10 === 10) {
  console.log("works");
}
```

## FUNCTION

- 함수 이름은 함수가 무슨일을 하는지를 하는지 나타내도록 짓는다

- 함수 선언과 함수 호출로 나뉜다.

```js

function greet() {
  console.log("hello!");
}
 
greet();
```

- 매개변수로 다양한 값을 출력할 수 있다

```js

function greet(userName, message) {
  console.log(userName);
  console.log(message);
}
 
greet("Max", "Hello");
greet("Manuel", "Hello, what's up");
 
```



- 매개 변수의 DEFAULT 값을 설정할 수 있다 [물론 매개 변수 값을 넣어 오버라이드 할 수도 있다]

```js

function greet(userName, message = "Hello!") {
  console.log(userName);
  console.log(message);
}
 
greet("Max");
greet("Manuel", "Hello, what's up");
```



- 함수의 반환 값을 사용할 수 있다

```js

function createGreeting(userName, message = "Hello!") {
  return "Hi, I am " + userName + ". " + message;
}
 
const greeting = createGreeting("Max");
console.log(greeting);
console.log(createGreeting("Manuel", "Hello, what's up?"));
```