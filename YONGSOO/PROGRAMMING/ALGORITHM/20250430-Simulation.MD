## Source

https://www.acmicpc.net/problem/20947

## Commentary

습격받은 도시는 세로 N, 가로 N의 격자 모양이고 각 칸은 빈칸이거나 건물이 있다

주현이는 수제 폭탄을 건물이 없는 곳에 설치한다

폭탄은 터질때 상하좌우 각 방햐에 대해 충격파가 퍼져나가는데

충격파가 닿은 건물은 파괴되어 건물 잔해가 된다

충격파는 건물 또는 건물 잔해에 닿고 난 뒤 소멸한다

이번 테러 사건 수사를 맡은 향빈이는 현장을 재구성한다

건물 잔해의 위치를 통해 어떤 위치에서 폭탄이 터졌는지 알아내고자 한다

---


N개의 줄에 도시의 정보를 출력하라

각 줄은 N개의 문자를 포함하며, i번째 줄 j번째 문자는 도시[i][j] 번째 칸에 대한 정보이다

빈 칸일 경우 [.] 건물일 경우 [O] 잔해일 경우 [X] 폭탄이 설치된 칸인 경우 [B] 이다

답이 여러가지인 경우, 아무거나 출력하라

(1 <= N < = 2000)

a[i][j] = [.] || [O] || [X]

[.] : 빈칸

[O] : 건물

[X] : 잔해

---

폭탄의 위치를 구하기 위해

우리는 잔해를 살펴본다

폭발 범위는 동서남북으로  건물이 닿기 전까지 유효하다

따라서, 우리는 건물의 입장에서 생각할 수 있다

각 건물의 동서남북으로 빈 공간의 모든 범위를 불가능한 범위로 지정한다

불가능한 범위가 아닌 곳은 폭탄이 있어도 된다

따라서 그 정보를 출력하면 끝이다.

---

그렇다면 B를 이렇게 많이 넣지 않고 푸는 방법이 뭐가 있을까 

## Input
```
5
...XO
..XOO
...XO
O....
OXX..
```

## Output
```
.B.XO
..XOO
..BXO
O....
OXX..
```

## Source Code

```js

const fs = require('fs');
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');

const directions = [
    [-1,0],[0,1],[1,0],[0,-1]
];

const solve = (inputLines) => {
    let idx = 0;
    const [N] = inputLines[idx++].split(" ").map(Number);
    const city = new Array(N).fill(null).map(()=>
        new Array(N).fill(null).map(()=> null)
    )

    for (let i = 0; i < N; i ++) {
        const line = inputLines[idx++].split("").map(String);
        for (let j = 0; j < N; j ++) {
            city[i][j] = line[j];
        }
    }
    simulation(city, N);
}

const simulation = (city, N) => {
    const candidates = new Array(N).fill(null).map(()=>
        new Array(N).fill(null).map(()=>true)
    );
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < N; j ++) {
            if (city[i][j] === "O") {
                for (let [di, dj] of directions) {
                    let [ci, cj] = [i, j];
                    while (0 <= ci + di &&  ci + di < N && 0 <= cj + dj && cj + dj < N) {
                        if (city[ci+di][cj+dj] === ".") {
                            candidates[ci+di][cj+dj] = false;
                            ci += di;
                            cj += dj;
                        } else {
                            break;
                        }
                    }
                }
            }
            if (city[i][j] === "O" || city[i][j] === "X") {
                candidates[i][j] = false;
            }
        }
    }
    let ans = "";
    for (let i = 0; i < N; i ++) {
        for (let j = 0; j < N; j ++) {
            if (candidates[i][j]) {
                ans += "B";
            } else {
                ans += city[i][j];
            }
        }
        ans += "\n";
    }
    console.log(ans.trim());
}
solve(input);

```