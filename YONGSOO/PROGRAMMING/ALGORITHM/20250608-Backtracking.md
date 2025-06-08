## Source

https://www.acmicpc.net/problem/1799  
  
## Commentary

비숍은 대각선으로 움직여 다른 말을 잡을 수 있다  
  
서로가 서로를 잡을 수 없는 위치에 놓을 수 있는 비숍의 최대 개수를 구하라  
  
---  
  
체스판의 크기가 주어진다  
  
체스판의 각 칸에 비숍을 놓을 수 있는지 없는지에 대한 정보가 체스판 한줄 단위로 한줄씩 주어진다  
  
비숍을 놓을 수 있는 곳에는 1, 없는 곳에는 0이 주어진다  
  
---  
  
백트래킹 문제다  
  
흑과 백은 서로 관여할 수 없기 때문에, 

흑과 백 각각 따로 백트래킹 해주면 된다  (시간 복잡도를 최적화 할 수 있다)
  
  
## Input

```
5  
1 1 0 1 1  
0 1 0 0 0  
1 0 1 0 1  
1 0 0 0 0  
1 0 1 1 1  
```

## Output

```
7
```
  

## Source Code

```java

import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int[][] direction = {{-1,-1},{-1,1},{1,1},{1,-1}};  
    static boolean[][] visited;  
    static int N;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        N = Integer.parseInt(br.readLine());  
        int[][] chess = new int[N][N];  
        for (int i = 0; i < N; i ++) {  
            StringTokenizer st = new StringTokenizer(br.readLine());  
            for (int j = 0; j < N; j ++) {  
                chess[i][j] = Integer.parseInt(st.nextToken());  
            }  
        }  
        visited = new boolean[N][N];  
        int black = dfs(chess, 0, 0, 0, true);  
        int white = dfs(chess, 0, 0, 1, false);  
        System.out.println(black+white);  
        br.close();  
    }  
  
    private static int getCol (boolean isBlack, int row) {  
        if (row % 2 == 0) {  
            // 홀수열일때  
            if (isBlack) {  
                return 0;  
            }  
            return 1;  
        } else {  
            // 짝수열일때  
            if (isBlack) {  
                return 1;  
            }  
            return 0;  
        }  
    }  
  
    private static int dfs (int[][] chess, int cnt, int row, int col, boolean isBlack) {  
        if (!(0 <= row && row < N && 0 <= col && col < N)) return cnt;  
        int res = cnt;  
        if (chess[row][col] == 0) {  
            if (col+2 < N) {  
                res = Math.max(res, dfs(chess, cnt, row, col+2, isBlack));  
            } else if (row+1 < N) {  
                res = Math.max(res, dfs(chess, cnt, row+1, getCol(isBlack, row+1), isBlack));  
            }  
        } else {  
            if (col+2 < N) {  
                if (backtracking(row, col)) {  
                    visited[row][col] = true;  
                    res = Math.max(res, dfs(chess, cnt+1, row, col+2, isBlack));  
                    visited[row][col] = false;  
                }  
                res = Math.max(res, dfs(chess, cnt, row, col+2, isBlack));  
            } else if (row+1 < N) {  
                if (backtracking(row, col)) {  
                    visited[row][col] = true;  
                    res = Math.max(res, dfs(chess, cnt+1, row+1, getCol(isBlack, row+1), isBlack));  
                    visited[row][col] = false;  
                }  
                res = Math.max(res, dfs(chess, cnt, row+1, getCol(isBlack, row+1), isBlack));  
            } else {  
                if (backtracking(row, col)) {  
                    res = Math.max(res, cnt+1);  
                }  
            }  
        }  
        return res;  
    }  
  
    private static boolean backtracking (int row, int col) {  
        for (int[] dir : direction) {  
            int ni = row;  
            int nj = col;  
            while (0 <= ni+dir[0] && ni + dir[0] < N && 0 <= nj + dir[1] && nj + dir[1] < N) {  
                ni += dir[0];  
                nj += dir[1];  
                if (visited[ni][nj]) return false;  
            }  
        }  
        return true;  
    }  
}  
```
