## Source

https://www.acmicpc.net/problem/16434

## Commentary

용사에게 세종류의 능력치가 있다

MAX HP : 용사의 최대 생명력이다. 이 값은 1 이상이어야하며, 던전에 들어간 후로 변하지 않는다

CUR HP : 현재 용사의 생명력이다. 던전에 들어가기 전 이 값은 용사의 최대 생명력 MAX HP와 같다. MAX HP 이하이다

ATK : 용사의 공격력이다

던전은 N개의 방으로 이루어져있고, i번째 방을 통해서만 i+1번째 방으로 이동할 수 있다

방에는 포션이 있거나 몬스터가 있는데, 몬스터가 있는 경우, 몬스터를 쓰러트려야 다음 방으로 이동할 수 있다

N번째 방에는 공주와 용이 있고, 용을 무찌르면 공주를 구할 수 있다

전투는 다음과 같이 진행된다

1. 용사의 공격력 ATK 만큼 몬스터의 생명력을 깎는다

2. 몬스터의 생명력이 0 이하이면 전투가 종료되고, 용사는 다음 방으로 이동한다

3. 몬스터의 공격력만큼 CUR HP 를 깎는다

4. 용사의 생명력이 0 이하이면 전투가 종료되고 용사는 사망한다

5. 다시 1부터 진행한다

----

포션이 있는 방에 올 경우, 포션을 마셔서 현재 용사의 생명력 CUR HP가 일정량 회복되고, 공격력 ATK 도 일정량 증가한다

회복된 생명력은 MAX HP 를 넘을 수 없다

용을 쓰러트리기 위한 최소의 MAX HP를 구하자


----


방의 개수 N, 용사의 초기 공격력 H가 주어진다

(1 <= N <= 123,456) (1 <= H <= 10^6)

i번째 줄에는 i번째 방의 정보를 나타내는 세개의 정수, t, a, h가 주어진다

(1 <= a,h <= 10^6) (t in [1, 2])

t가 1인 경우 공격력이 a이고 생명력이 h인 몬스터가 있음을 나타내고

t가 2인 경우 용사의 공격력을 a만큼 증가시켜주고 현재 생명력 HP를 h만큼  회복시켜주는 포션이 있음을 나타낸다

용사가 N번째 방에 있는 용을 쓰러트리기 위해 필요한 최소 maxHP를 출력한다

----

### parametricSearch

- 최소 MAX HP 를 찾기위해 이분탐색을 사용한다
    - 탐색 범위는 1부터 Long.MAX_VALUE 까지다

- 중간 값 m이 가능한 MAX HP 라면 결과값을 갱신하고 더 작은 값을 탐색한다

- 불가능 하다면 더 큰값을 탐색한다

### check

- 몬스터방 처리

    - 몬스터와 용사가 각각 몇턴만에 죽는지 계산한다

    - 용사가 먼저 죽으면 던전 클리어가 불가능하다

    - 몬스터가 먼저 죽거나 같은 턴에 죽으면 용사의 남은 생명력을 계산한다
    
    - `curHP -= (monsterDieTurn-1L) * a;`인 이유는, 몬스터가 죽는 턴에는 공격하지 못하기 때문이다.


- 포션 방 처리

    - 포션을 마시면 생명력을 회복하고, 공격력을 증가시킨다
    - 현재 생명력은 MAX HP를 초과할 수 없다

- 모든 방을 지나고 생명력이 0보다 크면 던전 클리어가 가능하다





## Input
```
3 3
1 1 20
2 3 10
1 3 100
```

## Output
```
49
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
        int N = Integer.parseInt(st.nextToken());
        long ATK = Long.parseLong(st.nextToken());
        long[][] dungeon = new long[N][3];
        for (int i = 0; i < N; i ++) {
            st = new StringTokenizer(br.readLine());
            long t = Long.parseLong(st.nextToken()), a = Long.parseLong(st.nextToken()), h = Long.parseLong(st.nextToken());
            dungeon[i][0] = t;
            dungeon[i][1] = a;
            dungeon[i][2] = h;
        }
        StringBuilder sb = new StringBuilder("");
        sb.append(binarySearch(dungeon, ATK, 1L, (long) 9e19));
        bw.write(sb.toString());
        bw.close();
        br.close();
    }
    public static long binarySearch (long[][] dungeon, long ATK, long l, long r) {
        long res = Long.MAX_VALUE;
        while (l <= r) {
            long m = (l+r)/2L;
            if (check(m, dungeon, ATK)) {
                res = Math.min(m, res);
                r = m - 1L;
            } else {
                l = m + 1L;
            }
        }
        return res;
    }

    public static boolean check (long m, long[][] dungeon, long ATK) {
        int N = dungeon.length;
        long curATK = ATK;
        long curHP = m;
        for (int i = 0; i < N; i ++) {
            long t = dungeon[i][0]; // case 1 | case 2
            long a = dungeon[i][1]; // monster attack | attack potion
            long h = dungeon[i][2]; // monster hp | hp potion
            if (t == 1) {
                // 몬스터 체력보다 용사 공격력이 높으면 다음 방으로 넘어감
                if (h <= curATK) {
                    continue;
                }
                long monsterDieTurn = h % curATK == 0L ? (h / curATK) : (h / curATK)  + 1L;
                long heroDieTurn = curHP % a == 0L ? (curHP / a) : (curHP / a) + 1L;
                // 용사가 죽는 턴이 더 빠르다면
                if (heroDieTurn < monsterDieTurn) {
                    return false;
                // 서로 죽는 턴이 같다면거나 몬스터가 먼저 죽는다면
                } else {
                    curHP -= (monsterDieTurn-1L) * a;
                }
            } else {
                curHP = Math.min(m, curHP + h);
                curATK += a;
            }
        }
        return curHP > 0;
    }
}

 ```