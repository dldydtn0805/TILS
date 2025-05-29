## Source

https://www.acmicpc.net/problem/2560  
  
## Commentary

집신벌레는 다음과 같은 특징을 가진다  
  
- 무성생식을 한다  
  
- 태어난 이후 a일 째 되는 날 성체가 된다  
  
- 성체가 된 날부터 매일 한마리씩 새로운 개체를 만들어낸다  
  
- 성체가 되자마자 첫 개체를 만들어내고, 그 이후로 하루가 지날때마다 새로운 개체를 하나씩 만든다.  
    - 새로운 개체 역시 태어난 이후로 a일째 되는 날부터 성체가 되어 새로운 개체를 만든다  
- 태어난 이후로 b일째 되는 순간부터는 새로운 개체를 더이상 만들지 않는다  
    - 태어난지 a일 째부터 b일째 되는 날의 전날까지 새로운 개체를 만들어내므로 일생동안 총 b-a 마리의 개체를 만든다  
  
- 태어난 이후로 d일째 되는 순간 죽는다  
  
새로 테어난 집신벌레 한마리를 수조에 넣은 후 N일째 되는날 살아있는 집신벌레 수를 1000으로 나눈 나머지를 출력하라  
  
  
---  
  
a, b, d, N을 나타내는 네 정수가 빈칸 하나를 사이에 두고 차례로 주어진다  
  
(0 < a < b < d <= 10^4)  
  
(1 <= N <= 10^6)  
  
수조에 집신벌레 한마리를 넣은지 N일째 되는 날 수조에 살아있는 집신벌레의 수를 1000으로 나눈 나머지를 구하라  
  
---  
  
배열 두개를 사용하자

해당 순간에 생식 가능한 벌레 마리수의 배열 pregnant을 사용하자  

해당 순간에 태어난 벌레의 마리수의 배열은 baby를 사용하자
  
처음 시작할때 baby[0] = 1 로 시작한다

그리고 `pregnant[i] = pregnant[i-1] - baby[i-b] + baby[i+a]` 이다

왜냐하면, a일 이전의 벌레부터 생식 가능하고, b일 이전의 벌레는 생식 불가능하기 때문이다.

그리고 현재 턴에 생식 가능한 벌레를 갱신했으므로

baby[i] += pregnant[i]를 해준다

이렇게 태어날 벌레 마리수 배열의 baby를 올바르게 갱신했다면,

이제 N-d+1 부터 N까지 새로 태어난 벌레 마리수를 세주면 끝이다.

왜냐하면, 그 이전에 태어난 벌레는 이미 죽었다
  
  
## Input

```
2 4 6 6  
```

## Output

```
7
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        int a = Integer.parseInt(st.nextToken());  
        int b = Integer.parseInt(st.nextToken());  
        int d = Integer.parseInt(st.nextToken());  
        int N = Integer.parseInt(st.nextToken());  
        // 해당 순간에 번식 가능한 벌레  
        long[] pregnant = new long[N+1];  
        // 해당 순간에 태어난 벌레  
        long[] baby = new long[N+1];  
        baby[0] = 1L;  
        for (int i = a ; i < N+1; i++) {  
            pregnant[i] += (pregnant[i-1] + baby[i-a]);  
            if (i-b >= 0) {  
                pregnant[i] -= (baby[i-b]);  
            }  
            baby[i] += pregnant[i];  
            baby[i] %= 1000L;  
        }  
        long ans = 0;  
  
        for (int i = N-d+1; i < N+1; i++) {  
            if (i >= 0) {  
                ans += baby[i];  
            }  
        }  
        System.out.println(ans%1000L);  
        br.close();  
    }  
}  
```
