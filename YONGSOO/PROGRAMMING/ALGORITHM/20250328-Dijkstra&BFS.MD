## Source
https://www.acmicpc.net/problem/11952


## Commentary

JOI 국은 N개의 도시와 M개의 도로로 이루어진다

모든 도시는 도로로 연결되어있고, 도로 말고는 이동 불가하다

K개의 도시는 좀비에 의해 점령당햇다

경곽이는 1번 도시에서 N번 도시로 가려고 한다

각 도시를 이동할 때마다 1박해야하고, 1박에 숙박비가 있다

도시가 좀비한테 점령당했으면 숙박이 불가능하다

좀비에게 점령당한 도시부터 S번 이하의 이동으로 이동할 수 있는 모든 도시는 위험한 도시다

그 이외의 도시는 안전한 도시다

만약 그 도시가 안전한 도시라면 숙박비는 p 원이고, 위험한 도시라면 숙박비는 q 원이다

경곽이가 도시 1부터 N으로 이동하는데 드는 최단 비용은 ?

----

N - 도시의 수 , M - 길의 수 , K - 좀비에게 점령당한 도시 수 가 공백으로 구분되어 입력된다

2 <= N <= 10^5, 1 <= M <= 2*10^5, 0<= K <= N-2, 0 <= S <= 10^5

숙박비를 나타내는 정수 p, q가 입력된다

1 <= p < q <= 10^5

K줄에 걸쳐서 좀비에게 점령당한 도시가 한줄에 하나씩 주어진다

다음 줄부터 M줄에 걸쳐서 각 도시를 연결하는 정보가 주어진다

이 도로는 서로 양방향으로 이동 가능하다

1번 도시에서 N번 도시로 항상 도달 가능하다

최소 비용을 출력하라

----

다익스트라 + BFS 를 활용한 간단한 문제였다

로직은 다음과 같다

1. BFS 를 활용하여

    - 위험 도시를 체크한다
    - 단, S 거리 이내여야한다

2. 다익스트라를 활용하여

    - 1번 도시에서 N번 도시까지 도달하는 최소 비용을 구한다
    - 단, 좀비 도시는 방문하면 안된다
    - 위험 도시에서는 q 원, 그렇지 않으면 p 원을 지불해야한다
    - 1번 도시와 N번 도시에서는 지불하지 않는다

굿

## Input
```
13 21 1 1
1000 6000
7
1 2
3 7
2 4
5 8
8 9
2 5
3 4
4 7
9 10
10 11
5 9
7 12
3 6
4 5
1 3
11 12
6 7
8 11
6 13
7 8
12 13
```

## Output
```
11000
```


## Source Code 

```java

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        int p = Integer.parseInt(st.nextToken());
        int q = Integer.parseInt(st.nextToken());
        List<Integer> zombieCity = new ArrayList<>();
        boolean[] notAvailableCity = new boolean[N+1];
        for (int i = 0 ; i < K; i++) {
            int cur = Integer.parseInt(br.readLine());
            zombieCity.add(cur);
            notAvailableCity[cur] = true;

        }
        List<List<Integer>> adjList = new ArrayList<>();
        for (int i = 0; i < N+1; i++) {
            adjList.add(new ArrayList<>());
        }
        for (int i = 0 ; i < M ; i ++) {
            st = new StringTokenizer(br.readLine());
            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            adjList.get(from).add(to);
            adjList.get(to).add(from);
        }
        boolean[] infectedCity = BFS(adjList, zombieCity, N, S);
        sb.append(dijkstra(notAvailableCity, infectedCity, adjList, N, p, q));
        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    public static long dijkstra (boolean[] notAvailableCity, boolean[] infectedCity, List<List<Integer>> adjList, int N, int p, int q) {
        PriorityQueue<Human> hq = new PriorityQueue<>((a,b)->{
            return Long.compare(a.usedMoney, b.usedMoney);
        });
        Long[] distance = new Long[N+1];
        for (int i = 0; i < N +1; i ++) {
            distance[i] = Long.MAX_VALUE;
        }
        distance[1] = 0L;
        hq.add(new Human(1, 0L));
        while (!hq.isEmpty()) {
            Human cur = hq.poll();
            if (distance[cur.idx] < cur.usedMoney) continue;
            for (int nextCity : adjList.get(cur.idx)) {
                if (notAvailableCity[nextCity]) continue;
                if (nextCity == N) {
                    distance[nextCity] = Math.min(distance[nextCity], cur.usedMoney);
                } else {
                    long nextMoney = distance[cur.idx] + (infectedCity[nextCity] ? q : p);
                    if (nextMoney < distance[nextCity]) {
                        hq.add(new Human(nextCity, nextMoney));
                        distance[nextCity] = nextMoney;
                    }
                }
            }
        }
        return distance[N];
    }

    public static boolean[] BFS (List<List<Integer>> adjList, List<Integer> zombieCity, int N, int S) {
        boolean[] visited = new boolean[N+1];
        LinkedList<Zombie> queue = new LinkedList<>();
        for (int i = 0; i < zombieCity.size(); i++) {
            queue.add(new Zombie(zombieCity.get(i), S));
            visited[zombieCity.get(i)] = true;
        }

        while (!queue.isEmpty()) {
            Zombie cur = queue.poll();
            for (int nextCity : adjList.get(cur.idx)) {
                if (!visited[nextCity] && cur.hp > 0) {
                    queue.add(new Zombie(nextCity, cur.hp-1));
                    visited[nextCity] = true;
                }
            }
        }
        return visited;
    }

    public static class Human {
        int idx;
        long usedMoney;

        public Human (int idx, long usedMoney) {
            this.idx = idx;
            this.usedMoney = usedMoney;
        }
    }

    public static class Zombie {

        int idx;
        int hp;
        public Zombie (int idx, int hp) {
            this.idx = idx;
            this.hp = hp;
        }
    }
}
```