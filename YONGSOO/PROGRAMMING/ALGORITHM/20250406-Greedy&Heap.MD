## Source

https://www.acmicpc.net/problem/14464

## Commentary


농장에 C 마리의 닭이 있다 1 <= C <= 2*10^4

1번부터 C 번까지 번호가 붙어있다

i번 닭은 정확히 Ti 초에만 소를 도와줄 수 있다

닭은 길 건너기의 달인이므로, 소를 데리고도 길을 건널 수 있다

소는 할일이 없어서 여유롭게 길을 건널 수 있다

소는 총 N마리 1 <= N <= 2*10^4 가 있고, 마찬가지로 1번부터 N 번까지 번호가 붙어있다

j번 소는 Aj 부터 Bj 초까지 길을 건널 수 있다

j번 소가 i번 닭의 도움을 받아 길을 건너려면 Aj <= Ti <= Bj를 만족해야한다

소는 최대 한마리의 닭에게만 도움을 받을 수 있고, 닭 역시 최대 한마리의 소만 도와줄 수 있다

도움을 받을 수 있는 소가 최대 몇마리인지 구하자

-----


C와 N이 주어진다.

C 줄에는 T1...TC가 주어지고, 그 다음 N 줄에는 Aj와 Bj가 주어진다 Aj <= Bj

A, B, T는 모두 10^9인 음이 아닌 정수이고, 같을 수도 있다

-----

i번 닭이 도와줄 수 있는 시간은 Ti 초이다

j번 소가 도움을 받을 수 있는 시간은 Aj ~ Bj 초이다

i와 j는 일대일 대응을 해야한다

최대로 도움을 받을 수 있는 소의 마리 수를 구하려면 어떻게 해야할까 ?

시간초는 최대 10^9 이므로 모든 시간을 검토하는 것은 불가능하다

소와 닭의 마리수는 각각 최대 2*10^4이므로 이중 순회를 하는 것도 불가능하다

최대 마리수를 구하기 위해서는, 여러 알고리즘을 생각할 수 있다

1. 그리디

2. 다이나믹 프로그래밍

등이 있겠지...

어떻게 하면 최대한 많은 소가 도움을 받을 수 있도록 세팅을 해줄 수 있을까 ?

단순히 생각하면,

닭을 낮은 시간초 순서대로 정렬하고, 소도 낮은 시간초 순서대로 정렬한다

모든 소들마다 모든 닭을 반복하여 최대로 도움 받을 수 있는 마리수를 계산하면 될거같긴하다

시간 초과가 나지 않을지 걱정이긴 한데, 한번 해볼까 ?


-----

와 겁나게 어렵네 ..

닭의 시간만을 담은 우선순위 큐 `chickens`, 소의 시작시간만을 담은 우선순위 큐 `cows`, 소의 종료시간만을 담은 우선순위 큐 `onLine`를 사용해서 해결했다....

로직은 다음과 같다...


1. 닭들을 시간 순으로 정렬한다 (우선순위 큐 chickens)

2. 소들을 시작 시간 순으로 정렬한다 (우선순위 큐 cows)

3. 각 닭에 대해
    - 현재 닭의 시간보다 시작 시간이 작거나 같은 소들을 별도의 우섭순위 큐 (onLine)에 넣는다
    - 그 중 현재 닭의 시간을 포함하는 소를 찾아 매칭한다
    - 매칭이 되면 그 소는 더이상 사용하지 않는다
    - 종료 시간이 이른 소부터 확인하며, 현재 닭이 도울 수 있는 소를 찾는다
    - 조건을 만족하는 소를 찾으면 매칭 카운트를 증가시키고 다음 닭으로 넘어간다


- 그리디 전략
    - 시간이 빠른 닭부터 처리하여 가능한 많은 소를 도울 수 있도록 한다
    - 각 닭에 대해 종료 시간이 빠른 소부터 매칭하여 급한 소를 먼저 처리한다.


----

정신 나가는 문제다

으악!


## Input

```
5 4
7
8
6
2
9
2 5
4 9
0 3
8 13
```

## Output
```
3
```

## Source Code

```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int C = Integer.parseInt(st.nextToken());
        int N = Integer.parseInt(st.nextToken());

        PriorityQueue<Integer> chickens = new PriorityQueue<>();

        PriorityQueue<Cow> cows = new PriorityQueue<>((a, b)->{
            return a.time - b.time;
        });

        int[] endTimes = new int[N];
        int[] startTimes = new int[N];

        for (int i = 0; i < C; i++) {
            chickens.add(Integer.parseInt(br.readLine()));
        }

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            startTimes[i] = Integer.parseInt(st.nextToken());
            endTimes[i] = Integer.parseInt(st.nextToken());
            cows.add(new Cow(i, startTimes[i]));
        }
        StringBuilder sb = new StringBuilder("");
        sb.append(solve(chickens, endTimes, startTimes, N, cows));
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int solve (PriorityQueue<Integer> chickens, int[] endTimes, int[] startTimes, int N, PriorityQueue<Cow> cows) {
        int cnt = 0;
        boolean[] visited = new boolean[N];

        PriorityQueue<Cow> onLine = new PriorityQueue<>((a, b)->{
            return a.time - b.time;
        });

        while (!chickens.isEmpty()) {
            int chicken = chickens.poll();

            while (!cows.isEmpty()) {
                if (cows.peek().time <= chicken) {
                    Cow cur = cows.poll();
                    onLine.add(new Cow(cur.idx, endTimes[cur.idx]));
                } else {
                    break;
                }
            }
            while (!onLine.isEmpty()) {
                Cow cur = onLine.poll();
                if (cur.time >= chicken && startTimes[cur.idx] <= chicken) {
                    cnt ++;
                    break;
                }
            }
        }
        return cnt;
    }

    public static class Cow {
        int idx;
        int time;

        public Cow(int idx, int time) {
            this.idx = idx;
            this.time = time;
        }

        public String toString () {
            return "idx : " + this.idx + " time : " + this.time;
        }

    }
}

```