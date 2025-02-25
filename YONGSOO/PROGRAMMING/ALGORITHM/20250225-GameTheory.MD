```java
// https://www.acmicpc.net/problem/4342

/*해설

유클리드 게임은 두명이서 하는 게임이다. 자연수 2개로 시작한다.

동혁이는 큰 수를 작은수의 배수만큼 뺀다. 이때 큰 수는 음이아닌 정수가 되어야하고 전보다 작아져야한다.

동규는 동혁이가 한 것과 똑같이 큰 수를 작은수의 배수만큼 뺀다.

이런식으로 두플레이어는 서로 번갈아가면서 게임을 하고, 큰 수를 0으로 만든사람이 게임을 승리한다.

각 줄은 게임을 시작하는 두 숫자다. 항상 동혁이가 먼저 게임을 시작한다.

각 입력에 대해 동혁이가 이기면 A wins, 동규가 이기면 B wins를 출력하라

어째서 euclid 함수가 승자를 판별할 수 있는지에 대한 증명은 다음과 같다.

1. X % Y인 경우, 현재턴인 플레이어는 바로 승리할 수 있다.

2. X - Y < Y인 경우,

    - 현재 플레이어는 이후 상태를 (Y, Z)로만 만들 수 있다. 승리 여부는 상태에게 달린다.

3. 그 외의 경우,

    - 현재 플레이어는 항상 승리한다.

3번의 경우를 예시를 통해 이해해보자

두 수가 7, 25라면 다음 상태는 7, 11 혹은 4, 7이다.

만약 7, 11로 만들었다면, (4, 7) -> (3, 4) -> (1, 3) -> (0, 1)을 통해 선공이 이긴다. [A]

만약 4, 7로 만들었다면 (3, 4) -> (1, 3) -> (0, 1)을 통해 후공이 이긴다. [B]

여기서 알 수 있는 사실은, [B]는 [A]에서 파생되었다는 것이다.

즉, 선공은 자기가 이기는 경우가 반드시 존재하고, 그 경우를 선택함으로써 필승한다는 것이다.

코드는 간단하지만 나에겐 굉장히 어려운 문제였다.

단순하게 승리 조건을 반복문을 통해 매번 확인해주고,

내 나름대로 최적의 승리 조건을 생각해서 승리자를 정해주는 식으로 해결하려 했지만 실패했다.

반드시 승리하는 조건이 두가지로

1. A % B인 것은 바로 알았지만,
2. 현재 상태가 다음 상태를 여러 상태로 조절할 수 있는 상태라면 승리한다는 것은 알지 못했다.

그 분기점에서 파생된 상태들에 A가 이기고 B가 이기는 상황이 모두 반드시 존재한다는 것이고,

최적의 선택을 한다면 반드시 승리할 수 있다는 것이 놀라웠다.
*/

/*입력
34 12
15 24
0 0
*/

/*출력
A wins
B wins
* */

import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        while (true) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            long A = Integer.parseInt(st.nextToken());
            long B = Integer.parseInt(st.nextToken());
            if (A == 0 && B == 0) {
                bw.write(sb.toString().trim());
                break;
            }
            if (A < B) {
                long tmp = A;
                A = B;
                B = tmp;
            }
            sb.append(euclid(A, B) ? "A wins" : "B wins").append("\n");
        }
        bw.flush();
        bw.close();
        br.close();
    }

    public static boolean euclid (long X, long Y) {
        if (X % Y == 0) {
            return true;
        } else if (X-Y < Y) {
            return !euclid(Y, X-Y);
        }
        return true;
    }
}


```