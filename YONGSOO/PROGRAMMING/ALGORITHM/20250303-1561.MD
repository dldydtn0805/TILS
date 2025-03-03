## 문제

https://www.acmicpc.net/problem/1561

## 해설
N < 2*10^9, M <= 10^4이다.

N명의 아이들이 한줄로 줄을 서서 놀이공원에서 1인승 놀이기구를 기다린다

이 놀이공원에는 M 종류의 1인승 놀이기구가 있고 1번부터 M번 까지 번호가 매겨져있다

모든 놀이기구는 각각 운행 시간이 정해져있어서 운행 시간이 지나면 탑승하던 아이는 내린다

놀이기구가 비어있으면 현재 줄에서 가장 앞에 서있는 아이가 빈 놀이기구에 탑승한다.

만일 여러 개의  놀이기구가 동시에 비어있으면 더 작은 번호가 적혀있는 놀이기구를 먼저 탑승한다

놀이기구가 모두 비어있는 상태에서 첫번째 아이가 놀이기구에 탑승한다고 할때

줄의 마지막 아이가 타게되는 놀이기구의 번호는 ?

각 놀이기구의 운행시간을 나타내는 M개의 자연수가 순서대로 주어진다.

운행 시간은 1이상 30 이하의 자연수다

마지막 아이가 타게되는 놀이기구의 번호는 ?

알고리즘 흐름은 다음과 같다.

### 알고리즘 흐름

    - 시간을 기준으로 이진 탐색 한다. 특정 시간 time에 몇명의 손님이 놀이기구를 탈 수 있는지를 계산한다.

    - getCnt
        - 특정 시간에 몇명의 손님까지 놀이기구를 탔는지를 계산한다
        - 초기값을 M으로 둔 것은 시간이 0일때 모든 놀이기구에 한명씩 탑승할 수 있기 때문이다.
        - 각 놀이기구마다 `mid / amusement`를 한것은, 주어신 시간 동안 해당 놀이기구가 추가로 수용할수 있는 손님 수 인것이기 때문이다.

    - binarySearch 
        - 탐색 범위는 0부터 N/M*30 까지이다.
        - 중간 값에 N명 이상을 수용할 수 있으면 그 시간을 저장하고, 더 작은 시간을 찾는다.
        - 그렇지 않으면 더 큰 시간을 탐색한다.

    - solve
        - time-1 까지 탑승한 손님 수를 계산한다.
        - time에 정확히 운행을 마치는 놀이기구들을 순서대로 확인한다.
        - N번째 손님에 도달하면 해당 놀이기구 번호를 반환한다.

말로 설명하면 굉장히 쉬울 수 있으나 어마어마하게 헤맨 문제이다. 사실 문제 유형을 전혀 상상도 못했다.

원래 접근 했던 방식은 모든 놀이기구들의 최소 공배수를 구하고, 최소 공배수를 이용해 각 놀이기구가 동시에 비게되는 첫 순간까지 모든 놀이기구의 순서를 우선순위 큐를 이용해 기록하여 N % 패턴길이 값을 사용해 정답을 찾아내려고 했다.

하지만 이 방식은 메모리 초과로 해내지 못했다.

이유는 아직도 잘 모르겠다. 우선순위 큐에 들어가는 M 제한도 1만이라 괜찮을 것이라 생각했으나, 불가능한 것으로 결론 냈다.

따라서 다른 사람들의 풀이를 참고해서 코드를 작성하게 되었는데, 이는 정말 참신했다.

1. 특정 시간까지 각 놀이기구가 수용할 수 있는 사람들을 한번에 계산 할 수 있었고,

2. 특정 time에 N명보다 많이 수용할 수 있다면, 그 시간을 목적으로 삼았고,

3. 목적으로 삼은 시간보다 1 작은 시간까지 탑승하는 인원을 또다시 한번에 계산하여,

4. 놀이기구들을 다시 한번 1차례 순회하여 부족한 인원을 채워주고, 마지막으로 채워졌을 순간의 놀이기구가 최종적으로 탑승한 놀이기구였다는 것이다.

충분히 공감할 수 있는 논리였고, 이해도 가지만 이런식으로 이분탐색을 응용한다는 것이 놀라웠다. 

처음에 막연히 수학적 논리로 접근하려 했는데, 특정 시간까지 놀이기구에 탑승했던 인원을 M번의 순회만으로 발견해내는 것이 놀랍다. 

다음에 나도 이분탐색을 이런식으로 색다르게 응용해보도록하자.

## 입력
```txt
3 5
7 8 9 7 8
```

## 출력
```txt
3
```

## 코드
```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    static int[][] directions = new int[][]{{0,1}, {1,0}, {0,-1}, {-1,0}};
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        StringTokenizer st = new StringTokenizer(br.readLine());
        long N = Long.parseLong(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        long[] amusementPark = new long[M];
        st = new StringTokenizer(br.readLine());
        for (int i = 0 ; i < M; i ++) {
            amusementPark[i] = Long.parseLong(st.nextToken());
        }
        long minTime = 0L;
        long maxTime = N / M * 30L;
        long time = binarySearch(minTime, maxTime, M, N, amusementPark);
        if (time == 0) {
            sb.append(N);
        } else {
            sb.append(solve(N, M, amusementPark, time));
        }
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static long getCnt (int M, long N, long[] amusementPark, long mid) {
        long res = M;
        for (long amusement : amusementPark) {
            res += mid / amusement;
        }
        return res;
    }


    public static long binarySearch (long l, long r, int M, long N, long[] amusementPark) {
        long time = 0L;
        while (l <= r) {
            long mid = (l+r) / 2;
            if (getCnt(M, N, amusementPark, mid) >= N){
                time = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return time;
    }

    public static int solve (long N, int M, long[] amusementPark, long time) {
        long ans = getCnt(M, N, amusementPark, time-1);
        for (int i = 0;  i < M; i++) {
            if (time % amusementPark[i] == 0) {
                ans++;
            }
            if (ans == N) {
                return i+1;
            }
        }
        return -1;
    }

}
```