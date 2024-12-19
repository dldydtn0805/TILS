## DP

- 복잡한 문제를 더 작은 하위 문제로 나누어 해결하는 알고리즘 설계 기법

- 중복되는 계산 결과를 저장하는 메모리 기법인 메모이제이션을 사용

- 이전에 계산한 값을 캐시하고 다시 필요할때 해당 값을 가져와 재사용한다

- 이는 재귀적 호출에서의 중복 계산을 방지하고 계산 속도를 향상

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
const INF = Number.MAX_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N] = inputLines[idx++].split(' ').map(Number)
    const students = inputLines[idx++].split(' ').map(Number)
    // [사망 / 생존]
    const dp = new Array(N).fill(null).map(() => [0, 0])
    for (let i = 0; i < N; i++) {
        if (i === 0) {
            dp[0][0] = students[0]
        } else if (i === 1) {
            dp[1][0] = students[1]
            dp[1][1] = dp[0][0]
        } else {
            dp[i][0] = Math.min(dp[i - 1][1] + students[i], dp[i-2][1] + students[i-1] + students[i])
            dp[i][1] = dp[i-1][0]
        }
    }
    console.log(Math.min(...dp[N-1]))
})
```