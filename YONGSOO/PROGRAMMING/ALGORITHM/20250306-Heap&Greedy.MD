## 문제

https://www.acmicpc.net/problem/1202

## 해설

보석이 총 N (1 <= N <= 3*10^5)개 있다

각 보석은 무게 M[i]와 가격 V[i] <= 10^6 를 가진다

가방에 K개 (1 <= K <= 3*10^5) 를 가지고 있고, 각 가방에 담으 수 있는 무게는 C[i] <= 10^8 다

가방에는 최대 한개의 보석만 넣을 수 있다

훔칠 수 있는 보석의 최대 가격은 ?

N은 1번까지 순회 가능하다

K도 1번까지 순회 가능하다

어떻게 접근하는게 좋을까?

어차피 한 가방에는 1개의 보석만 넣을 수 있다.

예제 2번을 보자

가방은 [2, 10]가 있다.

보석류는 [[1, 65], [5, 23], [2, 99]]가 있다.

이 경우 가방은 2 가방에 [1, 65] 보석을 넣고.

10 가방에 [2, 99] 보석을 넣으면 된다.

최선으로 가방에 보석을 담으려면 어떻게 해야할까 ?

이 문제는 정렬과 우선순위 큐를 활용하면 해결 가능하다

- 보석과 가방 모두 무게기준으로 오름차순 정렬한다.

- 우선순위 큐는 높은 가치를 기준으로 먼저 선택하도록 한다.

알고리즘의 핵심은 다음과 같다

- 가방을 용량이 작은 것부터 순회하며, 현재 가방에 담을 수 있는 모든 보석을 우선순위 큐에 추가한다.

    - 여기서 보석의 idx 를 체크하여 이미 확인한 보석을 다시 확인하지 않도록 한다.
        - idx 는 아직 확인하지 않은 보석의 시작 인덱스를 나타낸다.
        - 보석 배열과 가방 배열이 모두 정렬되어 있기 때문에, 이전 가방에 넣을 수 있던 보석은 현재 가방에도 당연히 넣을 수 있다.
    - 큐에서 가장 가치가 높은 보석을 꺼내 총합에 더한다.

역시 그리디 문제답게 굉장히 어렵다. 아직 많이 부족한것같다.

## 입력
```txt
2 1
5 10
100 100
11
```

## 출력
```txt
10
```

## 코드

```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    static int[][] directions = {{-1,0},{0,1},{1,0},{0,-1}}; // 북 동 남 서
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");

        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());

        PriorityQueue<Long> hq = new PriorityQueue<>((a,b)->{
            return Long.compare(b, a);
        });

        long[][] jewels = new long[N][2];

        for (int i = 0; i < N; i ++) {
            st = new StringTokenizer(br.readLine());
            long M = Long.parseLong(st.nextToken());
            long V = Long.parseLong(st.nextToken());
            jewels[i][0] = M;
            jewels[i][1] = V;
        }


        long[] backpacks = new long[K];
        for (int i = 0; i < K; i ++) {
            long C = Long.parseLong(br.readLine());
            backpacks[i] = C;
        }

        Arrays.sort(jewels, (a,b)-> {
            return Long.compare(a[0],b[0]);
        });
        Arrays.sort(backpacks);

        int idx = 0;
        long ans = 0L;

        for (int i = 0; i < K; i ++) {
            while (idx < N && backpacks[i] >= jewels[idx][0]) {
                hq.add(jewels[idx][1]);
                idx++;
            };
            if (!hq.isEmpty()) {
                ans += hq.poll();
            }
        }

        sb.append(ans);
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

}
```