## 이진트리

- 모든 노드 최 두개의 자식 노드를 갖는 트리. 각 노드는 최대 2개의 자식을 갖는다. 각 노드의 자식은 왼쪽 자식과 오른쪽 자식으로 구분된다.

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
    const [N] = inputLines[idx++].split(' ').map(Number)
    const A = inputLines[idx++].split(' ').map(Number)
    const [X] = inputLines[idx++].split(' ').map(Number)
    const newA = A.map((elem)=>{
        if (elem === -1) {
            return X
        } else {
            return elem
        }
    })
    newA.sort((a,b)=>a-b)
    const child = new Array(N).fill(null).map(()=>[0, 0])
    // root : (N-1)//2
    const dfs = (node, k) => {
        if (k >= 1) {
            child[node] = [node-k, node+k]
            dfs(node-k, k/2)
            dfs(node+k, k/2)
        }
    }
    dfs((N-1)/2, (N-(N-1)/2)/2)
    let ans = ''

    const postOrder = (ci) => {
        if (child[ci][0] === 0 && child[ci][1] === 0) {
            ans += `${newA[ci]} `
            return
        }
        postOrder(child[ci][0])
        postOrder(child[ci][1])
        ans += `${newA[ci]} `
    }
    postOrder((N-1)/2)
    console.log(ans)
})


/*
7
10 5 17 1 -1 14 21
18
* */

```