```java
// https://www.acmicpc.net/problem/28088

/*해설
한 사람이 인사를 하면, 그 양 옆에 사람도 인사를 한다.

다만, 양 옆에서 동시에 인사를하면 인사를하지 않는다.

N명의 사람이 원모양으로 있을때,

M명의 사람이 인사를 하고,

K번 인사를 진행한 후, 다음에 인사할 사람의 수를 출력하라.

동아리원은 시계방향으로 0번부터 N-1번까지 순서대로 서있다.

비트마스킹으로 전체 인원의 인사 여부를 체크할 수 있다. 

단, 전체 인원 N인 200은 long의 최대 표현 비트인 64비트를 넘어선다.

따라서 비트 마스킹을 long[4] 로 표현할 수 있다.

 */

/*입력
5 3 2
3
0
4
 */

/*출력
2
 */

import java.io.*;
import java.util.*;

public class Main {
    static final int BIT_SIZE = 64;
    static final int MAX_BITS = 256;
    public static void main(String[] args) throws IOException{

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());
        long[] hello = new long[4];
        for (int i = 0; i < M; i++) {
            int person = Integer.parseInt(br.readLine());
            hello[person/BIT_SIZE] |= (1L << (person % BIT_SIZE));
        }
        for (long k = 0 ; k < K ; k++) {
            long[] nextHello = new long[4];
            for (int i = 0; i < N; i++) {
                int left = (i-1+N)%N;
                int right = (i+1)%N;

                boolean leftHello = (hello[left/BIT_SIZE] & (1L << (left%BIT_SIZE))) != 0;
                boolean rightHello = (hello[right/BIT_SIZE] & (1L << (right%BIT_SIZE))) != 0;

                if (!(leftHello&&rightHello)&&(leftHello ||rightHello)) {
                    nextHello[i/BIT_SIZE] |= (1L<<(i%BIT_SIZE));
                }
            }
            hello = nextHello;
            if ((hello[0] | hello[1] | hello[2] | hello[3]) == 0) {
                break;
            }
        }
        int ans = Long.bitCount(hello[0]) + Long.bitCount(hello[1]) +Long.bitCount(hello[2]) +Long.bitCount(hello[3]);
        bw.write(String.valueOf(ans));
        bw.flush();
        bw.close();
    }


}


```