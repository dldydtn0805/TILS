## 누적합

- 일반적으로 사용되는 배열에 값을 저장하고 지정된 인덱스부터 하나씩 더해가는 방식은 최악의 경우 N^2의 시간복잡도를 가지기 때문에 입력의 범위가 클때 사용할 수 없다. 하지만 PrefixSum 방식을 사용하면 N으로 해결할 수 있다

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
    let [ N  ] = inputLines[idx++].split(' ').map(Number)
    const appleTrees = new Array(1).fill(null).map(()=>
        new Array(N+1).fill(null).map(()=>0)
    )
    for (let i =0 ; i < N ; i ++) {
        const input = inputLines[idx++].split(' ').map(Number)
        input.unshift(0)
        appleTrees.push(input)
    }
    N ++
    for (let i = 1; i < N; i ++) {
        for (let j = 1; j < N; j++) {
            appleTrees[i][j] = appleTrees[i-1][j] + appleTrees[i][j-1] - appleTrees[i-1][j-1] + appleTrees[i][j]
        }
    }
    let ans = -1000*300*300
    for (let i = 1; i < N; i ++) {
        for (let j = 1; j < N; j++) {
            for (let k = 1; k <= N-1; k++) {
                if (i-k >= 0 && j-k >= 0) {
                    ans = Math.max(ans, appleTrees[i][j] - appleTrees[i][j-k] - appleTrees[i-k][j] + appleTrees[i-k][j-k])
                }
            }
        }
    }
    console.log(ans)
});
```