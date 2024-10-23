## 투 포인터

- 1차원 배열에서 각자 다른 원소를 가르키고있는 2개의 포인터를 조작해가면서 원하는 값을 찾을때까지 탐색하는 알고리즘이다. 

- 리스트에 순차적으로 접근해야할때 두개의 점의 위치를 기록하면서 처리한다

### 동작방식

- 보통 left / right나 start / end와 같은 식으로 이름을 붙임
- 포인트 2개를 준비하고 타겟 값을 저한다
- 처음엔 start = end = 0이고 조건은 항상 start <= end다
- 두개의 포인터는 현재 배열의 시작 [start]과 끝[end]다

### 시간복잡도

- 매 루프마다 항상 포인터중 하나는 1씩 증가한다. 각 포인터를 start, end라고 했을때 각각 N까지 증가할수있고 항상 start <= end다

- 둘이 증가하는 과정은 최대 N번만 반복

- N^2을 N에 해결

### 예시코드

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const arr = inputLines[idx++].split(' ').map(Number);
    const prefix = new Array(N).fill(null).map(()=>0)
    prefix[0] = arr[0]
    for (let i = 1; i < N ; i++) {
        prefix[i] = prefix[i-1] + arr[i]
    }
    prefix.unshift(0)
    let start = 0
    let end = 0
    let ans = 0
    while (start < N+1 && end < N+1 && start <= end) {
        if (prefix[end]-prefix[start] < M) {
            ans = Math.max(ans, prefix[end]-prefix[start])
            end ++
        }  else if (prefix[end]-prefix[start] > M) {
            start ++
        } else if (prefix[end] - prefix[start] === M) {
            ans = M
            break
        }
    }
    console.log(ans)
});


```
