# 클론 코딩

## Zoom

## Ch03. Frontend 기본 세팅

### 필요한 라이브러리

1. React + TypeScript / Vite을 이용한 기본 프론트엔드 폴더 구현 및 node_modules 설치

- npm create vite@latest frontend --template react
- cd frontend
- npm install

2. 라우팅을 위한 라이브러리 설치

- npm install react-router-dom
- npm install --save-dev @types/react-router-dom

3. CSS를 위한 라이브러리 설치

- npm install styled-components styled-reset
- npm install --save-dev @types/styled-components

4. 클라이언트 측의 socket.io 라이브러리 설치

- npm install socket.io-client
- npm install --save-dev @types/socket.io-client

5. WebRTC를 돕기 위한 추상화 라이브러리 설치

- npm install simple-peer
- npm install --save-dev @types/simple-peer

6. 상태 변수 라이브러리 설치

- npm install zustand

```json
// frontend package.json

{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.5.3",
    "simple-peer": "^9.11.1",
    "socket.io-client": "^4.8.1",
    "styled-components": "^6.1.18",
    "styled-reset": "^4.5.2",
    "zustand": "^5.0.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@types/simple-peer": "^9.11.8",
    "@types/socket.io-client": "^1.4.36",
    "@vitejs/plugin-react-swc": "^3.9.0",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}
```

### 폴더 구조

1. public 폴더: 정적인 파일들이 위치하는 폴더
2. src 폴더: 주요 소스 코드 파일들이 위치하는 폴더

- main.tsx (또는 index.tsx): 앱의 진입점. 라우터 프로바이더 등을 설정
- App.tsx: 전체 앱 레이아웃 및 라우터 설정을 담당
- GlobalStyles.ts: 전역 스타일을 정의(styled-components 사용 시).
- routes/ 폴더: 각 페이지 컴포넌트를 관리(home, login, room:/id 등)
- components/ 폴더: 재사용 가능한 UI 컴포넌트들을 관리(layout, loading-screen 등)
- api/ 폴더 (선택 사항): 백엔드 API 호출 로직 분리 폴더(auth.ts, rooms.ts 등)
  sockets/ 폴더 (선택 사항): Socket.io 클라이언트 연결 및 이벤트 핸들러 로직을 분리 폴더(socket.ts, room-handlers.ts 등)

3. .env 파일: 환경 변수를 설정 파일
