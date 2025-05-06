## Source

https://www.acmicpc.net/problem/3430

## Commentary


마을에 호수가 여러개 있고, 모두 물이 들어있다

비가 내렸을때 호수가 비어있다면, 호수는 다시 물로 꽉 찬다

만약 호수에 물이 있는데 다시 비가 내릴 경우 호수가 넘쳐흘러 재앙이 온다

용은 비가 오지 않는 날에는 하루에 한개의 호수에 있는 물을 전부 먹는다

비가 오는날에는 물을 마시지 못한다

용이 재앙을 막을 수 있도록 도와주자

---

테스트 케이스의 수 Z가 주어진다

각 테스트 케이스의 첫번째 줄에는 두개의 자연수 N, M이 주어진다

N은 호수의 개수이고, M은 호수에 비가 내리는 날의 수이다

(N, M <= 10^6)

각 테스트 케이스의 둘째 줄에는 t1, t2, t3 ... tm 이 주어진다

만약 ti가 자연수라면, i번째 날에는 ti번 호수에서 비가 내림을 의미한다

ti가 0이라면, i번째 날에는 비가 오지 않음을 의미하고,

이날은 용이 호수로부터 물을 마실 수 있다

용은 비가 오는 날만 물을 마실 수 있다

---

재앙을 막을 수 있다면 YES, 없다면 NO를 출력하라

만약 YES 인 경우, K개의 (자연수, 혹은 0)을 출력하라

K는 일기예보에서 주어진 0의 개수, 즉 비가 오지 않는 날의 수 이다

각 자연수는 용이 물을 마셔야 할 호수의 번호를 나타낸다

만약 0일 경우, 아무 호수에서도 물을 마시지 않음을 의미한다

---

주어지는 정보는 일기예보다.

0이라는 것은 비가 오지 않는다는 것이고, 용이 물을 마실 수 있다는 것을 의미한다

i라는 것은 비가 온다는 것이고, i번 호수에 비가 온다는 것을 의미한다

즉, i가 중복되어 주어진다면, 용이 재앙을 막을 수 없다

반대로 말하면, i와 i 사이에 0이 하나라도 있으면 용은 재앙을 막는다

또한, 호수의 물은 이미 가득 채워져있다.

예컨대,

2 4
0 1 0 2

이라는 것은,

2 4
1 2 0 1 0 2

와 같다는 말이다.

이 경우,

첫번째 0은 1번 호수의 물을 마시고, 두번째 0 은 2번 호수의 물을 마신다

그리고, 1번 호수는 가득 차고, 2번 호수도 가득 차게 된다.



---

따라서 물을 마시는턴을 최대한 유리하게 사용해야한다

트리 세트와 맵을 사용해서 해결할 수 있다

트리 세트에 들어가는 것은 물을 마시는 턴의 인덱스들이다

맵에 들어가는 것은, 각 호수에 이전에 비가 내린 턴의 인덱스들이다.

만약 현재 호수에 비가 내리는 턴이라면,

맵에서 이전에 비가 내린 턴의 인덱스와,

트리 세트에 있는 물을 마시는 턴의 인덱스 들 중,

이전에 내린 턴의 인덱스 보다 높은 값중  가장 작은 값의 것을 소모한다

---

로직 자체는 동일한 C++ 코드는 통과하고, Java 코드는 통과하지 못하는 문제가 있어서

질문 게시판을 통해 정보를 얻었다


1. 배열 생성과 트리 세트를 한번만 생성 하고, 각 greedy 메서드 내에서 초기화 해서 사용할 것.

    - 해시맵으로 각 호수의 이전에 비가 내린 날을 확인한 것을 배열로 수정했다.
    - 모든 테스트 케이스마다 배열과 트리 세트를 여러번 생성하는 것은 메모리 초과의 원인이 될 수 있다.

2. 커스텀 FastIO를 사용할것.

    - BufferedReader는 128MB 메모리 제한에서 입력 과정에서 초과가 날 수 있다. 

3. System.gc() 를 적절히 사용할것.

    - JVM에게 가비지 컬렉션 요청을 보내는 것으로 메모리 관리에 도움 받을 수 있다. 단, 너무 남용시 시간 초과의 원인이 될 수 있다.

세가지를 통해 Java로 해결할 수 있었다.



## Input
```
4
2 4
0 0 1 1
2 4
0 1 0 2
2 3
0 1 2
2 4
0 0 0 1
```

## Output
```
NO
YES
1 2
NO
YES
0 1 0
```

## Source Code

```java
import java.io.*;
import java.util.*;

public class Main {
    private static int read() throws IOException {
        int n = 0;
        int i;
        while ((i = System.in.read()) >= '0') {
            n = (n<<3) + (n<<1) + (i&15);
        }
        return n;
    }

    public static void main(String[] args) throws IOException {
        StringBuilder sb = new StringBuilder();

        int Z = read();

        TreeSet<Integer> ts = new TreeSet<>();
        int[] lakes = new int[1000001];

        for (int tc = 0; tc < Z; tc++) {
            int N = read();
            int M = read();
            int[] weatherCast = new int[M];
            for (int i = 0; i < M; i++) {
                weatherCast[i] = read();
            }
            sb.append(greedy(weatherCast, N, M, ts, lakes));
            System.gc();
        }

        System.out.print(sb);
    }

    public static String greedy(int[] weatherCast, int N, int M, TreeSet<Integer> ts, int[] lakes) {
        // 기존 데이터 초기화
        ts.clear();
        Arrays.fill(lakes, -1);

        int[] ans = new int[M];
        for (int i = 0; i < M; i++) {
            if (weatherCast[i] == 0) {
                ts.add(i);
            } else {
                if (!ts.isEmpty()) {
                    Integer drinkTurn = ts.higher(lakes[weatherCast[i]]);
                    if (drinkTurn != null) {
                        ans[drinkTurn] = weatherCast[i];
                        ts.remove(drinkTurn);
                        lakes[weatherCast[i]] = i;
                    } else {
                        return "NO\n";
                    }
                } else {
                    return "NO\n";
                }
            }
        }

        StringBuilder result = new StringBuilder("YES\n");
        for (int i = 0; i < M; i++) {
            if (weatherCast[i] == 0) {
                result.append(ans[i]).append(" ");
            }
        }
        result.append("\n");
        return result.toString();
    }
}
```