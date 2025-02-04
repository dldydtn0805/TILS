```js
// https://www.acmicpc.net/problem/2045
/* 해설

마방진이란 가로, 세로, 대각선 위의 수들의 합이 모두 같은 성질을 가진다

완성된 마방진을 입력과 같은 형식으로 세 줄에 걸쳐 출력한다

주의해야할 점은, 수의 합을 즉시 알 수 있는 입력이 안들어 올 수 있다는 점이다.

즉, 대각선으로 비어있는 숫자가 들어오는 입력일 경우이다.

0 12 12
16 0 4
8 8 0

따라서 우리는 이 경우에, 비어있는 공간중 하나에

최소 값인 1부터 최대 값인 2만까지 모든 경우의 수를 넣어서,

그중 한 경우에 

가로, 세로, 대각선 위의 수들의 합이 모두 같은 성질을 가지는

마방진의 특성을 고려해서 마방진이 구성된다면, 

정답이므로 그대로 출력해 주면 된다.


*/
/* 입력
0 12 12
16 10 0
8 8 14
//
*/
/* 출력
6 12 12
16 10 4
8 8 14
*/

const fs = require('fs')
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');

const solve = (inputLines) => {
    let idx = 0
    const N = 3
    const magicSquare = []
    for (let i = 0; i < N; i ++) {
        magicSquare.push(inputLines[idx++].split(' ').map(Number))
    }
    const forgotten = []
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < N ; j ++) {
            if (magicSquare[i][j] === 0) {
                forgotten.push([i, j])
            }
        }
    }
    const formation = [
        [0,0,0,1,0,2],
        [1,0,1,1,1,2],
        [2,0,2,1,2,2],
        [0,0,1,0,2,0],
        [0,1,1,1,2,1],
        [0,2,1,2,2,2],
        [0,0,1,1,2,2],
        [0,2,1,1,2,0],
    ]
    if (forgotten.length === 0) {
        for (let i = 0; i < N; i ++) {
            console.log(magicSquare[i].join(' '))
        }
    } else {
        for (let i = 1; i < 20001; i++) {
            const [si, sj] = forgotten[0]
            magicSquare[si][sj] = i
            let cur
            for (const [x1,x2,y1,y2,z1,z2] of formation) {
                const A = magicSquare[x1][x2]
                const B = magicSquare[y1][y2]
                const C = magicSquare[z1][z2]
                if (A!==0 && B!==0 && C !== 0) {
                    cur = A+B+C
                }
            }
            for (let j = 1; j < forgotten.length; j++) {
                const [ci, cj] = forgotten[j]
                for (let [x1,x2,y1,y2,z1,z2] of formation) {
                    const A = magicSquare[x1][x2]
                    const B = magicSquare[y1][y2]
                    const C = magicSquare[z1][z2]
                    if (x1 === ci && x2 === cj) {
                        if (B !== 0 && C !== 0) {
                            magicSquare[x1][x2] = cur - B - C
                            break
                        }
                    } else if (y1 === ci && y2 === cj) {
                        if (A !== 0 && C !== 0) {
                            magicSquare[y1][y2] = cur - A - C
                            break
                        }
                    } else if (z1 === ci && z2 === cj) {
                        if (A !== 0 && B !== 0) {
                            magicSquare[z1][z2] = cur - A - B
                            break
                        }
                    }
                }
            }
            let res = -1, flag = true
            for (const [x1,x2,y1,y2,z1,z2] of formation) {
                const A = magicSquare[x1][x2]
                const B = magicSquare[y1][y2]
                const C = magicSquare[z1][z2]
                if (res === -1) {
                    res = A+B+C
                } else if (res !== A+B+C) {
                    flag = false
                    break
                }
            }
            if (flag) {
                for (let i = 0; i < N; i ++) {
                    console.log(magicSquare[i].join(' '))
                }
                return
            } else {
                for (let i = 0; i < forgotten.length; i++) {
                    const [ci, cj] = forgotten[i]
                    magicSquare[ci][cj] = 0
                }
            }
        }
    }

}

solve(input)
```