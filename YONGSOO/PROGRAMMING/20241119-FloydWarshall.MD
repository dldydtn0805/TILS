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
    const [V , M] = inputLines[idx++].split(' ').map(Number)
    const adjList = new Array(V+1).fill(null).map(()=>
        new Array(V+1).fill(null).map(()=>INF)
    )
    for (let i = 0 ; i <  M ; i ++) {
        const [a, b, c] = inputLines[idx++].split(' ').map(Number)
        adjList[a][b] = Math.min(adjList[a][b], c)
        adjList[b][a] = Math.min(adjList[b][a], c)
    }
    const [J, S] = inputLines[idx++].split(' ').map(Number)

    const floydWarshall = () => {
        const dp = new Array(V+1).fill(null).map(()=>
            new Array(V+1).fill(null).map(()=>INF)
        )

        for (let i = 1 ; i < V+1; i ++) {
            for (let j = 1 ; j < V+1; j++) {
                if (i === j) {
                    dp[i][j] = 0
                    dp[j][i] = 0
                }
            }
        }

        for (let i = 1 ; i < V+1; i++) {
            for (let j = 1 ; j <V+1; j++) {
                dp[i][j] = Math.min(dp[i][j], adjList[i][j])
            }
        }

        for (let k = 1 ; k < V+1; k ++) {
            for (let i = 1; i < V+1; i++) {
                for (let j = 1; j < V+1; j++) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j])
                }
            }
        }
        return dp
    }
    const res = floydWarshall()
    let checkOne= []
    let value = 1e9
    for (let i = 1 ; i < V+1; i++) {
        const cur = res[i][J] + res[i][S]
        if (i !== J && i !== S) {
            if (cur < value) {
                value = cur
                checkOne = []
                checkOne.push(i)
            } else if (cur === value) {
                checkOne.push(i)
            }
        }
    }

    let checkTwo = []
    for (let ni of checkOne) {
        if (res[ni][J] <= res[ni][S]) {
            checkTwo.push(ni)
        }
    }

    let checkThree = []
    let cnt = INF
    for (let ni of checkTwo) {
        if (res[ni][J] < cnt ) {
            cnt = res[ni][J]
            checkThree = []
            checkThree.push(ni)
        } else if (cnt === res[ni][J]) {
            checkThree.push(ni)
        }
    }

    console.log(checkThree.length > 0 ? Math.min(...checkThree) : -1)

})


```