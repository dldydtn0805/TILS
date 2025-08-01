
## Source

https://www.acmicpc.net/problem/11578  
  
## Commentary
  
2015년 11월 28일은 기다리고 기다리던 제1회 IUPC가 열리는 날이다.  
  
IUPC는 Inha University Programming Contest의 약자로  
  
인하대학교 IT공대 학부생이면 누구나 참여할 수 있는 프로그래밍 경시대회이다.  
  
IUPC의 총상금은 무려 110억 원이나 되며 고급스러운 점심과 많은 다과가 제공되어  
  
참가자들이 대회에 집중할 수 있도록 최적의 환경을 제공한다.  
  
  
그중 참가자들을 진정 열광시키는 것은 수많은 팀에게 추첨을 통해 문화상품권을 나눠준다는 점이다.  
  
컴퓨터정보공학과에 재학 중인 강호는 대회에 참가하기 위해 팀원을 모집하려고 한다.  
  
  
IUPC가 여타 많은 대회와 다른 점이 있다면 문제의 수가 많고 팀원의 수가 무제한이라는 것이다.  
  
  
IUPC에서 모든 문제를 다 풀어 우승한 뒤 엄청난 부와 명예를 챙기고 싶은 강호는  
  
  
모든 문제를 풀 수 있는 팀을 만들고 싶어 한다.  
  
하지만 팀원의 수가 많으면 많을수록 자신에게 돌아오는 상금이 적어지기 때문에  
  
최소한의 팀원으로 대회를 우승하고 싶어 한다.  
  
강호가 선택할 수 있는 팀원의 목록과 각각의 팀원들이 해결할 수 있는 문제의 번호들이 주어졌을 때  
  
  
강호가 IUPC에서 최소한의 팀원으로 모든 문제를 다 풀어 우승할 수 있도록 팀을 만들어보자.  
  
첫 번째 줄에 문제의 수 N과 강호가 팀원으로 고를 수 있는 학생들의 수 M이 공백을 구분으로 차례대로 주어진다.  
  
N과 M은 1이상 10이하의 자연수이다.  
  
두 번째 줄부터 M개의 줄에 차례대로  
  
i(1 ≤ i ≤ M)번 학생들이 풀 수 있는 문제의 개수 Oi와  
  
i번 학생이 풀 수 있는 문제의 번호 Pij(1 ≤ j ≤ Oi, 1 ≤ Pij ≤ N)가 Oi개 주어진다.  
  
모든 문제를 풀 수 있으면서 팀원의 수가 가장 적은 팀을 구해 팀원의 수를 출력한다.  
  
만약 모든 문제를 풀 수 있는 팀을 만들 수 없다면 -1을 출력한다,  
  
---  
  
N, M이 10 이하니까 완전탐색 쌉가능인데 ?  

완전탐색하면서 그냥 비트마스크 써줬다  
  
  
## Input

```
5 4
2 3 4
2 1 2
4 1 2 3 4
1 5
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
    static List<List<Integer>> arr;  
    static int N, M, problems, ans;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        N = Integer.parseInt(st.nextToken());  
        M = Integer.parseInt(st.nextToken());  
        ans = Integer.MAX_VALUE;  
        arr = new ArrayList<>();  
        problems = (1 << N) - 1;  
        for (int i = 0; i < M; i ++) {  
            arr.add(new ArrayList<>());  
            st = new StringTokenizer(br.readLine());  
            int O = Integer.parseInt(st.nextToken());  
            for (int j = 0; j < O; j ++) {  
                int P = Integer.parseInt(st.nextToken());  
                arr.get(i).add(P);  
            }  
        }  
        for (int i = 0; i < M; i ++) {  
            DFS(i, 0, 1);  
        }  
        System.out.println(ans != Integer.MAX_VALUE ? ans : -1);  
        br.close();  
    }  
  
    private static void DFS (int idx, int bitMask, int cnt) {  
        if (ans < cnt) return;  
        for (int problem : arr.get(idx)) {  
            bitMask |= 1 << (problem-1);  
        }  
        if ((bitMask & problems) == problems) {  
            ans = Math.min(ans, cnt);  
            return;
        }  
        for (int next = idx+1; next < M; next ++) {  
            DFS(next, bitMask, cnt+1);  
        }  
    }  
}  

```
  