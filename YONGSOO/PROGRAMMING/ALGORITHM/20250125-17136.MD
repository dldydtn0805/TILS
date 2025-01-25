```js
// https://www.acmicpc.net/problem/17136
/* 해설
백트래킹을 사용해서 색종이를 최소한으로 사용하는 경우의 수를 구할 수 있다
* */

/*입력
0 0 0 0 0 0 0 0 0 0
0 1 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 1 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
* */

/*출력
4
* */

let fs = require('fs');
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');

const INF = Number.MAX_SAFE_INTEGER
const solve = (inputLines) => {
    let idx = 0
    const papers = []
    const N = 10
    const M = 5
    for (let i = 0; i < N; i ++) {
        papers.push(inputLines[idx++].split(' ').map(Number))
    }
    let ans = INF
    const getColorPaper = (k, x, y) => {
        const res = []
        for (let i = x; i <= x+k; i ++) {
            for (let j = y; j <= y+k; j++) {
                if (i >= N || j >= N) {
                    return false
                }
                if (papers[i][j] === 0) {
                    return false
                }
                res.push([i, j])
            }
        }
        return res
    }
    const check = () => {
        for (let i = 0; i < N; i ++) {
            for (let j = 0; j < N; j++) {
                if (papers[i][j] !== 0) {
                    return false
                }
            }
        }
        return true
    }

    const backTracking = (ci, cj, A, B, C, D, E) => {
        if (ci < N && cj < N) {
            if (papers[ci][cj] === 1) {
                // console.log(ci,cj)
                for (let k = 0; k < M; k++) {
                    const rest = [A, B, C, D, E]
                    const cur = getColorPaper(k, ci, cj)
                    if (cur !== false && rest[k] > 0) {
                        cur.forEach(([ni, nj]) => {
                            papers[ni][nj] = 0
                        })
                        rest[k] --
                        if (check()) {
                            ans = Math.min(ans, 25-rest.reduce((A,B)=>A+B))
                        } else {
                            if (cj+1 < N) {
                                backTracking(ci, cj+1, ...rest)
                            } else {
                                backTracking(ci+1, 0, ...rest)
                            }
                        }
                        cur.forEach(([ni, nj]) => {
                            papers[ni][nj] = 1
                        })
                    }
                }
            } else {
                if (cj+1 < N) {
                    backTracking(ci, cj+1, A, B, C, D, E)
                } else {
                    backTracking(ci+1, 0, A, B, C, D, E)
                }
            }
        }
    }
    if (check()) {
        return 0
    }
    backTracking(0, 0, M, M, M, M, M)
    return ans === INF ? -1 : ans
}

console.log(solve(input))

```