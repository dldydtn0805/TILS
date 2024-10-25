## 다이나믹 프로그래밍

- 일반적인 재귀와 유사하지만 큰 차이점은 일반적인 재귀를 단순히 사용시 동일한 작은 문제들이 여러번 반복되어 비효율적인 계산이 될수 있다.

- DP가 적용되기 위해서는 두가지 조건이 필요하다 : 겹치는 부분문제 / 최적 부분 구조

### 겹치는 부분 문제

- 동일한 작은 문제들이 반복하여 나타나는 경우에만 사용이 가능하다

### 최적 부분 구조

- 부분 문제의 최적 결과 값을 사용해 전체 문제의 최적 결과를 낼 수 있는 경우를 의미한다


### 분할 정복과의 차이 ?

- 분할 정복은 분할된 문제가 동일하게 중복이 일어나지 않는다

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
    const dp = new Array(2**15+1).fill(null).map(()=>[0, 0, 0, 0])
    for (let i = 1 ; i*i <= 2**15+1; i++) {
        dp[i*i][0] = 1
        for (let j = i*i; j < 2**15+1; j++) {
            for (let k = 1; k < 4; k ++) {
                dp[j][k] += dp[j-i*i][k-1]
            }
        }
    }
    for (let tc = 0; tc < inputLines.length-1; tc++) {
        const [N] = inputLines[idx++].split(' ').map(Number)
        console.log(dp[N].reduce((cnt, ele)=> cnt+ele, 0))
    }
});

```