## Source

https://www.acmicpc.net/problem/25401

## Commentary

N개의 카드가 놓여있다. 편의상 가장 왼쪽에 있는 카드를 1번 카드, 그 다음 카드를 2번 카드 ....

N개의 카드에는 각각 정수가 하나씩 적혀있다. i번 카드에 적힌 수를 xi라고 하자

N개의 카드 일부에 적혀있는 수들을 적절히 바꾸어서,

왼쪽에서 오른쪽으로 갈 수록 카드에 적혀잇는 수들이 일정하게 증가하거나,

감소하거나, 혹은 모든 수들이 같도록 하고싶다

카드에 적혀있는 수들을 바꿀때는, 정수 값으로만 바꿀 수 있으며, 바꾸는 횟수를 최소화 해야한다

예를들어 카드들이 다음과 같이 주어졌다고 하자

1 2 2 4

이 경우, 3번 카드에 적혀있는 수를 3으로 바꾸면 아래와 같이 1씩 증가하도록 할 수 있다

1 2 3 4

혹은 모든 카드에 적혀있는 수를 2가 되도록 할 수 있다

2 2 2 2

가장 왼쪽에 있는 카드부터 가장 오른쪽에 있는 카드까지 각 카드에 적혀있는 수들이 순서대로 주어질때

조건을 만족하도록 하려면 바꿔야할 카드의 수의 최솟값은 ?



카드의 수 N 이 주어진다 2 <= N <= 500

각 카드에 적힌 수 xi가 공백을 사이에 두고 주어진다 -10^6 <= xi <= 10^6

답을 출력하라


-----


조건은 세가지이다.

증가하거나 / 감소하거나 / 동일하거나 해야한다

N의 제한 조건은 500이다.

따라서, 최대 3번까지 순회할 수 있다. 시간 제한이 1.5초이기 때문이다.

즉, 다이나믹 프로그래밍으로 한다면 3차원 배열까지 쓸 수 있다는 말이다.

그냥 다 해버리면 되는 것 아닌가 ?

그런데 문제가 있다.

각 수열을 만들기 위해, 기준점이 있어야 한다.

1 100 3 4 일 경우에,

99 100 101 102도 될수있고

1 2 3 4 도 될 수 있다

이렇게 기준점을 하나 잡고 모든 N개의 카드를 순회하면, 500*500이 된다. 250000 이다.

근데 25만이면 충분한거 아닌가?

-----

아 문제를 잘못 읽었다.

"일정하게" 감소하거나, "일정하게" 증가하거나 해야한다는 것을 그냥 1씩 감소하거나 1씩 증가하거나로 읽었다

이런

갑자기 문제 난이도가 확 올라갔네

일정하게 감소하거나 증가하거나 하려면 어떻게 해야하는가 ?

최소 값은 -100만에서 100만까지 가능하다

즉, 500개의 카드가 있을떄, 2000000 / 500 만큼의 간격이 있어야 한다는 것인데,

40000까지 간격이 가능하다는 것이므로,

기존 로직대로 하면,

500 x 500 x 40000 이 된다. 이건 10000000000으로 10^10이므로 절대 불가능하다.

그렇다면,

간격 기준을 다른식으로 잡아볼까 ?

-----

- 메인 로직

    1. 각 카드의 인덱스를 기준으로 삼아 브루트포스 방식으로 모든 경우의 수를 검사한다
    2. 가장 적은 수의 카드 변경으로 등차 수열을 만들 수 있는 경우를 찾아 답으로 반환한다

- 브루트포스 로직

    1. 기준 인덱스와 그 인덱스 값을 기준으로 삼는다
    2. 모든 다른 인덱스와 비교한다
    3. 기준 인덱스와 비교 인덱스 사이의 간격과 값의 차이를 계산한다
    4. 등차 수열의 공차를 계산한다
        - 두 값의 차이 / 두 인덱스의 차이
        - 나누어 떨어지지 않으면 유효한 등차수열이 되지 않으므로 무시한다

    5. 각 경우에 대해 세가지 시나리오를 계산한다
        - 증가하는 등차 수열로 만들기 위해 변경해야하는 카드 수
        - 감소하는 등차 수열로 만들기 위해 변경해야하는 카드 수
        - 모든 값이 같은 등차수열로 만들기 위해 변경해야 하는 카드 수

    6. 세 시나리오 중 가장 적은 변경 횟수를 결과로 반환한다

생각보다 어렵지 않은 문제였다.

처음에 일정한 간격을 만들라는 것을 못보고 1로 생각했지만,

결국 그 로직 안에서 500 x 500 x 500 내에 문제를 해결할 수 있겠다는 생각이 이어졌고,

한번에 솔브해서 기분이 좋네

## Input

```
4
1 2 2 4
```

## Output
```
1
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
        int N = Integer.parseInt(br.readLine());
        int[] cards = new int[N];
        int ans = 501;
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i ++) {
            cards[i] = Integer.parseInt(st.nextToken());
        }
        for (int i = 0; i < N; i ++) {
            ans = Math.min(ans , bruteForce(cards, N, i));
        }
        sb.append(ans);
        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    public static int bruteForce (int[] cards, int N, int standardIdx) {

        int res = 501;
        for (int compareIdx = 0; compareIdx < N; compareIdx ++) {
            int increaseCnt = 0;
            int decreaseCnt = 0;
            int sameCnt = 0;
            if (compareIdx == standardIdx) continue;
            int interval = cards[standardIdx] - cards[compareIdx];
            int dist = standardIdx - compareIdx;
            if (interval % dist != 0) continue;
            int weight = interval / dist;
            for (int changeIdx = 0; changeIdx < N; changeIdx ++) {
                if (changeIdx == standardIdx) continue;
                int distance = standardIdx - changeIdx;
                if ((cards[standardIdx] - distance*weight) != cards[changeIdx]) {
                    increaseCnt++;
                }
                if ((cards[standardIdx] + distance*weight) != cards[changeIdx]) {
                    decreaseCnt++;
                }
                if (cards[standardIdx] != cards[changeIdx]) {
                    sameCnt++;
                }
            }
            res = Math.min(res, Math.min(increaseCnt, Math.min(decreaseCnt, sameCnt)));
        }

        return res;
    }
}
```