# 클론 코딩

## Twitter

## Ch17. Deploy with Firebase Hosting

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Deploy

우리는 로컬 환경에서 개발한 것으로 만족하면 안된다..!

- 배포 해 봐야지 반드시 해야지

Hosting 하는 법

1. Firebase의 우리가 만든 앱에서 Build - Hosting 클릭
2. Hosting에서 주어진 Install Firebase CLI 복사 - 붙여넣기

- npm install -g firebase-tools
- firebase login
- firebase init
  - `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys` 선택
  - `Use an existing project` 선택
  - `nwitter-213bd (nwitter)` 선택
  - `What do you want to use as your public directory?` dist 입력
  - dist 폴더에 index.html이 생긴 것을 확인할 수 있다.

3. 이제, package.json에서 Vite로 프로젝트를 열 경우, build를 사용할 수 있음을 알 수 있다

- package.json의 scripts 키에 대한 값으로
- "predeploy": "npm run build",
- "deploy": "firebase deploy"
- 추가!

- 어디에 bundle에 빌드되는지 확인 해 봅시다
  - `npm run build`

Project Console: https://console.firebase.google.com/project/nwitter-213bd/overview
Hosting URL: https://nwitter-213bd.web.app

앞으로는 수정 사항 발생 시

1. npn rum dev를 통해 로컬 개발환경에서 확인
2. npm run build를 통해 hosting된 주소에 반영
3. firebase deploy --only hosting를 통해 배포
