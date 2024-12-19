## 누적 합

- 누적 합이란 수열 An에 대해서 각 인덱스까지의 구간의 합을 구하는 것을 누적 합이라고 합니다.

- 시작점은 항상 첫번째 원소이며, R번째 원소까지의 합을 앞에서부터 쭉 더해오는 패턴입니다.

- 모든 구간에 대해서 처음부터 계산하여 단순 반복하는 것이 아니라 이전 인덱스까지의 누적합에 현재 자기 자신 값을 더하여 구현하는 것이 효과적인 방법입니다.

## 다이나믹 프로그래밍

- 기본적인 아이디어로 하나의 큰 문제를 여러개의 작은 문제로 나누어서 그 결과를 저장하여 다시 큰 문제를 해결할 때 사용하는 것으로 특정한 알고리즘이 아닌 하나의 문제 해결 패러다임으로 볼 수 있다

- Richard Bellman이 1950년대에 사용한 단어로 이름은 그냥 멋있어서 그렇게 지었으니 신경쓰지 않아도 된다

- 큰 문제를 작은 문제로 쪼개서 그 답을 저장해두고 재활용한다. 혹자는 DP가 아닌 기억하며 풀기라고 부르기도 한다


### 예시 코드

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MIN_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const arr :Array<Array<number>> = [new Array(M+1).fill(null).map(()=>0)]

    for (let i = 0 ; i < N ; i++) {
        arr.push(([0, ...inputLines[idx++].split(' ').map(Number)]))
    }
    for (let i = 1 ; i < N+1; i ++) {
        arr[i][0] = arr[i-1][0] + arr[i][0]
    }
    for (let j = 1; j < M+1; j++) {
        arr[0][j] = arr[0][j-1] + arr[0][j]
    }
    for (let i = 1; i < N+1; i ++) {
        for (let j = 1; j < M+1; j++) {
            arr[i][j] = arr[i-1][j] + arr[i][j-1] - arr[i-1][j-1] + arr[i][j]
        }
    }

    const dp :Array<Array<number>> = new Array(N+1).fill(null).map(()=>
        new Array(M+1).fill(null).map(()=>INF)
    )
    dp[1][1] = arr[1][1]
    for (let  i = 0 ; i < N+1 ; i ++) {
        for (let j = 0; j < M+1 ; j ++) {
            for (let q = 0; q < i; q++) {
                for (let w = 0; w < j; w++) {
                    dp[i][j] = Math.max(dp[i][j], arr[i][j] - arr[q][j] - arr[i][w] + arr[q][w])
                }
            }
        }
    }
    const ans = dp.reduce((cnt, elem)=> cnt = Math.max(cnt, Math.max(...elem)), INF)
    console.log(ans)
});

```