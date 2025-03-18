## 문제

https://www.acmicpc.net/problem/1083

## 해설
1 <= N <= 50 이 주어진다.

각 원소 <= 10^6 N개가 차례로 주어진다

0 <= S <= 10^6 가 주어진다.


크기가 N인 배열 A가 있다. 배열의 모든 수는 다르다.

배열을 소트할때 연속된 두개의 원소만 교환할 수있다.

교환은 많아봐야 S번 할 수 있다. 소트한 결과가 사전 순으로 가장 뒷서는 것을 출력하라

-------

혼자 버블정렬 만들어서 코드를 창조하다가, 너무 힘들어서 알고리즘 분류를 봤더니 그리디 + 정렬이었다.

와 진짜 감도 안와서 게시판에 힌트를 참고했다.

게시판에서는, S가 남은 만큼 최대한 뒤로 가서 배열의 큰 원소를 가져온다고 했는데,

내가 구현한 코드에서는 다음과 같이 구현했다.

1. prev 변수는 현재 정렬 시작 위치를 나타낸다 (초기값 0)

2. 각 반복에서
    - 현재 위치 (prev)에서 배열 끝까지 중에서, 현재 남은 교환 횟수 (S)로 prev 위치까지 이동시킬 수 있는 가장 큰 값을 찾는다.
    - 해당 값을 찾으면 그 값을 prev 위치까지 버블 소트 방식으로 이동시킨다
    - 이동 과정에서 각 교환마다 S를 1씩 감소시킨다
    - prev를 1 증가시키고 다음 위치에 대해 같은 과정을 반복한다
    - S가 0이 되거나 prev가 배열 끝까지 도달하면 종료한다

- 각 단계에서 아직 정렬되지 않은 부분에서 가장 큰 값을 찾는다
- 그 값이 현재 위치에서 S번 이내의 교환으로 도달할 수 있따면, 그 값을 현재 위치로 이동시킨다
- 이렇게 하면 사전순으로 가장 뒷서는 결과를 얻을 수 있다.

내가 짠 코드이긴 한데 너무 어지러웠다

다음에도 이런 문제를 만나면 풀수있을까 ? 풀어야지 ..



## 입력
```txt
7
3 5 1 5 1 2 5
4
```

## 출력
```txt
20 10 30 40 50 60 70
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

        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] A = new int[N];
        for (int i = 0; i < N; i ++) {
            A[i] = Integer.parseInt(st.nextToken());
        }

        int S = Integer.parseInt(br.readLine());
        // 정렬 시작 위치
        int prev = 0;
        while (S > 0) {
            int idx = prev;
            for (int i = prev; i < N; i ++) {
                // 현재 위치 (prev)에서 배열 끝까지 중에서, 현재 남은 교환 횟수 (S)로 prev 위치까지 이동시킬 수 있는 가장 큰 값을 찾는다.
                if (A[idx] < A[i] && S >= i-prev) {
                    idx = i;
                }
            }
            for (int i = idx; i > prev; i --) {
                if (A[i] > A[i-1]) {
                    int tmp = A[i];
                    A[i] = A[i-1];
                    A[i-1] = tmp;
                    S --;
                    // S가 0이 되거나 prev가 배열 끝까지 도달하면 종료한다
                    if (S == 0) break;
                }
            }
            prev++;
            // S가 0이 되거나 prev가 배열 끝까지 도달하면 종료한다
            if (prev == N) break;
        }
        StringBuilder sb = new StringBuilder("");
        for (int i = 0; i < N; i ++) {
            sb.append(A[i]).append(" ");
        }
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }
}
```