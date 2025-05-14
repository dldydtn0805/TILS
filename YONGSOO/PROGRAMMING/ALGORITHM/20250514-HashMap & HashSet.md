## Source

https://www.acmicpc.net/problem/25200  
  
## Commentary

곰곰이는 좋아하는 음료수 자판기가 있다  
  
이 자판기에는 "랜덤 버튼"이 있는데,  
  
이 버튼을 누르면 이 세계에서 출발한 음료수가 M번의 차원 이동 후 자판기 상품 출구로 떨어진다  
  
차원 이동은 불안정하기 때문에, 음료수 종류가 도중에 바뀌는 일도 있다.  
  
- i (1 <= i <= M) 번째 차원 이동 중에, 음료수 종류 Ui 는 Vi로 변경된다  
  
곰곰이는 1부터 N까지 모든 종류의 음료수에 대해,  
  
각각 M번의 차원 이동을 거쳐 최종적으로 어떤 음료수가 되는지 알고싶다  
  
---  
  
음료수의 종류 개수 N, 차원 이동 횟수 M이 공백을 사이에 두고 주어진다  
  
(2 <= N, M <= 3 * 10^5)  
  
두번째줄부터 M개의 줄에 걸쳐 Ui, Vi가 공백을 사이에 두고 주어진다  
  
(1 <= i <= M)  
  
(1 <= Ui, Vi <= N)  
  
(Ui != Vi)  
  
---  
  
F(k)가 음료수 종류 k가 M번의 차원 이동을 거쳐 최종적으로 변하는 음료수 종류라 할 때,  
  
F(1), F(2), F(3), ..., F(N) 를 첫 번째 줄에 공백을 사이에 두고 출력하라  
  
---  
  
음료수의 전체 종류 개수가 N개 일때,  
  
M번의 차원 이동을 마치고 난 뒤, 전체 음료수의 형태는 어떻게 변화할지를 구해야한다.  
  
이 문제는 인덱스와 대표값을 분리해서 생각하는게 중요한 문제이다  
  
각 대표값의 초기 인덱스들은,  
  
1 = [1]  
  
2 = [2]  
  
...  
  
K = [K]  
  
상태이다  
  
이 상태에서  
  
1 -> 3 , 3 -> 2 를 거치며  
  
대표값 1 = []

대표값 2 = [1, 2, 3]  

대표값 3 = []  

을 가르키게 된다  
  
이상태에서 4 -> 3 을 가르키는 것은  
  
대표값 3 = [4]  

대표값 4 = []  

를 의미한다.  
  
따라서 해쉬맵과 해쉬세트를 응용하여 해결할 수 있었는데,  
  
최적화의 핵심은, 이전 대표값의 세트 크기와 새로운 대표값의 세트 크기를 비교해서 더 작은 사이즈의 세트의 요소들을 옮겨주고  
  
새로운 대표값에 합친 세트를 할당하는 것이었다.  
  

## Input

```
5 4  
1 3  
3 2  
4 3  
2 4  
```


## Output

```
4 4 4 3 5  
```
  
## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        int N = Integer.parseInt(st.nextToken()), M = Integer.parseInt(st.nextToken());  
  
        int[] ans = new int[N+1];  
        for (int i = 0; i < N+1; i++) {  
            ans[i] = i;  
        }  
        HashMap<Integer, HashSet<Integer>> hm = new HashMap<>();  
        for (int i = 0; i < N+1; i ++) {  
            hm.put(i, new HashSet<>(Arrays.asList(i)));  
  
        }  
        for (int turn = 0; turn < M; turn ++) {  
            st = new StringTokenizer(br.readLine());  
            int from = Integer.parseInt(st.nextToken());  
            int to = Integer.parseInt(st.nextToken());  
            if (hm.get(from).size() < hm.get(to).size()) {  
                HashSet<Integer> cur = hm.get(from);  
                hm.put(from, new HashSet<>());  
                for (int elem : cur) {  
                    hm.get(to).add(elem);  
                }  
            } else {  
                HashSet<Integer> cur = hm.get(to);  
                hm.put(to, new HashSet<>());  
                for (int elem : cur) {  
                    hm.get(from).add(elem);  
                }  
                hm.put(to, hm.get(from));  
                hm.put(from, new HashSet<>());  
            }  
        }  
  
        for (int key : hm.keySet()) {  
            HashSet<Integer> elem = hm.get(key);  
            for (int e : elem) {  
                ans[e] = key;  
            }  
        }  
        StringBuilder sb = new StringBuilder("");  
        for (int i = 1 ; i < N+1; i ++) {  
            sb.append(ans[i]).append(" ");  
        }  
        System.out.print(sb.toString().trim());  
        bw.close();  
        br.close();  
    }  
}
```
