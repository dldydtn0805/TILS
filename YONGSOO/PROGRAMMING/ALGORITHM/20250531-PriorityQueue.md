
## Source

https://www.acmicpc.net/problem/2696  
  
## Commentary

어떤 수열을 읽고, 홀수번째 수를 읽을 때 마다, 지금까지 입력받은 값의 중앙값을 출력하는 프로그램을 작성하시오.  
  
예를 들어, 수열이 1, 5, 4, 3, 2 이면, 홀수번째 수는 1번째 수, 3번째 수, 5번째 수이고, 1번째 수를 읽었을 때 중앙값은 1, 3번째 수를 읽었을 때는 4, 5번째 수를 읽었을 때는 3이다.  
  
첫째 줄에 테스트 케이스의 개수 T(1 ≤ T ≤ 1,000)가 주어진다. 각 테스트 케이스의 첫째 줄에는 수열의 크기 M(1 ≤ M ≤ 9999, M은 홀수)이 주어지고, 그 다음 줄부터 이 수열의 원소가 차례대로 주어진다. 원소는 한 줄에 10개씩 나누어져있고, 32비트 부호있는 정수이다.  
  
각 테스트 케이스에 대해 첫째 줄에 출력하는 중앙값의 개수를 출력하고, 둘째 줄에는 홀수 번째 수를 읽을 때 마다 구한 중앙값을 차례대로 공백으로 구분하여 출력한다. 이때, 한 줄에 10개씩 출력해야 한다.  
  
---  
  
중앙값을 구하기 위해, 우선순위 큐 두개를 준비하자  
  
중앙값 초과 수들을 넣는 우선순위 큐 up 이다  
  
중앙값 미만 수들을 넣는 우선순위 큐 low 다  

그리고 중앙값을 표현하는 mid 다

만약 mid < cur 이라면, up에 넣는다

그게 아니면 low에 넣는다

그리고 up 크기와 low 크기를 맞게 조절해주면 된다

## Input

```
3  
9  
1 2 3 4 5 6 7 8 9  
9  
9 8 7 6 5 4 3 2 1  
23  
23 41 13 22 -3 24 -31 -11 -8 -7  
3 5 103 211 -311 -45 -67 -73 -81 -99  
-33 24 56  
```

## Output

```
5  
1 2 3 4 5  
5  
9 8 7 6 5  
12  
23 23 22 22 13 3 5 5 3 -3  
-7 -3  
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        int TC = Integer.parseInt(br.readLine());  
        StringBuilder ans = new StringBuilder("");  
        while (TC -- > 0) {  
            PriorityQueue<Integer> up = new PriorityQueue<>((a,b)->{return a-b;});  
            PriorityQueue<Integer> low = new PriorityQueue<>((a,b)->{return b-a;});  
            StringBuilder sb = new StringBuilder("");  
            int M = Integer.parseInt(br.readLine());  
            int[] arr = new int[M+1];  
  
            for (int i = 0; i < M/10; i ++) {  
                StringTokenizer st = new StringTokenizer(br.readLine());  
                for (int j = 0; j < 10; j ++) {  
                    arr[i*10+j] = Integer.parseInt(st.nextToken());  
                }  
            }  
            if (M%10 != 0) {  
                StringTokenizer st = new StringTokenizer(br.readLine());  
                for (int i = 0; i < M%10; i ++) {  
                    arr[M/10*10+i] = Integer.parseInt(st.nextToken());  
                }  
            }  
            int mid = -1; // initializing  
            int cnt = 0;  
            for (int i = 0; i < M; i ++) {  
                int cur = arr[i];  
  
                if (i == 0) {  
                    mid = cur;  
                } else {  
                    if (mid < cur) { // 중간값보다 현재 확인하는 수가 크다면  
                        up.add(cur);  
                    } else { // 중간값보다 현재 확인하는 수가 작다면  
                        low.add(cur);  
                    }  
                    if (up.size() > low.size()) {  
                        while (up.size() > low.size()) { // 더 큰수들이 많으면  
                            low.add(mid);  
                            mid = up.poll();  
  
                        }  
                    } else {  
                        while (up.size() < low.size()) { // 더 작은수들이 많으면  
                            up.add(mid);  
                            mid = low.poll();  
                        }  
                    }  
                }  
                if (i % 2 == 0) {  
                    cnt += 1;  
                    if (cnt % 10 == 0) {  
                        sb.append(mid).append("\n");  
                    } else {  
                        sb.append(mid).append(" ");  
                    }  
                }  
            }  
            ans.append(cnt).append("\n");  
            ans.append(sb.toString().trim()).append("\n");  
        }  
        System.out.print(ans);  
        br.close();  
    }  
}  

```
