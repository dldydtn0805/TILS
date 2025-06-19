## Source

https://www.acmicpc.net/problem/6051  

## Commentary 

모범생 현수는 코딩하는 시간을 늘리기 위해 타임 머신을 구매 했다. 현수는 정상적으로 문제를 코딩하거나 (타임 머신을 사용하지 않고), 과거의 임의의 지점으로 시간여행 할 수 있다.  미래로 시간 여행 할 수 없으며, 과거로 가면 새로운 미래가 진행된다.  
  
현수는 자유롭게 문제를 풀거나 과거로 돌아가면서 자신이 푼 문제 목록을 기록한다. 과거로 돌아가면 과거 이전까지 풀었던 문제 목록만 남는다.  
  
현수는  기록 되어 있는 문제 목록 중 가장 최근에 푼 문제 번호를 알고 싶다. (가장 최근에 푼 문제가 없다면 -1을 출력)  
  
매 쿼리마다 문제 목록에 기록되어 있는 가장 최근에 푼 문제를 출력하는 프로그램을 작성하시오.  
  
현수는 개인의 타임라인 관점에서 연속적인 업데이트를 나타내는  N (1 <= N <= 80,000) 개의 쿼리 Qi(1...N) 를 제공한다.  
  
각 쿼리는 한 줄의 입력이다. 각 줄은 하나의 문자 c ( 'a', 's', 't' 중 하나)로 시작한다. c가 'a'또는 't' 이면 c 다음에 공백과 정수 K가 주어진다. (1 <= K <= 1,000,000)  
  
c가 'a' 이면 현수는 문제 번호가 K인 문제를 풀고 문제 목록에 기록 한다.  
  
c가 's' 이면 현수는 가장 최근에 작성한 문제 목록을 삭제한다.  
  
c가 't'이면, 현수는 K 번째 쿼리 직전까지 시간을 거슬러 올라 간다. 즉, 현수는 K-1번째 쿼리와 K번째 쿼리 사이로 시간 여행한다. (입력을 위해 예제 입력 참조). K 쿼리  바로 전에 있던 푼 문제 목록으로 되돌아 간다.  
  
이해를 돕기 위해 아래에 푼 문제 목록과 12개의 쿼리, 각 쿼리에 대한 출력결과가 주어진다.  
  
---  
  
연결리스트를 활용해서 해결하면 된다  
  
## Input

```
12  
a 5  
a 3  
a 7  
s  
t 2  
a 2  
t 4  
a 4  
s  
t 7  
s  
s  
```

## Output

```
5  
3  
7  
3  
5  
2  
7  
4  
7  
2  
5  
-1  
```

## Source Code

```java

import java.io.*;  
import java.util.*;  
  
public class Main {  
    static class Node {  
        int val;  
        Node prev;  
        Node(int val, Node prev) {  
            this.val = val;  
            this.prev = prev;  
        }  
    }  
  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        int Q = Integer.parseInt(br.readLine());  
  
        Node[] history = new Node[Q + 2];  // 각 시간마다의 스택 상태 저장  
        StringBuilder sb = new StringBuilder();  
  
        int time = 0;  
  
        for (int i = 1; i <= Q; i++) {  
            StringTokenizer st = new StringTokenizer(br.readLine());  
            String type = st.nextToken();  
  
            if (type.equals("a")) {  
                int k = Integer.parseInt(st.nextToken());  
                history[i] = new Node(k, history[time]);  
            } else if (type.equals("s")) {  
                if (history[time] != null) {  
                    history[i] = history[time].prev;  
                } else {  
                    history[i] = null;  
                }  
            } else if (type.equals("t")) {  
                int k = Integer.parseInt(st.nextToken());  
                history[i] = history[k - 1];  
            }  
  
            time = i;  
  
            if (history[i] == null) {  
                sb.append("-1\n");  
            } else {  
                sb.append(history[i].val).append("\n");  
            }  
        }  
  
        System.out.print(sb);  
    }  
}  
```
