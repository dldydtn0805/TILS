## Source

https://www.acmicpc.net/problem/2613

## Commentary

N개의 숫자구슬이 막대에 꿰어져 일자로 놓여있다

54269387

이들 구슬은 막대에서 빼낼수없고, 바꿀수 없다

이 숫자 구슬을 M개의 그룹으로 나누었을 때,

각각의 그룹의 합 중 최댓값이 최소가 되도록 하려 한다

예를들어 세 그룹으로 나눈다 할떄,

542 69 387

와 같이 그룹을 나누면 그룹의 합은 각각 11, 15, 18이 되어 최댓값은 18이 된다

만약 다음과 같이 나눈다면

5426 93 87

그룹의 합은 17 12 15가 되어 최댓값은 17이 된다

각 그룹의 합중 최댓값이 최소가 되도록 M개의 그룹으로 나누었을때,

그 최댓값과 각 그룹을 구성하는 구슬의 개수를 찾아 출력하라


----


구슬의 개수 N과 그룹의 수 M이 주어진다

각 구슬이 적혀진 숫자가 왼쪽부터 차례로 주어진다

N은 3 * 10^2 이하의 자연수, M은 N 이하의 자연수다

구슬에 적혀진 숫자는 10^2 이하의 자연수이다

각 그룹의 합중 최댓값이 최소가 되도록 M을 나누었을때,

그 최댓값을 첫째줄에 출력하고,

둘째줄에 각 그룹을 구성하는 구슬의 개수를 왼쪽부터 순서대로 출력하라

구슬의 개수를 출력할때는 사이에 한칸의 공백을 둔다

만약 그룹의 합의 최댓값이 최소가 되도록 하는 경우가 둘 이상이라면, 그중하나만을 출력하라


----

그룹을 M개로 나누었을때

각 그룹의 합의 최댓값을 최소로 만드는 문제다

이걸 어떻게 접근하는게 좋을까 ..

후보군

1. DP

2. 분할정복

3. 누적합

----

DP로 접근한다 치면,

DP[beadIndex][groupName] 이런식으로 접근하면 되려나?

각 그룹의 인덱스까지 해당 구슬 인덱스까지 합했을때, 더한 최댓값을 구하면 될까 ?

그렇다면 점화식은 어떻게 해야할까 ?

DP[beadIndex][groupName] =

    Min( DP[beadIndex-1][groupName] + beads[beadIndex], DP[beadIndex][groupName-1] + beads[beadIndex] )

이런식으로 하면 될까 ?

이렇게하면 DP[N-1][M-1]이 그룹의 합이 최댓값이 최소가 되도록 하는 경우가 아닐까 ?

근데 이거 누적합을 사용한 Top-Down DP로 하면 더 좋을거같은데

DP(left, right, depth) = dp[depth][l][r]로 두고, depth 만큼 분할했을때, 그룹의 합의 최솟값이라 하면 어떤가

이렇게하면 쉽게 그룹을 출력할수있을거같기도하고

와 진자 정신나가겟는디

일단 해보자

만약, N개의 구슬을 M개의 그룹으로 나눈다 쳤을때

어떤식으로 접근해야하는가...

현재 인덱스를 이전 그룹에 포함시킬지 여부를 판단해주어야하지않은가 ?

----

도저히 DP로 못풀겠어서

이분탐색으로 해봤다...

풀긴 햇다!!!!!!!!!! 겁나 어렵다 진짜

처음부터 이분탐색으로 했으면 훨씬 쉬웠을거같긴한데 ...

로직은 다음과 같다

1. 이진 탐색 활용

- 그룹 무게 합의 최댓값을 최소화하기 위해 이진 탐색을 사용한다

- 0부터 MAX_VALUE 까지의 범위에서, 가능한 최대 그룹 무게를 찾는다

2. 특수 케이스 처리

- 구슬의 개수 N과 그룹 수 M이 같으면, 각 구슬을 개별 구슬로 나누면 되므로 가장 무거운 구슬의 무게가 답이다

3. 이진 탐색 로직

- 중간 값을 정하고, 이 값이 최대 그룹 무게로 가능한지 check 함수로 확인한다

- 가능하면 결과값을 갱신하고, 더 작은 범위에서 탐색한다

- 불가능하면 더 큰 범위에서 탐색한다

4. check 함수

- 주어진 최대 무게로 M개의 그룹을 만들 수 있는지를 확인한다

- 순차적으로 구슬을 그룹에 추가하며 그룹 무게의 합이 m을 초과하면 새 그룹을 시작한다

- 모든 구슬을 처리한 후, 각 그룹의 구슬 개수를 splitIndexes 배열에 저장한다

- 무게가 m보다 큰 단일 구슬이 있거나, 필요한 그룹수가 M을 초과하면 false 를 반환한다

5. 그룹 균형 조정

- 비어있는 그룹이 있으면, 이전 그룹에서 구슬을 빌려와 균형을 맞춘다


----

겁나 어렵네 진ㅉㄹㅇㄴㅁㄹㅇㅁㄴ

## Input

```
8 3
5 4 2 6 9 3 8 7
```

## Output
```
17
4 2 2
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
        int N = Integer.parseInt(st.nextToken()), M = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        int[] beads = new int[N];
        for (int i = 0; i < N ; i ++) {
            beads[i] = Integer.parseInt(st.nextToken());
        }
        int[] splitIndexes = new int[M];
        sb.append(parametricSearch(0, Integer.MAX_VALUE, beads, N, M, splitIndexes)).append("\n");
        for (int i = 0; i < M; i ++) {
            sb.append(splitIndexes[i]).append(" ");
        }
        bw.write(sb.toString().trim());
        bw.close();
        br.close();
    }


    public static int parametricSearch (int l, int r, int[] beads, int N, int M, int[] splitIndexes) {
        int res = Integer.MAX_VALUE;
        if (N == M) {
            res = 0;
            for (int i = 0; i < N; i ++) {
                res = Math.max(res, beads[i]);
            }
            int[] curSplitIndexes = new int[M];
            Arrays.fill(curSplitIndexes, 1);
            System.arraycopy(curSplitIndexes, 0, splitIndexes, 0, M);
            return res;
        }
        while (l <= r) {
            int m = (l + r) / 2;
            if (check(m, beads, N, M, splitIndexes)) {
                res = Math.min(res, m);
                r = m - 1;
            } else {
                l = m + 1;
            }

        }
        return res;
    }

    public static boolean check (int m, int[] beads, int N, int M, int[] splitIndexes) {
        int groupCnt = 1;
        int curGroupSum = 0;
        int curGroupSize = 0;
        int[] curSplitIndexes = new int[M];
        for (int beadIdx = 0; beadIdx < N; beadIdx ++) {
            if (curGroupSum + beads[beadIdx] <= m) {
                curGroupSum += beads[beadIdx];
                curGroupSize++;
            } else {
                if (groupCnt + 1> M) return false;
                curSplitIndexes[groupCnt -1] = curGroupSize;
                curGroupSize = 1;
                if (beads[beadIdx] > m) return false;
                curGroupSum = beads[beadIdx];
                groupCnt++;
            }
        }
        curSplitIndexes[groupCnt -1] = curGroupSize;
        for (int i = 1; i < M; i ++) {
            if (curSplitIndexes[i] == 0) {
                if (curSplitIndexes[i-1] > 1) {
                    curSplitIndexes[i] = curSplitIndexes[i-1] - 1;
                    curSplitIndexes[i-1] = 1;

                }
            }
        }
        System.arraycopy(curSplitIndexes, 0, splitIndexes, 0, M);
        return true;
    }

}
```