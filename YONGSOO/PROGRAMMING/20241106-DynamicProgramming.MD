## DP

- 다이나믹 프로그래밍은 특정한 알고리즘이라기보다는 분할 정복과 같은 하나의 문제 해결 기법이다

- 문제해결을 위해 컴퓨터를 사용할때 컴퓨터의 자원과 속도에는 한계가 있다. 따라서 우리는 가장 효율적인 알고리즘을 고안하게 되는데 메모리 공간을 조금 더 사용해서 연산 속도를 비약적으로 증가시킬 수 있는 문제 해결방법을 다이나믹 프로그래밍이라고 한다

- 다이나믹 프로그래밍은 분할정복과 같이 하위 문제를 나누고 해결하는 과정을 거친다. 분할정복과의 차이점은 분할정복이 문제를 DISJOINT SUBPROBLEM으로 나누는 반면에, 다이나믹 프로그래밍은 SUBPROBLEM이 겹칠 수 있다는 것이다. 겹치는 SUBPROBLEM들을 여러번 계산하지 않고 메모리에 저장함으로서 효율적으로 문제를 해결하는것이 핵심이다

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
    const house = new Array(1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>0)
    )
    for (let i = 0 ; i < N ; i++) {
        const input = inputLines[idx++].split(' ').map(Number)
        input.unshift(0)
        house.push(input)
    }
    // 머리가 i, j일때 가로인 개수, 세로인 개수, 대각선인 개수
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>[0, 0, 0])
    )
    dp[1][2][0] = 1
    for (let i = 1 ;i < N+1 ; i ++) {
        for (let j = 1;  j < N+1 ; j ++) {
            if (house[i][j] !== 1) {
                if (house[i-1][j] !== 1 && house[i][j-1] !== 1) {
                    dp[i][j][0] = Math.max(dp[i][j-1][0] + dp[i][j-1][2], dp[i][j][0])
                    dp[i][j][1] = Math.max(dp[i-1][j][1] + dp[i-1][j][2], dp[i][j][1])
                    dp[i][j][2] = Math.max(dp[i-1][j-1][0] + dp[i-1][j-1][1] + dp[i-1][j-1][2], dp[i][j][2])
                } else {
                    dp[i][j][0] = Math.max(dp[i][j-1][0] + dp[i][j-1][2], dp[i][j][0])
                    dp[i][j][1] = Math.max(dp[i-1][j][1] + dp[i-1][j][2], dp[i][j][1])
                }
            }
        }
    }
    console.log(dp[N][N].reduce((cnt, elem)=> cnt+elem,0))
});
```