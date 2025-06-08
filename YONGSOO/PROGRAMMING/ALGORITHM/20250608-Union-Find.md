## Source
https://www.acmicpc.net/problem/16566  
  
## Commentary  
  
규칙은 다음과 같다  
  
1. N개의 빨간색 카드가 있다. 각 카드는 순서대로 1 ~ N까지 번호가 매겨있다. 이중 M개의 카드를 고른다  
  
2. N개의 파란색 카드가 있다. 각 카드는 1 ~ N 까지 번호가 매겨있다. 이중 빨간색에서 고른 번호와 같은 파란색 카드 M개를 고른다  
  
3. 철수는 빨간색 카드를 가지고, 민수는 파란색 카드를 가진다  
  
4. 철수와 민수는 고른 카드중 1장을 뒤집어 낸 상태로 낸다. 그리고 카드를 뒤집어서 번호가 큰 사람이 이긴다. 이 동작을 K번 해서 더 많이 이긴 사람이 최종적으로 승리한다. 한번 낸 카드는 버린다  
  
철수는 본인이 낼 카드를 마음대로 조작할 수 있다. (카드를 버리고 민수 몰래 다시 들고오거나 민수에게 없는 카드를 내기도 한다)  
  
민수는 철수가 낼 카드를 안다. (민수는 철수가 낼 카드보다 큰 카드가 있다면 그 카드 중 가장 작은 카드를 낸다)  
  
K번 동안 철수가 낼 카드가 입력으로 주어진다. 그렇다면 민수가 어떤 카드를 낼지 출력하라.  
  
---  
  
세 자연수 N, M, K 가 주어진다  
  
카드의 번호를 나타내는 M개의 자연수 Ai가 주어진다  
  
K개의 자연수가 주어진다. i번째 수는 철수가 i번째 로 내는 카드의 번호 Bi 이다  
  
(1 <= M, N <= `4*10^6`)  
  
(1 <= K <= min(M, 10^4)  
  
(1 <= Ai <= N, Ai != Aj)  
  
(1 <= Bi <= N)  
  
---  
  
주어진 카드의 번호들은 철수가 가진 카드들이다.  
  
사실 이 카드는 민수와 공유하지만, 민수에게는 상관없다. 민수는 모든 카드를 무한으로 가진다.  
  
민수가 내는 카드 목록이 주어진다  
  
이 카드를 보고 철수가 낼 카드를 제출하면 되는 것인데,  
  
철수는 상대 카드보다 높지만 가장 낮은 카드를 제출한다.  
  
철수가 가진 카드보다 작은 자연수들을 해당 카드에 union 해주면 된다

해당 자연수가 등장하면 root를 반환해서 출력하면 되는 것이다

하지만 문제가 있는데, 등장하는 자연수와 철수가 가진 카드가 겹치는 경우다

이 경우를 대비하기 위해, 최대 root + N을 해준 값을 union 하면 된다

## Input

```
10 7 5  
2 5 3 7 8 4 9  
4 1 1 3 8  
```
## Output

```
5  
2  
3  
4  
9  
```

## Source Code


```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int[] myCard;  
    static int[] parents;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        int N = Integer.parseInt(st.nextToken());  
        int M = Integer.parseInt(st.nextToken());  
        int K = Integer.parseInt(st.nextToken());  
        int diff = N;  
        st = new StringTokenizer(br.readLine());  
        parents = new int[2*N+1];  
        for (int i = 0; i < 2*N+1; i ++) {  
            parents[i] = i;  
        }  
  
        myCard = new int[M];  
        for (int i = 0; i < M; i ++) {  
            myCard[i] = Integer.parseInt(st.nextToken());  
        }  
        Arrays.sort(myCard);  
        for (int i = 1; i < myCard[0]; i ++) {  
            union(i, myCard[0]+diff);  
        }  
  
        for (int i = 1; i < M; i ++) {  
            for (int node = myCard[i-1]; node < myCard[i]; node++) {  
                union(node, myCard[i] + diff);  
            }  
        }  
        st = new StringTokenizer(br.readLine());  
        StringBuilder sb = new StringBuilder("");  
        for (int i = 0; i < K; i ++) {  
            int enemyCard = Integer.parseInt(st.nextToken());  
            int root = find(enemyCard);  
            sb.append(root-diff).append("\n");  
            union(root, root-diff);  
        }  
        System.out.println(sb.toString().trim());  
        br.close();  
    }  
  
    private static int find (int x) {  
        if (parents[x] == x) return x;  
        return parents[x] = find(parents[x]);  
    }  
  
    private static void union (int a, int b) {  
        int A = find(a);  
        int B = find(b);  
        if (A != B) {  
            parents[A] = B;  
        }  
    }  
}  
```
  
