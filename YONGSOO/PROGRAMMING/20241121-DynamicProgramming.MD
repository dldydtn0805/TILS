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
    // N : 총 개수 / M : 한 상자 / K : 한 상자 포장 비용
    // 포장 비용 + 개수 ( 최대 오렌지 - 최소 오렌지 )
    const [N, M, K] = inputLines[idx++].split(' ').map(Number)
    const oranges = []
    for (let i = 0 ; i < N ; i ++) {
        const [A] = inputLines[idx++].split(' ').map(Number)
        oranges.push(A)
    }
    oranges.unshift(0)
    const dp = new Array(N+1).fill(null).map(()=> INF)
    dp[0] = 0
    dp[1] = K

    for (let i = 1 ; i < N+1; i++) {
        let maxV = oranges[i]
        let minV = oranges[i]
        for (let j = i; j < i+M; j++) {
            if (j < N+1) {
                maxV = Math.max(maxV, oranges[j])
                minV = Math.min(minV, oranges[j])
                dp[j] = Math.min(dp[j], K + (j-i+1) *  (maxV-minV) + dp[i-1])
            }
        }
    }
    console.log(dp[N])

})

```