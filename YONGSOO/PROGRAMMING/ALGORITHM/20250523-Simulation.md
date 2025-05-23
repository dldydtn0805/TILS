## Source

https://www.acmicpc.net/problem/21609  
  
## Commentary


이 게임은 격자에서 진행되고, 초기의 격자에 모든 칸에는 블록이 하나씩 들어있고,  
  
블록은 검은색 블록, 무지개 블록, 일반 블록이 있다  
  
일반 블록은 M가지 색상이 있고, 색은 M 이하의 자연수로 표현한다  
  
검은색 블록은 -1, 무지개 블록은 0이다  
  
블록 그룹은 연결된 블록의 집합이다  
  
그룹에는 일반 블록이 적어도 하나는 있어야하며, 일반 블록의 색은 모두 같아야 한다  
  
검은색 블록은 포함되면 안되고, 무지개블록은 얼마나 있든 상관없다  
  
그룹에 속한 블록의 개수는 2보다 크거나 같다.  
  
임의의 한 블록에서 그룹에 속한 인접한 칸으로 이동해서 그룹에 속한 다른 모든 칸으로 이동할 수 있어야한다  
  
블록 그룹의 기준 블록은 무지개 블록이 아닌 블록 중에서 행의 번호가 가장 작은 블록,  
  
그러한 블록이 여러개면 열의 번호가 가장 작은 블록이다  
  
오토 플레이 기능을 만들고자 한다  
  
1. 크기가 가장 큰 블록 그룹을 찾는다. 그러한 블록 그룹이 여러개면 포함된 무지개 블록의 수가 가장 많은 블록 그룹, 그러한 블록도 여러개라면 기준 블록의 행이 가장 큰것, 그것도 여러개라면 열이 가장 큰 것을 찾는다  
  
2. 1에서 찾은 블록 그룹의 모든 블록을 제거한다. 블록 그룹에 포함된 블록의 수를 B라고 했을떄, B^2점을 획득한다  
  
3. 격자에 중력이 작용한다  
  
4. 격자가 90도 반시계 방향으로 회전한다  
  
5.  다시 격자에 중력이 작용한다  
  
격자에 중력이 작용하면 검은색 블록을 제외한 모든 블록이 행의 번호가 큰 칸으로 이동한다.  
  
이동은 다른 블록이나 격자의 경계를 만나기 전까지 계속된다  
  
  
  
한변의 격자 크기 N, 색상의 개수 M이 주어진다  
  
N개의 줄에 격자의 칸에 들어있는 블록의 정보가 1번부터 N번 행까지 순서대로 주어진다  
  
각 행에 대한 정보는 1열부터 N 열까지 주어진다  
  
입력으로 주어지는 칸의 정보는 -1, 0, M 이하의 자연수로만 이루어진다  
  
획득한 점수의 합을 출력하라  
  
(1 <= N <= 20)  
  
(1 <= M <= 5)  
  
  
---  
  
구현 문제다  
  
1. 가장 크기가 큰 그룹을 찾는다 
  
2. 큰 그룹을 삭제한다  
  
3. 중력 발생  
  
4. 반시계 방향으로 돌린다  
  
5. 중력 발생  
  
위 행동을 더이상 그룹이 없을때까지 반복한다.  
  
---  
  
간단히 말하면 메서드 네개만 만들면 끝나는 문제다  
  
1. 그룹의 크기를 반환하는 BFS 메서드  
    - 블록 그룹 크기와 그룹의 무지개 블록 개수를 같이 반환하자  
 
2. BFS 함수를 받아 가장 큰 그룹을 찾는 메서드  
    - 단, 그룹 크기가 같다면, 무지개 블록이 가장 많아야하고, 무지개블록마저 같다면, 기준블록의 행, 열이 가장 커야한다.  
  
3. 반시계 방향으로 돌리는 메서드  
    - `next[N-1-j][i] = cur[i][j]` 임을 확인하자  
4. 중력을 발생시키는 메서드  
    - 아래에서부터 빈공간이 났을 경우 차근차근 채워주자  
  
  
## Input

```
5 3  
2 2 -1 3 1  
3 3 2 0 -1  
0 0 0 1 2  
-1 3 1 3 2  
0 3 2 2 1  
```

## Output

```
77
```

## Source Code

```java
import java.io.*;
import java.util.*;

public class Main {
    static int N, M;
    static int score = 0;
    static int[][] directions = {{-1,0},{0,1},{1,0},{0,-1}};
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        int[][] board = new int[N][N];

        for (int i = 0; i < N; i ++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j ++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        while (true) {
            int[] cur = getGroup(board);
            if (cur[0] == -1) break;
            deleteGroup(board, cur[0], cur[1]);
            gravity(board);
            reverseClock(board);
            gravity(board);
        }
        System.out.print(score);
        br.close();
    }

    public static String beautifulPrint(int[][] board) {
        StringBuilder sb = new StringBuilder("");
        for (int i = 0; i < N; i ++) {
            sb.append(Arrays.toString(board[i])).append("\n");
        }
        return sb.toString();
    }

    public static void reverseClock (int[][] board) {
        int[][] nextBoard = new int[N][N];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j ++) {
                nextBoard[N-1-j][i] = board[i][j];
            }
        }
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j ++) {
                board[i][j] = nextBoard[i][j];
            }
        }
    }

    public static void gravity (int[][] board) {
        for (int i = N-2; i >= 0; i --) {
            for (int j = N-1; j >= 0; j --) {
                if (board[i][j] != -1 && board[i][j] != -2) {
                    int ci = i;
                    while (ci+1 < N && board[ci+1][j] == -2) {
                        ci ++;
                    }
                    if (ci != i && ci < N) {
                        board[ci][j] = board[i][j];
                        board[i][j] = -2;
                    }
                }
            }
        }
    }

    public static void deleteGroup (int[][] board, int si, int sj) {
        LinkedList<int[]> queue = new LinkedList<>();
        queue.add(new int[]{si, sj});
        int[][] visited = new int[N][N];
        visited[si][sj] = board[si][sj];
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            for (int[] dir : directions) {
                int ni = cur[0] + dir[0], nj = cur[1] + dir[1];
                if (0 <= ni && ni < N && 0 <= nj && nj < N) {
                    if (visited[ni][nj] == 0) {
                        if (board[ni][nj] == board[si][sj] || board[ni][nj] == 0) {
                            queue.add(new int[]{ni, nj});
                            visited[ni][nj] = board[si][sj];
                        }
                    }
                }
            }
        }
        int cnt = 0;
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                if (visited[i][j] != 0) {
                    board[i][j] = -2; // -2 : emptySpace
                    cnt ++;
                }
            }
        }
        score += cnt*cnt;
    }

    public static int[] getGroup (int[][] board) {
        int gi = -1, gj = -1;
        int groupSize = 0;
        int rainbowCnt = 0;
        boolean[][] baseVisited = new boolean[N][N];
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                if (board[i][j] > 0 && !baseVisited[i][j]) {
                    int[] cur = divideGroup(baseVisited, board, i, j);
                    if (cur[0] >= 2) {
                        if (groupSize < cur[0]) {
                            groupSize = cur[0];
                            rainbowCnt = cur[1];
                            gi = i;
                            gj = j;
                        } else if (groupSize == cur[0]) {
                            if (rainbowCnt < cur[1]) {
                                rainbowCnt = cur[1];
                                gi = i;
                                gj = j;
                            } else if (rainbowCnt == cur[1]) {
                                gi = i;
                                gj = j;
                            }
                        }
                    }
                }
            }
        }
        return new int[]{gi, gj};
    }

    public static int[] divideGroup (boolean[][] baseVisited, int[][] board, int si, int sj) {
        LinkedList<int[]> queue = new LinkedList<>();
        queue.add(new int[]{si, sj});
        baseVisited[si][sj] = true;
        int[][] visited = new int[N][N];
        visited[si][sj] = board[si][sj];
        int rainbowCnt = 0;
        int curGroupSize = 1;
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            for (int[] dir : directions) {
                int ni = cur[0] + dir[0], nj = cur[1] + dir[1];
                if (0 <= ni && ni < N && 0 <= nj && nj < N) {
                    if (visited[ni][nj] == 0) {
                        if (board[ni][nj] == board[si][sj] || board[ni][nj] == 0) {
                            queue.add(new int[]{ni, nj});
                            visited[ni][nj] = board[si][sj];
                            baseVisited[ni][nj] = true;
                            rainbowCnt += board[ni][nj] == 0 ? 1 : 0;
                            curGroupSize++;
                        }
                    }
                }
            }
        }
        return new int[]{curGroupSize, rainbowCnt};
    }

}
```
