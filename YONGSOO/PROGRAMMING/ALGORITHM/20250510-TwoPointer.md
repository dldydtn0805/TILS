
## Source
 
 https://www.acmicpc.net/problem/14719  
  
## Commentary
   
2차원 세계의 블록이 쌓여있다.  
  
비가 오면 블록 사이에 빗물이 고인다  
  
 비는 충분히 많이 온다. 고이는 빗물의 총량은 얼마인가 ?  

---  
  
2차원 세계의 세로 길이 H와 가로길이 W가 주어진다  
  
(1 <= H, W <= 500)  
  
블록이 쌓인 높이를 의미하는 0이상 H 이하의 자연수가 2차원 세계의 맨 왼쪽 위치부터 차례대로 W개 주어진다  
  
블록 내부의 빈 공간이 생길 수 없다. 2차원 세계의 바닥은 항상 막혀있다  
  
---  
  
2차원 세계에서는 한칸의 용량은 1이다. 고이는 빗물의 총량을 출력하라  
빗물이 전혀 고이지 않았을 경우 0을 출력하라  
  
---  
  
빗물이 고인다는 것은,  
  
비어있는 지점의 왼쪽, 오른쪽이 벽에 막혀있다는 것을 의미한다.  
  
이는 그래프 + 투포인터로 해결 가능하다.  

각 행 별로, 가장 왼쪽 벽과 가장 오른쪽 벽을 투포인터로 탐색한다.

왼쪽 벽과 오른쪽 벽을 기준으로 열을 탐색하며, 비어있는 공간이 있다면 물이 고일 수 있다는 것이므로 카운트 해준다.

모든 행 열을 탐색 후 반환해주면 된다.
  
  
## Input

```
4 4  
3 0 1 4  
```

## Output

```
5  
```


## Source Code

```java
import java.io.*;  
import java.util.*;  
  
public class Main {  
    public static int[][] directions = {{-1,0},{0,1},{1,0},{0,-1}};  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));  
        StringTokenizer st = new StringTokenizer(br.readLine());  
        int H = Integer.parseInt(st.nextToken());  
        int W = Integer.parseInt(st.nextToken());  
        int[][] blocks = new int[H][W];  
        st = new StringTokenizer(br.readLine());  
        for (int col = 0; col < W; col ++) {  
            int height = Integer.parseInt(st.nextToken());  
            for (int row = 0; row < height; row ++) {  
                blocks[row][col] = 1;  
            }  
        }  
        System.out.print(twoPointer(blocks, H, W));  
        bw.close();  
        br.close();  
    }  
  
    public static int twoPointer (int[][] blocks, int H, int W) {  
        int res = 0;  
        for (int row = 0; row < H; row++) {  
            int l = 0;  
            int r = W-1;  
            while (l <= r && l < W-1 && r > 0) {  
                if (blocks[row][l] != 1) {  
                    l ++;  
                } else if (blocks[row][r] != 1) {  
                    r --;  
                }  
                if (blocks[row][l] == 1 && blocks[row][r] == 1) {  
                    break;  
                }  
            }  
            for (int col = l; col < r; col ++) {  
                if (blocks[row][col] == 0) {  
                    res ++;  
                }  
            }  
        }  
        return res;  
    }  
}
```
