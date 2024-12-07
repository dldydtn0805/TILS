## 익명 함수

- 익명 함수를  이렇게 내보낼 수 있다.

```js

export default function (userName, message) {
  console.log("Hello");
  return userName + message;
}
```

- 혹은 매개변수 입력만 해도 되는 화살표 함수를 이용한다.

```js

export default (userName, message) => {
  console.log('Hello');
  return userName + message;
}
```



### 화살표 함수 단축



1. 매개변수 목록 괄호 생략
 
- 화살표 함수가 하나의 매개변수만 사용하는 경우, 묶는 괄호를 생략할 수 있다
 
`userName => {...}`
 
- 단, 매개변수가 없는 경우 괄호를 생략해서는 안된다
 
2. 함수 본문 중괄호 생략
 
- 함수에 반환문 외에 다른 로직이 없는 경우 return 키워드와 중괄호를 생략할 수 있다
 
`number => number*3`
 
- 단 자바스크립트는 중괄호를 JS 객체를 생성하는 코드가 아닌 함수 본문 래퍼로 취급하므로, 객체를 반환하고 싶을때는 다음과 같이 해야한다.
 
`number => ({age : number})`

## 객체

- 여러개의 값을 그룹으로 묶는다

```js

const user = {
  name: "Max",
  age: 34,
};
console.log(user.name);
```

- 함수 또한 객체에 포함시킬 수 있다

```js

const user = {
  name: "Max",
  age: 34,
  greet() {
    console.log("Hello");
  },
};
```

- 객체 안의 함수에서 객체의 속성에 접근하려면 this 키워드를 사용한다

```js

const user = {
  name: "Max",
  age: 34,
  greet() {
    console.log("Hello");
    console.log(this.age);
  },
};
```



### 클래스



- 실제 객체를 생성할때 사용할 블루프린트를 만들 수 있다

- constructor 키워드를 사용하는 것 말고는 함수와 동일하게 작성한다

- 생성자를 통해 매개변수 값을 입력받을 수 있다

- this 키워드를 사용해 프로퍼티에 값을 저장할 수 있다


```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log("Hi");
  }
}
 
const user1 = new User("Manuel", 35);
console.log(user1);
user1.greet();

```

## 배열
 
- 배열은 값의 목록을 순서대로 저장하여 위치에 따라 값을 액세스 한다
 
- 배열에는 배열, 객체, 숫자, 문자열을 저장할 수 있다
 
- 배열 값은 쉼표로 구분되고 인덱스를 통해 값을 액세스한다
 
```js
 
const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[0]);
 
 
```
 
- 유틸리티 배열 메서드를 사용하려면 배열 이름에 점 표기법을 붙이면 자동으로 사용할 수있는 메서드를 표시해준다
 
### PUSH
 
- 배열에 새 원소를 추가한다
 
### FINDINDEX
 
- 특정 값의 인덱스를 찾는다
 
- 원하는 값을 찾은 경우 true를 반환해야한다
 
- findIndex는 함수를 입력받아 배열의 모든 요소에 함수를 실행한다
 
```js
 
const index = hobbies.findIndex((item) => {
  return item === "Sports";
});
console.log(index);
 
 
 
```
 
- 더 줄인다면 다음과 같다
 
`const index = hobbies.findIndex((item) => item === "Sports");`
 
### MAP
 
- map을 사용해서 모든 원소르 다른 원소로 변환한다
 
- findeIndex처럼 함수를 입력받고, 화살표 함수를 전달하는 경우가 많다
 
- REACT에서 목록의 내용물을 출력하거나 데이터를 JSX 요소로 매핑할 수 있다
 
- 기존 배열을 수정하지 않고 새 배열을 반환한다
 
`const editedHobbies = hobbies.map((item) => item + "!");`
 
- 어떠한 유형의 원소든 다른 유형의 원소로 변환할 수 있다 [객체 / 숫자 / 스트링 / 부울]
 
`const editedHobbies = hobbies.map((item) => ({ key: item }));`