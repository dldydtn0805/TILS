## Source

https://www.acmicpc.net/problem/17135

## Commentary

캐슬 디펜스는 성을 향해 몰려오는 적을 잡는 턴 방식의 게임이다

격자판은 1 X 1 크기의 칸이고, 각 칸에 포함된 적의 수는 최대 하나이다

격자판의 N 행 바로 아래에 모든 칸에는 성이 있다

성을 적에게서 지키기 위해 궁수 3명을 배치하려고 한다

궁수는 성이 있는 칸에 배치할 수 없고,

하나의 칸에는 최대 한명의 궁수만 있을 수 있다

각 턴마다 궁수는 적 하나를 공격할 수 있고, 모든 궁수는 동시에 공격한다

궁수가 공격하는 적은 거리가 D 이하인 적 중에서 가장 가까운 적이고

그러한 적이 여럿일 경우, 가장 왼쪽에 있는 적을 공격한다

같은 적이 여러 궁수에게 공격당할 수 있다

공격받은 적은 게임에서 제외된다

궁수의 공격이 끝나면, 적이 이동한다. 적은 한칸 아래로 이동하며,

성이 있는 칸으로 이동한 경우 , 게임에서 제외된다. 모든 적이 격자판에서 제외되면 게임이 끝난다

게임 설명에서 보다시피 궁수를 배치한 이후의 게임 진행은 정해져있다

이 게임은 궁수의 위치가 중요하다

격자판의 상태가 주어졌을때, 궁수의 공격으로 제거할 수 있는 적의 최대 수를 계산하자

격자판의 두 위치의 거리는 abs(r1-r2) + abs(c1-c2) 이다

행 N, 열 M, 궁수의 공격 거리 제한 D가 주어진다

N개의 줄에 격자판의 상대가 주어진다

0은 빈 칸, 1은 적이 있는 칸이다

궁수의 공격으로 제거할 수 있는 적의 최대 수는 ?

---

3 <= N, M <= 15

1 <= D <= 10

---

궁수는 성이 있는 칸에 최대 3명 배치할 수 있고, 격자판의 크기는 최대 175칸이다

궁수의 사거리는 최대 10칸 이하다.

최대한 많은 적을 섬멸하기 위한 궁수의 최적의 위치는 어디이며 몇마리까지 섬멸이 가능할 것인가

적은 턴마다 한칸씩 아래로 이동하며

적은 N+1 행으로 이동하면 더이상 공격할 수 없다

모든 적이 사라지기 전까지 최대한 많은 적을 섬멸해야하고, 궁수를 배치한 순간 더이상 이동이 불가능하기 때문에

최대한 적절한 위치에 궁수를 배치해야하는데,

- 15칸 중 3칸을 선택하여 궁수의 위치를 판단한다 15 * 14 * 13 / 3 * 2 * 1 = 455

결국 우리가 구하고자 하는건 죽는 적의 최대 마리 수를 판단하는 것이다

이는 결국 완전탐색으로 구할 수 있다.

## Input
```
5 5 1
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
1 1 1 1 1
```

## Output
```
3
```

## Source Code

```java

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken()), M = Integer.parseInt(st.nextToken()), D = Integer.parseInt(st.nextToken());
        int[][] enemies = new int[N][M];
        for (int i = 0; i < N; i ++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j ++) {
                enemies[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        int ans = 0;
        for (int i = 0; i < M; i ++) {
            for (int j = 0; j < i; j ++) {
                for (int k = 0; k < j; k ++) {

                    ans = Math.max(ans, bruteForce(enemies, N, M, D, new int[]{i, j, k}));
                }
            }
        }

        System.out.println(ans);
        bw.close();
        br.close();
    }

    public static int bruteForce (int[][] enemies, int N, int M, int D, int[] archers) {
        int[][] curEnemies = new int[N][M];
        for (int i = 0; i < N ; i ++) {
            for (int j = 0; j < M; j ++) {
                curEnemies[i][j] = enemies[i][j];
            }
        }
        int kill = 0;
        for (int turn = 0; turn < N; turn ++) {
            HashSet<List<Integer>> hs = new HashSet<>();
            for (int archer = 0; archer < 3; archer ++) {
                int ci = N;
                int cj = archers[archer];
                ArrayList<int[]> candidates = new ArrayList<>();
                for (int rowDist = -D; rowDist < 0; rowDist++) {
                    for (int colDist = -D; colDist < D; colDist++) {
                        int dist = Math.abs(rowDist) + Math.abs(colDist);
                        if (dist <= D) {
                            int ni = ci + rowDist;
                            int nj = cj + colDist;
                            if (0 <= ni && 0 <= nj && nj < M) {
                                if (curEnemies[ni][nj] == 1) {
                                    candidates.add(new int[]{ni, nj, dist});
                                }
                            }
                        }
                    }
                }
                candidates.sort((a,b)->{
                    return a[2] == b[2] ? a[1] - b[1] : a[2] - b[2];
                });
                if (!candidates.isEmpty()) {
                    int ti = candidates.get(0)[0];
                    int tj = candidates.get(0)[1];
                    hs.add(Arrays.asList(ti, tj));
                }
            }
            for (List<Integer> elem : hs) {
                curEnemies[elem.get(0)][elem.get(1)] = 0;
            }
            kill += hs.size();
            int[][] nextEnemies = new int[N][M];
            for (int i = 0; i < N; i ++) {
                for (int j = 0; j < M; j ++) {
                    if (curEnemies[i][j] == 1) {
                        if (i + 1 < N) {
                            nextEnemies[i+1][j] = 1;
                            curEnemies[i][j] = 0;
                        }
                    }
                }
            }
            for (int i = 0; i < N; i ++) {
                for (int j = 0; j < M; j ++) {
                    curEnemies[i][j] = nextEnemies[i][j];
                }
            }


        }
        return kill;
    }
}


 ```