## 훈련소로 가는 날

```text
훈련소로 가는 날 욱제는 문득 떠올렸다. 훈련소가 논산에 있는 이유는 무엇일까? 왜 why?

그것은 바로…

논산(non-산)은 산이 아니기 때문이다. 길이가 3인 수열 a1, a2, a3가 산임은 a1 < a2 > a3임을 의미한다. 어떤 수열이 논산임은 수열의 인접한 세 항이 산인 경우가 없음을 의미한다. 다시 말해, 길이 N의 수열 a에 대해 2 ≤ i < N 이고 ai-1 < ai > ai+1인 경우가 없다.

논산인 수열이 몇 개가 있는지 알아보자.
```

## 입력

```text
첫째 줄에 N과 M이 주어진다.
```

## 출력

```text
1 이상 M 이하의 정수로 이루어진 길이 N의 수열 중 논산인 것의 개수를 998,244,353으로 나눈 나머지를 출력한다.
```

## 풀이

```text
3차원 DP 테이블을 사용해서 문제를 풀었다.
각 차원은 수열의 길이 X 끝난 숫자 X 직전 수열과의 대소 비교 로 구성했다.
DP[i][j]는 간단히, I번째 수열이 J 숫자로 끝났을때, [증가하는 경우의 수 / 같은 경우의 수 / 줄어드는 경우의 수]이다.
그러므로 DP[i][j]는 DP[i-1][k]를 사용해서 구할수 있다. 
단, 주의해야할 점은 산을 만드는 경우를 제외해야하는 것이다. 즉 DP[i][j][2]에 DP[i][j-1][0]을 더하면 안된다.
핵심은 각 차원의 요소가 무엇인지 파악하는것과, 초기값 설정을 어떻게 해야할지였다.
```

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