## DP

- 복잡한 문제를 간단한 여러개의 문제로 나누어 푸는 방법

- 부분 문제 반복과 최적 부분 구조를 가지는 알고리즘을 일반적인 방법에 비해 더욱 적은 시간 내에 풀때 사용

### 조건

1. 부분 반복 문제

2. 최적 부분 구조

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number)
    const profit = []
    profit.push([0, 0])
    for (let i = 0 ; i < N ; i ++) {
        const [T, P] = inputLines[idx++].split(' ').map(Number)
        profit.push([T, P])
    }
    const dp = new Array(N+2).fill(null).map(()=>0)
    for (let i = 1; i < dp.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i])
        if (i < profit.length && i+profit[i][0] < dp.length) {
            dp[i+profit[i][0]] = Math.max(dp[i+profit[i][0]], dp[i] + profit[i][1])
        }
    }
    console.log(dp[N+1])
});

```