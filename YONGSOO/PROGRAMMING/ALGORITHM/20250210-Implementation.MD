```java
// https://www.acmicpc.net/problem/17276

/*해설

각 테스트 케이스에 대해 회전 연산을 마친 후 배열의 상태를 출력하라.

각 테스트 케이스에 대해

첫줄에 배열의 크기를 나타내는 N, 각도 D가 주어진다.

D의 절댓값은 45의 배수이며 0에서 360이다.

 */

/*입력
4
5 45
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
5 -45
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
5 135
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
5 360
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
 */

/*출력
11 2 1 4 3
6 12 7 8 10
21 17 13 9 5
16 18 19 14 20
23 22 25 24 15
3 2 5 4 15
6 8 9 14 10
1 7 13 19 25
16 12 17 18 20
11 22 21 24 23
23 2 21 4 11
6 18 17 12 10
25 19 13 7 1
16 14 9 8 20
15 22 5 24 3
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
 */

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int T = Integer.parseInt(br.readLine());

        for (int tc = 0; tc < T; tc++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int n = Integer.parseInt(st.nextToken());
            int d = Integer.parseInt(st.nextToken());
            int[][] fields = new int[n][n];
            for (int row = 0; row < n ; row++) {
                st = new StringTokenizer(br.readLine());
                for (int col = 0; col < n ; col++) {
                    fields[row][col] = Integer.parseInt(st.nextToken());
                }

            }
            if (d > 0) {
                while (d > 0) {
                    d -= 45;
                    fields = rotate(fields, true);
                }
            } else {
                while (d < 0) {
                    d += 45;
                    fields = rotate(fields, false);
                }
            }
            for (int i = 0; i < n ; i++) {
                for (int j = 0; j < n; j++) {
                    bw.write(String.valueOf(fields[i][j])+" ");
                }
                bw.write("\n");
            }
        }
        bw.flush();
        bw.close();
    }

    public static int[][] rotate (int[][] arr, boolean flag) {
        int N = arr.length;
        int[][] target = new int[N][N];
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j++) {
                target[i][j] = arr[i][j];
            }
        }
        if (flag) {
            for (int i = 0; i < N; i ++) {
                target[i][N/2] = arr[i][i];
            }
            for (int i = N-1; i >= 0; i--) {
                target[Math.abs(i-(N-1))][i] = arr[Math.abs(i-(N-1))][N/2];
            }
            for (int i = N-1; i >= 0; i--) {
                target[N/2][i] = arr[Math.abs(i-(N-1))][i];
            }
            for (int i = N-1; i >= 0; i --) {
                target[i][i] = arr[N/2][i];
            }
        } else {
            for (int i = 0; i < N; i ++) {
                target[N/2][i] = arr[i][i];
            }
            for (int i = N-1; i >= 0; i-- ) {
                target[i][Math.abs(i-(N-1))] = arr[N/2][Math.abs(i-(N-1))];
            }
            for (int i = N-1; i >= 0; i--) {
                target[i][N/2] = arr[i][Math.abs(i-(N-1))];
            }
            for (int i = N-1; i >= 0; i--) {
                target[i][i] = arr[i][N/2];
            }
        }

        return target;
    }
}

```