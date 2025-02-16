```java
// https://www.acmicpc.net/problem/23057

/*해설
모든 카드에 적힌 수의 합을 M이라고 할 때
1부터 M까지의 자연 수 중에서,

카드의 적힌 수들의 합으로 만들 수 없는 수의 개수는?


*/

/*입력
3
1 2 3
*/

/*출력
0
*/

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        long totalCnt = 0L;
        long[] cards = new long[N];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            cards[i] = Long.parseLong(st.nextToken());
            totalCnt += cards[i];
        }
        HashSet<Long> sumValues = new HashSet<>();
        boolean[] visited = new boolean[N];
        for (int i = 0; i < N; i++) {
            backtracking(i, N, visited, 0L, cards, sumValues);
        }
//        System.out.println(sumValues);
        bw.write(String.valueOf(totalCnt-(long) sumValues.size()));
        bw.close();
        br.close();
    }

    public static void backtracking (int idx, int N, boolean[] visited, long sum, long[] cards, HashSet<Long> sumValues) {
        for (int i = idx; i < N; i ++) {
            if (!visited[i]) {
                sumValues.add(sum+cards[i]);
                if (i+1 == N) {
                    return;
                } else {
                    visited[i] = true;
                    backtracking(i+1, N, visited, sum+cards[i], cards, sumValues);
                    visited[i] = false;
                }
            }
        }
    }


}

/*
 * */

```