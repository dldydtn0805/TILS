## 자바스크립트 알고리즘 입력 예제


- 입력

  ```txt
  0001011000
  0000101111
  ```
- 코드

  ```js
  const readline = require('readline');
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  let idx = 0
  const inputLines = []
  rl.on('line', (line) => {
      inputLines.push(line)
  }).on('close', ()=>{
      const [A] = inputLines[idx++].split(' ').map(String)
      const [B] = inputLines[idx++].split(' ').map(String)
      console.log(A) // 0001011000
      console.log(B) // 0000101111
  })
  ```
---
  - 입력

    ```txt
    1 2 3 4 5
    ```

  - 코드

    ```js
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputLines = [];
    let idx = 0;
    rl.on('line', (line) => {
        inputLines.push(line);
    }).on('close', ()=> {
        const Numbers = inputLines[idx++].split(' ').map(Number);
        console.log(Numbers) // [ 1, 2, 3, 4, 5 ]
    });
    ```
---
  - 입력

    ```txt
    2
    3 4
    1 5
    ```

  - 코드

    ```js
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputLines = [];
    let idx = 0;
    rl.on('line', (line) => {
        inputLines.push(line);
    }).on('close', () => {
        const [T] = inputLines[idx++].split(' ').map(Number);
        console.log(T); // 2
        for (let i = 1; i <= T; i++) {
            const [a, b] = inputLines[idx++].split(' ').map(Number);
            console.log(a, b);
            /*
            3 4
            1 5
            */
        }
    });
    ```

---
  - 입력

    ```txt
    1
    2
    3
    4
    -1
    ```

  - 코드

    ```js
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputLines = [];
    let idx = 0;
    rl.on('line', (line) => {
        inputLines.push(line);
    }).on('close', () => {
        const N = inputLines.length-1
        for (let i = 0; i < N ; i ++) {
            const [X]  = inputLines[idx++].split(' ').map(Number)
            console.log(X)
            /*
            1
            2
            3
            4 
            */
        }
    });
    ```