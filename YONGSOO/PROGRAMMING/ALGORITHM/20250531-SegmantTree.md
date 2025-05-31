## Source

https://www.acmicpc.net/problem/7578  
  
## Commentary

어떤 공장에는 2 X N 개의 기계가 2열에 걸쳐 N개씩 배치되어있다  
  
이 2개의 열을 각각 A, B 열이라 부른다  
  
A열의 기계는 B열의 기계와 하나씩 짝을 이루어 케이블로 연결된다  
  
서로 교차하는 케이블 쌍의 개수를 정확히 세어 출력하라  
  
---  
  
입력은 세개의 줄로 이루어져있다  
  
첫줄은 정수 N이 주어지며  
  
둘째줄은 A열에 위치한 N개 기계의 서로 다른 식별번호가 순서대로 공백문자로 구분되어 주어진다  
  
셋째줄에는 B열에 위치한 N개 기계의 식별번호가 순서대로 공백문자로 구분되어 주어진다  
  
(1 <= N <= 5*10^5)  
  
(0 <= Ai <= 10^6)  
  
(0 <= Bi <= 10^6)  
  
---  
  
```
A열: 132 392 311 351 231
B열: 392 351 132 311 231
```
A열 순서를 B열의 위치값으로 바꾸면,

[2, 0, 3, 1, 4] 가 된다.

이 배열에서 역순쌍을 구하면 되는 문제다

역순쌍이란, i < j 이지만, arr[i] > arr[j]인 쌍을 말한다

세그먼트 트리로 역순쌍을 구할 수 있다.

오른쪽에서부터 하나씩 보면서,

- 뒤에서부터 하면 앞에 있던 숫자들이 이미 세그먼트 트리에 쌓여있기 때문이다.

arr[i]보다 작은 인덱스에 있는 값의 개수를 센다. [세그먼트 트리에서 query(0, arr[i]-1)]

- 나보다 작은 숫자가 뒤에 몇개 있었나 확인할 수 있다.

해당 위치에 1을 더해준다 [update(arr[i], 1)]

- 지금까지 이 숫자가 몇번 나왔는지 세그먼트 트리에 기록하는 것이다.



## Input

```
5  
132 392 311 351 231  
392 351 132 311 231  

```

## Output

```
3
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    static int size;  
    static int[] tree;  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        int N = Integer.parseInt(br.readLine());  
        int[][] factory = new int[2][N+1];  
        int[] arr = new int[N+1];  
        HashMap<Integer, Integer> hm = new HashMap<>();  
        for (int i = 0; i < 2; i ++) {  
            StringTokenizer st = new StringTokenizer(br.readLine());  
            for (int j = 1; j < N+1; j ++) {  
                factory[i][j] = Integer.parseInt(st.nextToken());  
            }  
        }  
  
        for (int i = 1; i < N+1; i ++) {  
            hm.put(factory[1][i], i);  
        }  
        for (int i = 1; i < N+1; i ++) {  
            arr[i] = hm.get(factory[0][i]);  
        }  
  
        size = 1;  
        while (size <= 1000000) size *= 2;  
        tree = new int[size*2];  
  
        long inversionCount = 0;  
        for (int i = arr.length-1; i >= 1; i --) {  
            inversionCount += query(0, arr[i]-1);  
            update(arr[i], 1);  
        }  
        System.out.println(inversionCount);  
        br.close();  
    }  
  
    private static int query(int left, int right) {  
        left += size;  
        right += size;  
        int sum = 0;  
  
        while (left <= right) {  
            if (left % 2 == 1) sum += tree[left++];  
            if (right % 2 == 0) sum += tree[right--];  
            left /= 2;  
            right /= 2;  
        }  
        return sum;  
    }  
  
    private static void update(int idx, int value) {  
        idx += size;  
        tree[idx] += value;  
        while (idx > 1) {  
            idx /= 2;  
            tree[idx] = tree[idx*2] + tree[idx*2+1];  
        }  
    }  
}  
```
