## 백트래킹이란

- 해를 찾는 도중 해가 아니어서 막히면 되돌아가서 다시 해를 찾아가는 기법. 최적화 문제와 결정 문제를 푸는 방법이다

### DFS

- 깊이우선 탐색은 모든 경로를 탐색한다. 불필요할것같은 경로를 사전에 차단하거나 하는 등의 행동이 없으므로 경우의 수를 줄이지 못한다

### 백트래킹

- 해를 찾아가는 도중, 지금의 경로가 해가 될거같지 않으면 그 경로를 더이상 가지 않고 되돌아간다

- 반복문의 횟수를 줄일 수 있으므로 효율적이다

- 이를 가지치기라고 하는데, 불필요한 부분을 쳐내고 최대한 올바른 쪽으로 간다

- 즉 모든 가능한 경우의 수중에서 특정한 조건을 만족하는 경우만 찾아보는 것이다

### 예시 코드

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
    const [N, M, H] = inputLines[idx++].split(' ').map(Number)
    let [si, sj] = [-1, -1]
    const milks = []
    for (let i = 0 ; i < N; i++) {
        const arr =  inputLines[idx++].split(' ').map(Number);
        for (let j = 0; j < N ; j++) {
            if (arr[j] === 1) {
                [si, sj] = [i, j]
            }
        }
        for (let k = 0; k < N; k++) {
            if (arr[k] === 2) {
                milks.push([i, k])
            }
        }
    }
    let ans = 0
    const visited = new Array(milks.length).fill(null).map(()=>0)
    const dfs = (ci : number, cj:number, hp: number, cnt : number) => {
        let home_hp = hp-(Math.abs(si-ci)+Math.abs(sj-cj))
        if (home_hp>=0) {
            ans = Math.max(ans, cnt)
        }
        for (let i = 0 ; i <  milks.length; i++) {
            const [ni, nj] = milks[i]
            if (!visited[i]) {
                let next_hp = hp-(Math.abs(ci-ni)+Math.abs(cj-nj))
                if (next_hp>=0) {
                    visited[i] = 1
                    dfs(ni, nj, next_hp + H, cnt+1)
                    visited[i]= 0
                }
            }
        }
    }
    dfs(si, sj, M, 0)
    console.log(ans)
});

```