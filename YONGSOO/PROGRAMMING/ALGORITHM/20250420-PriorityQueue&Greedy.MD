## Source

https://www.acmicpc.net/problem/17612

## Commentary 


N명의 고객들이 계산을 하고 쇼핑몰을 떠나고자 계산대 앞에 줄을 서있다

각 고객은 커다란 짐수레에 물건을 담아 계산대로 간다

쇼핑몰에는 K개의 계산대가 병렬로 배치되어있다

안내원들은 계산대에 온 사람들을 가장 빨리 계산을 마칠 수 있는 계산대로 안내를 한다

안내원은 각 계산대에서 기다리고 있는 사람들이 계산을 하는데 얼마나 걸리는지 이미 알고 있다

기다려야할 시간이 같을 경우, 가장 번호가 작은 계산대로 안내를한다

계산대에서 계산을 마친 고객의 시간이 동일하면, 높은 번호의 계산대의 고객부터 빠져나간다

물건을 계산하는데에는 종류에 관계없이 동일하게 1분이 소요된다

물건이 w개 있는 손님은 w분이 소요된다


---

N과 K가 주어진다 1 <= N <= 10^5, 1 <= K <= 10^5

N개의 줄에 걸쳐 N명의 정보가 맨 앞 고객부터 맨 뒤 고객까지 순서대로 주어진다

i번째 줄은 줄의 앞에서부터 i번째 고객의 회원번호 ( 1 <= id <= 10^6 ),

그가 구입한 물건의 수 wi ( 1 <= wi <= 20) 으로 이루어져있다

N명의 회원번호는 모두 다르다

고객 N명의 회원번호를 쇼핑몰을 빠져나가는 순서대로 r1, r2, ... rN이라 할때,

1 X r1 + 2 X r2 + ... + N X rN 의 값을 출력하라

---

모든 고객의 회원 번호와, 구매하는 물건의 개수가 주어진다.

순차적으로 각 회원은 계산대에 들어가게 된다

1, 2, .... K 번 계산대로 입장하고,

그 사이에 계산대가 비게된다면, 빈 계산대로 입장하게 된다

계산대들을 우선순위큐로 관리한다면 어떤식으로 관리하게 되는가

[1번 계산대 계산 끝나는 시간, 2번 계산대 계산 끝나는시간, .... , K번 계산대 계산 끝나는 시간]

이런식이 되지않을까 ?

이렇게하면 그런데 절대시간을 관리해야한다

또한 K는 최대 10만이기 때문에, 공간복잡도는 10만을 넘길 수 없다

---

여기서 가장 핵심 문제는,

계산대에 입장할때는 번호가 낮은 계산대를 우선으로 입장하고,

퇴장할때는 번호가 높은 계산대를 우선으로 퇴장한다는 것이다.

일관되게 처리만 한다면, 번호가 낮은 계산대에서 우선으로 입장해도 되는 것이 아닐까 ?

그리고, 퇴장한 순서를 확인하는 것은,

모두 계산한 이후, 정렬하는 것으로 충분하지 않은가 ?

단 여기서, 계산대가 총 인원보다 많은 경우만 제거해준다면 되지 않을까

---

로직은 다음과 같다

1. 초기 설정

- 우선순위 큐를 사용하여 계산대를 관리한다
- 초기에는 모든 계산대가 비어있으므로 0, 0, K개의 계산대를 큐에 추가한다 (N이 K보다 작을 경우 N개)

2. 계산대 배정 과정

- N명의 고객 정보를 순서대로 입력받는다
- 매번 가장 빨리 끝나는 계산대를 꺼내고, 해당 계산대에 새로운 고객을 배정한다
- 새로운 고객의 계산 종료시간은 이전 계산대의 종료 시간 + 물건 수
- 배정된 고객 정보는 다시 우선순위 큐에 넣는다
- 이때 ID가 0이 아닌경우, 이전에 계산을 마친 고객이므로 list에 추가

3. 남은 고객 처리

- 모든 고객 배정이 끝난 후, 우선순위 큐에 남은 고객들을 list에 추가

4. 정렬 및 계산

- 고객 리스트를 계산 종료 시간 기준으로 정렬한다
- 같은 시간에 여러명이 종료될 경우, 계산대 번호가 큰 순서대로 정렬한다 (문제 조건 : 계산이 동시에 끝나면 번호가 큰 계산대의 고객이 먼저 나감)
- 정렬된 순서에 따라 1부터 가중치를 부여하여 ID와 곱한 값을 누적합으로 계산



## Input
```
10 3
123 4
21 5
34 14
56 1
45 7
723 5
55 7
13 5
910 10
73 3
```
## Output
```
13900
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
        int N = Integer.parseInt(st.nextToken()), K = Integer.parseInt(st.nextToken());
        PriorityQueue<User> pq = new PriorityQueue<>();
        // 빈 계산대 세팅
        for (int i = 0; i < Math.min(K, N); i ++) {
            pq.add(new User(0, 0L, i));
        }

        ArrayList<User> list = new ArrayList<>();
        for (int i = 0; i < N; i ++) {
            st = new StringTokenizer(br.readLine());
            int id = Integer.parseInt(st.nextToken());
            long w = Long.parseLong(st.nextToken());
            User empty = pq.poll();
            pq.add(new User(id, empty.time + w, empty.k));
            if (empty.id != 0) {
                list.add(empty);
            }
        }

        while (!pq.isEmpty()) {
            list.add(pq.poll());
        }

        list.sort((a,b)->{
            return a.time == b.time ? Integer.compare(b.k, a.k) : Long.compare(a.time, b.time);
        });

        long ans = 0L;
        for (int i = 1; i < N+1; i ++) {
            ans += (long) list.get(i-1).id * (long) i;
        }
        StringBuilder sb= new StringBuilder("");
        sb.append(ans);
        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    public static class User implements Comparable<User> {
        int id;
        int k;
        long time;
        public User (int id, long time, int k) {
            this.id = id;
            this.k = k;
            this.time = time;
        }

        @Override
        public int compareTo(User other) {
            return this.time == other.time? Integer.compare(this.k, other. k ) : Long.compare(this.time, other.time);
        }

        @Override
        public String toString() {
            return "ID : " + this.id + " K : " + this.k + " TIME : " + this.time;
        }
    }

}

```