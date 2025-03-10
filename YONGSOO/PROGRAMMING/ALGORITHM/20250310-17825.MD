## 문제

https://www.acmicpc.net/problem/17825

## 해설

처음에는 시작칸에 말 4개가 있다

말을 게임판에 그려진 화살표의 방향대로만 이동할 수 있다

말이 파란색에서 이동을 시작하면 파란색 화살표를 타야하고

이동하는 도중이거나 파란색이 아닌 칸에서 이동을 시작하면 빨간색 화살표를 타야한다

말이 도착칸으로 이동하면 주사위에 나온 수와 관계없이 이동을 마친다

게임은 10개의 턴으로 이루어진다

매 턴마다 1부터 5까지 한면에 하나씩 적혀있는 5면체 주사위를 굴리고

도착칸에 있지 않은 말을 하나 골라 주사위에 나온 수만큼 이동시킨다

말이 이동을 마치는 칸에 다른 말이 있으면 그 말은 고를 수 없다

단, 이동을 마치는 칸이 도착칸이면 고를수있다

말이 이동을 마칠때마다 칸에 적혀있는 수가 점수에 추가된다

주사위에서 나올 수 10개를 미리 알고있을때 얻을 수 있는 점수의 최댓값은 ?

주사위에서 나올 수 10개가 순서대로 주어진다

얻을 수 있는 점수의 최댓값을 출력하라

말은 4개로 시작한다

말은 기본적으로 4개가 주어진다

파란색 칸일때 이동하는 곳과 빨간색 칸일때 이동하는 곳은 다르다

이를 어떻게 하면 최댓값을 편하게 구할수있을까 ?

인접리스트라고 생각할 수 있지 않을까 ?

따라서 윷놀이판을 각 인덱스마다 이동할 수 있는 최소부터 최대치까지 해쉬맵으로 저장했고,

인덱스에 따라서 값을 지정해주었다.

말 4개가 시작 지점에있는 것부터, 10번의 주사위를 모두 던질때까지 모든 경우의 수를

백트래킹으로 돌려주었다.

해쉬맵을 저장할때 인덱스 실수를 하지 않는다면, 어려울 것이 없는 문제였고,

백트래킹 개념을 간만에 써보니 재밌었다.

사실 어처구니없는 실수를 한두개 해서 고치는데 시간이 조금 걸리긴 했는데 그래도 쉽게 풀어서 다행이다.

## 입력
```txt
1 2 3 4 1 2 3 4 1 2
```

## 출력
```txt
190
```

## 코드

```java
import java.io.*;
import java.lang.reflect.Array;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        HashMap<Integer, List<Integer>> adjList = new HashMap<>();
        for (int i = 0; i <= 20; i ++) {
            if (i != 5 && i != 10 && i != 15) {
                int a = i+1 <= 20 ? i+1 : -1;
                int b = i+2 <= 20 ? i+2 : -1;
                int c =  i+3 <= 20 ? i+3 : -1;
                int d =  i+4 <= 20 ? i+4 : -1;
                int e = i+5 <= 20 ? i+5 : -1;
                adjList.put(i, Arrays.asList(a, b, c, d, e));
            }
        }
        int[] scores = new int[]{0, 2, 4, 6, 8, 10,
                12, 14, 16, 18, 20,
                22, 24, 26, 28, 30,
                32, 34, 36, 38, 40,
                13, 16, 19, 25, 30,
                35, 22, 24, 28, 27, 26};
        adjList.put(5, Arrays.asList(21, 22, 23, 24, 25));
        adjList.put(21, Arrays.asList(22, 23, 24, 25, 26));
        adjList.put(22, Arrays.asList(23, 24, 25, 26, 20));
        adjList.put(23, Arrays.asList(24, 25, 26, 20, -1));
        adjList.put(24, Arrays.asList(25, 26, 20, -1, -1));
        adjList.put(25, Arrays.asList(26, 20, -1, -1, -1));
        adjList.put(26, Arrays.asList(20, -1, -1, -1, -1));
        adjList.put(10, Arrays.asList(27, 28, 24, 25, 26));
        adjList.put(27, Arrays.asList(28, 24, 25, 26, 20));
        adjList.put(28, Arrays.asList(24, 25, 26, 20, -1));
        adjList.put(15, Arrays.asList(29, 30, 31, 24, 25));
        adjList.put(29, Arrays.asList(30, 31, 24, 25, 26));
        adjList.put(30, Arrays.asList(31, 24, 25, 26, 20));
        adjList.put(31, Arrays.asList(24, 25, 26, 20, -1));
        int[] dices = new int[10];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < 10; i++) {
            dices[i] = Integer.parseInt(st.nextToken());
        }
        StringBuilder sb = new StringBuilder("");
        int[] start = new int[]{0, 0, 0, 0};
        sb.append(backtracking(start, adjList, 0, dices, 0, scores));
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int backtracking (int[] cur, HashMap<Integer, List<Integer>> adjList, int diceIdx, int[] dices, int score, int[] scores) {
        if (diceIdx == 10) {
            return score;
        }
        int res = 0;
        for (int i = 0; i < 4; i ++) {
            if (cur[i] != -1) {
                int[] next = new int[4];
                next[0] = cur[0];
                next[1] = cur[1];
                next[2] = cur[2];
                next[3] = cur[3];
                int ni = adjList.get(next[i]).get(dices[diceIdx]-1);
                if (ni != -1) {
                    boolean same = false;
                    for (int j = 0 ; j < 4; j ++) {
                        if (i != j) {
                            if (ni == next[j]) {
                                same = true;
                            }
                        }
                    }
                    if (!same) {
                        next[i] = ni;
                        res = Math.max(res, backtracking(next, adjList, diceIdx + 1, dices, score + scores[ni], scores));
                    }
                } else {
                    next[i] = ni;
                    res = Math.max(res, backtracking(next, adjList, diceIdx + 1, dices, score, scores));
                }
            }
        }
        return res;
    }
}
```