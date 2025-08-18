
## Source
https://www.acmicpc.net/problem/28277  
  
## Commentary

문제  
N개의 집합 S1, S2, …, SN이 주어질 때 다음 명령들을 Q개 처리해 보자.  
  
1 a b: 집합 Sa를 Sa ∪ Sb로 바꾸고, Sb는 공집합으로 바꾼다. (1 ≤ a, b ≤ N; a ≠ b)  
2 a: 집합 Sa의 크기를 출력한다. (1 ≤ a ≤ N)  
입력  
첫 번째 줄에 N과 Q가 주어진다. (1 ≤ N, Q ≤ 500,000)  
  
다음 N개 줄의 i 번째 줄에는 집합 Si의 정보가 주어진다.  
  
각 줄에는 Si의 크기 ni가 먼저 주어지고, 이어서 Si의 원소 sij가 주어진다. (1 ≤ ∑ ni ≤ 500,000; 1 ≤ sij ≤ 109; 모든 k ≠ j에 대해 sij ≠ sik)  
다음 Q개 줄에는 위에서 설명한 명령이 한 줄에 하나씩 주어진다.  
  
입력되는 모든 수는 정수이고, 명령 2 a는 하나 이상 주어진다.  
  
출력  
명령 2 a가 주어질 때마다 각 줄에 명령의 결과를 출력한다.  
  
---  
  
union by size 기법을 사용했다  
  
1. 집합 배열을 만들고 각 집합에 원소를 할당한다  
  
2. 쿼리에 따라 각 집합 배열을 수정한다  
	- union by size를 위해 더 크기가 작은 집합에서 큰 집합으로 addAll 해준다  
3. 쿼리에 따라 각 집합 크기를 출력한다  
  
## Input

```
3 11  
2 5 1  
3 2 4 7  
4 8 5 2 6  
2 1  
2 2  
2 3  
1 1 3  
2 1  
2 3  
1 2 3  
2 2  
1 2 1  
2 1  
2 2  
```

## Output

```
2  
3  
4  
5  
0  
3  
0  
7  
```

## Source

```java

import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        int N = Integer.parseInt(st.nextToken());  
        int Q = Integer.parseInt(st.nextToken());  
        HashSet<Integer>[] hs  = new HashSet[N];  
        for (int i = 0; i < N; i ++) {  
            hs[i] = new HashSet<>();  
            st = new StringTokenizer(br.readLine());  
            int size = Integer.parseInt(st.nextToken());  
            for (int j = 0; j < size; j ++) {  
                hs[i].add(Integer.parseInt(st.nextToken()));  
            }  
        }  
        StringBuilder sb = new StringBuilder();  
        for (int q = 0; q < Q; q++) {  
            st = new StringTokenizer(br.readLine());  
            int method = Integer.parseInt(st.nextToken());  
            if (method == 1) {  
                int a = Integer.parseInt(st.nextToken());  
                int b = Integer.parseInt(st.nextToken());  
                a--;  
                b--;  
                if (hs[a].size() < hs[b].size()) {  
                    hs[b].addAll(hs[a]);  
                    hs[a] = hs[b];  
                    hs[b] = new HashSet<>();  
                } else {  
                    hs[a].addAll(hs[b]);  
                    hs[b] = new HashSet<>();  
                }  
            } else {  
                int a = Integer.parseInt(st.nextToken());  
                a--;  
                sb.append(hs[a].size()).append("\n");  
            }  
        }  
        System.out.println(sb);  
  
    }  
}  
```
  