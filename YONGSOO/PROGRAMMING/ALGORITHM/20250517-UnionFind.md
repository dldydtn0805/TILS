## Source

https://www.acmicpc.net/problem/15809  
  
## Commentary
  
전국시대에 N개의 국가가 존재한다  
  
모든 국가는 각자 자신의 국가의 힘을 상징하는 병력을 가지고 있다  
  
이때 M개의 기록이 주어진다  
  
각각의 기록은 다음과 같다  
  
1. 동맹 : 두나라가 서로 동맹을 맺는다. 두나라의 병력이 하나로 합쳐진다  
  
2. 전쟁 : 두나라가 서로 전쟁을 벌인다. 병력이 더 많은 나라가 승리하며 패배한 나라는 속국이 된다.  
  
이때 남은 병력은 승리한 나라의 병력에서 패배한 나라의 병력을 뺀 수치가 된다  
  
두나라의 병력이 같을 경우, 두나라 모두 멸망한다  
  
모든 나라는 정직하기 때문에, 내 동맹의 동맹도 나의 동맹이고, 내 동맹이 적과 전쟁을 하면 같이 참전한다  
  
속국인 경우도 동맹의 경우와 마찬가지다  
  
따라서, 전쟁에서 진 국가와 동맹인 다른 국가 또한 전쟁에서 이긴 국가의 속국이 된다  
  
모든 기록이 끝났을때 남아있는 국가의 수를 출력하고, 그 국가들의 남은 병력의 수를 오름차순으로 출력하라  
  
단, 여러 국가가 서로 동맹이거나 속국인 경우는 한 국가로 취급한다  
  
국가의 수를 나타내는 N과 기록의 수 M이 주어진다  
  
(1 <= N, M <= 10^6)  
  
N개의 줄에 걸쳐 i번째 병력 Ai가 주어진다  
  
(1 <= Ai <= 10^4)  
  
M개의 줄에 걸쳐 기록이 3개의 정수 O, P, Q로 주어진다  
  
O가 1인 경우, P, Q가 서로 동맹을 맺었음을 의미하고,  
  
O가 2인 경우, P, Q가 서로 전쟁을 벌였음을 의미한다  
  
동맹끼리 다시 동맹을 맺거나 전쟁을 하는 입력은 주어지지 않는다  
  
남아있는 국가의 수를 출력하라  
  
각 국가의 남은 병력의 수를 띄어쓰기를 간격으로 오름차순으로 출력하라  
  
---  
  
Union-Find 문제다  
  
동맹과 속국 관계는 한국가로 취급한다.  
  
동맹의 경우 제한없이 Union 해주고,  
  
전쟁의 경우, 제한있게 Union 해주면 된다  
    
	- 병력이 더 큰 수의 나라로 Union 해준다  
        - 병력이 더 큰 수의 나라의 병력은 더 작은 수의 나라의 병력이 된다  
    - 병력이 같은 경우, Union 하지 않는다.  
        - 두 나라 모두 부모를 불가능한 수로 둔다.  
             
Union을 모두 진행한 후, 자기 자신이 부모인 요소만, 추려서 출력하면 된다.

단, 남은 국가가 없는 경우, 남아있는 병력을 출력하지 않는다. (0이 아니다)

## Input
```
5 3  
10  
20  
30  
40  
50  
1 1 2  
1 3 4  
2 1 3  
```

## Output
```
2  
40 50  
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
  
        int N = Integer.parseInt(st.nextToken()), M = Integer.parseInt(st.nextToken());  
        int[] parents = new int[N+1];  
        for (int i = 0; i < N+1; i ++) {  
            parents[i] = i;  
        }  
        int[] power = new int[N+1];  
        for (int i = 1; i < N+1; i ++) {  
            power[i] = Integer.parseInt(br.readLine());  
        }  
        for (int i = 0; i < M; i ++) {  
            st = new StringTokenizer(br.readLine());  
            int O = Integer.parseInt(st.nextToken()), P = Integer.parseInt(st.nextToken()), Q = Integer.parseInt(st.nextToken());  
            if (find(P, parents) != find(Q, parents)) {  
                union(P, Q, parents, power, O);  
            }  
        }  
        List<Integer> remain = new ArrayList<>();  
  
        for (int i = 1; i < N+1; i ++) {  
            if (find(i, parents) == i) {  
                remain.add(i);  
            }  
        }  
  
        StringBuilder sb = new StringBuilder("");  
        if (remain.isEmpty()) {  
            sb.append(0);  
        } else {  
            List<Integer> remainPower = new ArrayList<>();  
            for (int i = 0; i < remain.size(); i ++) {  
                remainPower.add(power[remain.get(i)]);  
            }  
            sb.append(remain.size()).append("\n");  
            remainPower.sort((a,b)->{return a-b;});  
            for (int i = 0; i < remain.size(); i ++) {  
                sb.append(remainPower.get(i)).append(" ");  
            }  
        }  
        System.out.print(sb.toString().trim());  
        bw.close();  
        br.close();  
    }  
  
    public static int find (int x, int[] parents) {  
        if (parents[x] == x) return x;  
        return parents[x] = find(parents[x], parents);  
    }  
  
    public static void union (int x, int y, int[] parents, int[] power, int O) {  
        int X = find(x, parents);  
        int Y = find(y, parents);  
        if (X == 0 || Y == 0) return;  
        if (X != Y) {  
            if (O == 1) {  
                if (X > Y) {  
                    parents[X] = Y;  
                    power[Y] += power[X];  
                } else {  
                    parents[Y] = X;  
                    power[X] += power[Y];  
                }  
            } else if (O == 2) {  
                if (power[X] < power[Y]) {  
                    parents[X] = Y;  
                    power[Y] -= power[X];  
                } else if (power[X] > power[Y]) {  
                    parents[Y] = X;  
                    power[X] -= power[Y];  
                } else {  
                    parents[X] = 0;  
                    parents[Y] = 0;  
                }  
            }  
        }  
    }  
}  
```
