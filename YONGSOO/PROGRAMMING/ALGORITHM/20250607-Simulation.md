## Source

https://www.acmicpc.net/problem/17143  
  
## Commentary

낚시왕이 상어 낚시를 하는 곳은 R X C의 격자판이다  
  
낚시왕은 처음에 1번 열의 한칸 왼쪽에 있다  
  
낚시왕이 가장 오른쪽 열의 오른쪽칸에 이동하면 이동을 멈춘다  
  
다음은 1초 동안 일어나는 일이다  
  
  
1. 낚시왕이 한칸 오른쪽으로 이동한다  
  
2. 낚시왕이 있는 열에 있는 상어중 가장 가까운 상어를 잡는다. 상어를 잡으면 격자판에서 잡은 상어가 사라진다  
  
3. 상어가 이동한다  
  
상어는 입력으로 주어진 속도로 이동하고, 속도의 단위는 칸 / 초 이다  
  
상어가 이동하려고 하는 칸이 격자판의 경계를넘는 경우 방향을 바꿔서 속력을 유지한채 이동한다  
  
낚시왕이 상어 낚시를 하는 상태가 주어졌을때, 잡은 상어 크기의 합은 ?  
  
---  
  
격자판의 크기 R, C와 상어의 수 M이 주어진다  
  
M개의 줄에 상어의 정보가 주어진다  
  
상어의 정보는 다섯 정수 r, c, s, d, z로 이루어져있다  
  
r, c 는 상어의 위치  
  
s 는 속력  
  
d 는 이동 방향  
  
z 는 크기이다  
  
d가 1인 경우는 위, 2는 아래, 3인 경우는 오른쪽, 4인 경우는 왼쪽을 의미한다  
  
상어가 이동을 마친 후에 한칸에 상어가 두마리 이상 있는 경우 크기가 작은 상어는 사라진다  
  
  
---  
  
낚시왕이 잡은 상어 크기의 합을 출력하라  

정말 문자 그대로 구현문제다

턴별로 낚시왕이 상어를 잡게하고

상어가 움직이게 하면 된다

주의할 점은 상어를 1칸씩 이동하도록 구현할 경우 시간초과가 날 수 있으므로

s를 잔여 칸 이동 횟수로 간주한다. (칸 / 초) 이기 때문이다.

격자 밖에 나가지 않는 경우 그냥 이동시키고

격자 밖에 나가는 경우 벽에 부딪히게 만들어준다
- 벽에 부딪힌 경우 방향을 반대로 바꾸어준다
- 잔여 움직임 횟수가 남을때까지 계속해서 반복한다

```java
while (s > 0) {  
            if (0 <= ni + di * s && ni + di * s < R && 0 <= nj + dj * s && nj + dj * s < C) {  
                ni += di*s;  
                nj += dj*s;  
                s -= s;  
            } else {  
                if (ni + di * s < 0) {  
                    int diff = ni;  
                    s -= diff;  
                    d = reverse[d];  
                    di = direction.get(d)[0];  
                    dj = direction.get(d)[1];  
                    ni = 0;  
                } else if (ni + di * s >= R) {  
                    int diff = R - ni - 1;  
                    s -= diff;  
                    d = reverse[d];  
                    di = direction.get(d)[0];  
                    dj = direction.get(d)[1];  
                    ni = R-1;  
                } else if (nj + dj * s < 0) {  
                    int diff = nj;  
                    s -= diff;  
                    d = reverse[d];  
                    di = direction.get(d)[0];  
                    dj = direction.get(d)[1];  
                    nj = 0;  
                } else if (nj + dj * s >= C ) {  
                    int diff = C - nj - 1;  
                    s -= diff;  
                    d = reverse[d];  
                    di = direction.get(d)[0];  
                    dj = direction.get(d)[1];  
                    nj = C-1;  
                }  
            }  
        }  
```
## Input

```
4 6 8  
4 1 3 3 8  
1 3 5 2 9  
2 4 8 4 1  
4 5 0 1 4  
3 3 1 2 7  
1 5 8 4 3  
3 6 2 1 2  
2 2 2 3 5  
```

## Output

```
22
```
  

## Source Code

```java

import java.io.*;
import java.util.*;

public class Main {
    static int[][] direction = {{},{-1,0},{1,0},{0,1},{0,-1}};
    static int R, C;
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        Shark[][] fishField = new Shark[R][C];
        for (int i = 0; i < M; i ++) {
            st = new StringTokenizer(br.readLine());
            int r = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());
            int s = Integer.parseInt(st.nextToken());
            int d = Integer.parseInt(st.nextToken());
            int z = Integer.parseInt(st.nextToken());
            r --;
            c --;
            fishField[r][c] = new Shark(r, c, s, d, z);
        }
        int hunter = -1;
        int ans = 0;
        while (hunter+1 < C) {
            hunter ++; // 낚시왕이 오른쪽으로 한칸 이동한다
            ans += killShark(fishField, hunter); // 낚시왕이 열에있는 상어중에서 땅과 가장 가까운 상어를 잡는다
            moveShark(fishField); // 상어가 이동한다
        }
        System.out.println(ans);
        br.close();
    }

    private static int killShark (Shark[][] fishField, int hunter) {
        for (int i = 0; i < R; i++) {
            if (fishField[i][hunter] != null) {
                int size = fishField[i][hunter].z;
                fishField[i][hunter] = null; // 상어는 사라진다
                return size;
            }
        }
        return 0;
    }

    private static int[] getSharkPos (int row, int col, int d, int s) {

        int ni = row;
        int nj = col;
        int di = direction[d][0];
        int dj = direction[d][1];
        int[] reverse = {0, 2, 1, 4, 3};
        while (s > 0) {
            if (0 <= ni + di * s && ni + di * s < R && 0 <= nj + dj * s && nj + dj * s < C) {
                ni += di*s;
                nj += dj*s;
                s -= s;
            } else {
                if (ni + di * s < 0) {
                    s -= ni;
                    ni = 0;
                } else if (ni + di * s >= R) {
                    s -= R - ni - 1;
                    ni = R-1;
                } else if (nj + dj * s < 0) {
                    s -= nj;
                    nj = 0;
                } else if (nj + dj * s >= C ) {
                    s -= C - nj - 1;
                    nj = C-1;
                }
                d = reverse[d];
                di = direction[d][0];
                dj = direction[d][1];
            }
        }
        return new int[] {ni, nj, d};

    }

    private static void moveShark (Shark[][] fishField) {
        PriorityQueue<Shark> pq = new PriorityQueue<>((a,b)->{return b.z - a.z;});

        for (int i = 0; i < R; i ++) {
            for (int j = 0; j < C; j++) {
                if (fishField[i][j] != null) {
                    int d = fishField[i][j].d;
                    int s = fishField[i][j].s;
                    int z = fishField[i][j].z;
                    int[] pos = getSharkPos(i, j, d, s);
                    pq.add(new Shark(pos[0], pos[1], s, pos[2], z));
                }
            }
        }
        Shark[][] nextFishField = new Shark[R][C];
        while (!pq.isEmpty()) {
            Shark cur = pq.poll();
            if (nextFishField[cur.r][cur.c] == null) {
                nextFishField[cur.r][cur.c] = cur;
            }
        }
        for (int i = 0; i < R; i ++) {
            for (int j = 0; j < C; j++) {
                fishField[i][j] = nextFishField[i][j];
            }
        }
    }

    private static class Shark {
        int r;
        int c;
        int s;
        int d;
        int z;
        private Shark (int r, int c, int s, int d, int z) {
            this.r = r;
            this.c = c;
            this.s = s;
            this.d = d;
            this.z = z;
        }

    }
}
```
