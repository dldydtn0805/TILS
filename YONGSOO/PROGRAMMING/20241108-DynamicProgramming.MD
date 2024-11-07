## DP의 사용 조건

1. 겹치는 부분 문제
2. 최적 부분 구조

### DP로 풀 수 있는 문제인지 확인

- DP의 조건에 의해 현재 직면한 문제가 작은 문제들로 쪼개질 수 있는지, 하나의 함수로 표현될 수 있는지를 판단

### 문제의 변수 파악

- DP는 현재 변수에 따라서 나오는 결과 값을 찾고 그것을 전달함으로써 재사용하는 과정을 거친다. 즉 문제 내에서 변수의 개수를 알아내야한다는 것이다. 영어로 STATE를 결정한ㄴ다고 한다

- 피보나치 수열에서는 N번째 숫자를 구하는 것이므로 N이 변수가 된다. 이 변수가 얼마이냐에 따라 결과 값이 다르지만 그 결과를 재사용 하는 것이다

### 변수 간 관계식 만들기

- 변수들에 의해 결과 값이 달라지지만 동일한 변수값인 경우 결과는 동일함. 또한 우리는 결과값을 그대로 이용할 것이므로 그 관계식을 만들수있어야함

### 메모하기

- 영어로 메모이제이션이다. 변수간 관계식까지 생성되었다면 변수 값에 따른 결과를 저장해야함. 변수 값에 따른 결과를 저장할 배열을 미리 만들고 그 결과를 나올때마다 배열에 저장하고 저장된 값을 재사용하는 방식으로 문제를 해결함

### 기저 상태 파악

- 가장 작은 문제의 상태를 알아야 함. 예를들어 피보나치 수열의 f(0) = 0, f(1) = 1이 있다

### 구현하기

- DP를 사용하는 방법은 두가지가 있다. BOTTOMUP [반복문] / TOPDOWN [재귀]


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
    const [N, M] = (inputLines[idx++].split(' ').map(Number))
    // i번째 수열이 j 숫자로 끝났을때 증가했던 경우의 수 / 같은 경우의 수 / 줄어든 경우의 수
    const dp = new Array(N+1).fill(null).map(()=>
        new Array(M+1).fill(null).map(()=> [0, 0, 0])
    )

    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= M; j++) {
            if (i > j) {
                dp[1][i][0] += 1
            } else if ( i === j) {
                dp[1][i][1] += 1
            } else if (i < j) {
                dp[1][i][2] += 1
            }
        }
    }

    for (let i = 2; i < N+1 ; i++) {
        for (let j = 1; j <= M; j++) {
            for (let k = 1; k <= M; k++) {
                if (j > k) {
                    dp[i][j][0] += (dp[i-1][k][0]+dp[i-1][k][1]+dp[i-1][k][2])%998244353;
                } else if ( j === k) {
                    dp[i][j][1] += (dp[i-1][k][0]+dp[i-1][k][1]+dp[i-1][k][2])%998244353;
                } else if ( j < k) {
                    dp[i][j][2] += (dp[i-1][k][1]+dp[i-1][k][2])%998244353;
                }
            }
        }
    }
    console.log((dp[N][M][0]+dp[N][M][1]+dp[N][M][2])%998244353);
});


```