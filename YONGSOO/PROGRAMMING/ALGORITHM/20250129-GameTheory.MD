```js
// https://www.acmicpc.net/problem/11062
/* 해설

dp[i][j] = i부터 j까지의 카드 구간에서 얻을 수 있는 최적의 점수
근우의 턴일때는 최대값을 , 명우의 턴일때는 최소값을 선택한다 [게임이론 - 제로섬게임]

*/
/* 입력
2
4
1 2 5 2
9
1 1 1 1 2 2 2 2 2
*/
/* 출력
6
8
*/

const fs = require('fs')
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');
const MOD = 123456789
const INF = Number.MAX_SAFE_INTEGER

const solve = (inputLines) => {
    let idx = 0
    let ans = ''
    const [T] = inputLines[idx++].split(' ').map(Number)
    for (let tc = 0; tc < T; tc ++) {
        const [N] = inputLines[idx++].split(' ').map(Number)
        const cards = inputLines[idx++].split(' ').map(Number)
        const dp = new Array(N).fill(null).map(()=>
            new Array(N).fill(null).map(()=>0)
        )
        let turn =  N % 2 === 1;
        for (let size = 0; size < N; size ++) {
            for (let i = 0; i < N-size; i++) {
                if (size === 0) {
                    dp[i][i+size] = turn ? cards[i] : 0
                } else if (turn) {
                    dp[i][i+size] = Math.max(dp[i+1][i+size]+cards[i], dp[i][i+size-1]+cards[i+size])
                } else {
                    dp[i][i+size] = Math.min(dp[i+1][i+size], dp[i][i+size-1])
                }
            }
            turn = !turn
        }
        console.log(dp[0][N-1])
    }
}

solve(input)
```
