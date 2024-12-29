## 조건적 컨텐츠 렌더링
```js
import { EXAMPLES } from "./Data";

function App() {
  const [selectedTopic, setSelectedTopic] = useState('components');
  ...
  return (
    <div>
      ...
      <main>
        ...
        <section id="examples">
          <h2>Examples</h2>
          ...
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
```
- 처음에는 `components`를 출력하는 것이 아닌, 빈 문자열을 출력하고 싶다면 어떻게 해야할까. `null` 흑은 빈문자열을 넣을 수 있다. 그리고 컨텐츠 영역에는 `Please select a topic`이라고 나타나야한다. 이 경우를 다뤄보자.

### 삼항 연산자

`{!selectedTopic ? <p>Please select a topic.</p> : null }`

- `null`은 jsx 코드로 표현할 수 있고, 아무것도 렌더링되지 않는다.

- 응용해서 수정하면 다음과 같다.

```js
function App() {
  ...
  return (
    <div>
      ...
      <main>
        ...
        <section id="examples">
          ...
          {!selectedTopic ? <p>Please select a topic.</p> : null}
          {selectedTopic ? (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
```

### AND 연산자

```js

function App() {
  ...
  return (
    <div>
      ...
      <main>
        ...
        <section id="examples">
          ...
          {!selectedTopic && <p>Please select a topic.</p> }
          {selectedTopic && (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          ) }
        </section>
      </main>
    </div>
  );
}
```

- AND 연산은 조건이 true일 때 뒤의 값을 출력한다.

### 변수

- JSX 코드는 컴포넌트 아무곳에서 일반 값으로 사용할 수 있고, 변수 또는 상수에 저장할 수 있다. 

```js

function App() {
  const [selectedTopic, setSelectedTopic] = useState();
  ...
  let tabContent = <p>Please select a topic.</p>
  
  if (selectedTopic) {
    tabContent = <div id="tab-content">
    <h3>{EXAMPLES[selectedTopic].title}</h3>
    <p>{EXAMPLES[selectedTopic].description}</p>
    <pre>
      <code>{EXAMPLES[selectedTopic].code}</code>
    </pre>
  </div>
  }
  
  return (
    <div>
      ...
      <main>
        ...
        <section id="examples">
          ...
          {tabContent}
        </section>
      </main>
    </div>
  );
}
```

- JSX 코드를 깔끔하게 정리할 수 있다.

## CSS 스타일링 및 동적 스타일링

### className

- JSX와 HTML간에 다른 속성 중 하나이다. JSX에서는 클래스 속성을 사용하기 위해 className을 사용한다.

```js
export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button className="active" onClick={onSelect}>{children}</button>
    </li>
  );
}
```

- 위와 같이 수정하면 모든 버튼이 활성화가 되므로 동적으로 설정하는 법을 알아보자.

```js
export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
```

- 이처럼 isSelected를 prop으로 받아 동적으로 class를 부여할 수 있다.

- 그리고 app.js를 수정하여 isSelected prop을 내린다.

```js
function App() {
  ...
  return (
    <div>
      ...
      <main>
        ...
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
            >
              Components
            </TabButton>
            ...
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}
```

## 리스트 데이터 동적 출력

```js
function App() {
  ...
  return (
    <div>
      ...
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcepts {...CORE_CONCEPTS[0]} />
            <CoreConcepts {...CORE_CONCEPTS[1]} />
            <CoreConcepts {...CORE_CONCEPTS[2]} />
            <CoreConcepts {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        ...
      </main>
    </div>
  );
}
```

- 기존에는 `CORE_CONCEPT` 데이터가 4번 인덱스까지 있기 때문에 출력이 되지만 데이터가 하나 없다면 화면이 망가진다.

- 따라서 동적으로 컴포넌트를 출력해보자.

```js

function App() {
  ...
  return (
    <div>
      ...
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem)=> <CoreConcepts {...conceptItem}/>)}
          </ul>
        </section>
        ...
      </main>
    </div>
  );
}
```
- 

`<CoreConcepts key={conceptItem.title} {...conceptItem} />`

- 우리가 사용하지는 않지만 리액트가 내부적으로 효율적으로 렌더링하게 하기위해 유니크한 키값을 추가해주자.



