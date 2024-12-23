# NODE JS

## 01. NODE JS 와 EXPRESS JS

출처 : [인프런 : 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(John Ahn)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

### 1. Node.js & Express js

Node.js : Chrome V8 JavaScript 엔진을 기반으로 하는 JavaScript 런타임

- 서버 측에서 JS를 실행할 수 있게 해주는 환경
  - Node.js가 나오기 전 : JavaScript를 Browser에서만 실행 가능
  - Node.js가 나온 후 : JavaScript를 Server-Side에서도 실행 가능
- 즉, JS를 SS에서 사용할 수 있게 하는 언어!

Express js : Node.js를 위한 웹 애플리케이션 프레임워크

- Server-Side 애플리케이션 개발을 위한 프레임워크
- RESTful API 구축에 사용

#### 개발환경 구축

0. Editor(VSCode) 설치

- Google - Visual Studio 검색 [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Download for Windows 클릭 -> 설치

1. Node.js 설치 및 Boiler-Plate 구축

- Google - Node.js 검색 [https://nodejs.org/ko](https://nodejs.org/ko)
- LTS 버전 다운로드(검증된 버전)
- Powershell에서 `node -v`로 현재 정상적으로 설치되었는지 확인
  - 정상적으로 설치 되었을 경우, 현재 버전이 뜸

2. 백엔드 초기화

- 프로젝트를 진행하려는 폴더 생성(mkdir 폴더명)
- 해당 폴더로 디렉토리 이동(cd 폴더명)
- 기본 package.json 파일 생성 - 프로젝트 초기화(npm init -y로)

3. Express js 설치

- 해당 디렉토리에서 express 설치(npm install express --save)
  - `--save` : package.json 파일의 "dependencies" 키 값에 key - val 형태로 해당 프로젝트에서 사용하는 express.js의 버전을 작성해주세요~ 라는 뜻

4. 시작 환경 구축

- project/backend/ 디렉토리에 `index.js` 파일 생성
  - 진입점(Entry Point) 역할 : 프로젝트가 시작될 경우 가장 먼저 실행되는 파일
    - package.json 파일의 main 속성에 지정(이름이 index.js일 경우, 따로 지정 안해도 됨 - 알아서 찾아감)
  - 서버 설정 : 서버 초기와, 라우팅, 미들웨어 설정 등 요청 처리를 위한 파일
  - 코드 구조화 : 각 기능 별로 파일을 만들고, index.js에서 해당 파일들을 불러와서 사용
- package.json의 scripts 속성 안에 "start" : "node index.js", 키 - 값 쌍 추가
  - npm run start를 할 경우, node 애플리케이션의 index.js를 시작점으로 프로그램을 시작한다.
  - 그 밑에 test는 npm run test를 할 경우겠네~
