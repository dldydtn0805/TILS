## 유클리드 호제법

- 두 수의 최대공약수를 구하는 알고리즘

- 유클리드에 의해 기원전 300년 경에 발견된 가장 오래된 알고리즘이다

### 유클리드 호제법 사용하기

1. 큰 수를 작은 수로 나눈 나머지를 구한다 `1112 MOD 695 = 417`

2. 나눈 수와 나머지로 또 나머지를 구한다 `695 MOD 418 = 278`

3. 이 과정을 반복한다 `417 MOD 278 = 139`

4. `278 MOD 139 = 0`

- 나머지가 9이됐을때 나누는 수로 사용된 139가 1112와 695의 최대공약수이다

- 두 수가 아무리 크더라도 정해진 순서로 계산하면 효율적으로 최대공약수를 구할 수 있다

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
    const [N, S] = inputLines[idx++].split(' ').map(Number)
    const A = inputLines[idx++].split(' ').map(Number)
    const numbers = A.map((elem)=>Math.abs(S-elem))
    numbers.sort((a, b) => a - b)

    // 유클리드 호제법
    const gcd = (A : number, B : number) => {
        while (B !== 0) {
            let next = B
            B = A % B
            A = next
        }
        return A
    }

    let ans
    if (N > 1) {
        let cur = gcd(numbers[0], numbers[1])
        for (let i = 2; i < N; i ++) {
            cur = gcd(cur, numbers[i])
        }
        ans = cur
    } else {
        ans = numbers[0]
    }
    console.log(ans)


});

```