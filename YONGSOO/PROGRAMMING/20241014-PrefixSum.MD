## 누적 합

- 배열 또는 리스트 등에서 일정 구간의 합을 빠르게 계산하기 위한 방법이면서 동적 계획법 형태 중 하나이다.

- 기본적인 방식은 각 요소까지의 누적 합을 계산하여 이를 배열에 저장해 두는 것이다.

- 이후에 특정 구간의 합을 구할 때는 해당 구간의 끝 지점 까지의 누적 합에서 시작 지점까지의 누적합을 빼는 것이다.

- 배열 또는 리스트의 요소가 고정되어 있을 때 구간 합을 반복적으로 계산해야하는 경우 유용하게 사용될 수 있다


- 예시 코드
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
      const [ R, C, Q ] = inputLines[idx++].split(' ').map(Number);
      const pictures = []
      for (let i = 0; i < R; i ++) {
          pictures.push(inputLines[idx++].split(' ').map(Number));
      }
      const prefix = new Array(R).fill().map(()=>
          new Array(C).fill().map(()=>0)
      )
      prefix[0][0] = pictures[0][0]
      for (let i = 1; i < C; i ++) {
          prefix[0][i] = prefix[0][i-1] + pictures[0][i]
      }
      for (let i = 1 ; i < R; i++) {
          prefix[i][0] = prefix[i-1][0] + pictures[i][0]
      }
      for (let i = 1; i < R; i++) {
          for (let j = 1; j < C; j++) {
              prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + pictures[i][j]
          }
      }
      for (let tc = 0; tc < Q; tc++) {
          const [r1, c1, r2, c2] = inputLines[idx++].split(' ').map(Number);
          let tmp
          if (r1 === 1 && c1 === 1) {
              tmp = prefix[r2-1][c2-1]
          } else if (r1 === 1) {
              tmp = prefix[r2-1][c2-1] - prefix[r2-1][c1-2]
          } else if (c1 === 1) {
              tmp = prefix[r2-1][c2-1] - prefix[r1-2][c2-1]
          } else {
              tmp = prefix[r2-1][c2-1] - prefix[r2-1][c1-2] - prefix[r1-2][c2-1] + prefix[r1-2][c1-2]
          }
          let cnt = (r2-r1+1) * (c2-c1+1)
          console.log(Math.floor(tmp/cnt))
      }
  })


  ```