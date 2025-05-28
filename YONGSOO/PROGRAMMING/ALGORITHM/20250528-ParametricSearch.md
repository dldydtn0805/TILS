## Source

https://www.acmicpc.net/problem/2473  
  
## Commentary
  
산성 용액의 값은 1부터 10^9까지, 알칼리성 용액의 값은 -10^9부터 -1까지이다  
  
같은 양의 세 용액을 혼합한 용액의 특성값은 혼합에 사용된 각 용액의 특성값을 합으로 정의한다  
  
이 연구소에서는 같은 양의 세 용액을 혼합하여 특성값이 0에 가장 가까운 용액을 만들고자 한다  
  
---  
  
전체 용액의 수 N이 입력된다  
  
용액의 특성 값을 나타내는 N개의 정수 Ai가 빈칸을 사이에 두고 주어진다  
  
N개의 용액들의 특성값은 모두 다르고, 산성 용액만으로 알칼리성 용맥만으로 입력이 주어질 수도있다  
  
특성값이 0에 가장 가까운 용액을 만드는 세 용액의 특성 값을 출력하라  
  
출력해야하는 세 용액은 특성값의 오름차순으로 출력하라  
  
특성 값이 0에 가장 가까운 용액을 만들어내는 경우가 두개 이상일 경우, 그중아무거나 출력하라  
  
(3 <= N <= 5000)  
  
(-10^9 <= Ai <= 10^9)  
  
---  


N이 최대 5000개이므로, N^2으로 조합을 만들고, 나머지 N 하나를 매개변수 탐색으로 찾아주면 된다  

나머지 N을 찾기 위한 범위는, 세가지 형태일 것이다

i, j를 선택하고, i > j 라 가정했을때,

1. 0 ~ j-1
2. j+1 ~ i-1
3. i+1 ~ N-1

세 구간을 매개변수 탐색을 사용해서 서칭해주면 된다

매개변수 탐색또한 간단하다

조건을 만족하는 용액의 합을 반환하는 매개변수 탐색 함수를 구현하면 되는데,

만약 용액의 합이 음수일 경우, 당연히 `l = m + 1` 이다. 

-  용액의 합이 음수인데 더 작은 수를 탐색할 필요는 없다.

용액의 합이 양수일 경우, 당연히 `r = m - 1`이다.

- 용액의 합이 양수인데 더 큰 수를 탐색할 필요는 없다.

이 문제가 요구하는 핵심 포인트는 구간을 조합을 생각하고 매개변수 탐색의 구간을 올바르게 정할수있느냐였다.

## Input

```
5  
-2 6 -97 -6 98  
```

## Output

```
-97 -2 98  
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int N;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        N = Integer.parseInt(br.readLine());  
        long[] solvent = new long[N];  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        for (int i = 0; i < N; i ++) {  
            solvent[i] = Long.parseLong(st.nextToken());  
        }  
        Arrays.sort(solvent);  
        long ansValue = Long.MAX_VALUE;  
        int ansIdx = N;  
        long[] ans = new long[]{0, 0, 0};  
        for (int i = 0; i < N; i++) {  
            for (int j = 0; j < i; j ++) {  
                long[] left = parametricSearch(solvent, 0, j-1, i, j);  
                if (left[1] < ansValue) {  
                    ansIdx = (int) left[0];  
                    ansValue = left[1];  
                    ans[0] = solvent[i];  
                    ans[1] = solvent[j];  
                    ans[2] = solvent[ansIdx];  
                }  
                long[] mid = parametricSearch(solvent, j+1, i-1, i, j);  
                if (mid[1] < ansValue) {  
                    ansIdx = (int) mid[0];  
                    ansValue = mid[1];  
                    ans[0] = solvent[i];  
                    ans[1] = solvent[j];  
                    ans[2] = solvent[ansIdx];  
                }  
                long[] right = parametricSearch(solvent, i+1, N-1, i, j);  
                if (right[1] < ansValue) {  
                    ansIdx = (int) right[0];  
                    ansValue = right[1];  
                    ans[0] = solvent[i];  
                    ans[1] = solvent[j];  
                    ans[2] = solvent[ansIdx];  
                }  
            }  
        }  
        Arrays.sort(ans);  
        System.out.print(ans[0] + " " + ans[1] + " " + ans[2]);  
        br.close();  
    }  
  
    private static long[] parametricSearch (long[] solvent, int l, int r, int i, int j) {  
        long resValue = Long.MAX_VALUE;  
        int resIdx = N;  
        if (0 <= l && r < N) {  
            while (l <= r) {  
                int m = (l + r)/2;  
                long sumOfSolvent = solvent[m] + solvent[i] + solvent[j];  
                if (Math.abs(sumOfSolvent) < resValue) {  
                    resIdx = m;  
                    resValue = Math.abs(sumOfSolvent);  
                }  
                if (sumOfSolvent < 0L) {  
                    l = m + 1;  
                } else {  
                    r = m - 1;  
                }  
            }  
        }  
        return new long[] {(long) resIdx, resValue};  
  
    }  
}  
```
