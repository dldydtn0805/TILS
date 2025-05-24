## Source
https://www.acmicpc.net/problem/12907  
  
## Commentary

동물이 N마리 있고, 1번부터 N번까지 번호가 매겨져 있다  
  
이 동물원에 동물은 토끼나 고양이밖에 없고, 모든 동물들의 키는 다르다  
  
토끼와 고양이는 구분할 수 없지만, 토끼와 고양이와 대화를 할 수 있다  
  
너랑 같은 동물 중에서 너보다 키가 큰 동물은 몇마리야 ?  
모든 토끼는 자신보다 키가 큰 토끼의 수를 말해줬고, 모든 고양이고 자신보다 키가 큰 고양이 수를 말해줬다  
  
모든 동물의 대답이 주어졌을때, 각 대답을 어떤 동물이 했는지 알아내고자 한다  
  
가능한 조합의 수는 ?  

---  
  
동물의 수 N이 주어진다  
  
각 동물들의 대답이 주어진다. 대답은 0보다 크거나 같고, 40보다 작거나 같다  
  
(1 <= N <= 40)  
  
---  
  
핵심 포인트는 모든 동물의 키가 다르다는 것이다.  
  
그 키가 몇인지는 모르지만, 키의 대소관계는 안다.  
  
자 그러면, 여기서 알수있는건 무엇이냐  
  
정렬을 때려보자  
  
0 1 2 3 4 처럼, 한 동물의 카테고리는 순차적으로 이어져야한다  
  
그렇다면  
  
0 1 1 2 3 4 와 같은 상황은 안된다  
  
0 0 1 1 2 3 4 는  된다  
  
이런식이다  

그렇다면 모든 조합을 확인하기위해 어떻게 해야할까 ? 

나는 Backtracking을 사용했다

dfs(rabbitRank, catRank, idx)를 통해 올바른 경로에 있는 모든 조합들을 찾아주면 된다


## Input

```
5  
0 1 2 3 4  
```


## Output

```
2
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int ans = 0;  
    static int N;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        N = Integer.parseInt(br.readLine());  
        int[] answers = new int[N];  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        for (int i = 0; i < N; i ++) {  
            answers[i] = Integer.parseInt(st.nextToken());  
        }  
        Arrays.sort(answers);  
        dfs(answers, 0, 0, 0);  
        System.out.print(ans);  
        br.close();  
    }  
  
    public static void dfs (int[] answers, int cur, int rabbitRank, int catRank) {  
        if (cur == N) {ans ++; return;}  
        if (answers[cur] == rabbitRank) {  
            dfs(answers, cur+1, rabbitRank+1, catRank);  
        }  
        if (answers[cur] == catRank) {  
            dfs(answers, cur+1, rabbitRank, catRank+1);  
        }  
    }  
}  
```
