## PROPS 대체 문법

`import { CORE_CONCEPTS } from "./Data.js";`

- 더미 데이터로 객체 배열을 가져와서 JSX로 사용할 수 있다.
- 한 개의 컴포넌트로 여러번 재사용 할 수 있는 것을 확인 가능한데, 이는 모두 PROPS 덕분이다. 


```js
function App() {
  return (
    <div>
      ...
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcepts
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcepts
              title={CORE_CONCEPTS[1].title}
              description={CORE_CONCEPTS[1].description}
              image={CORE_CONCEPTS[1].image}
            />
            <CoreConcepts
              title={CORE_CONCEPTS[2].title}
              description={CORE_CONCEPTS[2].description}
              image={CORE_CONCEPTS[2].image}
            />
            <CoreConcepts
              title={CORE_CONCEPTS[3].title}
              description={CORE_CONCEPTS[3].description}
              image={CORE_CONCEPTS[3].image}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

```

- 반복되는 컴포넌트를 줄이기 위한 숏컷이 있다. 

```js

function App() {
  return (
    <div>
      ...
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* <CoreConcepts
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            /> */}
            <CoreConcepts {...CORE_CONCEPTS[0]}/>
            ...
          </ul>
        </section>
      </main>
    </div>
  );
}
```

- 이와같이 `스프레드 연산자를 사용하여 객체의 키값의 쌍들을 뽑아낼 수 있다`. `객체의 키값 쌍은 하위 컴포넌트의 PROPS에 키값으로 추가`된다. 따라서 아래 코드는 같은 결과를 도출하지만 훨씬 짧다. 

- 하위 컴포넌트 내에서도 더 짧게 작성하는 방법이 있다. 매개변수 목록에서 `디스트럭처링`을 사용하는 것이다. 여기서 사용하는 중괄호는 JSX 상의 중괄호와 아무 관련이 없다. 이 매개변수 목록에서 사용될때 `중괄호는 매개변수의 구조 분해`할때 사용된다. 이 경우는 `PROPS 매개변수를 의미`한다. 자바스크립트의 구조분해는 단순히 들어오는 객체의 속성들을 이름별로 목표로 한다는 것을 의미한다. 따라서 PROPS와 동일한 속성을 사용해야한다. 즉 `데이터상에 있는 키와 정확히 동일한 단어를 사용`해야한다는 것이다. 자바스크립트는 각 요소들을 독립된 변수로 제공한다. 

```js

function CoreConcepts({image, title, description}) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

```

## 더 다양한 PROPS 문법

### 받은 PROP들을 단일 객체로 그룹화

- 여러 PROP을 컴포넌트에 전달한 다음 컴포넌트 함수 내에서 자바스크립트의 REST property 문법을 사용하여 단일 객체로 그룹화 할 수 도 있다. 

```js
function CoreConcept({ ...concept }) { 
  // ...concept groups multiple values into a single object
  // Use concept.title, concept.description etc.
  // Or destructure the concept object: const { title, description, image } = concept;
}
```

### 기본 PROP 값

- 가끔 선택적 PROP을 받을 수 있는 컴포넌트를 만들때가 있다. 예를들어 TYPE PROP을 받을 수 있는 컴포넌트가 있다고 치자. 그러면 이 컴포넌트는 타입 설정 여부와 관계없이 모두 사용 가능해야 한다.

```js
function Button({ caption, type = "submit" }) { 
  // caption has no default value, type has a default value of "submit" 
}
```

## 프로젝트 구조 활용

- 리액트 작업물의 크기가 계속 커지면 컴포넌트도 계속 추가되어 파일도 함께 커지기 때문에 한 파일에 모두 저장하는 것은 추천하지 않는다. 파일에 컴포넌트가 많을수록 다른 컴포넌트를 찾는 것이 어려워지기때문이다. 보통 별도의 컴포넌트는 별도의 파일에 저장하는 것이 좋다. 여러 컴포넌트가 한 파일에 있는 것은 매우 드문 경우로 두개 컴포넌트의 연관성이 매우 높거나 둘이 함께 있어야 작동하는 경우가 많다.

- 보통 src 폴더에 별도의 하위 폴더에 저장된다. 필수는 아니지만 매우 일반적인 선택이자 방식이다. 

`src/components`

- 이 위치에 컴포넌트 파일을 생성하는데, 파일명은 컴포넌트 이름과 동일하게 저장한다. JSX 코드가 사용되므로 JSX 확장자를 추가한다. 

`src/components/Header.jsx`

- 기존 App.jsx 상에서 헤더 컴포넌트와 관련된 모든 코드를 별도의 파일에 아웃소싱했으므로 App.jsx에서도 사용을 원하기 때문에 export 기능을 사용한다. 자바스크립트의 export 키워드로 할 수 있다. 대부분의 리액트 프로젝트는 default export 기능을 사용한다. export 문장을 추가하고 App.jsx에서 import 한다.

- 옮긴 코드 중 import 코드의 경로도 수정해야한다. 따라서 상위 경로를 지정하기 위한 `../` 키워드를 사용해서 수정해준다.


```js
import reactImg from ".././assets/react-core-concepts.png";

export default function Header() {
  ...
}

import Header from "./components/Header.jsx";

```

## 컴포넌트 스타일 파일 저장하기

- 더 작은 컴포넌트별 CSS 파일로 분할할 수 있다.

`src/components/Header.css`

- index.css 파일로 가서 헤더 관련 CSS 규칙을 모두 고르고 Header.css로 이동시킨다. Header.css 파일이 자동으로 웹페이지에 로딩되지 않기 때문에 `import` 구문으로 포함시킬 수 있다. 일반적으로 스타일이 속해있는 컴포넌트 파일에서 할 수 있다. 

`import './Header.css'`

- 빌드 과정 덕분에 import문이 처리되고 로딩된 웹페이지에 CSS 코드가 적용된다.

- 주의해야할점은 CSS 파일을 컴포넌트 파일로 가져와도 `이러한 스타일이 컴포넌트에 적용되지 않는다는 것`이다 이는 단순히 `페이지의 다른 곳에서 헤더 요소를 사용하는 경우` 헤더 `컴포넌트의 일부가 아니어도 스타일이 적용되는 것`을 의미한다. 내장된 헤더 요소가 있는 App.jsx 파일에 직접 다른 헤더를 추가하면 여기에 h1 요소를 넣어도 똑같이 헤더가 스타일링 된다. `Header.css 파일에 있는 스타일이 헤더 컴포넌트에 범위가 제한된 것이 아니므로 페이지에 있는 모든 헤더 요소에 스타일이 적용되는 것`이다. 

- CSS 파일을 컴포넌트별로 구분하면 어떤 스타일이 어떤 컴포넌트에 적용되는지 구분하는 것과 스타일을 조절하는 것이 훨씬 쉬워진다. 그러나 이 컴포넌트에 `자동적으로 한정적으로 적용되는 것이 아니라는 제한점`을 염두에 둬야한다. 

```css
...

header h1 {
    margin: 0;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 5rem;
    background: linear-gradient(40deg, #ea00ff, #ea00ff, #03d5ff, #03d5ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}
  
```

```js

function App() {
  return (
    <div>
      <header>
        <h1>Hello World!</h1>
      </header>
      <Header />
      ...
    </div>
  );
}
```

### 폴더 경로 이동

- 컴포넌트에 Header 폴더를 생성하고 Header.jsx와 Header.css 파일을 이동시켜준다.

`src/components/Header`

- 특정 컴포넌트에 소속된 파일을 바로 찾을 수 있게 도와줘 프로젝트를 정리하기에 유용하다. 폴더 구조가 변경되었으므로 import 문을 수정해야하는데, Header 컴포넌트가 components/Header 부폴더로 이동했기 때문이다. 

