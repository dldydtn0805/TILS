## 상호 배타적 집합

- 유니온 : 서로 다른 두개의 집합을 하나의 집합으로 병합하는 연산, 이 자료구조에서는 상호 배타적 집합만을 다루므로 Union 연산은 합집합 연산과 같다

- 파인드 : 하나의 원소가 어떤 집합에 속해있는지를 판단한다

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
    const [ N ] = inputLines[idx++].split(' ').map(Number)
    let parents = new Array(10**6+1).fill(null).map((value, key)=>-1)
    let ans = ''
    for (let i = 0 ; i < N ; i ++) {
        const find = (ci : number) => {
            if (parents[ci] < 0) {
                return ci
            }
            parents[ci] = find(parents[ci])
            return parents[ci]
        }

        const union = (x:number, y:number) => {
            x = find(x)
            y = find(y)

            if (x === y) {
                return
            }
            let A, B
            if (parents[x] < parents[y]) {
                [A, B] = [x, y]
            } else {
                [A, B] = [y, x]
            }
            parents[A] += parents[B]
            parents[B] = A
        }
        if (inputLines[idx][0] === 'I') {
            const [I, a, b] = inputLines[idx++].split(' ').map(Number)
            union(a, b)
        } else {
            const [Q, c] = inputLines[idx++].split(' ').map(Number)
            ans += `${parents[find(c)]*-1}\n`
        }
    }
    console.log(ans)
});

```