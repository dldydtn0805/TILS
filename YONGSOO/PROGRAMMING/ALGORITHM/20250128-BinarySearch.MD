```js
// https://www.acmicpc.net/problem/1477
/* 해설

N개의 휴게소가 이미 설치되어 있다고 할 때

M개의 새로운 휴게소를 설치하여 모든 휴게소간의 최단 거리를 만들기 위해서

완전 탐색을 사용한다면 최대 1000^100의 시간복잡도가 발생하기 때문에

이분 탐색을 이용하여 최단 거리를 구해보도록 하자

*/
/* 입력
6 7 800
622 411 201 555 755 82
//
*/
/* 출력
70
*/

const fs = require('fs')
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');
const MOD = 123456789
const INF = Number.MAX_SAFE_INTEGER

const solve = (inputLines) => {
    let idx = 0
    let ans = 0
    const [N, M, L] = inputLines[idx++].split(' ').map(Number)
    const distances = []
    if (N !== 0) {
        const stops = inputLines[idx++].split(' ').map(Number)
        stops.sort((A,B)=>A-B)
        distances.push(stops[0])
        for (let i = 1; i < N; i ++) {
            distances.push(stops[i]-stops[i-1])
        }
        distances.push(L-stops[N-1])
    } else {
        distances.push(L)
    }
    const check = (x) => {
        const curDistances = [...distances]
        for (let i = 0; i < M; i ++) {
            curDistances.sort((A,B)=>A-B)
            const cur = curDistances.pop()
            curDistances.push(cur-x)
            curDistances.push(x)
        }
        const maxValue = Math.max(...curDistances)
        return maxValue <= x;
    }
    const binarySearch =(l, r) => {
        let res = INF
        while (l <= r) {
            let m = Math.floor((l+r)/2)
            if (check(m)) {
                res = Math.min(res, m)
                r = m-1
            } else {
                l = m+1
            }
        }
        return res
    }
    ans = binarySearch(0, L)
    return ans
}

console.log(solve(input))
```