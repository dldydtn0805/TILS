## 문제

https://www.acmicpc.net/problem/1022

## 해설

크기가 무한인 정사각형 모눈종이가 있다

이 모눈종이 전체를 양의 정수의 소용돌이 모양으로 채운다

숫자 1을 0행 0열에 쓴다.

그리고나서 0행 1열에 숫자 2를 쓴다

거기서부터 소용돌이는 반시계방향으로 시작된다.

예쁘게 출력한다는 것은 다음과 같이 출력하는 것이다

1. 출력은 r1 행부터 r2행까지 차례대로 출력한다

2. 각 원소는 공백으로 구분한다

3. 모든 행은 같은 길이를 가진다

4. 공백의 길이는 최소로 한다

5. 모든 숫자의 길이는 같아야한다

6. 만약 수의 길이가 가장 길이가 긴 수보다 작다면, 왼쪽에서부터 공백을 삽입해 길이를 맞춘다

이 문제는 위와같이 채운 것을 예쁘게 출력하면 된다.

r1, c1은 가장 왼쪽 위칸이고, r2, c2는 가장 오른쪽 아래칸이다
정수 r1, c1, r2, c2가 주어진다.

-5000 <= r1, c1, r2, c2 <= 5000

0 <= r2 - r1 <= 49

0 <= c2 - c1 <= 4

r2 - r1+1 개의 줄에 소용돌이를 예쁘게 출력하라

소용돌이 모양을 먼저 만들 수 있을까 ?

0에서 1만까지 모양을 미리 만들 수 있을것이다

1만 * 1만의 배열을 미리 만드는것은 가능하긴 하다.

공간복잡도가 충분할까 ?

굳이 모든 소용돌이를 미리 모두 다 채우지 않아도 된다

일단 소용돌이를 채워나가는 코드를 먼저 구한 이후, 원하는 행과 열에 일치하는 차례가 된다면 그때 채우면 된다.

진짜 정신 나갈뻔했다 인덱스때문에 ㅠ


## 입력
```txt
-3 -3 2 0
```

## 출력
```txt
37 36 35 34
38 17 16 15
39 18  5  4
40 19  6  1
41 20  7  8
42 21 22 23
```

## 코드

```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    static int K = 5001;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int r1 = Integer.parseInt(st.nextToken()) + K;
        int c1 = Integer.parseInt(st.nextToken()) + K;
        int r2 = Integer.parseInt(st.nextToken()) + K;
        int c2 = Integer.parseInt(st.nextToken()) + K;

        int ci = K;
        int cj = K;

        int[][] ans = new int[r2-r1+1][c2-c1+1];
        int curNum = 1;
        int dir = 0;
        int dirWeight = 1;
        if (0 <= ci-r1 && ci-r1 < r2-r1+1 && 0 <= cj - c1 && cj - c1 < c2 - c1+1) {
            // 조건 충족
            ans[ci-r1][cj-c1] = curNum;
        }
        curNum ++;
        int[][] directions = {{0,1},{-1,0},{0,-1},{1,0}};
        ci += directions[0][0];
        cj += directions[0][1];
        dir = 1;
        int dirCnt = 0;
        int[] direction = directions[dir];
        int maxLength = 1;
        while (ci <= 2 * K && cj <= 2 * K) {
            if (0 <= ci-r1 && ci-r1 < r2-r1+1 && 0 <= cj - c1 && cj - c1 < c2 - c1+1) {
                // 조건 충족
                maxLength = Math.max(maxLength, String.valueOf(curNum).length());
                ans[ci-r1][cj-c1] = curNum;
            }
            dirCnt ++;
            curNum ++;
            direction = directions[dir];
            ci += direction[0];
            cj += direction[1];
            if (dirWeight == dirCnt) {
                if (dir == 1 || dir == 3) {
                    dirWeight += 1;
                    dirCnt = 0;
                    dir = (dir+1) %4;
                }  else {
                    dirCnt = 0;
                    dir = (dir+1) % 4;
                }
            }
        }
        StringBuilder sb = new StringBuilder("");
        for (int i = 0; i < ans.length; i ++) {
            for (int j = 0; j < ans[i].length; j++) {
                int diff = maxLength - String.valueOf(ans[i][j]).length();
                while (diff-- > 0) {
                    sb.append(" ");
                }
                sb.append(ans[i][j]);
                if (j == ans[i].length-1) {
                    sb.append("\n");
                } else {
                    sb.append(" ");
                }
            }
        }
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }
}
```