
## Source
https://www.acmicpc.net/problem/25587

## Commentary

ChAOS 나라에는 총 $N$개의 도시가 있고 각각 $1, 2, 3, …, N$번 도시라고 부른다. ChAOS 나라에 각 도시에는 홍수를 막기 위해 배수로가 설치되어 있다. $i$번 도시의 배수로는 강수량이 $A_i$이하일 때만 홍수를 막을 수 있다. 추가로 한 도시에만 폭우가 올 때를 대비해, 두 개의 도시를 정해서 양쪽 도시의 배수로 용량을 공유할 수 있는 공사를 하기로 했다. 예를 들어 1번 도시와 2번 도시에 공사를 하고 난 후, 1번 도시와 2번 도시의 강수량의 합이 $A_1 + A_2$이하라면 1, 2번 도시 모두에 홍수가 나는 것을 막을 수 있고, 그렇지 않다면 1, 2번 도시 모두에 홍수가 나게 된다. 그 후 2, 3번 도시에도 공사를 하면, 세 도시의 강수량의 합이 $A_1 + A_2 + A_3$이하라면 1, 2, 3번 도시 모두에 홍수가 나는 것을 막을 수 있고, 그렇지 않다면 1, 2, 3번 도시 모두에 홍수가 나게 된다.  
  
그리고 현재 ChAOS 나라에는 전국적으로 폭우가 오고 있다. 현재 $i$번 도시의 강수량은 $B_i$다. 여기서 두 가지의 쿼리를 처리하는 프로그램을 작성하자.  
  
$1$ $x$ $y$ : $x$번 도시와 $y$번 도시에 공사를 한다.  
   
$2$ : 현재 상태에서 홍수가 날 도시의 개수를 출력한다.  
단, $2$번 쿼리는 최소 한 개 주어진다.  
  
입력  
첫 번째 줄에 도시의 개수인 정수 $N$ $(3 ≤ N ≤ 100\,000)$과 쿼리의 개수인 정수 $M$ $(1 \leq M \leq 100\,000)$이 주어진다.  
  
두 번째 줄에는 $i$번 도시의 배수로 용량을 의미하는 $N$개의 정수 $A_1, A_2, A_3,..., A_N$이 주어진다. $(0 \leq A​_i \leq 1\,000)$   
세 번째 줄에는 $i$번 도시의 강수량을 의미하는 $N$개의 정수 $B_1, B_2, B_3,..., B_N$이 주어진다. $(0 \leq B_i \leq 1\,000)$   
네 번째 줄부터 $M + 3$번째 줄까지는 $1$ $x$ $y$ 또는 $2$ 형태의 쿼리 $M$개가 한 줄에 하나씩 주어진다. $(1 \leq x, y \leq N)$   
출력  
각각의 $2$번 쿼리마다 정답을 한 줄에 하나씩 출력한다.


---

분리집합 문제다

city의 정보를 담은 cities 배열로 union - find를 수행한다

city의 정보는 `parents(집합의 대표) / size(집합의 총 도시 개수) / capacitySum(집합의 총 배수량) / rainSum(집합의 총 강수량) / floodCnt(집합에서 홍수가 난 도시 개수)` 이다

## Input

```
5 4  
1 2 3 4 5  
5 4 3 2 1  
2  
1 1 4  
1 4 5  
2  
```

## Output

```
2
1
```

## Source Code

```java
import java.math.*;  
import java.util.*;  
import java.io.*;  
  
public class Main {  
    static City[] cities;  
    static int N, M, ans;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        N = Integer.parseInt(st.nextToken());  
        M = Integer.parseInt(st.nextToken());  
        ans = 0;  
        int[] capacity = new int[N];  
        cities = new City[N];  
        st = new StringTokenizer(br.readLine());  
        for (int i = 0; i < N; i ++) {  
            capacity[i] = Integer.parseInt(st.nextToken());  
        }  
        st = new StringTokenizer(br.readLine());  
        for (int i = 0; i < N; i ++) {  
            int rain = Integer.parseInt(st.nextToken());  
            cities[i] = new City(i, rain, capacity[i]);  
            ans += cities[i].floodCnt;  
        }  
  
        StringBuilder sb = new StringBuilder("");  
        while (M -- > 0) {  
            st = new StringTokenizer(br.readLine());  
            int query = Integer.parseInt(st.nextToken());  
            if (query == 1) {  
                // Union-Find  
                int from = Integer.parseInt(st.nextToken());  
                int to = Integer.parseInt(st.nextToken());  
                from --;  
                to --;  
                if (find(from) != find(to)) {  
                    union(from, to);  
                }  
            } else {  
                // 홍수가 난 나라의 개수 출력  
                sb.append(ans).append("\n");  
            }  
        }  
        System.out.println(sb.toString().trim());  
        br.close();  
    }  
  
    private static class City {  
        int floodCnt, rainSum, capacitySum, size, parent;  
        private City (int idx, int rain, int capacity) {  
            this.parent = idx;  
            this.size = 1;  
            this.rainSum = rain;  
            this.capacitySum = capacity;  
            this.floodCnt = rainSum > capacitySum ? 1 : 0;  
        }  
    }  
  
    private static int find (int x) {  
        if (cities[x].parent == x) return x;  
        return cities[x].parent = find(cities[x].parent);  
    }  
  
    private static void union (int from, int to) {  
        int From = find(from);  
        int To = find(to);  
        if (From != To) {  
            // ans는 홍수가 난 도시의 개수  
            ans -= cities[From].floodCnt;  
            ans -= cities[To].floodCnt;  
            // Union  
            cities[From].parent = To;  
            cities[To].capacitySum += cities[From].capacitySum;  
            cities[To].rainSum += cities[From].rainSum;  
            cities[To].size += cities[From].size;  
  
            // Union 이후 홍수가 나는지 여부  
            if (cities[To].capacitySum < cities[To].rainSum) {  
                ans += cities[To].size;  
                cities[To].floodCnt = cities[To].size;  
            } else {  
                cities[To].floodCnt = 0;  
            }  
        }  
    }  
}
```