## Source 

https://www.acmicpc.net/problem/3193

## Commentary


게임판의 크기 1 <= N <= 10^3, 1 <= K <= 5 * 10^6이 주어진다

N개의 줄에 게임판의 초기 상태가 주어진다

여기서 '.'은 빈사각형 , 'X' 는 벽, 'L'은 공의 초기 위치를 의미한다

K개의 줄에 각 단계에서의 회전 방향을 나타내는 L 또는 D가 주어진다

L은 시계 반대방향, D는 시계방향을 의미한다

주어진 K번의 회전을 순서대로 마친 후의 게임판 상태를 N개의 줄에 걸쳐서 출력한다

-----

언뜻보면 브루트포스 문제처럼 보인다

그런데 K가 5 * 10^6 라고 할때 괜찮은가 ?

단순 인덱스 이동이라 하면, 괜찮지 않을까 ?

시계 방향을 회전시키고, 역방향으로 회전시키는것만 잘 하면 수월하게 할 수 있지 않을까 ?

너무 단순한 문젠데 ?

----

라고 생각했었는데

생각해보니 K가 5 * 10^6이라는걸 간과했다

매번 회전을 직접 시키면 절대 안된다

로직은 다음과 같다

1. 중력 방향
    - 전역변수 gravity가 중력 방향을 결정한다. directions로 상우하좌 네방향을 정의한다

2. 회전 및 중력 시뮬레이션
    - K번의 명령을 수행하며 각 명령은 L (반시계방향), 또는 D (시계방향) 회전이다.
    - 회전이 일어날때마다 중력 방향이 변경되고, 공이 새로운 중력 방향에 따라 이동한다

3. 회전 메서드
    - clockWise : 게임 보드를 시계방향으로 90도 회전시킨다
    - antiClockWise : 게임보드를 반시계방향으로 90도 회전시킨다

4. 중력 시뮬레이션
    - gravitation 메서드는 현재 중력 방향에 따라 공을 가능한 멀리 움직인다
    - 공은 빈공간으로만 이동할 수 있다.

-----

- 회전 처리
    - K번의 명령을 처리하며, 각 회전마다,
        - 회전 방향에 따라 clockState 값을 증가 / 감소 시킨다
        - 회전 후 새로운 중력 방향에 따라 공을 이동시킨다
- 최종 상태 계산
    - 모든 명령이 끝난 후 clockState에 따라 게임 보드의 최종 방향으로 회전시킨다

- 중력 구현 세부 사항
    - 중력 방향을 바꾸는 것으로 공을 이동시켰다


## Input

```
6 2
....XX
X.....
......
..L...
.XXX..
......
L
D
```

## Output
```
....XX
X.....
......
......
.XXX..
L.....
```

## Source Code

```java

import java.io.*;
import java.util.*;

public class Main {
    public static int gravity = 2;
    public static int[][] directions = {{-1, 0},{0, 1},{1, 0},{0, -1}};
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken()), K = Integer.parseInt(st.nextToken());
        char[][] gameBoard = new char[N][N];
        for (int i = 0; i < N; i ++) {
            String line = br.readLine();
            for (int j = 0; j < N; j ++) {
                gameBoard[i][j] = line.charAt(j);
            }
        }
        char[][] nextBoard = new char[N][N];
        int[] ball = new int[2];
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                if (gameBoard[i][j] == 'L') {
                    ball[0] = i;
                    ball[1] = j;
                }
            }
        }

        int clockState = 0;
        while (K-- > 0) {
            String line = br.readLine();
            if (line.charAt(0) == 'L') {
                clockState --;
                gravitation(gameBoard, N, ball, true);

            } else {
                clockState ++;
                gravitation(gameBoard, N, ball, false);

            }
        }

        clockState = clockState % 4;
        while (clockState < 0) {
            clockState ++;
            clockWise(gameBoard, nextBoard, N);
        }
        while (clockState > 0) {
            clockState --;
            antiClockWise(gameBoard, nextBoard, N);
        }
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                sb.append(gameBoard[i][j]);
            }
            sb.append("\n");
        }
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }


    public static void clockWise (char[][] gameBoard, char[][] nextBoard, int N) {

        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                nextBoard[i][j] = gameBoard[j][N-1-i];
            }
        }

        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                gameBoard[i][j] = nextBoard[i][j];
            }
        }
    }


    public static void antiClockWise (char[][] gameBoard, char[][] nextBoard, int N) {
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                nextBoard[i][j] = gameBoard[N-1-j][i];
            }
        }

        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                gameBoard[i][j] = nextBoard[i][j];
            }
        }
    }

    public static void gravitation (char[][] gameBoard, int N, int[] ball, boolean clockWise) {
        int ci = ball[0];
        int cj = ball[1];
        gravity = clockWise ? (gravity + 1) % 4 : (gravity - 1 + 4) % 4;
        int[] dir = directions[gravity];
        while (0 <= ci + dir[0] && ci + dir[0] < N && 0 <= cj + dir[1] && cj + dir[1] < N) {
            int ni = ci + dir[0];
            int nj = cj + dir[1];
            if (gameBoard[ni][nj] == '.') {
                ci = ni;
                cj = nj;
            } else {
                break;
            }
        }

        gameBoard[ball[0]][ball[1]] = '.';
        ball[0] = ci;
        ball[1] = cj;
        gameBoard[ball[0]][ball[1]] = 'L';

    }
}

```