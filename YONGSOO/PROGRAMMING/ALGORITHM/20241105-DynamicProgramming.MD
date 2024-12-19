## DP

- 다이나믹 프로그래밍은 복잡한 문제를 더 작은 하위 문제로 나누어 해결하는 알고리즘

### 방법

1. 메모하기 : 변수 값에 따른 결과를 저장할 배열을 미리 만들고 그 결과를 나올때마다 배열 내에 저장하고 그 저장된 값을 재사용하는 방식으로 문제를 해결

2. 변수 간 관계식 (점화식) 만들기

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines :Array<string> = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M, C] = (inputLines[idx++].split(' ').map(Number))
    const profit = []
    profit.push(new Array(C+1).fill(null).map(()=>0))
    for (let i = 0; i < C ; i++) {
        const W = inputLines[idx++].split(' ').map(Number)
        W.unshift(0)
        profit.push(W)
    }
    const A = inputLines[idx++].split(' ').map(Number)
    const B = inputLines[idx++].split(' ').map(Number)
    A.unshift(0)
    B.unshift(0)
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(M+1).fill(null).map(()=>0)
    )

    for (let i = 1; i < N+1; i++) {
        for (let j = 1 ; j < M+1; j++) {
                dp[i][j] = Math.max(dp[i][j], dp[i-1][j], dp[i][j-1], dp[i-1][j-1] + profit[A[i]][B[j]])
        }
    }
    console.log(Math.max(...dp.map((elem) => Math.max(...elem))))
});


```