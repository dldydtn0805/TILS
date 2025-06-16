## Source 

https://www.acmicpc.net/problem/18112  
  
## Commentary

이진수 게임은 주어진 ‘시작 이진수’를 몇 가지 동작으로 ‘목표 이진수’로 바꾸는 게임이다.  
  
이 게임에서 가능한 동작들은 다음과 같다.  
  
한 자리 숫자를 보수로 바꾸기. 단, 맨 앞 숫자(Most Significant Digit)는 바꿀 수 없다.  
  
101 → 111  
  
현재 수에 1 더하기.  
  
11 → 100  
  
현재 수에서 1 빼기. 단, 현재 수가 0이라면 빼기가 불가능하다.  
  
110 → 101  
  
  
‘시작 이진수’와 ‘목표 이진수’가 주어질 때,  
  
‘시작 이진수’를 ‘목표 이진수’로 만들기 위한 최소 동작 횟수를 출력하라.  
  
주어지는 이진수들의 맨 앞 숫자는 항상 1이다.  
  
입력  
첫 번째 줄에 길이 L의 ‘시작 이진수’가 주어진다.  
  
 두 번째 줄에 길이 K의 ‘목표 이진수’가 주어진다. (1 ≤ L, K ≤ 10)  
  
출력  
  
‘시작 이진수’를 ‘목표 이진수’로 만들기 위한 최소 동작 횟수를 출력한다.  
  
---  
  
걍 BFS다 근데 비트연산을 곁들인

- `Integer.parseInt(br.readLine(), 2)` : 2진수 문자열을 정수로 변환 
- `Integer.toBinaryString(cur)` : 정수를 2진수 문자열로 변환
- `complement = cur^i` : 보수 탐색

  
  
## Input

```
110  
1000
```
  
## Output

```
2
```
  
## Source Code

```java
import java.math.*;  
import java.util.*;  
import java.io.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        int start = Integer.parseInt(br.readLine(), 2);  
        int end = Integer.parseInt(br.readLine(), 2);  
        System.out.println(BFS(start, end));  
        br.close();  
    }  
  
    private static int BFS (int start, int end) {  
        if (start == end) return 0;  
        int[] visited = new int[1 << 11];  
        Arrays.fill(visited, -1);  
        visited[start] = 0;  
        LinkedList<Integer> queue = new LinkedList<>();  
        queue.add(start);  
  
        while (!queue.isEmpty()) {  
            // 보수로 바꾸기  
            int cur = queue.poll();  
            int len = Integer.toBinaryString(cur).length();  
            int max = (1 << len-1);  
            for (int i = 1; i < max; i*=2) {  
                int complement = cur^i;  
                if (visited[complement] == -1) {  
                    visited[complement] = visited[cur] + 1;  
                    queue.add(complement);  
                    if (complement == end) {  
                        return visited[complement];  
                    }  
                }  
            }  
            // 1 더하기  
            if (cur+1 < (1 << 11) && visited[cur+1] == -1) {  
                visited[cur+1] = visited[cur]+1;  
                queue.add(cur+1);  
                if (cur+1 == end) {  
                    return visited[cur+1];  
                }  
            }  
            // 1 빼기  
            if (cur-1 >= 0 && visited[cur-1] == -1) {  
                visited[cur-1] = visited[cur]+1;  
                queue.add(cur-1);  
                if (cur-1 == end) {  
                    return visited[cur-1];  
                }  
            }  
        }  
        return -1;  
    }  
}  
```
