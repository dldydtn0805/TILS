## 문제

https://www.acmicpc.net/problem/2600

## 해설

A와 B가 번갈아가면서 두개의 구슬 통에서 몇개씩 구슬을 꺼내는 게임을 한다

한번에 한사람이 한통에서 꺼낼수있는 구슬의 개수는 세가지다

구슬을 꺼낼 경우 두개의 구슬통중에서 하나를 마음대로 선택해서 그 안에서만 꺼낼 수 있다

즉 두개의 통을 동시에 몇개씩 꺼낼수없다.

게임은 항상 A가 먼저하고 그다음 B 그다음 A 순으로 번갈아가면서 진행한다

자신의 차례가 되었을때에 정해진 규칙대로 구슬을 꺼낼수없는 사람이 게임에서 진다

처음 두 통속에 들어있는 구슬의 수 k1, k2와 한번에 꺼낼 수있는 구슬의 수 b1, b2, b3의 제한 조건은 다음과같다

1 <= b1 < b2 < b3 <= 30

1 <= k1, k2 <= 500

첫줄에는 한번에 꺼낼 수 있는 구슬의 개수를 나타내는 세개의 정수 b1, b2, b3가 나타난다

5개의 각줄에
두 통속에 처음 담겨있는 구슬의 개수 k1, k2가 각각 표시되어 있다

각 5개의 k1, k2에 대하여 그에 대응되는 승자를 한줄에 하나씩 차례대로 출력하라

이 문제는 DP로 해결 가능하다

DP[i][j] 는 K1 더미에 구슬이 i개, K2 더미에 구슬이 j개 남았을때 현재 플레이어의 승패 여부를 나타낸다

dp[i][j] = 1 : 현재 플레이어가 이길 수 있는 상태

dp[i][j] = 0 : 현재 플레이어가 지는 상태

dp[i][j] = -1 : 계산되지 않은 상태

play 메서드는 다음과 같이 작동한다

- 재귀적으로 모든 가능한 수를 탐색한다

- 현재 플레이어가 어느 한 더미에서 b[i]개의 돌을 제거한 후 상대방이 지는 상황이 하나라도 있으면 현재 플레이어는 이길 수 있다
- 모든 가능한 이동을 해봐도 상대방이 이기는 경우만 나오면 현재 플레이어는 반드시 진다

- 메모이제이션을 통해 이미 계산된 상태는 다시 계산하지 않는다

게임 진행

1. A 플레이어가 먼저 시작한다

2. 각 턴에서 플레이어는 세가지 숫자 중 하나를 선택해 한 더미에서 돌을 제거한다

3. 돌을 제거하 수 없게된 플레이어는 패배한다

4. play 함수는 현재 상태에서 최적의 플레이를 했을때 이길 수 있는지 또는 질 수밖에 없는지를 반환한다

내가 느낀 이 문제의 포인트는 다음이다

현재 플레이어가  어떤 수를 두었을때, 상대방이 한번이라도 질수밖에없는 상황으로 만들 수 있다면, 현재 플레이어는 무조건 이길 수 있다.

`play(remainK1-b[i], remainK2, b, dp) == 0`

`play(remainK1, remainK2-b[i], b, dp) == 0`

이 바로 그 상황인 것이다.

반대로 현재 플레이어가 어떤 수를 두더라도 상대방이 항상 이길 수 있는 상황으로만 이어진다면 현재 플레이어는 필연적으로 질수밖에 없다.

따라서 마지막에 `dp[remainK1][remainK2] = 0`으로 설정하는 것이다.

이 코드의 시간복잡도가 괜찮은 이유는 메모이제이션 때문이다

```java
if (dp[remainK1][remainK2] >= 0) {
    return dp[remainK1][remainK2];
} 
```

이미 계산된 상태라면 바로 결과를 반환하게 되는데, 각 상태는 501*501이므로 

충분히 1초의 시간복잡도를 만족할 수 있게 되는 것이다.

따라서 이는 메모이제이션의 적극적인 활용 덕분인 것이고, 이것이 Top-down Dynamic Programming에서 가장 핵심적인 부분인 것이다.

## 입력
```txt
1 3 4
4 1
5 5
10 2
15 16
30 14
```

## 출력
```txt
A
B
A
A
B
```

## 코드

```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");

        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] b = new int[3];
        b[0] = Integer.parseInt(st.nextToken());
        b[1] = Integer.parseInt(st.nextToken());
        b[2] = Integer.parseInt(st.nextToken());

        int[][] dp = new int[501][501];
        for (int i = 0 ; i < 501; i ++) {
            for (int j = 0; j < 501; j++) {
                dp[i][j] = -1;
            }
        }
        for (int i = 0; i < 5; i ++) {
            st = new StringTokenizer(br.readLine());
            int k1 = Integer.parseInt(st.nextToken());
            int k2 = Integer.parseInt(st.nextToken());
            sb.append(play(k1, k2, b, dp) == 1 ? "A" : "B").append("\n");
        }
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int play (int remainK1, int remainK2, int[] b, int[][] dp) {

        if (dp[remainK1][remainK2] >= 0) {
            return dp[remainK1][remainK2];
        }

        for (int i = 0; i < 3; i ++) {
            if (b[i] <= remainK1 && play(remainK1-b[i], remainK2, b, dp) == 0) {
                dp[remainK1][remainK2] = 1;
                return dp[remainK1][remainK2];
            }
        }

        for (int i = 0; i < 3; i ++) {
            if (b[i] <= remainK2 && play(remainK1, remainK2-b[i], b, dp) == 0) {
                dp[remainK1][remainK2] = 1;
                return dp[remainK1][remainK2];
            }
        }

        dp[remainK1][remainK2] = 0;
        return dp[remainK1][remainK2];

    }
}
```