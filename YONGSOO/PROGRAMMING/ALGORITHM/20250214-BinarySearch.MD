```java
// https://www.acmicpc.net/problem/14627

/*해설
주문 받은 파닭의 수 C개가 있고, S개의 대파들의 길이가 주어진다.

이때, 최대한 많이 동일하게 각 파닭에 파를 넣고싶다.

파를 얼마나 넣어야할까 ?

* 남는 파의 길이를 출력하라
*/

/*입력
3 5
440
350
230
 */

/*출력
145
 */

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        long S = Long.parseLong(st.nextToken()), C = Long.parseLong(st.nextToken());
        LinkedList<Long> onions = new LinkedList<>();
        for (int i = 0; i < S; i++) {
            st = new StringTokenizer(br.readLine());
            long onion = Long.parseLong(st.nextToken());
            onions.add(onion);
        }
        bw.write(String.valueOf(binarySearch(1, 1000000000, onions, C)));
        bw.close();
        br.close();
    }

    public static boolean check (long m, LinkedList<Long> onions, long C) {
        long cnt = 0;
        for (long onion : onions) {
            cnt += onion / m;
        }
        return cnt >= C;
    }
    public static long binarySearch (long l, long r, LinkedList<Long> onions, long C) {
        long t = 0;
        while (l <= r) {
            long m = (l+r)/2;
            if (check(m, onions, C)) {
                t = Math.max(t, m);
                l = m+1;
            } else {
                r = m-1;
            }
        }

        long res = 0L;
        for (long onion : onions) {
            res += onion;
        }
        res -= C * t;
        return res;
    }

}

/*
 * */
```