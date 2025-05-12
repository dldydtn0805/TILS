## Source

https://school.programmers.co.kr/learn/courses/30/lessons/42583

## Input

```
2 10 [7,4,5,6]
```

## Output

```
8
```

## Commentary

(0 <= bridge_length <= 10^4)

(1 <= weight <= 10^4)

(1 <= truck_weights.length <= 10^4)

(1 <= truck_weights[i] <= weight)

---

모든 트럭이 다리를 건너려면 최소 몇초가 걸리는가

다리 길이를 N, 다리가 견딜 수 있는 총 무게를 M, 전체 트럭의 개수를 L 이라고 하자.

queue를 다리로 생각하자.

그렇다면 첫번째 트럭이 올라가기 전에 다리는 N-1개 만큼의 무게 0의 트럭이 이미 있는 것과 같다.

첫 트럭이 올라가는 순간, 시간은 1이 되고, 다리의 무게는 1번 트럭의 무게가 된다.

이제 2번째 트럭부터 마지막 트럭까지 순회하자.

2번째 트럭부터는 이제 큐를 이용해서 순회할 수 있게 된다.

- 만약, (다리에 올라와있는 트럭들의 무게 [curWeight] - 가장 맨 앞에 있는 트럭의 무게 [queue.getFirst()] + 이번에 넣어야할 트럭의 무게 [truck_weights[i]] ) > M 인 경우,
	- 이번  트럭을 바로 올릴 수 없으므로, 가능한 무게가 될 때까지 가능한대로 맨 앞에 있는 트럭을 빼주며, 0의 가상 트럭을 다리에 올려준다. 물론 시간도 함께 세주고, 다리 위의 트럭 전체 무게도 갱신해준다.
- 위의 while 문이 종료되었다는것은, 이번 트럭을 정상적으로 다리 위에 올릴 수 있다는 의미이기 때문에, 다리의 맨 앞에있는 트럭을 빼주고, 이번 트럭을 올려준다. 물론 시간도 세주고, 다리 위의 트럭 전체 무게도 갱신한다.

- 모든 순회가 끝난 후, 다리 위에 있는 트럭들을 순차적으로 꺼내면서 개수를 세준다. 

--- 

이 문제에서 가장 핵심은 큐에 비어있는 가상의 트럭을 적절히 삽입하고, 조건에따라 턴을 계산할 수 있는가다.

완전히 올라가지 않은 트럭은 다리의 무게로 계산하지 않으므로, [curWeight - queue.getFirst() + truck_weights[i]] 를 조건으로 가능 여부를 판단하는 것이 중요했다.

## Source Code

```java

import java.util.*;

class Solution {
    public int solution(int bridge_length, int weight, int[] truck_weights) {
        int answer = 0;
        System.out.println(Arrays.toString(truck_weights));
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        int N = bridge_length;
        int M = weight;
        int L = truck_weights.length;
        
        for (int i = 0; i < N-1; i ++) {
            queue.addLast(0);
        }
        queue.add(truck_weights[0]);
        int curWeight = truck_weights[0];
        int cnt = 1;
        for (int i = 1; i < L; i ++) {
            while (curWeight - queue.getFirst() + truck_weights[i] > M ) {
                curWeight -= queue.pollFirst();
                queue.add(0);
                cnt ++;
            }
            curWeight -= queue.pollFirst();
            curWeight += truck_weights[i];
            queue.addLast(truck_weights[i]);
            cnt ++;
        }
        while (queue.size() > 0) {
            queue.pollFirst();
            cnt ++;
        }
        return cnt;
    }
}
```
