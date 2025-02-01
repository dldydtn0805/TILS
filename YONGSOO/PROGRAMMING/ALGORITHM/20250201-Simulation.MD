```js
// https://www.acmicpc.net/problem/14503
/* 해설

방의 상태는 1과 0으로 표현된다. 1은 벽이고 0은 빈 공간이다.

처음의 빈 공간은 전부 청소되지 않은 상태이다.

로봇청소기가 있는 칸은 항상 빈칸이다.

로봇청소기는 다음과 같이 작동한다.

1. 현재 칸 청소안된 경우 -> 현재 칸 청소

2. 현재 칸 주변 4칸 중 청소되지 않은 빈칸이 없는 경우

    1. 바라보는 방향을 유지한 채로 한칸 후진할 수 있다면 한칸 후진한다. 1번으로 돌아간다
    2. 바라보는 방향의 뒤쪽이 벽이라 후진할 수 없다면 작동을 멈춘다.

3. 현재 칸 주변 4칸 중 청소되지 않은 빈칸이 있는 경우

    1. 반시계방향으로 90도 회전한다
    2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한칸 전진한다.
    3. 1번으로 돌아간다.

로봇 청소기가 작동을 시작한 후 멈출 때까지 청소하는 칸의 개수를 출력하자

지문 해석에 있어서 한가지를 오해할 수 있는 점이 있다.

만약 현재 위치에서 바라보고 있는 방향에 청소되지 않은 칸이 있더라도,

직진하지 않는다.

바라보는 방향보다 90도 회전한 방향이 우선순위가 높다.

*/

/*입력
3 3
1 1 0
1 1 1
1 0 1
1 1 1
* */

/*출력
1
* */

let fs = require('fs');
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');

const INF = Number.MAX_SAFE_INTEGER
const directions = [
    [-1,0],[0,1],[1,0],[0,-1]
]
const MOD = BigInt(1000000007)
const solve = (inputLines) => {
    let idx = 0
    let ans = 0
    const [N, M ] = inputLines[idx++].split(' ').map(Number)
    const [r, c, d] = inputLines[idx++].split(' ').map(Number)
    const fields = []
    for (let i = 0; i < N; i ++) {
        fields.push(inputLines[idx++].split(' ').map(Number))
    }

    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < M ; j++) {
            visited[i][j] = fields[i][j] === 1 ? -1 : 0
        }
    }

    const getAns = () => {
        let ans = 0
        for (let i = 0; i < N; i ++) {
            for (let j = 0; j < M; j ++) {
                if (visited[i][j] === 1) {
                    ans ++
                }
            }
        }
        return ans
    }
    const dfs = (si, sj, dir)=> {
        visited[si][sj] = 1
        let flag = true
        for (let k = 1; k < 5; k++) { // [0, 1, 2, 3]
            const nextDir = dir - k >= 0 ? dir - k : dir - k + 4
            const [di, dj] = directions[nextDir]
            const [ni, nj] = [si+di, sj+dj]
            if (visited[ni][nj] === 0) {
                flag = false
                dfs(ni, nj, nextDir)
                break
            }
        }
        if (flag) {
            const backDir = dir - 2>= 0 ? dir - 2: dir - 2 + 4
            const [di, dj] = directions[backDir]
            const [bi, bj] = [si+di, sj+dj]
            if (visited[bi][bj] !== -1) {
                dfs(bi, bj, dir)
            } else {
                console.log(getAns())
                process.exit()
            }
        }
    }

    dfs(r, c, d)
    return getAns()
}

console.log(solve(input))

```