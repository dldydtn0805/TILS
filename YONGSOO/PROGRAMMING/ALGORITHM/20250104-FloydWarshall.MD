## 플로이드 워셜

- 모든 최단경로를 구하는 알고리즘

- 다익스트라는 하나의 정점에서 다른 모든 정점까지의 최단 거리를 구하는 알고리즘이라면 플로이드 워셜은 한번 실행하여 모든 노드간 최단경로를 구할 수 있다

- 다익스트라와는 다르게 음의 간선도 사용 가능

### 과정

- 모든 노드 간 최단거리를 구해야하므로 2차원 인접행렬을 구성한다. 알고리즘은 여러 라운드로 구성된다. 라운드마다 각 경로에서 새로운 중간 노드로 사용할 수 있는 노드를 선택하고 더 짧은 길이를 선택하여 줄이는 과정을 반복한다

### 시간복잡도

- N^3이므로 그래프의 크기가 작아 세제곱을 해도 문제가 풀릴 때만 사용 가능하다

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
    const adjList = new Array(N+1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>INF)
    )
    for (let i = 0 ; i < M; i ++) {
        const [A, B, C] = inputLines[idx++].split(' ').map(Number)
        adjList[A][B] = Math.min(adjList[A][B], C)
        adjList[B][A] = Math.min(adjList[B][A], C)
    }
    const floydWarshall = (adjList :Array<Array<number>>, N:number) => {
        const distance = new Array(N+1).fill(null).map(()=>
            new Array(N+1).fill(null).map(()=>INF)
        )
        for (let i = 1; i < N+1; i++) {
            for (let j = 1; j < N+1; j++) {
                if (i === j) {
                    distance[i][j] = 0
                } else {
                    distance[i][j] = adjList[i][j]
                }
            }
        }

        for (let k = 1; k < N+1; k++) {
            for (let i = 1; i < N+1; i++ ) {
                for (let j = 1; j < N+1; j++) {
                    distance[i][j] = Math.min(distance[i][k]+distance[k][j], distance[i][j])
                }
            }
        }
        return distance

    }
    const res = (floydWarshall(adjList, N))
    let ans = INF
    let ansI = 0
    for (let i = 1; i < N+1; i++) {
        const cur = (res[i].slice(1, N+1))
        const val = cur.reduce((A,B)=>A+B,0)
        if (ans > val) {
            ans = val
            ansI = i
        }
    }
    console.log(ansI)
})


/*
3 3
1 2 1
1 3 3
2 3 2
* */

```