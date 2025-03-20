## 문제

https://www.acmicpc.net/problem/1525

## 해설

3 X 3 표에 다음과 같이 표가 채워져 있다

```txt
1 2 3
4 5 6
7 8 ?
```

우리의 목표는 초기 상태가 주어졌을 때, 최소의 이동으로 위와 같은 정리된 상태를 만드는 것이다

세줄에 결쳐서 표에 채워져있는 아홉개의 수가 주어진다

한줄에 세개의 수가 주어지며, 빈칸은 0으로 나타난다

첫째 줄에 최소의 이동 횟수를 출력한다. 불가능한 경우, -1을 출력한다

-----

전에 풀었던 문제긴한데 자바로 한번 더 풀어보았다

로직은 다음과 같다

- 너비 우선 탐색을 사용해서 최소 이동 횟수를 찾는다
- LinkedList를 사용해 탐색할 상태들을 관리한다
- HashMap을 사용해 방문한 상태를 기록하고, 이동횟수를 저장한다

1. 현재 퍼즐에서 0의 위치를 찾는다
2. 빈칸의 위치에 따라 가능한 이동 방향이 달라진다
  - 왼쪽 열에 있을때 (-3, +1, +3)
  - 중간 열에 있을때 (-3, -1, +1, +3)
  - 오른쪽 열에 있을때 (-3, -1, +3)

3. 유효한 이동 마다 새로운 퍼즐 상태를 생성해서 큐에 추가한다

4. 각 단계에서 큐를 하나 꺼내서 처리한다

5. 이미 방문한 상태는 다시 방문하지 않는다

6. 새로운 상태의 이동 횟수는 현재 상태의 이동 횟수 + 1이다

- 모든 가능한 상태를 탐색해도 목표 상태에 도달하지 못하면 -1이 반환된다.

------

지난번에 풀었을때는 큐에 2차원 배열을 넣어서 관리했었던거같다 그래서 좀 메모리초과도 나고 그랬던거같은데

이번엔 1차원 배열로 관리해서 그런지 쉽게 통과했다

그냥 조금 복잡한 BFS 문제 느낌이었다


## 입력
```txt
1 0 3
4 2 5
7 8 6
```

## 출력
```txt
3
```

```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int[] puzzle = new int[9];
        for (int i = 0; i < 3; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < 3; j++) {
                puzzle[3*i+j] = Integer.parseInt(st.nextToken());
            }
        }
        StringBuilder sb = new StringBuilder("");
        sb.append(bfs(puzzle));
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int bfs (int[] puzzle) {
        LinkedList<int[]> q = new LinkedList<>();
        HashMap<String, Integer> visited = new HashMap<>();

        q.add(puzzle);
        visited.put(Arrays.toString(puzzle), 0);

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            String curString = Arrays.toString(cur);
            int ci = 0;
            for (int i = 0; i < 9; i ++) {
                if (cur[i] == 0) {
                    ci = i;
                    break;
                }
            }
            if (ci == 0 || ci == 3 || ci == 6 ) {
                for (int di : new int[]{-3, 1, 3}) {
                    int ni = ci + di;
                    if (0 > ni || 8 < ni) continue;
                    int[] next = new int[9];
                    for (int i = 0; i < 9; i ++) {
                        next[i] = cur[i];
                    }
                    int tmp = next[ci];
                    next[ci] = next[ni];
                    next[ni] = tmp;
                    String nextString = Arrays.toString(next);
                    
                    if (visited.containsKey(nextString)) continue;
                    q.add(next);
                    visited.put(nextString, visited.get(curString)+1);
                }
            } else if (ci == 1 || ci == 4 || ci == 7 ) {
                for (int di : new int[]{-3, -1, 1, 3}) {
                    int ni = ci + di;
                    if (0 > ni || 8 < ni) continue;
                    int[] next = new int[9];
                    for (int i = 0; i < 9; i ++) {
                        next[i] = cur[i];
                    }
                    int tmp = next[ci];
                    next[ci] = next[ni];
                    next[ni] = tmp;
                    String nextString = Arrays.toString(next);
                    if (visited.containsKey(nextString)) continue;
                    q.add(next);
                    visited.put(nextString, visited.get(curString)+1);
                }
            } else {
                for (int di : new int[]{-3, -1, 3}) {
                    int ni = ci + di;
                    if (0 > ni || 8 < ni) continue;
                    int[] next = new int[9];
                    for (int i = 0; i < 9; i ++) {
                        next[i] = cur[i];
                    }
                    int tmp = next[ci];
                    next[ci] = next[ni];
                    next[ni] = tmp;
                    String nextString = Arrays.toString(next);
                    if (visited.containsKey(nextString)) continue;
                    q.add(next);
                    visited.put(nextString, visited.get(curString)+1);
                }
            }
        }
        String res = Arrays.toString(new int[]{1,2,3,4,5,6,7,8,0});
        if (visited.containsKey(res)) {
            return visited.get(res);
        }
        return -1;
    }
    

}
```