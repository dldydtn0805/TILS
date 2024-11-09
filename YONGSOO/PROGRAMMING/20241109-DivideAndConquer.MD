## 분할 정복 

- 큰 규모의 문제를 풀기 위해 하위 문제로 나누어 풀이하고 이들의 해답을 결합하여 최종 해답을 얻는다

- 문제를 가장 작은 단위의 문제로 분할한 후 해당 문제들을 결합하여 부분 해답을 도출, 또다시 부분 해답을 결합하는 과정을 통해서 최종적으로 큰 규모의 문제를 풀이한다

### 과정

1. 분할 : 해결하기 쉬보록 문제를 여러개의 작은 부분으로 나눈다

2. 정복 : 나눈 문제를 각각 해결한다

3. 통합 : 해결된 해답을 모은다

### 조건

1. 문제의 분할이 쉽게 가능해야 한다

    - 주어진 문제를 작은 부분 문제들로 나눌 수 있어야 한다
    - 문제를 분할하는 과정이 너무 복잡하거나 비효율적이면 분할 정복법을 적용하기 어렵다
2. 하위 문제를 해결하는 방식이 상위 문제를 해결하는 방식과 동일해야 한다
    - 재귀적으로 동일한 방식을 통해서 하위 문제를 해결하는 아이디어를 사용하므로 하위 문제를 해결하는 방식이 상위 문제를 해결하는 방식과 동일해야한다
3. 부분 문제의 해결이 독립적이고 효율적이어야한다
    - 하나의 부분 문제를 해결하는 과정이 다른 부분 문제의 결과에 영향을 주지 않아야한다
    - 부분 문제를 해결하는데 너무 많은 시간이 소요된다면 전체 문제를 해결하는데 많은 시간이 걸릴 수 있다

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
    const [N, B] = inputLines[idx++].split(' ').map(Number)
    const A = []
    for (let i = 0 ; i < N ; i ++) {
        A.push(inputLines[idx++].split(' ').map(Number))
    }
    const multiply = (left, right) => {
        const matrix = new Array(N).fill(null).map(()=>
            new Array(N).fill(null).map(()=>0)
        )

        for (let i = 0; i < N ; i ++) {
            for (let j = 0 ; j < N; j ++) {
                for (let k = 0; k < N; k++) {
                    matrix[i][j] += (left[i][k]*right[k][j])
                }
            }
        }
        return matrix.map((row)=>row.map((col)=>col%1000))

    }
    const divide = (e) => {
        if (e === 2) {
            return multiply(A, A)
        } else {
            if (e % 2 === 0) {
                const next = divide(Math.floor(e/2))
                return multiply(next, next)
            } else {
                return multiply(divide(e-1), A)
            }
        }
    }
    const res = B === 1 ? A : divide(B)
    const ans = res.map((row)=>row.map((col)=>col%1000))
    for (let i = 0 ; i < N ; i++) {
        console.log(ans[i].join(' '))
    }
});

```