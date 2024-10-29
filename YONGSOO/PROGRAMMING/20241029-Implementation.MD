## 구현

- 머리속에있는 알고리즘을 소스코드로 바꾸는 과정. 알고리즘 문제를 풀이할때 구현은 매우 필요하다. 거의 모든 문제가 구현문제인데, 가끔 구현이 어렵거나 구현에 초점이 맞추어진 문제들이 있다. 즉 풀이를 떠올리기는 쉽지만 소스코드로 옮기기 어려운 문제

- 실수 연산을 다루고 특정 소수점 자리까지 출력하는 문제

- 문열을 특정한 기준에 따라 끊어 처리하는 문제

- 알고리즘은 간단한데 코드가 지나칠만큼 길어지는 문제

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
    let [ N , K ] = inputLines[idx++].split(' ').map(Number)
    const units = []
    for (let i = 1; 9*(10**(i-1)) <= 1000000000; i++) {
        units.push((i)*9*(10**(i-1)))
    }
    for (let i = 1 ; i < units.length; i++) {
        units[i] = units[i-1] + units[i]
    }
    let num
    for (let i = 0; i < units.length; i ++) {
        if (units[i] >= K) {
            num = i
            break
        }
    }
    const interval = num > 0 ? units[num-1] : 0
    K -= interval
    let res_unit = 0
    let res_number = 10**num
    let cnt = 0
    for (let i = 10**(num); i < 10**(num+1); i++) {
        cnt += num+1
        res_number += 1
        if (cnt >= K) {
            res_unit = i
            break
        }

    }
    if (res_number-1 <= N)  {
        console.log(String(res_unit)[K+num-cnt])
    }
    else {
        console.log(-1)
    }
});

```