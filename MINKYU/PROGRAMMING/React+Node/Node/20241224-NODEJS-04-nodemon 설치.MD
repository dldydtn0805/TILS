# NODE JS

## 04. Nodemon 설치

출처 : [인프런 : 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(John Ahn)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

### 1. Nodemon

Nodemon : Node.js 애플리케이션을 자동으로 감지하고, 변경된 소스 코드가 발생할 경우 애플리케이션 서버를 재시작해주는 tool

- 파일을 수정할 때 마다 서버를 껏다 킬 필요 없이 즉시 코드 변경을 반영
- `npm install nodemon --save-dev`를 통해 설치
- package.json 파일의 scripts 속성에 `"backend" : "nodemon index.js"` 추가(앞으로는 nodemon을 통해서 서버 시작)
- nodemon을 이용하여 서버를 시작하는 법 : `npm run backend`
  - 내가 script 속성에 backend와 nodemon을 연결해 놨기 때문

#### --save vs --save-dev

nodemon 설치 시, `npm install nodemon --save-dev` 명령어를 통해 설치했음
npm : JS용 Package Manager

- package.json 파일을 통해 프로젝트 정보, 패키지 의존성 관리
- 협업 시 동일 개발 환경 구축을 위해 사용

npm install : 패키지 설치 명령어

- `./node_modules` 디렉토리에 package.json에 있는 모든 패키지를 설치

npm install --save : package.json 파일의 dependencies 항목에 있는 패키지 정보를 추가

- dependencies : 제품 릴리즈에 필요한 항목(빌드 과정에 포함)
- npm 5 버전 이후부터 npm install과 같은 의미

npm install --save-dev : package.json 파일의 devDependencies 항목에 있는 패키지 정보를 추가

- devDependencies : 개발 또는 테스트 단계에서만 사용하는 패키지
  - eslint, webpack, axios 등
  - 서비스 로직과는 상관없이 개발의 편의성을 위해 사용하는 툴
