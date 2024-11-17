## 에라토스테네스의 체

- 소수를 판별하는 알고리즘

- 소수들을 대량으로 빠르고 정확하게 구하는 방법

### 단일 숫자 소수 여부 확인

- 어떤 수의 소수 여부를 확인할 때는 특정한 숫자의 제곱근 까지만 약수의 여부를 검증하면 N^(1/2)의 시간복잡도로 빠르게 구할 수 있다

- 수가 수를 나누면 몫이 생기는데 몫과 나누는 수 둘 중 하나는 N 제곱근 이하이기 떄문이다

- 대량의 소수를 한꺼번에 반별해야할 경우는 에라토스테네스의 체를 이용한다

### 원리

- 가장 먼저 소수를 판별할 범위만큼 배열을 할당하여 해당하는 값을 넣어주고 이후에 하나씩 지워가는 방법을 이용

1. 배열을 생성하여 초기화

2. 2부터 시작해서 특정 수의 배수에 해당하는 수를 모두 지운다 (지울 떄 자기자신은 지우지 않고, 이미 지워진 수는 건너뛴다)

3. 2부터 시작하여 남아있는 수를 모두 출력한다

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
    let ans = 1
    const colors = new Array(N+1).fill(null).map(()=>0)
    colors[1] = 1
    let cur = 2
    for (let i = 2 ; i < N+1; i++) {
        let flag = true
        if (colors[i] === 0) {
            for (let j = 2; j < i**(0.5)-1; j++) {
                if (i % j === 0) {
                    flag = false
                }
            }
            if (flag) {
                colors[i] = cur
                for (let j = i; j < N+1; j+=i) {
                    colors[j] = cur
                }
                cur ++
                ans ++
            }
        }

    }
    console.log(ans)
    console.log(colors.splice(1, N+1).join(' '))
})


```