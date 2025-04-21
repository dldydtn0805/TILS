## Source

https://www.acmicpc.net/problem/30459

## Commentary

현수막을 걸 수 잇는 지면에는 N개의 말뚝이 한줄로 박혀있다

쿠는 말뚝과 미리 준비해둔 M개의 깃대 중 하나를 이용해 현수막을 걸수있다

현수막을 거는 방법은 다음과 같다

1. 박혀있는 말뚝 중 두개를 골라, 두 말뚝 사이의 공간이 현수막의 밑변이 되도록 현수막을 바닥에 고정

2. 적절한 깃대를 골라, 두 말뚝 정중앙에 깃대의 길이가 현수막의 높이가 되도록 세워 삼각형 모양으로 현수막을 건다

쿠는 구매할 수 있는 현수막의 최대 길이 R을 미리 준비해두었다

주어진 말뚝과 깃대를 활용해서 현수막을 걸고자할때 쿠가 구매해서 걸 수 있는 현수막의 넓이의 최댓값은 ?

----


말뚝의 개수 N, 깃대의 개수 M, 쿠가 살 수 있는 최대 현수막의 넓이 R 이 공백으로 주어진다

2 <= N <= 2000, 1 <= M <= 40000; 1 <= R <= 10^9

말뚝의 위치를 나타내는 N개의 정수 Ai가 공백으로 구분되어 주어진다

-20000 <= Ai <= 20000

쿠가 가지고 있는 깃대의 길이를 나타내는 M개의 정수 Bi가 공백으로 구분되어 주어진다

1 <= Bi <= 40000

말뚝의 위치는 서로 다르며, 깃대의 길이도 서로 다르다

쿠가 구매해서 걸수있는 현수막의 최대 넓이는 ?

현수막을 구매할 수 없는 경우는 -1을 출력하고, 넓이를 출력할때는 반드시 소수점 첫번째 자리까지 출력하라

----

이 문제의 핵심은 다음과 같다

말뚝이 하는 역할 : 두 말뚝을 선택해서 삼각형의 밑변을 구성한다

깃대가 하는 역할 : 깃대를 선택해서 삼각형의 높이를 구성한다

R이 하는 역할 : 삼각형의 최대 넓이의 기준을 정한다

삼각형의 최대 넓이를 구하라는 문제로 치환 가능하다

밑변 X 높이 X 1/2 = R

밑변 X 높이 = 2 * R

밑변의 요소는 2000개 이므로 2000*2000 = 4000000,

높이의 요소는 40000

log4*10^6은 21.93 정도 되므로,

높이의 요소 40000개를 모두 순회하며 밑변 X 높이 <= 2*R 을 체크할 수 있다

## Input
```
3 5 23
-5 0 5
1 6 2 8 10
```

## Output
```
20.0
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
        long R = Long.parseLong(st.nextToken()) * 2L;
        int[] piles = new int[N];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i ++) {
            piles[i] = Integer.parseInt(st.nextToken());
        }
        int[] flagPoles = new int[M];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < M; i ++) {
            flagPoles[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(piles);
        HashSet<Integer> hs = new HashSet<>();
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < i; j ++) {
                hs.add(piles[i] - piles[j]);
            }
        }

        ArrayList<Integer> bottom = new ArrayList<>(hs);
        bottom.sort((a,b)->{return a-b;});
        long res = Long.MIN_VALUE;
        for (int i = 0; i < M; i ++) {
            res = Math.max(res, binarySearch(bottom, flagPoles[i], R));
        }

        StringBuilder sb = new StringBuilder("");
        if (res == -1L) {
            sb.append(-1);
        } else {
            sb.append(res*5L);
            if (res*5L < 10) {
                sb.insert(sb.length()-1, "0.");
            } else {
                sb.insert(sb.length()-1, '.');
            }
        }

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    public static long binarySearch (ArrayList<Integer> bottom, long height, long R) {
        int l = 0;
        int r = bottom.size()-1;
        long res = -1L;
        while (l <= r) {
            int m = (l + r) / 2;
            long base = (long) bottom.get(m);
            if (base * height <= R) {
                res = Math.max(res, base * height);
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return res;
    }
}

```