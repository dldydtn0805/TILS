## 문제

https://www.acmicpc.net/problem/24229

## 해설

주헌이의 출근길에는 다리가 있는데 다리가 끊어져 판자 여러개로 쪼개졌다

다리는 수직선으로 나타낼 수 있으며 각 판다는 [L, R]의 범위에 놓여있다

주헌이는 0에서 출발하여 오른쪽으로만 이동한다 판자로 덮인 좌표는 자유롭게 건널 수 있다

판자로 덮이지 않은 좌표는 점프를 해야만 건널 수 있다

점프 할 경우 착지한 위치에 판자가 놓여 있어야 한다

판자의 양끝점에도 착지가 가능하다

주헌이가 한번의 점프로 건널 수 있는 최대거리는, 마지막으로 착지한 시점 이후로 건너간 거리와 같다

점프를 한적이 없으면 출발한 시점 이후로 건너간 거리와 같다

ex) 좌표 9에 착지했고 12에서 다시 점프를 한다면 점프를 할 수 있는 거리는 최대 3이다

주헌이가 이동할 수 있는 가장 먼 지점을 구해보자

점프를 했는데 판자위에 착지하지 못한 경우는 이동하지 않은 것으로 간주한다

판자의 개수 N <= 2*10^6 이 주어진다

N개의 줄에 걸쳐서 판자가 놓인 구간을 나타내는 정수 L, R이 주어진다 0 <= L < R <= 10^9

L = 0 인 판자가 적어도 하나는 주어진다

주헌이가 최대로 멀리 이동할 수 있는 지점의 좌표는 ?

주헌이의 행동 패턴은 다음과 같다

1. 주헌이는 판자 위를 자유롭게 이동 가능하다

2. 주헌이는 착지한 판자의 총 이어진 길이만큼 최대로 점프가 가능하다.

이 문제는 어떻게 해결할 수 있는가?

판자들의 개수는 최대 20만개이므로 2번 순회하는 것은 불가능하다

1. 판자를 잇는다.

2. 주헌이를 이동시킨다.

딱히 어려울 것은 없을거같은 문제이다.

구현과 스위핑을 적절히 이용 잘한다면 쉽게 해결할 수 있지 않을까 ?

-----

최대 이동거리 계산에 Heap을 사용하였고 다리를 잇는데 Sweeping 기법으로 연결하려고 했다.

그런데 Sweeping이 익숙하지 않았는지,

연결된 다리를 만드는데 실수를 했다

```java
r = Math.max(r, bridges[i][1]);
```

이전 판자의 왼쪽이 더 왼쪽이면서 오른쪽 이 더 오른쪽인 경우가 있을 수 있는데 그냥 `r = bridges[i][1]`로 한것이 문제였다

아 진짜 너무 화가난다

왜이러니

## 입력
```txt
4
0 100
50 150
300 10000
2 10
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
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        int[][] bridges = new int[N][2];
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int L = Integer.parseInt(st.nextToken());
            int R = Integer.parseInt(st.nextToken());
            bridges[i][0] = L;
            bridges[i][1] = R;
        }

        Arrays.sort(bridges, (a,b)->{
            if (a[0] == b[0]) {
                return a[1]-b[1];
            } else {
                return a[0] - b[0];
            }
        });

        StringBuilder sb = new StringBuilder("");
        sb.append(solve( bridges, N ));
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int solve ( int[][] bridges, int N ) {
        // 판자 연결시키기
        List<int[]> connectedBridges = new ArrayList<>();
        int l = bridges[0][0];
        int r = bridges[0][1];

        for (int i = 1; i < N; i ++) {
            if (r >= bridges[i][0]) {
                r = Math.max(r, bridges[i][1]);
            } else {
                connectedBridges.add(new int[]{l, r});
                l = bridges[i][0];
                r = bridges[i][1];
            }
        }
        // 마지막 판자 추가해주기
        connectedBridges.add(new int[]{l, r});

        // 연결된 판자를 바탕으로 최대 거리 계산하기
        PriorityQueue<Integer> hq = new PriorityQueue<>((a,b)->{
            return b-a;
        });
        int maxDistance = connectedBridges.get(0)[1];
        hq.add(connectedBridges.get(0)[1]*2 - connectedBridges.get(0)[0]);
        for (int i = 1; i < connectedBridges.size(); i ++) {
            // 최대로 뛸 수 있는 거리 안에 판자가 있다
            if (!hq.isEmpty() && hq.peek() >= connectedBridges.get(i)[0]) {
                hq.add(connectedBridges.get(i)[1]*2 - connectedBridges.get(i)[0]);
                maxDistance = Math.max(maxDistance, connectedBridges.get(i)[1]);
            }
        }

        return maxDistance;
    }
}
```

