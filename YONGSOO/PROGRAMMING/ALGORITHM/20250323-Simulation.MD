## 문제

https://www.acmicpc.net/problem/15671

## 해설

오델로는 검은색, 하얀색 작은 돌을 6 * 6 판에 놓는 보드 게임이다

오셀로 규칙은 다음과 같다

1. 처음에 판 가운데에 사각형으로 엇갈리게 배치된 돌 4개를 놓고 시작한다

2. 돌은 반드시 상대방 돌을 양쪽에서 포위하여 뒤집을 수 있는 곳에 놓는다

3. 돌을 뒤집을 곳이 없는 경우에는 차례가 상대방에게 넘어간다

4. 아래와 같은 조건에 의해 양쪽 모두 더이상 돌을 놓을 수 없게되면 게임이 끝난다

    - 36개의 돌 모두가 판에 가득 찬 경우
    - 어느 한쪽이 돌을 모두 뒤집은 경우
    - 한차례에 양쪽 모두 서로 차례를 넘겨야하는 경우

5. 게임이 끝났을때 돌이 많이 있는 플레이어가 승자가 된다. 만일 돌의 개수가 같은 경우는 무승부가 된다


게임 로그의수 1 <= N <= 32 이 주어진다

N줄에 걸쳐 돌을 둔 위치 R, C가 주어진다. 이는 돌을 R행 C열에 놓았다는 의미이다

행은 위부터 순서대로 1, 2, 3, 4, ... 로 번호를 매기며,

열은 순서대로 1, 2, 3, 4 ... 으로 번호를 매긴다

둘 중 한명이 돌을 둘 수 없어 턴을 넘기는 경우가 생기는 게임은 입력으로 주어지지 않는다

입력으로 주어지는 게임 로그는 항상 올바른 게임 로그임이 보장된다

초기 게임판의 형태는 항상 (3, 3), (4, 4)에 백돌 두개가,

(3, 4), (4, 3) 에 흑돌 두개가 올려져 있는 상태이며, 흑돌이 선을 잡는다

[1행 ~ 6행]

행마다 6글자로, 6*6 격자 형태로 게임판의 최종 상태를 출력한다

빈칸은 . / 검은돌은 B / 하얀돌은 W 로 출력한다

[7행]

검은 돌을 잡은 플레이어가 승리했다면 Black 을, 아니라면 White 를 출력한다

비기는 경우는 없다

-----


아주 간단한 문제라고 생각했다

비기는 경우도 없고, 둘 수 없는 위치도 안주어지므로

8개 방향을 순회하며 색이 다른 돌을 만나기 직전까지 다른 색상의 돌들을 뒤집으면 된다고 생각했다

따라서 다음과 같은 로직으로 구현했다

1. 8방향으로 탐색한다

2. 각 방향에서 현재 놓은 돌과 같은 돌을 찾을 떄 까지 진행한다

3. 만약 같은 색의 돌을 찾고, 그 사이에 상대방 돌이 있다면, 상대방 돌을 현재 색으로 쥐집는다

----

진짜 완벽하게 코드를 짰다고 생각했는데, 큰 문제가 있었다.

상대방 돌을 뒤집는걸

```java
if (changeFlag && !arr.isEmpty()) {
    int[] elem = arr.poll();
    board[elem[0]][elem[1]] = cur;
}
```

이렇게 구현한 것이다.

이런 바보같은 실수를 하다니

이렇게 하면 단한개의 돌만 뒤집게되잖아 ? ? ? ? ?? ? 

따라서 if를 `while` 로 수정하고, solve 를 했다.....

슬프다 ...


## 입력
```
6
3 2
4 2
5 3
2 2
2 1
3 5
```

## 출력
```
......
BW....
.BWWW.
.WBW..
..B...
......
White
```


## 코드

```java

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");

        int[][] board = new int[6][6];
        for (int i = 0; i < 6; i ++) {
            for (int j = 0; j < 6; j++) {
                board[i][j] = -1;
            }
        }
        board[2][2] = 0;
        board[2][3] = 1;
        board[3][2] = 1;
        board[3][3] = 0;

        int N = Integer.parseInt(br.readLine());

        for (int i = 0; i < N; i ++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int R = Integer.parseInt(st.nextToken());
            int C = Integer.parseInt(st.nextToken());
            R --;
            C --;
            int cur = i % 2 == 0 ? 1 : 0;
            board[R][C] = cur;
            changeBoard(board, cur, R, C);
        }
        int wCnt = 0;
        int bCnt = 0;
        for (int i = 0 ; i < 6; i ++) {
            for (int j = 0; j < 6; j++) {
                if (board[i][j] == 1) {
                    sb.append("B");
                    bCnt++;
                } else if (board[i][j] == 0) {
                    sb.append("W");
                    wCnt++;
                } else {
                    sb.append(".");
                }
            }
            sb.append("\n");
        }
        sb.append(wCnt < bCnt ? "Black" : "White");
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static void changeBoard (int[][] board, int cur, int R, int C) {
        int[][] directions = {{-1,0},{0,1},{1,0},{0,-1},{-1,-1},{-1,1},{1,1},{1,-1}};

        for (int[] dir : directions) {
            int ni = R + dir[0];
            int nj = C + dir[1];
            boolean changeFlag = false;
            LinkedList<int[]> arr = new LinkedList<>();
            while (0 <= ni && ni < 6 && 0 <= nj && nj < 6) {
                if (board[ni][nj] == -1) {
                    break;
                }
                if (board[ni][nj] != cur) {
                    arr.add(new int[]{ni, nj});
                }
                if (board[ni][nj] == cur) {
                    changeFlag = true;
                    break;
                }
                ni += dir[0];
                nj += dir[1];
            }

            while (changeFlag && !arr.isEmpty()) {
                int[] elem = arr.poll();
                board[elem[0]][elem[1]] = cur;
            }
        }
    }
}
```
