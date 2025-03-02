## 문제
https://www.acmicpc.net/problem/31778

## 해설

포닉스는 대회전 S에 다음과 같은 연산을 최대 K번 시행할 수 있다

- 1 <= i <= j  <= N인 두 정수 i, j를 골라 S[i]와 S[j]를 바꾼다

포닉스는 완성된 문자열 S에 PPC 부분문자열이 가장 많게 하려고 한다.

PPC 부분 문자열의 개수란,

1 <= i < j < k <= N이고,

S[i] = S[j] = P S[k] = C인 (i, j, k)의 개수다.

문자열 S의 길이 N과 연산의 최대 사용횟수 K가 주어진다 1 <= N <= K <= 2*10^6

길이가 N인 문자열 S가 주어진다. S는 C와 P 만으로 이루어져있다
포닉스가 만들 수 있는 PPC 부분문자열 개수의 최댓값은?

PPC 부분 문자열이 구성되기 위해서, 체크해야할 인덱스는 세개이다.

S는 C와 P 만으로 이루어져있다

우선적으로 체크해야할 사실은 K 연산은 2*10^6번까지 시행할 수 있어야하고

N 길이도 최대 2*10^6번까지 시행할 수 있어야한다.

그렇기때문에 1번 순회하는 것으로 모든 결과가 나와야한다.

K 연산을 통해 우리는 임의의 문자열 S로 재구성할 수 있다.

가장 단순하게 생각해보면 K 연산을 무제한으로 할 수 있다면,

최대한 PPPP...PCCCC..C 형태로 바꾸는 것이다.

이 상태가 가장 PPC 부분 문자열 개수가 많지 않을까 ?

하지만 K 연산의 횟수는 제한되어있다.

예컨대 예제 2번을 보자면

CCPCPPCP 가 주어지는데,

맨 뒤에있는 P를 맨 앞에 C와 바꾸고

그 다음 뒤에있는 P를 두번째 C와 바꾼다면

PPPCPCCC 가 되게 된다.

그렇다면, 이제 부분 문자열의 개수를 세야한다.

부분 문자열을 구성하는 요소는 PPC이다.

따라서 C를 기준으로 앞에 P의 개수를 세보자

첫번째 C 앞에는 3개의 P가 있다.

즉 다시말해 3개중에 2개를 고르는 경우의 수가 해당 C가 포함된 부분 문자열의 개수인 것이다.

n개 중에 r개 조합의 개수를 구하는 공식은 nCr, n*(n-1)/2이다.

3개중에 2개를 고르는 경우의 수는 3C2, 즉 3이다

두번째 C는 어떨까 ?

4개중에 2개를 고르는 경우의 수겠지. 4C2, 즉 6이다.

따라서 두번째 예제의 부분 문자열의 개수는 3 + 6 + 6 + 6이 된다.

예제 출력과 동일한 결과가 나온다.

실제로 이를 다음과 같이 구현해보자.

1. 이를 투포인터를 사용해 배열을 최대한 가능하게 수정하자.

2. 그리고 최적화된 배열을 1번 순회하며 P인 경우 P의 개수를 세주고 C인 경우 P의 개수를 이용해 결과에 더해주자



## 입력
```txt
3 1
CPP
```

## 출력
```txt
1
```

## 코드
```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());
        String S = br.readLine();
        boolean[] PPC = new boolean[N]; // // P인 경우 true, C인 경우 false로 진행하자
        for (int i = 0; i < N; i++) {
            PPC[i] = S.charAt(i) == 'P';
        }
        boolean[] res = twoPointer(PPC, N, K);
        long pCnt = 0;
        long ans = 0;
        for (int i = 0; i < N; i ++) {
            if (PPC[i]) {
                pCnt++;
            } else {
                ans += pCnt*(pCnt-1)/2;
            }
        }
        sb.append(ans);
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }
    public static boolean[] twoPointer (boolean[] PPC, int N, int K) {
        int l = 0;
        int r = N-1;
        int cnt = 0;
        while (l <= r && cnt < K) {
            if (PPC[l]) {
                l ++;
                continue;
            }
            if (!PPC[r]) {
                r --;
                continue;
            }
            PPC[l] = !PPC[l];
            PPC[r] = !PPC[r];
            cnt ++;
        }
        return PPC;
    }

}
```