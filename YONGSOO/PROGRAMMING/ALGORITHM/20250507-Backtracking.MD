## Source

https://www.acmicpc.net/problem/2026

## Commentary

1부터 N까지 번호가 붙은 N명의 학생들 중에서

K명의 학생들을 소풍에 보내려고 한다

소풍을 갈 학생들은 모두 서로 친구 사이여야한다

친구 관계에 대한 정보 F개가 주어진다

( K <= N <= 900 )

( 1 <= K <= 62 )

( 1 <= F <= 5600 )

K명을 선발하라

---

N, K, F 가 주어진다

F개의 줄에 서로 친구 관계인 두 사람의 번호가 주어진다

친구 관계는 상호적인 관계이므로 2번 학생이 4번 학생을 좋아하면 4번 학생도 2번 학생을 좋아한다

같은 친구관계가 여러번 주어지는 경우는 없다

---

만약, K명의 친구 관계인 학생들이 존재하지 않는다면 -1을 출력하라

그 외의 경우에는, K개의 줄에 학생들의 번호를 증가하는 순서로 한줄에 한개씩 출력하라

여러 경우가 존재한다면 첫번째 학생의 번호가 제일 작은 것으로 출력하라

첫번째 학생의 번호가 같은 경우라면, 두번째 학생의 번호가 작은 경우를 출력하라

---

K명의 학생은 모두 친구여야한다

즉, K명의 학생은 최소 친구가 K명 있어야 한다.

총 6명의 학생이라면

1 = [2, 3, 4, 5 ,6]

2 = [1, 3, 4, 5, 6]

...

이런식으로 되어야한다.

다시말해, 친구 목록 그 자체가 정답의 후보군이다.

친구목록을 토대로 검사를 진행해나가면 될것이다.

친구목록이 K-1개 있는 학생만 검사하면 된다.

어차피 모든 학생이 서로 친구여야하기 때문이다.

정답 후보군들을 모아, 낮은 사전 순으로 정렬한다.

그리고 검증하고 성공한다면 출력하면 끝이다. 라고 생각했다.

---

그렇다면, 모든 학생들의 친구 목록이 K보다 크다면 ?

우리는 K명의 친구만 필요하기 때문에 문제가 생긴다.

따라서 친구 목록만을 후보군으로 하는 것은 불가능하다

--- 

백트래킹으로 접근하자.

1부터 N까지 순차적으로 검토하며,

그룹의 총 개수가 K가 될때 까지 가능한 후보군들을 모두 탐색하면 된다

우선 순열을 바탕으로 모든 조합을 고려하는 것을 기본으로 한다.

여기서, 백트래킹 기법으로 조합을 제한해준다

0번 조건. 깊이가 K-1인 조합까지만 탐색한다.

1번 조건. 현재까지 방문했던 노드들과 연결되어있는 노드여야한다.

2번 조건. 인접리스트에 요소가 K-1개 이상 있는 노드여야한다.

3번 조건. 한번 소풍 그룹을 정하면 더이상 로직을 반복하지 않는다.

네가지 조건을 사용해서 간단히 소풍 그룹을 구할 수 있었다. 

## Input
```
4 6 8
1 2
1 3
1 6
2 3
2 6
3 6
4 5
5 6
```

## Output
```
1
2
3
6
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
        int K = Integer.parseInt(st.nextToken()), N = Integer.parseInt(st.nextToken()), F = Integer.parseInt(st.nextToken());
        List<List<Integer>> adjList = new ArrayList<>();
        for (int i = 0; i < N+1; i++) {
            adjList.add(new ArrayList<>());
        }
        boolean[][] bool = new boolean[N+1][N+1];
        for (int i = 0; i < F; i ++) {
            st = new StringTokenizer(br.readLine());
            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            adjList.get(from).add(to);
            adjList.get(to).add(from);
            bool[from][to] = true;
            bool[to][from] = true;
        }
        boolean[] visited = new boolean[N+1];
        List<Integer> ans = new ArrayList<>();
        for (int i = 1; i < N+1; i ++) {
            if (adjList.get(i).size() >= K-1 && ans.isEmpty()) {
                visited[i] = true;
                backTracking(adjList, K, N, visited, i, bool, 0, ans);
                visited[i] = false;
            }
        }
        if (ans.isEmpty()) {
            System.out.println(-1);
        } else {
            StringBuilder sb = new StringBuilder("");
            for (int i = 0; i < ans.size(); i++) {
                sb.append(ans.get(i)).append("\n");
            }
            System.out.println(sb.toString().trim());
        }
        bw.close();
        br.close();
    }
    public static void backTracking (List<List<Integer>> adjList, int K, int N, boolean[] visited, int curNode, boolean[][] bool, int depth, List<Integer> ans ) {
        if (depth == K-1) {
            StringBuilder sb = new StringBuilder("");
            List<Integer> res = new ArrayList<>();
            for (int i = 1; i < N+1; i ++) {
                if (visited[i]) {
                    ans.add(i);
                }
            }
            return;
        }
        for (int i = curNode+1; i < N+1; i ++) {
            if (adjList.get(i).size() >= K-1 && ans.isEmpty()) {
                boolean flag = true;
                for (int j = 1; j < N+1; j ++) {
                    if (visited[j]) {
                        if (!bool[j][i]) {
                            flag = false;
                            break;
                        }
                    }
                }
                if (flag) {
                    visited[i] = true;
                    backTracking(adjList, K, N, visited, i, bool, depth+1, ans );
                    visited[i] = false;
                }
            }
        }
    }

}
```