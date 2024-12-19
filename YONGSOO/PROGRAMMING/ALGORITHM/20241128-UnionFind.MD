## 분리 집합

- 대표적인 그래프 알고리즘으로 두 노드가 같은 집합에 속하는지 판별하는 알고리즘

- 합집합 찾기 알고리즘이라고 부르며 반대로 서로 연결되어있지않은 노드를 판별할 수 있기도 하므로 서로소 집합 이라고도 부른다

- 노드를 합치는 유니온 연산과 루트노드를 찾는 파인드 연산으로 이루어진다

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
    const parents = new Array(N).fill(null).map((elem, idx )=>idx)

    const find = (x : number) => {
        if (parents[x] === x) {
            return x
        }
        parents[x] = find(parents[x])
        return parents[x]
    }
    
    const union = (x:number, y:number) => {
        const X = find(x)
        const Y = find(y)
        if (X > Y) {
            parents[Y] = X
        } else {
            parents[X] = Y
        }
    }

    let ans = 0

    for (let i = 1 ; i < M+1 ; i ++) {
        const [A, B] = inputLines[idx++].split(' ').map(Number)
        if (find(A) !== find(B)) {
            union(A, B)
        } else {
            ans = i
            break
        }
    }

    console.log(ans)
})

```