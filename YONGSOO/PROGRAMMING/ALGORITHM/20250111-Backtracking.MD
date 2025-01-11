## 백트래킹

- 탐색 알고리즘 중 하나로 가능성이 없는 곳은 되돌아가고 가능성이 있는 곳은 탐색하는 알고리즘이다. 

- 일반적으로 재귀를 통해 구현되며 모든 경우의 수를 시도해보는 완전탐색 기법 중 하나이다.

- 가능한 해가 아닌 경우를 미리 배제함으로써 탐색 공간을 줄이고, 문제를 효율적으로 해결할 수 있도록 한다

### 주요 절차

1. 유효한 해의 집합을 정의한다

2. 해당 해가 유망한지 아닌지를 판단할 수 있는 유망함수를 정의한다

3. 유망 함수를 통해 해당 해가 유망한 해인지를 판단해 유망하다면 탐색하고 유망하지 않다면 탐색하지 않는다

4. 현 단계에서 가능한 모든 해를 시도하며 재귀적으로 반복한다

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
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const lands = []
    for (let i = 0 ; i < N; i++) {
        lands.push(inputLines[idx++].split(' ').map(Number))
    }

    const directions = [
        [-1,0],[0,1],[1,0],[0,-1]
    ]

    const [x, y, p] = inputLines[idx++].split(' ').map(Number)

    const visited = new Array(N).fill(null).map(()=>
        new Array(M).fill(null).map(()=>0)
    )

    const getNext = (dir, ci, cj) => {
        const [di, dj] = directions[dir]
        const [ni, nj] = [ci+di, cj+dj]
        return [ni, nj]
    }

    const check = (ni, nj) => {
        if (0<= ni && ni<N && 0<=nj && nj<M) {
            if (visited[ni][nj] === 0) {
                return true
            }
        }
        return false
    }
    const dfs = (ci, cj, dir, stuff) => {
        let res = lands[ci][cj]
        for (let nextDir of [dir+1, dir-1]) {
            if (nextDir === -1) {
                nextDir = 3
            } else if (nextDir === 4) {
                nextDir = 0
            }
            const [ni, nj] = getNext(nextDir, ci, cj)
            if (check(ni, nj) && stuff-2 >= 0) {
                visited[ni][nj] = 1
                res = Math.max(res, lands[ci][cj] + dfs(ni, nj,nextDir, stuff-2))
                visited[ni][nj] = 0
            }
        }
        const [ni, nj] = getNext(dir, ci, cj)
        if (check(ni, nj) && stuff-1 >= 0) {
            visited[ni][nj] = 1
            res = Math.max(res, lands[ci][cj] + dfs(ni, nj, dir, stuff-1))
            visited[ni][nj] = 0
        }
        return res
    }
    visited[x][y] = 1
    const solve = () => {
        let ans = lands[x][y]
        for (let k = 0 ; k < 4; k++) {
            for (let nextDir of [k+1, k-1]) {
                if (nextDir === -1) {
                    nextDir = 3
                } else if (nextDir === 4) {
                    nextDir = 0
                }
                const [ni, nj] = getNext(k, x, y)
                if (check(ni, nj) && p-2 >= 0) {
                    visited[ni][nj] = 1
                    ans = Math.max(ans, lands[x][y] + dfs(ni, nj, nextDir, p-2))
                    visited[ni][nj] = 0
                }
            }
            const [ni, nj] = getNext(k, x, y)
            if (check(ni, nj) && p-1 >= 0) {
                visited[ni][nj] = 1
                ans = Math.max(ans, lands[x][y] + dfs(ni, nj, k, p-1))
                visited[ni][nj] = 0
            }

        }
        return ans
    }

    console.log(solve())
})


/*
3 3
13 52 7
33 20 35
48 18 26
1 1 5
* */

```