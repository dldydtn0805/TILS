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

    const sudoku = []
    for (let i = 0 ; i < 9 ; i ++) {
        sudoku.push(inputLines[idx++].split(' ').map(Number))
    }

    const getRepetition = (x, y) => {
        const repetition = new Set
        for (let i = 3*Math.floor(x/3); i < 3*(Math.floor(x/3)+1); i++) {
            for (let j = 3*Math.floor(y/3); j < 3*(Math.floor(y/3)+1); j++) {
                repetition.add(sudoku[i][j])
            }
        }
        for (let i = 0; i < 9; i ++) {
            repetition.add(sudoku[x][i])
            repetition.add(sudoku[i][y])
        }
        return [1,2,3,4,5,6,7,8,9].filter((elem)=>!repetition.has(elem))
    }

    const backtracking = (ci, cj) => {
        if (ci === 9) {
            for (let i = 0 ; i < 9 ; i ++) {
                console.log(sudoku[i].join(' '))
            }
            process.exit()
        }
        if (sudoku[ci][cj] !== 0) {
            if (cj+1 < 9) {
                backtracking(ci, cj+1)
            } else {
                backtracking(ci+1, 0)
            }
        } else {
            const res = getRepetition(ci, cj)
            for (let number of res) {
                sudoku[ci][cj] = number
                if (cj+1 < 9) {
                    backtracking(ci, cj+1)
                } else {
                    backtracking(ci+1, 0)
                }
                sudoku[ci][cj] = 0
            }
        }
    }

    backtracking(0, 0)
});

```