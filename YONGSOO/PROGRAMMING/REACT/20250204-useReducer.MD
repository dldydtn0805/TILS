## useReducer

- 두개의 값을 반환한다
    1. state : 현재 상태 
    2. dispatch : 상태 업데이트 함수

- `useState`와의 비교
    - useState : 간단한 상태를 관리
    - useReducer : 복잡한 상태 로직이 필요하거나, 여러 상태를 동시에 관리

```js
import {useReducer, Reducer } from 'react'
import './App.css'

interface State {
  age : number
}

interface Action {
  type: 'incremented_age'
}

const reducer: Reducer<State, Action> = (state:State, action:Action) => {
  switch (action.type) {
    case 'incremented_age':
      return {age: state.age+1}
   default:
    throw new Error('Unknown action type')
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, {age:42})
  return (
    <>
      <h1>useReducer</h1>
      <button onClick={()=>dispatch({type: 'incremented_age'})}>
        Increment age
      </button>
      <p>Hello ! You are {state.age}</p>
    </>
  )
}

export default App
```

### 핵심 개념

- reducer : `state`와 `action`을 받아서 새로운 상태를 반환한다. 상태를 어떻게 업데이트 할지를 정의한다

- action : type 속성을 필수로 가진다. 필요한 다른 정보는 추가로 담을 수 있다. 상태를 변경하려는 동작을 나타내는 객체이다. 

- dispatch : 액션을 발생시킨다. 이를 호출하면, reducer가 실행되서, 상태가 변경된다.

### 상태 불변성

- 상태를 변경할때는 항상 새로운 객체를 반환해야한다. 절대 직접 수정하면 안된다.

### 초기 상태 설정

- useReducers는 두번째 인자로 초기 상태를 받는다. 혹은 불필요한 계산을 피하기 위해 세번째 인자로 초기상태를 설정하는 함수를 전달 할 수 있다.

```tsx
import { useReducer } from 'react';

interface State {
  age: number;
}

interface Action {
  type: 'incremented_age';
}

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'incremented_age':
      return { age: state.age + 1 };
    default:
      throw new Error('Unknown action type');
  }
};

// 초기 상태 설정 함수
const init = (): State => {
  // 여기서 복잡한 초기화 로직을 추가할 수 있습니다.
  return { age: 42 }; // 예시 초기값
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  return (
    <>
      <button onClick={() => dispatch({ type: 'incremented_age' })}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}

```

### init

- init 함수가 반환하는 값이 초기 상태가 된다.
- 상태 초기화가 복잡한 경우 이 방법을 사용하여 가독성을 높인다.
- 주의할 점은, useReducer의 세번째 인자에는 함수 참조만 전달해야 한다는 점이다.

### 사용 이유

- 초기 상태 로직을 지연 : 상태 초기화에 오래 시간이 걸리거나 동적 값을 기반으로 초기 상태를 계산할때 유용하다.

- 성능 최적화 : 필요할때만 상태를 초기화할 수 있다