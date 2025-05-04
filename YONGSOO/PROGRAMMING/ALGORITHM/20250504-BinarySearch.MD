## Source

https://www.acmicpc.net/problem/28305

## Commentary 

나는 세미나 N개를 주최한다

일정은 다음 조건으로 정한다

1. 각 세미나는 연속된 T 일동안 진행된다.

    - i번째 세미나는 mi 일차부터 mi+T-1일차까지 매일 진행된다.
    - 나는 mi를 정해야한다

2. 각 세미나의 T일 중 하루에는 외부 전문가의 특강이 진행된다.

    - i번째 세미나의 외부 전문가가 참석할 수 있는 날이 ai 일차까지밖에 없다

    - ai 일차는 i번째 세미나가 진행되는 T일중 하루다.

    - 즉 mi <= ai <= mi+T-1 이다

나는 세미나에 사용할 세미나실을 미리 대여하고자한다.

하나의 세미나실에서는 같은 날 최대 하나의 세미나를 진행할 수 있지만,

다른 날에 서로 다른 세미나를 진행하는 것은 가능하다.

한번이라도 사용할 세미나 실은 모두 빌려야하기 때문에, 나는 진행되는 세미나가 가장 많은 날의 세미나 수를 최소화하고자 한다

---

N, T가 주어진다

a1 .... an이 주어진다

(1 <= N <= 2*10^5)

(1 <= T <= 10^9)

(1 <= ai <= 10^9)

진행되는 세미나가 가장 많은 날의 세미나 수의 최솟값은 ?

---

핵심은, 하나의 세미나실은 하루에 하나의 세미나밖에 못한다는 것이다

따라서 우리는 N개의 세미나를 적절히 퍼트려서 진행해야한다

또한 각 세미나는 T 일동안 진행되어야한다

또한 제한사항으로 외부 전문가 특강이 N개 주어진다

외부 전문가 특강은 각 세미나 일정 도중에 있어야하고, 즉 일대일 매칭된다

이것이 말하는 것은,

외부 전문가 특강 일정을 중심으로 T일 동안 각 세미나는 진행되고,

이 N개의 세미나 일정들이 최대한 겹치지않게 진행되어야한다는 말이다.

---

그렇다면 세미나 일정의 세부 조정을 어떤식으로 하는게 가장 유리한가

T는 최대 10^9이고 ai는 10^9 이라는 것에서 우리는

각 날짜를 인덱스로 하는 배열은 생성할 수 없음을 알 수 있다

즉, 각 세미나를 인덱스로 하는 배열을 사용하여야한다.

---

그렇다면 가장 많은 날의 세미나 수의 최솟값을 출력하기 위해 어떻게 해야하는가 ?

가장 많은 날의 세미나 수의 최솟값이라는 것은,

필요한 세미나실의 최소 개수와 같은 말이다.

이는 이진탐색으로 구할 수 있다

---

이진탐색에서 Check 로직은 간단히 구현 가능하다

1. 특강 일정을 낮은 순으로 정렬한다

2. 지정한 방의 개수 까지 세미나 종료일을 우선순위 큐에 넣는다

3. 방의 개수를 넘어섰다면, 최소 세미나 종료일과 현재 날짜를 비교하여 우선순위 큐에 다시 넣는다.

    - 이 과정에서 최소 세미나 종료일보다 현재 날짜가 낮다면 불가능하므로 false를 반환한다

4. 모든 배열을 탐색 완료했다면 true를 반환한다

## Input
```
5 3
4 6 3 5 7
```

## Output
```
2
```

## Source Code 
```js
//우선순위 큐
class PriorityQueue {
    constructor() { this.h = []; }
    cmp(a, b) {
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i]) return a[i] < b[i];
        return false;
    }
    add(x) {
        let h = this.h, i = h.push(x) - 1;
        while (i) {
            let p = (i - 1) >> 1;
            if (this.cmp(h[i], h[p])) [h[i], h[p]] = [h[p], h[i]], i = p;
            else break;
        }
    }
    poll() {
        let h = this.h, x = h[0], i = 0, n = h.length - 1;
        if (!n) return h.pop();
        h[0] = h.pop();
        while (true) {
            let l = 2 * i + 1, r = l + 1, m = i;
            if (l < n && this.cmp(h[l], h[m])) m = l;
            if (r < n && this.cmp(h[r], h[m])) m = r;
            if (m === i) break;
            [h[i], h[m]] = [h[m], h[i]], i = m;
        }
        return x;
    }
    isEmpty() { return !this.h.length; }
    size() { return this.h.length; }
    peek() {return this.h[0];}
}

const fs = require('fs');
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');

const solve = (inputLines) => {
    let idx = 0;
    const [N, T] = inputLines[idx++].split(" ").map(Number);
    const specialist = inputLines[idx++].split(" ").map(Number);
    specialist.sort((a,b)=>{return a-b});
    console.log(binarySearch(specialist, N, T, 1, 200000));
}

const binarySearch = (specialist, N, T, l, r) => {
    let ans = r;
    while (l <= r) {
        const m = Math.floor((l+r)/2);
        if (check(m, specialist, N, T)) {
            ans = Math.min(ans, m);
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return ans;
}

const check = (maxRoom, specialist, N, T) => {
    const pq = new PriorityQueue();
    for (let i = 0; i < N; i ++) {
        const cur = specialist[i];
        if (pq.size() < maxRoom) {
            pq.add([Math.max(cur, T)]);
        } else {
            const rightBoundary = pq.peek()[0] + T;
            const leftBoundary = pq.peek()[0] + 1;
            if (leftBoundary <= cur && cur <= rightBoundary) {
                pq.add([rightBoundary]);
            } else if (rightBoundary < cur){
                pq.add([Math.max(cur, T)]);
            } else {
                return false;
            }
            pq.poll();
        }
    }
    return true;
}

solve(input);

```