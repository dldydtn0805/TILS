## 리액트 프로젝트 세팅 방법

- Node.js LTS 버전 설치
- 원하는 폴더의 터미널 켜고 `npx create-react-app PROJECTNAME`로 CRA 프로젝트 생성
- 또는 `npm create vite@latest`로 VITE 프로젝트 생성

## JSX

- JS에서 쓰는 HTML
    - className
        - JSX에서 쓰는 CSS
        - JS의 class와 의미가 겹치기 때문에 className이라 작성한다
    - {}
        - 데이터바인딩
        - 중괄호를 사용해서 변수를 표현
        - JSX에서는 `document.querySelector().innerHTML`로 직접 넣어야한다
        - innerTEXT 말고도 id, src, className 모든 곳에 변수를 넣을 수 있다
    - STYLE
        - 바닐라JS에서는 `style="color : red"`로 표기
        - JSX에서는 `style={{color : 'red'}}`처럼 {{스타일명 : '값'}}로 표기
        - 바닐라JS에서는 `font-size`라면 JSX에서는 `fontSize`이다

    - return 안에는 병렬로 태그 2개 이상 기입하면 안된다


## useState

- 리액트의 단순 상태 관리 훅
- `import {useState} from 'react'`로 불러온다
- `const [상태변수, 상태명변경함수] = useState('상태명')`로 사용한다
    - Destructuring
        - `let num = [1, 2]`라고 가정할때, `nun1 = num[0]`, `num2 = num[1]`으로 꺼낼 수 있지만, `let [num1, num2] = [1, 2]`로 편하게 꺼낼 수 있다.
- 변수와 상태의 차이점
    - 변수는 변경되면 HTML에 자동으로 반영이 안됨
    - 상태는 HTML이 자동으로 재렌더링됨
        - 즉, 불필요한 렌더링이 이루어 질 수도 있다는 점을 이해할 필요가 있다 [useMemo의 필요성 논의]


## onClick

- 이벤트 핸들러 중 하나
- `<tag onClick={()=>function()}>`으로 tag를 클릭시 콜백 함수가 작동하게 할 수 있다
- 예시 코드
    - articles 객체 요소들의 각각의 like 버튼을 클릭하면 useState로 갱신한다
    - findIndex 메서드로 클릭한 요소를 찾아 like를 증가시킨다
    ```js
    const [articles, setArticles] = useState([
        {title : '남자 코트 추천', like : 0, date: '2월 17일'}, 
        {title : '강남 우동 맛집', like : 0, date: '2월 16일'}, 
        {title : '신림 가성비 카페', like : 0, date: '2월 15일'}, 
    ]);
    function plusLike(X) {
        const nextArticles = [...articles];
        const likedIdx = nextArticles.findIndex(({title})=>
        title === X
        );
        nextArticles[likedIdx].like++;
        setArticles(nextArticles);
    }
    return (
        {articles?.map((article)=>{
        const {title, like, date} = article;
        return (
          <div className="list">
            <h4>{title} <button onClick={()=>plusLike(title)}>👍</button> {like} </h4>
            <p>{date} 작성</p>
          </div>
        )})}
    )
    ```

## Array / Object 수정

- 원본 보존하고 복사하는것이 좋다
    - `const copy = [...orgiginal]`
        - `[...original] : Destructuring`을 해야하는 이유
        - state 변경 함수의 특징 : 기존 상태와 신규 상태가 같을 경우 변경을 안한다
        - Array / Object의 특징 : Array와 Object에는 화살표만 저장이 된다 [REFERENCE TYPE]

## 자바스크립트 객체 정렬

- 객체 속 문자열의 오름차순 정렬은 `Object.sort((X, Y)=> X.key < Y.key ? -1 : 1)` 로 한다
- nextArticles로 갱신하는 이유는 리렌더링을 위해서이다. [REFERENCE TYPE의 한계]

    ```js
    function sortTitle() {
        articles.sort((X, Y) => 
            X.title < Y.title ? -1 : 1
        );
        const nextArticles = [...articles]
        setArticles(nextArticles)
    }
    ```

## 서브 컴포넌트
- main function 바깥에 function을 하나 만들고 return (JSX) 반환한다
- <함수명> </함수명> 혹은 <함수명> 컴포넌트를 사용한다
- 서브 컴포넌트를 만들면 좋은 상황
    - 반복적인 HTML 축약
    - 큰 페이지 [페이지 전환시 사용]
    - 자주 변경되는 HTML UI
- 상태 가져다 쓸때 문제가 생긴다 [A 함수에 있는 변수를 B 함수에서 마음대로 사용 할 수 없다]

## 동적 UI STEP

1. HTML CSS 로 디자인
2. UI 현재 상태를 STATE로 저장
3. STATE에 따라 UI가 어떻게 보일지 선택

## 삼항 연산자

- 조건 ? 참 : 거짓
    - `{모달 조건 ? <모달컴포넌트></모달컴포넌트> : null}`
    - null은 비어있는 HTML으로 자주 사용

## Map

- Array 각각 요소에 콜백 함수를 실행 
- 각 return 값을 모아 배열로 반환
- 첫번째 인자는 각각의 요소 두번째 인자[생략가능]는 반복문의 인덱스

## Props

- 부모 -> 자식만 가능하다
    1. <자식컴포넌트 propsName={stateName}>
    2. 인자에 props 등록
    3. props.propsName 사용
        - 구조 분해 할당을 해서 {propsName}으로 인자를 받을 수 있다
    4. 다양한 상태를 보낼 수 있다 [함수도 전달 가능하다]
        
    ```js
    <Modal swapGender={swapGender} color={colors[key%(colors.length)]} article={article}></Modal>

    function Modal ({swapGender, color, article}) {
    const {id, title, date, detail} = article
    return (
        <div className="modal" style={{background : `${color}`}}>
        <h4>{title} <button onClick={()=>{swapGender(2, id)}}>수정</button></h4>
        <p>{date}</p>
        <p>{detail}</p>
        </div>
    )
    }
    ```

## INPUT 태그

- type : date / checkbox / text / range 등 여러 형태가 있다
- 유사 INPUT 태그 : select / textarea [큰 inputbox]
- onChange / onInput
    - input에 무언가 입력했을때 콜백함수가 실행된다
    - `<input onChange={(E)=>{}}>`에서 E에 입력한 값이 들어있다 [E.target.value]
        - [참고] E.stop.Propagation() : 상위 HTML로 퍼지는 이벤트 버블링을 막는다 
    - onKeyDown / onKeyUp / onChange / onInput 다양한 입력 핸들러가 있다
    - *주의사항* : state 변경 함수는 살짝 느리게 처리된다 

## 클래스 컴포넌트 [LEGACY]

- constructor / super / render 를 사용해서 기본 템플릿을 만든다
    ```js
    class OldModal extends React.Component {
    constructor() {
        super()
    }
    render () {
        return (
        <div>Hello</div>
        )
    }
    }
    ```
- 상태 선언은 contstructor 안에서 한다
    ```js
    this.state = {
        name : 'kim',
        age : 20,
    };
    ```

- 상태 변경은 this.setState로 한다
    ```js
    <button onClick={()=>{this.setState({age : 21})}}>상태수정</button>
    ``` 
    - 기존 state에서 변경사항만 반영해준다

- props는 constructor와 super의 인자로 받는다
    ```js
    constructor(props) {
    super(props);
    }
    {this.props.age}
    ```
- 예시코드
    ```js
    class OldModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name : 'kim',
        age : 20,
        };
    }
    render () {
        return (
        <div>
            Hello {this.state.name} You are {this.state.age} years old
            {this.props.age}
            <button onClick={()=>{this.setState({age : 21})}}>상태수정</button>
        </div>
        )
    }
    }
    ```