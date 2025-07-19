## Source
https://www.acmicpc.net/problem/12100  
  
## Comment
  
2048 게임은 4×4 크기의 보드에서 혼자 즐기는 재미있는 게임이다. 이 링크를 누르면 게임을 해볼 수 있다.  
  
이 게임에서 한 번의 이동은 보드 위에 있는 전체 블록을 상하좌우 네 방향 중 하나로 이동시키는 것이다. 이때, 같은 값을 갖는 두 블록이 충돌하면 두 블록은 하나로 합쳐지게 된다. 한 번의 이동에서 이미 합쳐진 블록은 또 다른 블록과 다시 합쳐질 수 없다. (실제 게임에서는 이동을 한 번 할 때마다 블록이 추가되지만, 이 문제에서 블록이 추가되는 경우는 없다)  
  
  
<그림 1>  <그림 2> <그림 3><그림 1>의 경우에서 위로 블록을 이동시키면 <그림 2>의 상태가 된다. 여기서, 왼쪽으로 블록을 이동시키면 <그림 3>의 상태가 된다.  
  
  
<그림 4>  <그림 5> <그림 6> <그림 7><그림 4>의 상태에서 블록을 오른쪽으로 이동시키면 <그림 5>가 되고, 여기서 다시 위로 블록을 이동시키면 <그림 6>이 된다. 여기서 오른쪽으로 블록을 이동시켜 <그림 7>을 만들 수 있다.  
  
  
<그림 8>  <그림 9><그림 8>의 상태에서 왼쪽으로 블록을 옮기면 어떻게 될까? 2가 충돌하기 때문에, 4로 합쳐지게 되고 <그림 9>의 상태가 된다.  
  
  
<그림 10> <그림 11>    <그림 12>    <그림 13><그림 10>에서 위로 블록을 이동시키면 <그림 11>의 상태가 된다.  
  
<그림 12>의 경우에 위로 블록을 이동시키면 <그림 13>의 상태가 되는데, 그 이유는 한 번의 이동에서 이미 합쳐진 블록은 또 합쳐질 수 없기 때문이다.  
  
  
<그림 14> <그림 15>마지막으로, 똑같은 수가 세 개가 있는 경우에는 이동하려고 하는 쪽의 칸이 먼저 합쳐진다. 예를 들어, 위로 이동시키는 경우에는 위쪽에 있는 블록이 먼저 합쳐지게 된다. <그림 14>의 경우에 위로 이동하면 <그림 15>를 만든다.  
  
이 문제에서 다루는 2048 게임은 보드의 크기가 N×N 이다. 보드의 크기와 보드판의 블록 상태가 주어졌을 때, 최대 5번 이동해서 만들 수 있는 가장 큰 블록의 값을 구하는 프로그램을 작성하시오.  
  
입력  
첫째 줄에 보드의 크기 N (1 ≤ N ≤ 20)이 주어진다. 둘째 줄부터 N개의 줄에는 게임판의 초기 상태가 주어진다. 0은 빈 칸을 나타내며, 이외의 값은 모두 블록을 나타낸다. 블록에 쓰여 있는 수는 2보다 크거나 같고, 1024보다 작거나 같은 2의 제곱꼴이다. 블록은 적어도 하나 주어진다.  
  
출력  
최대 5번 이동시켜서 얻을 수 있는 가장 큰 블록을 출력한다.  
  
---  
  
보드가 주어졌을때 최대 5번 움직여서 얻을 수 있는 가장 큰 블록을 출력해야한다  
  
네 방향으로 키를 눌렀을 때 모든 경우의 수를 브루트포스하게 구성하고 

최대 경우를 백트래킹 하면 된다 

상하좌우 움직였을때 같은 숫자를 합치고, 빈 공간으로 잘 채워주어야한다

구현을 섬세하게 해야했다
  
## Input

```
3  
2 2 2  
4 4 4  
8 8 8  
```

## Output

```
16
```

## Source Code

```java
import java.io.*;
import java.util.*;

public class Main {
    private static int[][] directions = {{-1, 0},{0, 1},{1, 0},{0, -1}};
    private static int N;
    private static int ans;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        ans = 0;
        int[][] board = new int[N][N];
        for (int i = 0; i < N; i ++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j ++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        List<int[]> sequence = new LinkedList<>();
        moveBoard(board, 0, new int[]{3, 0, 0, 0, 0});
        for (int i = 0; i < 4; i ++) {
            for (int j = 0; j < 4; j ++) {
                for (int k = 0; k < 4; k++) {
                    for (int l = 0; l < 4; l ++) {
                        for (int m = 0; m < 4; m ++) {
                            moveBoard( board, 0, new int[]{i, j, k, l, m});
                        }

                    }
                }
            }
        }
        System.out.println(ans);

    }


    private static void moveBoard(int[][] board, int depth, int[] sequence) {
        if (depth == 5) {
            for (int i = 0; i < N; i ++) {
                for (int j = 0; j < N; j ++) {
                    ans = Math.max(ans, board[i][j]);
                }
            }
//            System.out.println(Arrays.deepToString(board));

            return;
        }
        int[][] curBoard = new int[N][N];
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j ++) {
                curBoard[i][j] = board[i][j];
            }
        }
        int[][] nextBoard = new int[N][N];
        int dir = sequence[depth];
        int[] direction = directions[dir];
        int di = direction[0];
        int dj = direction[1];
        // dir : 0 : down / 1 : left / 2 : up / 3 : right;
        if (dir == 0) {
            for (int j = 0; j < N; j ++) {
                List<Integer> arr = new LinkedList<>();
                for (int i = N-1; i >= 0;) {
                    int si = i;
                    // 기준 블록이 0이라면 스킵
                    while (si >= 0 && curBoard[si][j] == 0) {
                        si += di;
                    }
                    // 비교 블럭
                    int ni = si + di;
                    // 비교 블럭이 0이라면 스킵
                    while (ni + di >= 0 && curBoard[ni][j] == 0) {
                        ni += di;
                    }
                    // 아래 블록이 0이 아닐때
                    if (si >= 0 && curBoard[si][j] != 0) {
                        if (ni >= 0) {
                            // 만약 두 블럭이 일치한다면 두개를 합친다
                            if (curBoard[si][j] == curBoard[ni][j]) {
                                arr.add(curBoard[si][j] * 2);
                                curBoard[ni][j] = 0;
                                i = ni + di;
                                if (i == 0) {
                                    arr.add(curBoard[i][j]);
                                    curBoard[i][j] = 0;
                                }
                            } else {
                                arr.add(curBoard[si][j]);
                                curBoard[si][j] = 0;
                                i = si + di;
                            }
                        } else {
                            arr.add(curBoard[si][j]);
                            curBoard[si][j] = 0;
                            i = si + di;
                        }
                    } else {
                        i --;
                    }
                }
                for (int i = 0; i < arr.size(); i ++) {
                    nextBoard[N-1-i][j] = arr.get(i);
                }
            }
        } else if (dir == 2) {
            for (int j = 0; j < N; j ++) {
                List<Integer> arr = new LinkedList<>();
                for (int i = 0; i < N ; ) {
                    int si = i;
                    // 기준 블록이 0이라면 스킵
                    while (si < N && curBoard[si][j] == 0) {
                        si += di;
                    }
                    // 비교 블럭
                    int ni = si + di;
                    // 비교 블럭이 0이라면 스킵
                    while (ni + di < N && curBoard[ni][j] == 0) {
                        ni += di;
                    }
                    if (si < N && curBoard[si][j] != 0) {
                        if (ni < N) {
                            // 만약 두 블럭이 일치한다면 두개를 합친다
                            if (curBoard[si][j] == curBoard[ni][j]) {
                                arr.add(curBoard[si][j] * 2);
                                curBoard[ni][j] = 0;
                                i = ni + di;
                                if (i == N-1) {
                                    arr.add(curBoard[i][j]);
                                    curBoard[i][j] = 0;
                                }
                            } else {
                                arr.add(curBoard[si][j]);
                                curBoard[si][j] = 0;
                                i = si + di;
                            }
                        } else {
                            arr.add(curBoard[si][j]);
                            curBoard[si][j] = 0;
                            i = si + di;
                        }
                    } else {
                        i ++;
                    }
                }
                for (int i = 0; i < arr.size(); i ++) {
                    nextBoard[i][j] = arr.get(i);
                }
            }
        } else if (dir == 3) {
            for (int i = 0; i < N; i ++) {
                List<Integer> arr = new LinkedList<>();
                for (int j = N-1; j >= 0 ; ) {
                    int sj = j;
                    // 기준 블록이 0이라면 스킵
                    while (sj >= 0 && curBoard[i][sj] == 0) {
                        sj += dj;
                    }
                    // 비교 블럭
                    int nj = sj + dj;
                    // 비교 블럭이 0이라면 스킵
                    while (nj + dj >= 0 && curBoard[i][nj] == 0) {
                        nj += dj;
                    }
                    if (sj >= 0 && curBoard[i][sj] != 0) {
                        if (nj >= 0) {
                            // 만약 두 블럭이 일치한다면 두개를 합친다
                            if (curBoard[i][sj] == curBoard[i][nj]) {
                                arr.add(curBoard[i][sj] * 2);
                                curBoard[i][nj] = 0;
                                j = nj + dj;
                                if (j == 0) {
                                    arr.add(curBoard[i][j]);
                                    curBoard[i][j] = 0;
                                }
                            } else {
                                arr.add(curBoard[i][sj]);
                                curBoard[i][sj] = 0;
                                j = sj + dj;
                            }
                        } else {
                            arr.add(curBoard[i][sj]);
                            curBoard[i][sj] = 0;
                            j = sj + dj;
                        }
                    } else {
                        j --;
                    }
                }
                for (int j = 0; j < arr.size(); j ++) {
                    nextBoard[i][N-1-j] = arr.get(j);
                }
            }
        } else if (dir == 1) {
            for (int i = 0; i < N; i ++) {
                List<Integer> arr = new LinkedList<>();
                for (int j = 0; j < N ; ) {
                    int sj = j;
                    // 기준 블록이 0이라면 스킵
                    while (sj < N && curBoard[i][sj] == 0) {
                        sj += dj;
                    }
                    // 비교 블럭
                    int nj = sj + dj;
                    // 비교 블럭이 0이라면 스킵
                    while (nj + dj < N && curBoard[i][nj] == 0) {
                        nj += dj;
                    }
                    if (sj < N && curBoard[i][sj] != 0) {
                        if (nj < N) {
                            // 만약 두 블럭이 일치한다면 두개를 합친다
                            if (curBoard[i][sj] == curBoard[i][nj]) {
                                arr.add(curBoard[i][sj] * 2);
                                curBoard[i][nj] = 0;
                                j = nj + dj;
                                if (j == N-1) {
                                    arr.add(curBoard[i][j]);
                                    curBoard[i][j] = 0;
                                }
                            } else {
                                arr.add(curBoard[i][sj]);
                                curBoard[i][sj] = 0;
                                j = sj + dj;
                            }
                        } else {
                            arr.add(curBoard[i][sj]);
                            curBoard[i][sj] = 0;
                            j = sj + dj;
                        }
                    } else {
                        j ++;
                    }
                }
                for (int j = 0; j < arr.size(); j ++) {
                    nextBoard[i][j] = arr.get(j);
                }
            }
        }
        moveBoard(nextBoard, depth+1, sequence);
    }
}
```
