## 이분탐색

- 정렬되어있는 리스트에서 탐색 범위를 절반씩 좁혀가며 데이터를 탐색하는 방법

- 배열 내부의 데이터가 정렬되어있어야만 사용할 수 있는 알고리즘

- 변수 세개를 이용하여 탐색한다. 찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교해서 원하는 데이터를 찾는 것이 이진 탐색의 과정이다

```js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let S, N;
const arr = []
inputLines = []
let idx = 0
rl.on('line', (line)=>{
    inputLines.push(line)
}).on('close', ()=> {
    const [N, M] = inputLines[idx++].split(' ').map(Number)
    const expense = []
    for (let i = 0; i < N ; i ++) {
        const [cash] = inputLines[idx++].split(' ').map(Number)
        expense.push(cash)
    }
    const check = (x) => {
        let cnt = 0
        let wallet = 0
        for (let i = 0; i < expense.length; i++) {
            if (x < expense[i]) {
                return false
            }
            if (wallet >= expense[i]) {
                wallet -= expense[i]
            } else {
                cnt += 1
                if (cnt > M) {
                    return false
                }
                wallet = x
                wallet -= expense[i]
            }
        }
        return true
    }

    const binarySearch = (s, e) => {
        let ans = e
        while (s <= e) {
            let mid = Math.floor((s + e)/2)
            if (check(mid)) {
                ans = Math.min(ans, mid)
                e = mid - 1
            } else {
                s = mid + 1
            }
        }
        return ans
    }
    console.log(binarySearch(1, 10000000000))

})


```