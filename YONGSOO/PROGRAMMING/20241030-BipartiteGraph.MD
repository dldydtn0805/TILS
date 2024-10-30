## 이분 그래프

- 인접한 정점끼리 서로 다른 색으로 칠해서 모든 정점을 두가지 색으로만 칠할 수 있는 그래프

- 즉 그래프의 모든 정점이 두 그룹으로 나눠지고 서 다른 그룹의 정점이 간선으로 연결되어져있는 [같은 그룹에 속한 정점끼리는 서로 인접하지 않도록 하는] 그래프

### 특징

- 확인하려면 BFS, DFS를 이용한다
- BFS를 할때 같은 레벨의 정점은 무조건 같은 색으로 칠한다
- 연결 성분의 개수를 구하는 방법과 유사하다
- 모든 정점을 방문하며 간선을 검사하기 때문에 시간 복잡도는 V+E이다

### 예시 코드

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines = [];
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    let [ N  ] = inputLines[idx++].split(' ').map(Number)
    const adjList :Array<Array<number>> = new Array(N).fill(null).map(()=>[])
    for (let i = 0; i < N; i ++) {
        const arr :Array<number> = inputLines[idx++].split(' ').map(Number)
        for (let j = 1 ; j < arr.length; j++) {
            if (!adjList[i].includes(arr[j]-1)) {
                adjList[i].push(arr[j]-1)
            }
        }
    }
    const visited :Array<number> = new Array(N).fill(null).map(()=>0)
    const dfs = (ci : number, cur : number) => {
        for (let i = 0; i < adjList[ci].length; i++) {
            let ni = adjList[ci][i]
            if (visited[ni] === 0) {
                visited[ni] = cur
                dfs(ni, -1*cur)
            }
        }
    }
    let value :number = 1
    for (let i = 0 ; i < N ; i++) {
        if (visited[i] === 0) {
            dfs(i, value)
            value *= -1
        }
    }
    const A :Array<number> = []
    const B :Array<number> = []
    for (let i = 0; i < N; i ++) {
        if (visited[i] === 1) {
            A.push(i+1)
        } else {
            B.push(i+1)
        }
    }
    console.log(A.length)
    console.log(A.join(' '))
    console.log(B.length)
    console.log(B.join(' '))
});

```