## 템플릿 리터럴

- ES6 이전에는 템플릿 문자열이라고 부르던 것을 ES6에서 템플릿 리터럴이라 부르게 되었다.

- 템플릿 리터럴이란 내장된 표현식을 허용하는 문자열 리터럴로 표현식 / 문자열 삽입, 여러줄 문자열, 문자열 형식화, 문자열 태깅 등 다양한 기능을 제공한다

- ES6부터는 백틱을 이용하여 쉽게 작성할 수 있다

- 전체를 백틱으로 감싸기만 한다면 백슬래시 지옥을 겪지 않아도 된다.

- 삼항 연산자를 사용한다면 템플릿 리터럴 문자열 내에 로직을 쉽게 추가할 수 있다

- 템플릿 리터럴 내에 함수를 전달할 수도 있다

- 함수를 태그하여 탬플릿 리터럴을 실행하면 템플릿 내부에 있는 모든 항목이 태그된 함수의 인수로 제공된다

## 예시 코드

```ts
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let idx = 0;
let inputLines: Array<string> = [];
const INF = Number.MIN_SAFE_INTEGER
rl.on('line', (line: string) => {
    inputLines.push(line);
}).on('close', () => {
    const [N, T] = inputLines[idx++].split(' ').map(Number)
    let [ci, cj] = [0, 0];
    const edges :Set<String> = new Set()
    for (let i = 0 ; i < N ; i++) {
        const [X, Y] = inputLines[idx++].split(' ').map(Number);
        edges.add(`${Y},${X}`)
    }
    const visited :Set<String> = new Set()
    const queue = []
    const bfs = () :number => {
        // queue = [I, J, CNT];
        queue.push([0, 0, 0])
        while (queue.length) {
            const [ci, cj, cnt] = queue.shift()
            for (let i = ci-2 ; i <= ci+2; i++ ) {
                for (let j = cj-2 ; j <= cj+2; j++) {
                    if (edges.has(`${i},${j}`) && !visited.has(`${i},${j}`)) {
                        if (i === T) {return cnt+1}
                        queue.push([i, j, cnt+1]);
                        visited.add(`${i},${j}`)
                    }
                }
            }
        }
        return -1
    }
    console.log(bfs())
});


```