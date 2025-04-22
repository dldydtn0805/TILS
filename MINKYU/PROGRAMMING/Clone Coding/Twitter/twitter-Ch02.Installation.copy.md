# 클론 코딩

## Twitter

## Ch02. Installation

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Vite

Vite : Vue JS 창시자인 Evan You가 만든 새로운 프론트엔드 툴

- 빠르고 간결한 모던 웹 프로젝트 개발 경험에 초점을 맞춰 탄생한 빌드 도구
- ES Module(Native JS Module)을 기반으로 한 Dev Server
- webpack보다 빠르게 개발 및 배포 가능

#### Vite 개요

Vite 등의 빠른 속도 툴이 출시된 배경 : 메이저 브라우저 엔진들의 Native JS Module 지원

이전 : JS 모듈화를 네이티브 레벨에서 진행할 수 밖에 없었음

- 개발자들은 번들링(Bundling)을 통해 우회하는 방식으로 모듈화 진행
  - 번들링(Bundling) : 결과물 파일들을 압축하여 크기를 줄이는 것
  - 번들링 하는 시간이 너무 오래 걸림(편집 코드가 브라우저에 반영되기까지 수 초 이상의 시간 소요)

Vite 사용 이후 : 로컬환경에서 개발 시 No Bundling

- Plain JavaScript 소스 코드는 사전 번들링
  - 내용이 바뀌지 않으니까, Go로 작성된 Esbuild를 통해 사전 번들링
  - Esbuild는 아직 불안정해서 Rollup 활용
- JSX, CSS 등의 컴파일이 필요하거나 수정이 잦은 Non-Plain JavaScript는 Native ESM을 이용
  - 로컬 서버 구동 속도가 매우 빠름
  - Webpack은 처음 로컬 서버 시작 시, 관련 모듈들을 번들링 후 메모리에 적재
  - Vite : 번들링 없이 바로 서버 실행

#### Vite 사용법

1. 콘솔에 다음과 같은 명령어 작성

- npm create vite@latest

2. 프로젝트명, 사용할 라이브러리 또는 프레임워크, JS / TS 선택
3. npm install, npm run dev
