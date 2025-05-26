## Source

https://www.acmicpc.net/problem/6987  
  
## Commentary
  
월드컵 조별 최종 예선에서는 6개국으로 구성된 각 조별로  
  
동일한 조에 소속된 국가들과 한번씩 각 국가별로 5번의 경기를 치른다  
  
조별리그가 끝난 후 기자가 보낸 각 나라의 승 무 패의 수가 가능한 결과인지 판별하려 한다  
  
첫째줄부터 넷째줄까지 각 줄마다 6개국 결과가 나라별로 승, 무, 패 순서로 빈칸을 하나 사이에두고 18개의 숫자로 주어진다  
  
승 무 패의 수는 0이상 6이하이다  
  
입력에서 주어진 네가지 결과에 대하여 가능한 결과는 1, 불가능한 결과는 0을 빈칸에 하나 사이에 두고 출력한다  
  
---  

6팀이 한조에서 서로 한번씩 경기를 한다.

각 팀은 총 5경기를 치르게 되고, 전체경기는 15경기가 열린다

각 팀의 승 - 무 - 패 결과가 주어졌을때, 이것이 가능한 결과인지 확인해야한다

핵심 포인트는 다음과 같다

1. 완전탐색 : 15경기의 모든 가능한 결과 조합을 시도
2. 백트래킹 : 불가능한 경우 이전 상태로 돌아가서 다른 경우 시도

## Input

```
5 0 0 3 0 2 2 0 3 0 0 5 4 0 1 1 0 4  
4 1 0 3 0 2 4 1 0 1 1 3 0 0 5 1 1 3  
5 0 0 4 0 1 2 2 1 2 0 3 1 0 4 0 0 5  
5 0 0 3 1 1 2 1 2 2 0 3 0 0 5 1 0 4  
```

## Output

```
1 1 0 0  
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int TC = 4;  
    static int N = 6;  
    static int M = 3;  
    static int[] cnt = {0, 0, 0};  
    static boolean res = false;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        StringBuilder sb = new StringBuilder("");  
        while (TC-- > 0) {  
            StringTokenizer st = new StringTokenizer(br.readLine());  
            int[][] gameResult = new int[N][M];  
            for (int i = 0; i < N; i ++) {  
                for (int j = 0; j < M; j ++) {  
                    gameResult[i][j] = Integer.parseInt(st.nextToken());  
                }  
            }  
            int[][] match = new int[15][2];  
            int idx = 0;  
            for (int i = 0; i < 5; i ++) {  
                for (int j = i+1; j < 6; j++) {  
                    match[idx][0] = i;  
                    match[idx][1] = j;  
                    idx++;  
                }  
            }  
            res = false;  
            dfs(0, match, gameResult);  
            sb.append(res ? 1 : 0).append(" ");  
        }  
        System.out.print(sb.toString().trim());  
        br.close();  
    }  
    public static boolean isValid (int[][] gameResult) {  
        for (int i = 0; i < 6; i ++) {  
            for (int j = 0; j < 3; j++) {  
                if (gameResult[i][j] != 0) return false;  
            }  
        }  
        return true;  
    }  
    public static void dfs (int depth, int[][] match, int[][] gameResult)  {  
        if (depth == 15) {  
            if (isValid(gameResult)) res = true;  
            return;  
        }  
        int t1 = match[depth][0];  
        int t2 = match[depth][1];  
  
        if (gameResult[t1][0] > 0 && gameResult[t2][2] > 0) {  
            gameResult[t1][0] --;  
            gameResult[t2][2] --;  
            dfs(depth+1, match, gameResult);  
            gameResult[t1][0] ++;  
            gameResult[t2][2] ++;  
        }  
  
        if (gameResult[t1][1] > 0 && gameResult[t2][1] > 0) {  
            gameResult[t1][1] --;  
            gameResult[t2][1] --;  
            dfs(depth+1, match, gameResult);  
            gameResult[t1][1] ++;  
            gameResult[t2][1] ++;  
        }  
  
        if (gameResult[t1][2] > 0 && gameResult[t2][0] > 0) {  
            gameResult[t1][2] --;  
            gameResult[t2][0] --;  
            dfs(depth+1, match, gameResult);  
            gameResult[t1][2] ++;  
            gameResult[t2][0] ++;  
        }  
    }  
}  

```
