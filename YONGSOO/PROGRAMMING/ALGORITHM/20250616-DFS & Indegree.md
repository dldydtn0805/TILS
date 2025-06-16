## Source

https://www.acmicpc.net/problem/18112  
  
## Commentary
  
최근들어 세계적으로 마약과 관련한 사회적 문제들이 많이 발생하고 있다. 이에 따라 경찰은 마약 수사대의 한정된 인력이 허용하는 선에서 최대한 마약공급을 막고자 한다.  
  
마약 공급책들은 서로에게 마약을 공급받는데, 최근 마약수사대는 마약 공급책들 간의 관계도를 일부 파악하였다. 이 관계도는 그래프로 표현될 수 있다. 각 노드는 마약 공급책, 간선은 공급 관계를 표현한다. 예를 들어 아래와 같은 그래프는 다음을 나타낸 것이다.  
  
마약공급책 A가 마약 공급책 B, C, D, E 에게 마약을 공급한다.  
마약공급책 F는 B와 C로부터 마약을 공급받아서 I에게 공급한다.  
I는 J에게, J는 K에게, D는 G에게, E는 H에게 각각 마약을 공급한다.  
  
  
마약수사대는 소재를 파악하고 있는 마약 공급책을 검거할 수 있다.  
  
예를 들어, 마약수사대가 B와 C를 검거해도 D, E, G, H는 여전히 마약을 공급받을 수 있다.  
  
마약의 원산지는 '다른 공급책에게 공급받지 않으면서 마약을 공급하는 마약공급책'이다.  
  
마약 공급책들의 관계도에 대한 정보와 마약수사대가 검거한 마약 공급책들이 주어졌을 때 여전히 마약을 공급 받을 수 있는 마약 공급책의 수를 내어주는 프로그램을 작성해보자.  
  
입력  
첫 번째 줄에 마약 공급책의 수 N(1 ≤ N ≤ 26)과 마약 공급책의 관계 수 M(1 ≤ M ≤ 600)이 주어진다. 각 마약 공급책은 A부터 순서대로 알파벳 대문자로 표현된다.  
  
두번째 줄부터 M개의 줄에 각 마약 공급책의 관계가 주어진다. (A B : A -> B)  
  
마지막 줄에 경찰이 소재를 파악하고 있는 마약 공급책들의 수와 파악중인 각 마약 공급책이 공백으로 구분되어 주어진다.  
  
출력  
마약수사대가 파악중인 마약 공급책을 검거한 후 여전히 마약을 공급 받는 마약 공급책의 수를 출력한다.  

---

DFS다 살짝 응용한

최초 마약 공급책들을 찾는다. 이들은 한명이 아닐수있다

마약 공급책들로부터 DFS를 시행한다. 검거되지 않은 사람들만 추적 가능하다.

물론, 마약 공급책도 이미 검거됐을 수 있으므로 주의한다
## Input

```
11 11  
A B  
A C  
A D  
A E  
B F  
C F  
D G  
E H  
F I  
I J  
J K  
2 B C  
```

## Output

```
4
```

## Source Code

```java
import java.math.*;
import java.util.*;
import java.io.*;

public class Main {
    static int N, M, ans;
    static boolean[] visited;
    static boolean[] prison;
    static List<List<Integer>> adjList;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        ans = 0;
        int T = 26;
        visited = new boolean[T];
        adjList = new ArrayList<>();
        int[] indegree = new int[T];
        for (int i = 0; i < T; i ++) {
            adjList.add(new ArrayList<>());
        }
        for (int i = 0; i < M; i ++) {
            st = new StringTokenizer(br.readLine());
            int from = st.nextToken().charAt(0)-'A';
            int to = st.nextToken().charAt(0)-'A';
            adjList.get(from).add(to);
            indegree[to]++;
        }

        st = new StringTokenizer(br.readLine());
        int K = Integer.parseInt(st.nextToken());
        prison = new boolean[26];
        for (int i = 0; i < K; i++) {
            prison[st.nextToken().charAt(0)-'A'] = true;
        }
        for (int i = 0; i < T; i ++) {
            if (!prison[i] && indegree[i] == 0) {
                DFS(i);
            }
        }
        System.out.println(ans);
        br.close();
    }

    private static void DFS (int cur) {
        visited[cur] = true;
        for (int next : adjList.get(cur)) {
            if (!visited[next] && !prison[next]) {
                ans ++;
                DFS(next);
            }
        }
    }
}
```
  