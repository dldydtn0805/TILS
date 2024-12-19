## 타입스크립트 파일 생성

1. 폴더 생성
2. @type/node 설치 `npm install @types/node` 
3. 타입스크립트 컴파일러 설치 `npm install -g typescript`
4. 파일 생성 `touch main.ts`
5. 컴파일 실행 `tsc main.ts`
6. 자동으로 컴파일 해주는 tsc-watch 설치 `npm i -g tsc-watch`
7. 컴파일이 성공할때마다 자동으로 js 실행하게 하기 `tsc-watch --onSuccess "node main.js"`


- 예시코드
  - 타입스크립트로 작성된 코드
  ```ts
  import * as readline from 'readline';

  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  let idx = 0;
  let inputLines: Array<string> = [];

  rl.on('line', (line: string) => {
      inputLines.push(line);
  });

  rl.on('close', () => {
      while (true) {
          const [N] = inputLines[idx++].split(' ').map(Number);
          if (N === 0) { break }
          console.log(N)
          for (let i = 0; i < N; i ++) {
              const [from, to] = inputLines[idx++].split(' ').map(String);
              console.log(from, to)
          }
      }

  });

  ```
  - 자바스크립트로 번역된 것 [자동으로 번역 됨]
  ```js
    "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  const readline = __importStar(require("readline"));
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  let idx = 0;
  let inputLines = [];
  rl.on('line', (line) => {
      inputLines.push(line);
  });
  rl.on('close', () => {
      while (true) {
          const [N] = inputLines[idx++].split(' ').map(Number);
          if (N === 0) {
              break;
          }
          console.log(N);
          for (let i = 0; i < N; i++) {
              const [from, to] = inputLines[idx++].split(' ').map(String);
              console.log(from, to);
          }
      }
  });

  ```