## Source

https://www.acmicpc.net/problem/1888  
  

## Commentary

곰팡이들은 현재 여러개의 덩어리를 이루고있는 상태인데,  
  
이들이 점점 자라나서 한덩어리로 될때까지 얼마의 시간이 걸릴지 알고자 한다  
  
곰팡이가 핀 벽은 M행, N열의 격자로 나뉘어 있고, 한칸당 한개의 곰팡이가 있다.  
  
곰팡이의 덩어리라는 것은, 격자 상에 가로 세로로 인접한 곰팡이들의 집합을 말한다.  
  
맨 처음 상태에서는 한덩어리 안의 곰팡이들이 모두 같은 종으로, 자라는 속도도 같다  
  
그러나 서로 다른 덩어리에 속한 곰팡이는 종이 달라 자라는 속도가 다를 수 있다.  
  
또 시간이 지남에 따라 서로 다른 곰팡이 덩어리가 한 덩어리로 합쳐지는 경우도 있을 수 있다  
  
어느 곰팡이의 자라는 속도가 K라면, 하루가 지났을때 그 곰팡이가 피어있던 자리를 중심으로  
  
2K+1 행, 2K+1 열의 격자에 같은 종의 곰팡이가 번진다는 의미다  
  
서로 다른 좀의 곰팡이가 같은 칸에 번져오면, 자라는 속도가 빠른 곰팡이가 그 칸을 차지한다.  
  
---  
  
곰팡이가 피어있는 벽의 크기를 나타내는 두 정수 M, N이 주어진다.  
  
(1 <= M, N <= 100)  
  
벽의 상황이 한줄에 한 행씩 주어진다  
  
곰팡이가 피어있는 곳은 그 곰팡이의 자라는 속도로, 그렇지 않는 곳은 0으로 표시된다  
  
자라는 속도는 1이상 5 이하의 정수이다  
  
각 숫자 사이에는 빈칸이 없다  
  
---  
  
2차원 배열의 Union-Find 문제다  

N * M 이 10^4 이고 K가 최대 5이므로,  
  
날짜별로 곰팡이의 상태를 기록하며 모든 곰팡이가 연결될때까지 while 문을 반복하더라도,  
  
곰팡이 번식을 하는 것에 하루 최대 25만의 연산이 들어가지만, 시간 복잡도가 아무리해도 1억을 넘길 수 없을 것이다. 

이 문제의 핵심은 Union의 타이밍이다.

1. 번식하기 전에, 인접한 곰팡이들을 Union 한다.
2. 곰팡이를 번식시킨다.
3. 다음날로 넘어간다.

만약, 인접한 곰팡이들을 Union하지 않고 번식시키는 과정에서 Union한다면, 반례가 생긴다

예컨대,

```
4 4
1001
0000
0000
1001
```

과 같은 경우에 정답은 1이지만, 2가 출력될 수 있다.

이 점만 주의한다면, 충분히 무난히 풀 수 있을 것이다.

그 외에 주의할 점은, 곰팡이 번식을 순회하는 동시에 하는 것이 아닌, 배열을 따로 두어 최대 값을 갱신하며 저장하고, 순회가 끝난 후, 기존 배열에 다시 할당하는 방법으로 해야 꼬이지 않는다는 점이다.


## Input

```
5 15  
002000000000011  
022000000011111  
020000000010000  
000000011110111  
000000011110111  
```
## Output

```
2
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
        int N = Integer.parseInt(st.nextToken()), M = Integer.parseInt(st.nextToken());  
        int[][] board = new int[N][M];  
        for (int i = 0; i < N; i ++) {  
            String line = br.readLine();  
            for (int j = 0; j < M; j ++) {  
                board[i][j] = Integer.parseInt(String.valueOf(line.charAt(j)));  
            }  
        }  
        int day = 0;  
        int[] parents = new int[N*M+1];  
        for (int i = 0; i < N; i ++) {  
            for (int j = 0; j < M; j ++) {  
                parents[i*M+j] = i*M+j;  
            }  
        }  
        // Initializing  
        int[][] directions = {{-1,0},{0,1},{1,0},{0,-1}};  
        while (true) {  
            for (int i = 0; i < N; i ++) {  
                for (int j = 0; j < M; j ++) {  
                    if (board[i][j] != 0) {  
                        for (int[] dir : directions) {  
                            int ni = i + dir[0];  
                            int nj = j + dir[1];  
                            if (0 <= ni && ni < N && 0 <= nj && nj < M) {  
                                if (board[ni][nj] != 0) {  
                                    if (find(i*M+j, parents) != find(ni*M+nj, parents)) {  
                                        union(i*M+j, ni*M+nj, parents);  
                                    }  
                                }  
                            }  
                        }  
                    }  
                }  
            }  
            HashSet<Integer> hs = new HashSet<>();  
            for (int i = 0; i < N; i ++) {  
                for (int j = 0; j < M; j ++) {  
                    if (board[i][j] != 0) {  
                        hs.add(find(i*M+j, parents));  
                    }  
                }  
            }  
            if (hs.size() <= 1) {  
                break;  
            }  
            int[][] nextBoard = new int[N][M];  
            for (int i = 0; i < N; i ++) {  
                for (int j = 0; j < M; j ++) {  
                    int K = board[i][j];  
                    for (int ni = i - K; ni <= i + K; ni ++) {  
                        for (int nj = j - K; nj <= j + K; nj++) {  
                            if (0 <= ni && ni < N && 0 <= nj && nj < M) {  
                                nextBoard[ni][nj] = Math.max(Math.max(board[i][j], board[ni][nj]), nextBoard[ni][nj]);  
                            }  
                        }  
                    }  
                }  
            }  
            for (int i = 0; i < N; i ++) {  
                for (int j = 0; j < M; j ++) {  
                    board[i][j] = nextBoard[i][j];  
                }  
            }  
            day ++;  
        }  
        System.out.print(day);  
        bw.close();  
        br.close();  
    }  
    public static int find (int x, int[] parents) {  
        if (parents[x] == x) return parents[x];  
        return parents[x] = find(parents[x], parents);  
    }  
  
    public static void union (int x, int y, int[] parents) {  
        int X = find(x, parents);  
        int Y = find(y, parents);  
        if (X != Y) {  
            parents[X] = Y;  
        }  
    }  
}
  
/*  
3 3  
100  
000  
001  
// 1  
  
3 3  
111  
000  
000  
// 0  
  
4 4  
2000  
0000  
0000  
0001  
// 1  
  
4 4  
1001  
0000  
0000  
1001  
// 1  
* */
```
  
