
## Source

https://www.acmicpc.net/problem/1041  
  
## Commentary

주사위는 다음과 같다  
  
```  
  D
E A B F  
  C
```  
  
위의 전개도를 수가 밖으로 나오게 접는다  
  
지민이는 동일한 주사위 N^3개 가지고 있다. 이 주사위를 적절히 회전시키고 쌓아서 N X N X N 의 정육면체를 만들고자 한다  
  
이 정육면체는 탁자 위에 있으므로 5개만 보인다  
  
N과 주사위에 쓰여있는 수가 주어질때, 보이는 5개의 면에 쓰여있는 수의 최솟값 구하라  
  
---  
  
입력에 N이 주어진다. 둘째줄에 주사위에 쓰여있는 수가 주어진다.  
  
위의 그림에서 A, B, C, D, E, F에 쓰여있는 수가 차례대로 주어진다  
  
N은 10^6보다 작거나 같은 자연수이고, 쓰여있는 수는 0보다 작거나 같은 자연수이다  
  
문제의 정답을 출력하라  
  
---  
  
최솟값을 보이게 하라는 말은,  
  
큰 수들을 최대한 안보이게 하라는 말과 같다  
  
결국 외부에 노출시켜야하는 면은, 3 | 2 | 1 면이다  



### 면의 개수
#### N == 1 

   - 가장 큰 수 제외하고 모두 보여주기

#### N == 2
  
- 3면이 4개
- 2면이 4개  


#### N == 3

- 탁자를 고려했을때 외부에 노출되는 면은 `N*N*N - ((N-2)*(N-2)*(N-1)`개 이다  
	- 총 주사위의 개수 - 탁자를 고려했을때 안에 숨길 수 있는 주사위 개수  
- 3면은 4개
- 1면은 `4*((N-1)*(N-2)) + (N-2)*(N-2)`개
	- 탁자를 고려했을때 사이드 네방향은 각 `N-1*N-2`개 위쪽 면은 `N-2*N-2` 개
- 2면은 총 개수 - 3면 - 1면 하면 된다


### 면의 최솟값

#### 1면 
- A ~ F - 최솟값 X  

#### 2면

- (AB) (AC) (AE) (AD) (BC) (BD) (CE) (DE) (FD) (FC) (FB) (FE) 의 최솟값 을 구하라  
  
#### 3면

- (ABC) (ABD) (ADE) (ACE)  (FBC) (FBD) (FDE) (FCE) 의 최솟값 

이제 각 경우의 수에 따른 면의 개수를 세어 출력하면 된다. 단, 최댓값이 int로 표현 못하는 경우가 있으므로 long 사용한다.
  

## Input

```
2  
1 2 3 4 5 6  
```

## Output
```
36  
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
  
        long N = Long.parseLong(br.readLine());  
        int M = 6;  
        long[] dice = new long[M];  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        for (int i = 0; i < M; i++) {  
            dice[i] = Long.parseLong(st.nextToken());  
        }  
        long X = Long.MAX_VALUE , Y = Long.MAX_VALUE , Z = Long.MAX_VALUE;  
        // 1면  
        for (int i = 0; i < M; i ++) {  
            X = Math.min(X, dice[i]);  
        }  
        // 2면  
        int[][] two = {{0,1},{0,2},{0,3},{0,4},{1,2},{1,3},{2,4},{3,4},{1,5},{2,5},{3,5},{4,5}};  
        int[][] three = {{0,1,2},{0,1,3},{0,2,4},{0,3,4},{5,1,2},{5,1,3},{5,3,4},{5,2,4}};  
        for (int[] elem : two) {  
            long sumY = 0L;  
            for (int e : elem) {  
                sumY += dice[e];  
            }  
            Y = Math.min(Y, sumY);  
        }  
        for (int[] elem : three) {  
            long sumZ = 0L;  
            for (int e : elem) {  
                sumZ += dice[e];  
            }  
            Z = Math.min(Z, sumZ);  
        }  
        long total = N*N*N - ((N-2)*(N-2)*(N-1));  
        long x = 4L * ((N-1)*(N-2)) + (N-2)*(N-2);  
        long z = 4L;  
        long y = total - x - z;  
        if (N == 1) {  
            long tmp = 0L;  
            long tmpTotal = 0L;  
            for (long elem : dice) {  
                tmp = Math.max(tmp, elem);  
                tmpTotal += elem;  
            }  
            long ans = tmpTotal-tmp;  
            System.out.print(ans);  
        } else if (N == 2) {  
            System.out.print(Y*4 + Z*4);  
        } else {  
            System.out.print(X*x + Y*y+ Z*z);  
        }  
        br.close();  
    }  
}  
```
