## Source

https://www.acmicpc.net/problem/1545  
  
## Commentary
  
어떤 문자열 P가 있을때,  
  
P[i] 와 P[n-i-1]이 모두 다를 때  
  
(0 <= i < (n-1)/2)  
  
(n == P의 길이)  
  
P는 안티 팰린드롬 문자열이다  
  
이 말은 P와 P를 대칭한 문자열 P'가 있을 때 모든 문자가 달라야 안티팰린드롬 문자열이라는 소리다  
  
단, 문자열의 길이가 홀수인 경우, 가운데 문자는 같아도 된다  
  
예컨대, "c", "cpp", "java" 는 안티 팰린드롬 문자열이다  
  
"test", "pp", "weather" 는 안티 팰린드롬 문자열이 아니다  
  
문자열 S가 주어졌을 때, 이 문자열을 재배치 시켜서 안티 팰린드롬 문자열을 만들어라  
  
만약 가능한 경우가 여러가지라면, 사전순으로 가장 앞서는 것을 출력하라  
  
---  
  
문자열 S가 주어진다.  
  
(1 <= S <= 50)  
  
이는 알파벳 소문자로만 이루어져있다.  
  
---  
  
정답을 입력하라. 불가능한 경우 -1을 출력하라  
  
---  

문자열 P를 입력받고, 오름차순으로 정렬하자.

백트래킹을 조금은 특별하게 진행하자  
  
boolean 값 isFront를 주고, isFront가 true 일때는 앞에서 순회,  
  
false 일때는 뒤에서 순회하자.  
  
true 일 때는 이전 문자가 무엇인가 상관없지만,  
  
false 일 때는 이전 문자와 달라야한다.  
  
만약 depth가 N+1까지 닿았다면, 가장 사전순으로 앞서는 안티 팰린드롬이므로,  
  
visited에 저장된 문자열의 순서에 따라 출력해주자.  
  
단, 무작정 모든 조합의 수를 고려할 경우 시간초과가 날 수 있다.  
  
따라서 재귀 하기 직전 타이밍에,  
  
1. 앞으로 구성해야할 문자의 개수의 수 A  
2. 현재까지 구성하지 않은 문자 중에 가장 많은 문자의 개수 B  
A와 B를 비교해서 지금까지 구성한 문자가 올바른 경로로 왔는지를 판단해주자.  
  
만약 현재 isFront가 true인 경우, B > (A + 1) / 2 라면 불가능하다.  
  
혹은 false인 경우, B > (A + 1) / 2 + 1 라면 불가능하다.  
  
어떤 문자가 전체의 절반보다 많이 존재한다면, 그 문자는 반드시 자신과 대칭되는 위치에 같은 문자가 올 수 밖에 없기 때문이다.  

남은 문자의 절반에 올림[(A+1)/2]을 해주는 이유는, 문자열의 길이가 홀수인 경우, 가운데 문자는 안티 팰린드롬 조건에서 자유롭기 때문이다.  
  
false의 경우, 이전 문자와의 충돌을 피하기 위해서 [(A + 1) / 2 + 1]을 사용한다.  
  
## Input
```
hello  
```

## Output
  
```
ehllo  
```

## Source Code


```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));  
        String line = br.readLine();  
        int N = line.length();  
        char[] palindrome = new char[N];  
        for (int i = 0; i < N; i++) {  
            palindrome[i] = line.charAt(i);  
        }  
        Arrays.sort(palindrome);  
        boolean[] visited = new boolean[N];  
        ArrayList<String> ans = new ArrayList<>();  
        backtracking(N, true, palindrome, 1, visited, -1, ans, "");  
        if (ans.isEmpty()) {  
            System.out.print(-1);  
        } else {  
            System.out.print(ans.get(0));  
        }  
        bw.close();  
        br.close();  
    }  
  
    public static void backtracking (int N, boolean isFront, char[] palindrome, int depth, boolean[] visited, int prevIdx, ArrayList<String> ans, String tmp) {  
        if (depth == N+1) {  
            char[] res = new char[N];  
            for (int i = 0; i < N; i ++) {  
                if (i % 2 == 0) {  
                    res[i/2] = tmp.charAt(i);  
                } else {  
                    res[N-1-i/2] = tmp.charAt(i);  
                }  
            }  
            StringBuffer sb = new StringBuffer("");  
            for (int i = 0; i < N; i ++) {  
                sb.append(res[i]);  
            }  
            ans.add(sb.toString());  
            return;  
        }  
        if (ans.isEmpty()) {  
            if (isFront) {  
                HashMap<Character, Integer> hm = new HashMap<>();  
                int remain = 0;  
                for (int i = 0; i < N; i ++) {  
                    if (!visited[i]) {  
                        remain ++;  
                        hm.put(palindrome[i], hm.getOrDefault(palindrome[i], 0) + 1);  
                    }  
                }  
                for (char key : hm.keySet()) {  
                    if (hm.get(key) > (remain + 1) / 2 ) {  
                        return;  
                    }  
                }  
                for (int i = 0; i < N; i ++) {  
                    if (!visited[i]) {  
                        visited[i] = true;  
                        backtracking(N, !isFront, palindrome, depth+1, visited, i, ans, tmp + palindrome[i]);  
                        visited[i] = false;  
                    }  
                }  
            } else {  
                HashMap<Character, Integer> hm = new HashMap<>();  
                int remain = 0;  
                for (int i = 0; i < N; i ++) {  
                    if (!visited[i]) {  
                        remain ++;  
                        hm.put(palindrome[i], hm.getOrDefault(palindrome[i], 0) + 1);  
                    }  
                }  
                for (char key : hm.keySet()) {  
                    if (hm.get(key) > (remain + 1) / 2 + 1) {  
                        return;  
                    }  
                }  
                for (int i = N-1; i >= 0; i--) {  
                    if (!visited[i] && palindrome[i] != palindrome[prevIdx]) {  
                        visited[i] = true;  
                        backtracking(N, !isFront, palindrome, depth+1, visited, i, ans, tmp + palindrome[i]);  
                        visited[i] = false;  
                    }  
                }  
            }  
        }  
    }  
}
```
  
