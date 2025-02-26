## 문제
https://www.acmicpc.net/problem/1933

## 해설

건문의 개수 N <= 10^6이 주어진다.

건물의 정보들이 주어진다.

건물에 대한 정보는 세 정수 L, H, R로 나타나는데, 각각 건물의 왼쪽 X좌표, 높이, 오른쪽 X 좌표를 의미한다.

L <= 10^9, R <= 10^9, H <= 10^9

L <= R이다.

스카이라인을 출력하라.

출력을할때는 높이가 변하는 지점에 대해서, 그 지점의 X 좌표와 그 지점에서의 높이를 출력하라

이 문제는 우선순위 큐로 해결할 수 있다.

두 단계로 나누어서 설명하자면,

1. 정렬
    - 건물의 모든 좌표를 X좌표 기준으로 정렬한다.
    - 좌표가 같다면 시작점이 끝점보다 앞에 오도록한다.
    - X가 같은 시작지점들은 높이가 높은것이 앞에 오도록 한다.
    - 이렇게 해야 한번에 처리가 가능하다.

2. 스카이라인 계산
    - 우선순위큐를 사용해 현재 활성화된 건물들의 높이를 관리한다.
    - 우선순위큐는 현재 보이는 건물 중 가장 높은 건물을 쉽게 찾을 수 있도록 도와준다.
    - 건물의 시작점에서는 힙에 높이를 추가하고, 현재 높이가 변경되면 결과 리스트에 추가한다.
    - 건물의 끝점을 만나면 건물이 더이상 보이지 않으므로 우선순위 큐에서 제거한다.
    - 건물의 끝점에서는 해당 건물을 힙에서 제거해야하지만, 직접 제거하는것이 어려우므로 다음과 같이 진행한다.
        - 끝점을 세트에 저장한다.
        - 끝점을 만났을때 세트에 있는 건물들을 힙에서 제거한다.
    - 최대 높이가 변경될때마다 결과 리스트에 [X 좌표, 새 높이를] 추가한다.

굉장히 어려운 문제였다. 이 문제의 핵심은 모든 건물의 시작점과 끝점을 이벤트로 생각하는것이다.


사실 시작점과 끝점을 나누어서 배열에 정렬해서 넣는것까지는 생각했으나,

1. 세트에 방문한 건물을 관리하는 것에 실패했다.

2. 시작점과 끝점을 구분해서 우선순위큐를 관리하는데 실패했다.

아이디어 자체는 거의 다 다가갔는데 우선순위 큐를 정확하게 구현하지 못한것이다.


그래도 이번에 새롭게 알게 된것은,

리스트 자료형에 데이터를 넣을떄 List<Integer> 형태로 삽입하면 시간초과 및 메모리 초과가 일어나므로 배열 형태로 넣어야하는데,

이를 간략하게 `add(new int[] {})` 이런 형태로 삽입하면 수월하다는 것이다.


## 입력
```

8
1 11 5
2 6 7
3 13 9
12 7 16
14 3 25
19 18 22
23 13 29
24 4 28
```


## 출력
```
1 11 3 13 9 0 12 7 16 3 19 18 22 3 23 13 29 0
```

## 코드 
```java
import java.io.*;
import java.util.*;

public class Main {
    static int N;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        N = Integer.parseInt(br.readLine());
        LinkedList<int[]> buildings = new LinkedList<>();
        int[] endPoints = new int[N];

        for (int i = 0; i < N ; i ++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int s = Integer.parseInt(st.nextToken());
            int h = Integer.parseInt(st.nextToken());
            int e = Integer.parseInt(st.nextToken());
            int[] starts = {i, s, h, 0};
            int[] ends = {i, e, h, 1};

            buildings.add(starts);
            buildings.add(ends);
            endPoints[i] = e;
        }

        Collections.sort(buildings, (a, b) -> {
            if (a[1] == b[1] && a[3] == b[3]) {
                return b[2] - a[2];
            } else if (a[1] == b[1]) {
                return a[3] - b[3];
            }
            return a[1] - b[1];
        });

        PriorityQueue<int[]> hq = new PriorityQueue<>((a, b) -> {
            return b[0] - a[0];
        });

        int currentHeight = 0;
        LinkedList<int[]> result = new LinkedList<>();
        HashSet<Integer> endList = new HashSet<>();

        for (int[] building : buildings) {
            int buildingIdx = building[0];
            int x = building[1];
            int height = building[2];
            int isEnd = building[3];

            if (isEnd == 0) {
                if (height > currentHeight) {
                    currentHeight = height;
                    result.add(new int[]{x, currentHeight});
                }
                hq.add(new int[]{height, endPoints[buildingIdx]});
                continue;
            }

            endList.add(x);

            while (!hq.isEmpty() && endList.contains(hq.peek()[1])) {
                hq.poll();
            }

            if (!hq.isEmpty()) {
                if (currentHeight != hq.peek()[0]) {
                    currentHeight = hq.peek()[0];
                    result.add(new int[]{x, currentHeight});
                }
            } else {
                if (currentHeight != 0) {
                    currentHeight = 0;
                    result.add(new int[]{x, currentHeight});
                }
            }
        }

        for (int[] res : result) {
            sb.append(res[0]).append(" ").append(res[1]).append(" ");
        }

        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }
}
```