## 문제

https://www.acmicpc.net/problem/11404

## 해설

플로이드 워셜 문제이다

예전에 다른 언어로 했던 경험이 있어 똑같이 구현했는데,

Integer.MAX_VALUE의 연산이 발생했을때 overflow 현상때문에 살짝 수정해주었다.

출력에 살짝 오류가 있어 INF 조건시 0을 출력하도록 해주었다.


## 입력
```txt
5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4
```



## 출력
```txt
0 2 3 1 4
12 0 15 2 5
8 5 0 1 1
10 7 13 0 3
7 4 10 6 0
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

        int N = Integer.parseInt(br.readLine());
        int M = Integer.parseInt(br.readLine());
        int[][] adjList = new int[N+1][N+1];

        for (int i = 0; i < N+1; i ++) {
            for (int j = 0; j < N+1; j++) {
                adjList[i][j] = INF;
            }
        }

        for (int i = 0; i < M; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            int weight = Integer.parseInt(st.nextToken());
            adjList[from][to] = Math.min(adjList[from][to], weight);
        }
        StringBuilder sb = new StringBuilder("");
        int[][] res = floydWarshall(adjList, N);
        for (int i = 1 ; i < N+1; i ++) {
            for (int j = 1; j < N+1; j ++) {
                sb.append(res[i][j] != INF ? res[i][j] : 0);
                if (j < N) {
                    sb.append(" ");
                }
            }
            sb.append("\n");
        }
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int[][] floydWarshall (int[][] adjList , int N) {
        int[][] dp = new int[N+1][N+1];
        for (int i = 0; i < N+1; i ++) {
            for (int j = 0; j < N+1; j++) {
                dp[i][j] = INF;
            }
        }

        for (int i = 1; i < N+1; i ++) {
            for (int j = 1; j < N+1; j++) {
                if (i == j) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = Math.min(dp[i][j], adjList[i][j]);
                }
            }
        }

        for (int k = 1; k < N+1; k++) {
            for (int i = 1; i < N+1; i++) {
                for (int j = 1; j < N+1; j++) {
                    if (dp[i][k] != INF && dp[k][j] != INF) {
                        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
                    }
                }
            }
        }
        return dp;
    }
}
```