## 이분 탐색

- 이분탐색은 오름차순 또는 내림차순으로 정렬된 배열에 적용 가능한 탐색 기법이다. 정렬된 배열에서 특정 값을 찾을 때 정중앙에 위치한 값을 활용하면 아주 빠른 속도로 탐색을 끝낼 수 있다.

- 배열이 오름차순이라고 가정할때 배열의 시작점과 끝점의 중앙에 위치한 값을 중앙값으로 부르고, `탐색값 < 중앙값`이면 중앙값의 오른쪽 부분은 고려할 필요가 없다. 반대도 마찬가지다.

## 예시 코드

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
    const [ROW, COL] = inputLines[idx++].split(' ').map(Number)
    const [N] = inputLines[idx++].split(' ').map(Number);
    const [M] = inputLines[idx++].split(' ').map(Number);
    const papers = new Array(1000000+1).fill(null).map(()=>0)
    let minHeight = 1000000
    let maxHeight = 1000000
    for (let i = 0; i < M ; i++) {
        const [x, y] = inputLines[idx++].split(' ').map(Number);
        papers[y] = x
        minHeight = Math.min(minHeight, x)
    }
    const binary_search = (start:number, end:number) :number => {
        let ans = INF
        while (start <= end) {
            let mid = Math.floor((start + end)/2)
            // console.log(mid)
            if (check(mid)) { // mid 길이의 정사각형으로 N개의 개수를 만족
                end = mid - 1
                ans = Math.min(mid, ans)
            } else {
                start = mid + 1
            }
        }
        return ans
    }
    const check = (mid:number):boolean => { // mid : 정사각형 한변의 길이
        const visited :Array<number> = papers.map((paper)=> {if (paper !== 0) {return 0} else {return -1}})
        let cnt = 0
        for (let i = 0; i < 1000001; i++) {
            if (!visited[i]) {
                if (papers[i]) {
                    cnt ++
                    if (papers[i] > mid || cnt > N) {return false}
                    for (let j = i; j < i+mid ; j++) {
                        if (j < 1000001) {
                            if (papers[j] <= mid) {
                                visited[j] = 1
                            }
                        }
                    }
                }
            }

        }
        return true
    }
    console.log(binary_search(minHeight, maxHeight))
});

```