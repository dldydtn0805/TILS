## 문제

https://www.acmicpc.net/problem/5710

## 해설


전기 요금은 다음과 같다

사용량  /  요금

1 ~ 100  / 2

101 ~ 10000 / 3

10001 ~ 1000000 / 5

> 1000000 / 7

사용량의 첫 100의 가격은 1당 2원이다

다음 9900의 가격은 1당 3원이다

예를들어 10123을 사용했을 때, 요금은 2 * 100 + 3*9900 + 5*123

전기 회사는 전기 요금을 인상하지 않고 돈을 더 버는 방법을 만들었다

사용한 전기의 양을 알려주지 않고, 얼마를 내야하는지 알려주는 것이다

전기 회사는 요금과 관련된 정보를 나타내는 두 숫자 A, B를 알려준다

A는 이웃의 사용량과 사용량을 합쳤을 때 내야하는 요금

B는 이웃의 전기 요금과의 차이 (절댓값)

위 두 숫자를 이용해서 자신이 얼마를 내야하는지를 계산할 수 없을떄는 100원을 더내면 사용량을 알려준다

예를들어 A = 1100 / B = 300 이라고 하자

이 정보를 이용하면 상근이의 사용량은 150 / 이웃의 사용량은 250 임을 알수있다

두 사람의 총 사용량은 400이다.

따라서 A = 2 * 100 + 3 * 300 = 1100이 된다

따라서 상근이는 350원을 내면 된다

상근이의 이웃은 2 * 100 +  3* 150 = 650원이 되고 B = |350-650| = 300이 된다

A와 B가 주어졌을때 상근이가 내야하는 전기 요금을 구하시오


입력은 여러개의 테스트 케이스로 이루어져있다

테스트 케이스는 한줄로 이루어져있고, 두 정수 A, B가 주어진다 1 <= A , B <= 10^9

항상 정답이 유일한 경우만 주어지며,

입력으로 주어지는 두 숫자를 만들 수 있는 사용량은 딱 한 쌍 존재한다

입력의 마지막 줄에는 0이 두개 주어진다

각 테스트 케이스에 대해서 상근이가 내야하는 요금을 출력한다


A가 가지고 있는 정보는 두 사용자의 요금의 합이다

B가 가지고 있는 정보는 두 사용자의 요금의 차이다

요금의 합과 차이를 알고있을 때, 상근이가 내야할 요금은 얼마인가

상근이는 절약하는 사람이므로 반드시 돈을 더 적게 낸다

------

이분 탐색을 위해 세가지 함수를 생성했다

1. getIsAvailableElectricityBill
    - 특정 전기 요금이 가능한지 확인
    - 요금 범위에 따라 다른 조건을 확인
2. getElectricityUsage
    - 요금을 기반으로 전기 사용량을 계산
    - 각 요금 범위에 따라 다른 계산식을 적용
3. getElectricityBill
    - 전기 사용량을 기반으로 요금을 계산
    - 사용량의 범위에 따라 다른 요금 체계 적용

이분탐색의 로직은 다음과 같다

1. 총 전기 사용량을 두 부분으로 나누어, 두 요금의 차이가 B가 되도록 이진 탐색을 수행한다

2. 탐색 과정에서 중간 값 m을 기준으로 두 요금을 계산하고, 차이를 확인한다

3. 요금 차이가 B와 같고, 두 요금이 모두 가능한 요금인 경우, 두 요금 중 작은 값을 반환한다.


----

총 전기 사용량이 10^9이기 때문에 반드시 효율적인 알고리즘을 사용해야했다.

이 문제에서 중요한 것은 두 요금의 차이, diff 가 특정 값 B와 같아지는 지점을 찾는 것인데,

diff 가 B보다 크다는 것은 차이를 좁혀야 한다는 것이므로, `l = m + 1`로 diff 를 줄여나갔고

반대로 작다는 것은 차이를 벌려야 한다는 것이므로 `r = m -1`로 diff 를 늘려나갔다.

생각보다 쉽게 풀려서 다행인 문제였따




## 입력
```
1100 300
35515 27615
0 0
```

## 출력
```
350
2900
```

## 코드
```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        while (true) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int A = Integer.parseInt(st.nextToken());
            int B = Integer.parseInt(st.nextToken());
            if (A == 0 && B == 0) {
                break;
            }
            sb.append(binarySearch(getElectricityUsage(A),B)).append("\n");
        }
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static boolean getIsAvailableElectricityBill (int X) {
        if (2 <= X && X <= 200) {
            return X % 2 == 0;
        } else if (203 <= X && X <= 29900) {
            return (X - 200) % 3 == 0;
        } else if (29905 <= X && X <= 4979900) {
            return (X - 29900) % 5 == 0;
        } else if (4979907 <= X) {
            return (X - 4979900) % 7 == 0;
        }
        return false;
    }

    public static int getElectricityUsage (int X) {
        if (2 <= X && X <= 200) {
            return X / 2;
        } else if (203 <= X && X <= 29900) {
            return (X - 200) / 3 + 100;
        } else if (29905 <= X && X <= 4979900) {
            return (X - 29900) / 5 + 10000;
        } else if (4979907 <= X) {
            return (X - 4979900) / 7 + 1000000;
        }
        return -1;
    }

    public static int getElectricityBill (int X) {
        if (1 <= X && X <= 100) {
            return X * 2;
        } else if (101 <= X && X <= 10000) {
            return 200 + (X - 100) * 3;
        } else if (10001 <= X && X <= 1000000) {
            return 29900 + (X - 10000) * 5;
        } else {
            return 4979900 + (X - 1000000) * 7;
        }
    }


    public static int binarySearch (int totalElectricity, int B) {
        int l = 0;
        int r = totalElectricity;
        while (l <= r) {
            int m = (l+r)/2;
            int bill1 = getElectricityBill(m);
            int bill2 = getElectricityBill(totalElectricity-m);
            int diff = Math.abs(bill1-bill2);
            if (diff == B && getIsAvailableElectricityBill(bill1) && getIsAvailableElectricityBill(bill2)) {
                return Math.min(bill1, bill2);
            } else if (diff > B) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return -1;
    }

}

```