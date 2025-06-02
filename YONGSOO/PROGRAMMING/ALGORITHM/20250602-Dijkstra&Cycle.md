## Source
https://www.acmicpc.net/problem/1103  
  
## Commentary

형택이는 1부터 9까지의 숫자와, 구멍이 있는 직사각형 보드에서 재밌는 게임을 한다.  
  
일단 보드의 가장 왼쪽 위에 동전을 하나 올려놓는다. 그다음에 다음과 같이 동전을 움직인다.  
  
동전이 있는 곳에 쓰여 있는 숫자 X를 본다.  
위, 아래, 왼쪽, 오른쪽 방향 중에 한가지를 고른다.  
동전을 위에서 고른 방향으로 X만큼 움직인다. 이때, 중간에 있는 구멍은 무시한다.  
만약 동전이 구멍에 빠지거나, 보드의 바깥으로 나간다면 게임은 종료된다. 형택이는 이 재밌는 게임을 되도록이면 오래 하고 싶다.  
  
보드의 상태가 주어졌을 때, 형택이가 최대 몇 번 동전을 움직일 수 있는지 구하는 프로그램을 작성하시오.  
  
줄에 보드의 세로 크기 N과 가로 크기 M이 주어진다. 이 값은 모두 50보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 보드의 상태가 주어진다. 쓰여 있는 숫자는 1부터 9까지의 자연수 또는 H이다. 가장 왼쪽 위칸은 H가 아니다. H는 구멍이다.  
  
첫째 줄에 문제의 정답을 출력한다. 만약 형택이가 동전을 무한번 움직일 수 있다면 -1을 출력한다.  
  
---  
  
지점 X 와 지점 Y가 서로 갈수있다면, 사이클이다  
  
모든 지점들에 대해 서로 BFS를 하려면 625*10^4 의 시간이 필요하다  

따라서 각 지점이 서로 갈 수 있는지에 대한 사이클을 만들어줄 수 있다

`cycle[ni][nj][cur.ci][cur.cj] && cycle[cur.ci][cur.cj][ni][nj]`

그 뒤에는 우선순위큐를 사용해서 시작지점에서 구멍으로 빠지거나 외부로 빠질 때까지 사용할 수  있는 가장 큰 이동 횟수를 세줄 수 있다

`PriorityQueue<Node> pq = new PriorityQueue<>((a,b)->{return b.curMoveCnt-a.curMoveCnt;});`



## Input

```
3 7  
3942178  
1234567  
9123532  
```

## Output

```
5
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int N, M;  
    static int[][] direction = {{-1,0},{0,1},{1,0},{0,-1}};  
    static int INF = (int) 1e9;  
    static boolean[][][][] cycle;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        N = Integer.parseInt(st.nextToken());  
        M = Integer.parseInt(st.nextToken());  
        int[][] board = new int[N][M];  
        for (int i = 0; i < N; i ++) {  
            String line = br.readLine();  
            for (int j = 0; j < M; j ++) {  
                if (line.charAt(j) == 'H') {  
                    board[i][j] = -1;  
                } else {  
                    board[i][j] = Integer.parseInt(String.valueOf(line.charAt(j)));  
                }  
            }  
        }  
        cycle = new boolean[N][M][N][M];  
        boolean[][] visited = new boolean[N][M];  
        for (int i = 0; i < N; i ++) {  
            for (int j = 0; j < M; j ++) {  
                if (board[i][j] != -1) {  
                    BFS(i, j, board);  
                }  
            }  
        }  
        int ans = dijkstra(board);  
        System.out.println(ans == INF ? -1 : ans);  
        br.close();  
    }  
  
    private static int dijkstra (int[][] board) {  
        PriorityQueue<Node> pq = new PriorityQueue<>((a,b)->{return b.curMoveCnt-a.curMoveCnt;});  
        int[][] distance = new int[N][M];  
        for (int i = 0; i < N; i ++) {  
            Arrays.fill(distance[i], -INF);  
        }  
        pq.add(new Node(0, 0, 0));  
        distance[0][0] = 0;  
        int res = -1;  
        while (!pq.isEmpty()) {  
            Node cur = pq.poll();  
            int weight = board[cur.ci][cur.cj];  
            if (distance[cur.ci][cur.cj] > cur.curMoveCnt) continue;  
            for (int[] dir : direction) {  
                int ni = cur.ci + dir[0] * weight;  
                int nj = cur.cj + dir[1] * weight;  
                if (0 <= ni && ni < N && 0 <= nj && nj < M) {  
                    int nextMoveCnt = cur.curMoveCnt + 1;  
                    if (board[ni][nj] == -1) {  
                        res = Math.max(res, nextMoveCnt);  
                    } else {  
                        if (cycle[ni][nj][cur.ci][cur.cj] && cycle[cur.ci][cur.cj][ni][nj]) {  
                            res = Math.max(res, INF);  
                        } else {  
                            if (distance[ni][nj] < nextMoveCnt) {  
                                pq.add(new Node(ni, nj, nextMoveCnt));  
                                distance[ni][nj] = nextMoveCnt;  
                            }  
                        }  
                    }  
                } else {  
                    res = Math.max(res, cur.curMoveCnt+1);  
                }  
            }  
        }  
        return res;  
    }  
  
    private static void BFS (int ri, int rj, int[][] board) {  
        LinkedList<int[]> queue = new LinkedList<>();  
        boolean[][] visited = new boolean[N][M];  
  
        queue.add(new int[] {ri, rj});  
        visited[ri][rj] = true;  
        while (!queue.isEmpty()) {  
            int[] cur = queue.poll();  
            int weight = board[cur[0]][cur[1]];  
            for (int[] dir : direction) {  
                int ni = cur[0] + dir[0]*weight;  
                int nj = cur[1] + dir[1]*weight;  
                if (0 <= ni & ni < N && 0 <= nj && nj < M) {  
                    if (board[ni][nj] == -1) continue;  
                    if (!visited[ni][nj]) {  
                        visited[ni][nj] = true;  
                        cycle[ri][rj][ni][nj] = true;  
                        queue.add(new int[]{ni, nj});  
                    }  
                }  
            }  
        }  
    }  
  
    private static class Node {  
        int ci;  
        int cj;  
        int curMoveCnt;  
        private Node (int ci, int cj, int curMoveCnt) {  
            this.ci = ci;  
            this.cj = cj;  
            this.curMoveCnt = curMoveCnt;  
        }  
    }  
}  
```
