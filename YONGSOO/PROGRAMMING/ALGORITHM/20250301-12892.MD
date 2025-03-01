## 문제
https://www.acmicpc.net/problem/12892

## 해설

강민이는 친구가 N명 있다.

각 친구는 모두 강민이를 위한 선물을 준비한다. 선물은 P와 V를 가진다.

P는 선물의 가격, V는 만족도[강민이가 기뻐하는 정도]이다.

강민이는 모든 선물을 다 받고싶지만,

어떤 친구가 준 선물 가격이 다른 친구가 준 선물의 가격과 D 이상 차이가 나면,

더 낮은 가격의 선물을 준 친구가 미안함을 느끼게 될 수 있다.

강민이는 친구들에게 미안함을 느끼게 하고 싶지 않으므로, 일부 선물만 받기로 했다.

누구도 미안함을 느끼지 않게 선물을 받으면서, 강민이가 느낄 수 있는 만족도의 최대 합은 얼마인지 구하자.

친구의 수 1 <= N <= 10^6, 미안함을 느끼게되는 최소 가격차 1 <= D <= 10^9 가 주어진다.

N개의 줄에 각 선물의 가격 0<= P <= 10^9 와 만족도 0 <= V <= 10^9 + 1가 주어진다
강민이가 최대 얼만큼 기뻐할 수 있는가?

최대 만족도를 구하는 문제이다.

그렇다면 누적합을 구하고,

가격 범위 내에서 구간 합을 계산하면 되지 않을까 싶다.

가격 범위 내라는 것을 어떻게 계산할 수 있을까 그런데 ?

투 포인터를 사용하면 가능하지 않을까 ?

1. i, j를 둘다 0으로 두고 시작한다.

2. i, j의 차이가 가격 범위 내라면, j를 한칸 뒤로 보낸다.

3. i, j의 차이가 가격 범위를 벗어나면, i를 한칸 뒤로 보낸다.

4. 시간 복잡도 N을 사용해서 전체 누적합 배열을 조회하며 가격 범위 내에서 최대 만족도를 구할 수 있다.

다행히 처음 구상했던대로 결과가 나와 솔브했다.

투포인터 개념을 자바로 하는건 처음이었는데 역시 언어는 다 똑같은 것같다.

단, 주의해야할 점은 0번째 인덱스를 비워놓고 누적합 배열을 채워야, 나중에 최대 만족도 계산을 정확히 할 수 있었다.

`res = Math.max(res, sum[j][1] - sum[i-1][1])`


## 입력
```txt
4 2
13 10
10 20
11 30
12 40
```

## 출력
```txt
70
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
        StringBuilder sb = new StringBuilder("");
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        long D = Long.parseLong(st.nextToken());
        long[][] sum = new long[N+1][2];
        for (int i = 1 ; i < N+1; i++) {
            st = new StringTokenizer(br.readLine());
            long P = Long.parseLong(st.nextToken());
            long V = Long.parseLong(st.nextToken());
            sum[i][0] = P;
            sum[i][1] = V;
        }
        Arrays.sort(sum, (a,b)->{
            return Long.compare(a[0], b[0]);
        });
        for (int i = 2; i < N+1; i ++) {
            sum[i][1] = sum[i-1][1] + sum[i][1];
        }
        sb.append(twoPointer(sum, D, N));
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static long twoPointer (long[][] sum, long D, int N) {
        int i = 1, j = 1;
        long res = 0L;
        while (i <= j && i < N+1 && j < N+1) {
            if (sum[j][0] - sum[i][0] >= D) {
                i ++;
            } else {
                res = Math.max(res, sum[j][1] - sum[i-1][1]);
                j ++;
            }
        }
        return res;
    }

}
```