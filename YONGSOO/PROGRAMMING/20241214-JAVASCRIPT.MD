## 디스트럭쳐링

- 배열 분해 할당은 대괄호로 분해할 수 있다

- 위치에 따라 할당하므로 마음대로 이름을 지을 수 있다

```js

const userNameData = ["YONGSOO", "LEE"];
// const firstName = userNameDate[0]
// const lastName = userNameData[1]

const [firstName, lastName] = userNameData;

console.log(firstName, lastName);

```

### 객체 분해 할당 

- 객체 분해 할당은 중괄호로 분해할 수 있다

- 주의할 점은 필드에 할당된 이름을 사용해야 한다는 것이다

- 프로퍼티 이름을 기준으로 값을 가져오므로 동일한 프로퍼티 이름을 사용해야한다

- 단, 콜론을 사용해서 별칭을 지어줄 수 있다

```js

const user = {
  name: "MAX",
  age: 34,
};

// const name = user.name
// const age = user.age

const { name, age } = user;
console.log(name, age);

```

```js

const user = {
  name: "MAX",
  age: 34,
};

// const name = user.name
// const age = user.age

const { name: userName, age } = user;
console.log(userName, age);

```

### 함수 매개변수 목록에서 디스트럭쳐링

- 함수가 객체를 포함하는 매개변수를 수락하는 경우, 객체 프로퍼티를 꺼내서 로컬 범위 변수 [함수 본문에서만 사용할 수 있는 변수]로 사용할 수 있도록 함수를 구조분해할당 할수있다

```js
function storeOrder(order) {
  localStorage.setItem("id", order.id);
  localStorage.setItem("currency", order.currency);
}

function storeOrder({ id, currency }) {
  localStorage.setItem("id", id);
  localStorage.setItem("currency", currency);
}
```

- 위처럼 디스트럭쳐링 구문으로 상수나 변수를 수동으로 생성하지 않고 들어오는 객체에서 ID와 CURRENCY를 꺼내서 사용한다

- storeOrder는 여전히 하나의 매개변수만 받는다, 내부적으로 디스트럭처링 된 객체만 받는다

```js
storeOrder({id:5, currency: 'USD', amount: '15.99'})
```

## 스프레드 연산자

- `...`을 사용하면 배열의 모든 원소를 가져온다
- 이렇게 가져온 원소를 새 배열로 병합할수 있다

```js
const hobbies = ["Sports", "Cooking"];
const newHobbies = ["Reading"];
const mergedHobbies = [...hobbies, ...newHobbies];
```

### 객체에서의 스프레드 연산자

- 객체에서도 스프레드 연산자를 사용할 수 있다

```js
const user = {
  name: "MAX",
  age: 34,
};

const extendedUser = {
  isAdmin: true,
  ...user
};
```

- 전개 연산자가 객체의 모든 키-값 쌍을 가져와 새로운 객체의 키-값 쌍을 추가한다

## 제어문

### 조건문 
```js
if (10 === 10) {
  //
} else if (5 === 5) {
  //
} else if (2 === 2) {
  //
} else {
  //
}
```

- 하드 코딩된 값을 넣는 것은 무의미하다

- 일반적으로 if문을 사용해 사전에 알 수 없는 조건을 확인한다

```js
const password = prompt("Your password");
//
if (password === "Hello") {
  console.log("Hello works");
} else if (password === "hello") {
  console.log("hello works");
} else {
  console.log("Access not granted");
}
```

### 반복문

```js

const hobbies = ["Sports", "Cooking"];

for (const hobby of hobbies) {
  console.log(hobby)
}
```

### 리액트 없이 DOM 조종하기

```js
const list = document.querySelector('ul');
list.remove 
```

## 함수를 값으로 사용하기

- 예컨대 setTimeout은 함수를 값으로 받는다. 화살표 함수나 function 키워드로 익명의 함수를 입력 받거나 사전에 별도로 직접 함수를 생성할 수 있다

- 화살표 함수는 익명 함수로만 생성할 수 있지만 이름을 가진 상수 또는 변수에 저장해 익명 함수에 이름을 부여할 수 있다

- 중요한 것은, 함수에 미리 정의된 다른 함수를 전달할때 이름만 전달한다는 것이다. 소괄호를 작성하지 않음. 소괄호를 작성하면 함수의 반환값이 전달되기 때문이다

- setTimeout은 첫번째 인자로 함수 이름을 받고, 두번째 인자로 밀리초단위의 함수가 대기할 시간을 받는다

- 익명함수를 직접 정의해서 인자로 부여할때도 그저 정의할 뿐이다

```js
function handleTimeout() {
  console.log("Timed Out!")
}

const handleTimeout2 = () => {
  console.log("Timed Out ... again!")
}


setTimeout(handleTimeout, 2000);
setTimeout(handleTimeout2, 3000);
setTimeout(()=>{
  console.log('More timing out...')
}, 4000);
```

### 커스텀 함수에서 함수 값으로 사용하기

- 내장함수 뿐만 아니라 모든함수는 다른 함수를 입력받을 수 있다

```js
function greeter(greetFn) {
  greetFn();
}

greeter(()=>console.log('Hi'));
```

## 함수 내부에서 함수를 정의하기

```js
function init() {
  function greet() {
    console.log('Hi!');
  }

  greet();
}

init();
```

- 바닐라 자바스크립트에서는 자주 사용하지 않는 기능이지만 리액트에서는 자주 자용한다

## 참조형 값과 기본형 값의 비교

- 자바스크립트 기본형 값의 특징은 변경할 수 없다는 것이다

```js
let userMessage = 'Hello';
userMessage = 'Hello there!'
```

- 기존 값을 덮어쓸 수는 있지만 새로운 스트링이 생성된다. 기존 스트링은 삭제된다, 기존 스트링이 변경되어 새로운 스트링이 되는것이 아니다.

```js
let userMessage = 'Hello';
userMessage = userMessage.concat('!!!');
```

- 이렇게 하면 기존 스트링을 수정하는 대신 새로운 스트링을 생성한다

- 즉 문자, 숫자, 부울형을 수정하면 항상 새 값을 생성하게 된다


### 참조형 값의 경우

- 참조형 값의 경우 기존값을 수정하게 된다

```js
const hobbies = ["Sports", "Cooking"];
hobbies.push("Working");
console.log(hobbies)
```

- 변수에 값을 저장할때는 값 자체를 저장하는게 아니라 해당 값의 메모리 주소를 저장하기 때문이다

- 배열은 컴퓨터 메모리 어딘가에 저장된다. 해당 메모리 주소가 상수에 저장된다 

- 예컨대 push를 호출하면 자바스크립트에서 해당 주소를 찾아 주소 값을 열어 배열을 확인후 메모리에있는 배열에 새로운 원소를 추가한다

- 엄밀히 말하면 정확한 설명은 아니지만 스트링 기본형의 경우 스트링 값 자체가 변수에 저장된다고 볼 수 있다.

- 주소는 오브젝트를 다룰때만 사용된다

- const는 값을 변경할 수 없다는 뜻이 아니라 변수를 덮어 쓸수 없다는 뜻이다.

- 즉 const를 사용해서 배열을 선언했더라도 push와 같은 메서드로 배열을 수정할 수 있다. const에는 주소가 저장되고, 주소는 변경되지 않으므로 상수를 덮어쓸 수 없다는 개념을 위반하는 것이 아니다. 

## 차세대 JAVASCRIPT

###  LET & CONST

- 기본적으로 VAR을 대체한다. 

### ARROW FUNCTION

- JS에서 함수를 생성하는 방법이다. 짧은 구문이외에도 This 키워드의 범위를 유지하는데 있어 이점을 제공한다

```js
const callMe =(name) => {
    console.log(name)
}
```

- arguments가 없는 경우 함수 선언 시 빈괄호를 사용해야한다. 

- 정확히 하나의 argument가 있는 경우 괄호를 생략할 수 있다

- value를 return 할때 다음과 같은 숏컷을 사용할 수 있다

```js 
const returnMe = name => name
```

### EXPORT & IMPORT

- 리액트 프로젝트에서 모듈이라 불리는 여러 자바 스크립트 파일들에 코드를 분할한다. 이렇게하면 file/module의 목적을 명확하게 하고 관리가 용이하게 한다

- 다른 파일의 기능에 엑세스 하려면 export & import statement가 필요하다

`export default ...`

`export const someData = ...;`

- default export는 다음과 같이 import 한다

`import someNameOfYourChoice from './path/to/file.js';`

- someNameOfYourChoice는 마음대로 할수있다

- Named exports는 이름으로 import 되야한다

`import {someData} from './path/to/file.js';`

- 파일 하나는 오직 하나의 default와 무한한 named exports를 가질 수 있다

- named exports를 import할때 한번에 모든 named exports를 import할 수 있다

`import * as upToYou from './path/to/file.js';`

- upToYou는 모든 exported 변수 / 함수를 하나의 자바스크립트 객체에 모은다. 예를들어 `export const someData = ...`는 `upToYou.someData`로 엑세스 할 수 있다

### Classes

- classes는 constructor 함수와 prototypes를 대체하는 기능이다. 자바스크립트 객체에 blueprints를 정의할 수 있다

```js
class Person {
    constructor () {
        this.name = 'MAX';
    }
}

const person = new Person();
console.log(person.name); // MAX
```

- 위 예시는 class 뿐만 아니라 class의 property까지 정의한다. 이는 구식 구문이므로 다음과 같이 편리한 정의 방법을 사용해서 class Property를 정의한다

```js
class Person {
    class = 'MAX';
}

const person = new Person();
console.log(person.name) // MAX
```

- 메소드를 정의할 수도 있다

```js
class Person {
    name = 'MAX'
    printMyName () {
        console.log(this.name) // this is required to refer to the class
    }
}
const person = new Person();
person.printMyName();
```

- 혹은 다음과 같이 할 수도 있다

```js
class Person {
    name = 'MAX'
    printMyName = () => {
        console.log(this.name)
    }
}
```

- 클래스 사용 시 inheritance를 사용할 수도 있다

```js

class Human {
    species = 'human';
}

class Person extends Human {
    name = 'MAX'
    printMyName = () => {
        console.log(this.name)
    }
}

const person = new Person();
person.printMyName();
console.log(person.species) // human
```