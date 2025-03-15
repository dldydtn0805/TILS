## 문제 

https://www.acmicpc.net/problem/17837

## 해설

게임은 체스판에서 진행된다. 사용하는 말의 개수는 K개다

말은 원판모양이고 다른 말 위에 말을 올릴 수 있다

체스판의 각 칸은 흰색, 빨간색, 파란색 중 하나다

턴 한번은 1번 말부터 K번 말까지 순서대로 이동시키는 것이다.

한 말이 이동할때 위에 올려져있는 말도 함께 이동한다.

턴이 진행되던 도중에 말이 4개 이상 쌓이는 순간 게임이 종료된다

말의 이동 방향에 있는 칸에 따라 말의 이동이 다르며 아래와 같다.

예를 들어서 보자면,

A번 말이 이동하려는 칸이

- 흰색이라면, 그 칸으로 이동한다
    - 이동하려는 칸에 말이 이미 있는 경우는 가장 위에 A번 말을 올려놓는다
    - 만약 A번 말 위에 다른 말이 있는 경우는 A번 말과 위에 있는 모든 말이 이동한다
    - 예를들어 A, B, C로 쌓여있고, 이동하려는 칸에 D, E가 있는 경우, [D, E, A, B, C]가 된다
- 빨간색이라면, 이동한 후에 A번 말과 그 위에 있는 모든 말의 쌓여있는 순서를 반대로 바꾼다
    - [A, B, C]가 이동하고, 이동하려는 칸에 말이 없는 경우 [C, B, A]가 된다
    - [A, D, F, G]가 이동하고, 이동하려는 칸에 말이 [E, C, B]로 있는 경우 [E, C, B, G, F, D, A]가 된다
- 파란색이라면, A번 말의 이동 방향을 반대로하고 한칸 이동한다. 방향을 바꾼 후에 이동하려는 칸이 파란색인 경우 이동하지 않고 가만히 있는다
- 체스판을 벗어나는 경우에는 파란색과 같은 경우이다.



4 <= N <= 12, 4 <= K <= 10이 주어진다

N개의 줄에 체스판의 정보가 주어진다

체스판의 정보는 정수로 주어진다. 각 정수는 색을 의미한다

0은 흰색, 1은 빨간색, 2는 파란색이다

K개의 줄에 말의 정보가 1번 말부터 주어진다

말의 정보는 세개의 정수로 이루어진다

순서대로 행, 열의 번호, 이동 방향이다

행과 열의 번호는 1부터 시작하고,

이동 방향은 4보다 작거나 같은 자연수다.

오른쪽, 왼쪽, 위쪽, 아래쪽의 의미를 갖는다.

같은 칸에 말이 두개 이상 있는 경우는 없다

게임이 종료되는 턴의 번호를 출력한다. 값이 1000 보다 크거나 게임이 종료되지 않으면 -1을 출력한다

직관적으로 생각해보면 그냥 구현문제같은데 조금 난해하다.

1. 이동방향에 있는 발판이 흰색 / 빨간색 / 파란색에 따라 말의 행동 패턴이 달라진다는 것이다.
2. 위에 올려져있는 말도 함께 이동한다.
    - 빨간색 발판을 밟으면 쌓여있는 순서가 바뀐다. 즉 어떤 말이 올려져있는가가 수시로 바뀌게 된다.
    - 파란색이거나 장외로 나가는 경우는 이동하려는 말의 이동방향을 반대로 만든다.
3. 말이 이동하는 순서는 1번 말 부터 K번 말까지 순서대로 이동한다.
    - 말은 수시로 위치가 바뀐다. 본인의 의지가 아니더라도 다르 말 위에 업혀있으면 함께 이동하게 된다.
4. 제한시간은 0.5초이다.

자바 언어에 그렇게 익숙하지 않아서 메서드를 적극적으로 활용하지는 못했지만 어떻게 풀기는 풀었다.

각 말들의 차례가 될때마다 배열을 구분지어서 풀었다.

1. 이동시킬 배열
2. 이동시키지 않을 배열


내가 이번 문제에서 느낀 포인트들은 다음과 같다.

- 각 말클 클래스로 만들어서 현재 위치와 방향하고 이를 (0 ~ K-1) 을 키값으로 하는 해쉬맵으로 빠르게 접근할 수 있었고, 배열에는 말들의 번호만 담았다.

- 각 발판 앞에서의 행동이 끝나고나서 원래 있던 자리에 이동시키지 않을 리스트를 다시 원래 자리로 넣어주어야했고, 이동시킬 배열은 이동할 곳의 리스트로 넣어주었다.

- 가만히 있는 경우에서는 이동시키지 않을 배열을 먼저 넣어주었고, 이동시킬 배열을 나중에 원래자리로 넣어주었다.

- 파란색 발판에서 뒤돌았을떄 위에 올라탄 말들의 방향은 원래 방향 그대로였다는 사실을 깨닫는데 좀 시간이 걸렸다.

나머지는 그냥 문제에 적혀있는 그대로 구현한 느낌이긴 하다.

배열을 복사하기보다 한땀한땀 꺼내서 큐의 성질을 이용해 빠르게 옮기는걸로 구현하긴 했는데, 이게 최선이었을까 싶긴하다. 

생각보다 입력 예제가 친절 ? 하게 되어있어서 바로 솔브를 하게 되었는데 아직 얼떨떨하다.

순수하게 코드만 13000B 넘은적은 처음이라 웃기긴하네

## 입력
```txt
4 4
0 0 0 0
0 0 0 0
0 0 0 0
0 0 0 0
1 1 1
1 2 1
1 3 1
1 4 1
```

## 출력
```txt
1
```

```java
import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    static int[][] directions = {{0,1},{0,-1},{-1,0},{1,0}};
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());
        int[][] chessBoard = new int[N][N];
        for (int i = 0; i < N; i ++) {
            String[] line = br.readLine().split(" ");
            for (int j = 0; j < N; j++) {
                chessBoard[i][j] = Integer.parseInt(line[j]);
            }
        }
        LinkedList<Integer>[][] gameState = new LinkedList[N][N];
        for (int i = 0; i < N; i ++) {
            for (int j = 0; j < N; j++ ) {
                gameState[i][j] = new LinkedList<>();
            }
        }
        HashMap<Integer, Chess> chessSite = new HashMap<>();
        for (int i = 0; i < K ; i++) {
            st = new StringTokenizer(br.readLine());
            int row = Integer.parseInt(st.nextToken())-1;
            int col = Integer.parseInt(st.nextToken())-1;
            int dir = Integer.parseInt(st.nextToken())-1;

            gameState[row][col].add(i);
            chessSite.put(i, new Chess(row, col, dir));
        }

        int ans = playGame(gameState, chessBoard, chessSite, K, N);
        sb.append(ans);
        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static int playGame (LinkedList<Integer>[][] gameState, int[][] chessBoard, HashMap<Integer, Chess> chessSite, int K, int N) {
        int turn = 0;
        while (turn++ < 1000) {
            for (int k = 0; k < K; k ++) {
                Chess cur = chessSite.get(k); // 현재 턴에 움직일 말의 위치를 찾는다.
                int ci = cur.row, cj = cur.col, cDir = cur.dir; // 행 / 열 / 방향
                if (gameState[ci][ci].size() >= 4) {
                    return turn-1;
                }
                LinkedList<Integer> curState = new LinkedList<>(); // 해당 위치의 상태
                LinkedList<Integer> movingState = new LinkedList<>(); // 움직일 말
                LinkedList<Integer> prevState = new LinkedList<>(); // 움직이지 않을 말
                while (!gameState[ci][cj].isEmpty()) {
                    curState.add(gameState[ci][cj].poll());
                }
                int idx = 0;
                for (int i = 0; i < curState.size(); i++) { // 위에 있는 말을 찾는다.
                    if (curState.get(i) == k) {
                        idx = i;
                        break;
                    }
                }

                for (int i = 0; i < idx; i++) {
                    prevState.add(curState.get(i));
                }
                for (int i = idx; i < curState.size(); i++) {
                    movingState.add(curState.get(i));
                }
                int[] direction = directions[cDir]; // 방향 체크
                int ni = ci + direction[0], nj = cj + direction[1];
                if (0 <= ni && ni < N && 0 <= nj && nj < N) {
                    if (chessBoard[ni][nj] == 0) { // 흰색 발판
                        while (!movingState.isEmpty()) {
                            int move = movingState.pollFirst();
                            gameState[ni][nj].add(move);
                            chessSite.put(move, new Chess(ni, nj, chessSite.get(move).dir));

                            if (gameState[ni][nj].size() >= 4) {
                                return turn;
                            }
                        }
                        while (!prevState.isEmpty()) {
                            gameState[ci][cj].add(prevState.poll());
                        }
                    } else if (chessBoard[ni][nj] == 1) { // 빨간 발판
                        while (!movingState.isEmpty()) {
                            int move = movingState.pollLast();
                            gameState[ni][nj].add(move);
                            chessSite.put(move, new Chess(ni, nj, chessSite.get(move).dir));
                            if (gameState[ni][nj].size() >= 4) {
                                return turn;
                            }
                        }
                        while (!prevState.isEmpty()) {
                            gameState[ci][cj].add(prevState.poll());
                        }

                    } else { // 파란 발판
                        int nnDir;
                        if (cDir == 0) {
                            nnDir = 1;
                        } else if (cDir == 1) {
                            nnDir = 0;
                        } else if (cDir == 2) {
                            nnDir = 3;
                        } else {
                            nnDir = 2;
                        }
                        int[] nDirection = directions[nnDir];
                        int nni = ci + nDirection[0], nnj = cj + nDirection[1];
                        if (0 <= nni && nni < N && 0 <= nnj && nnj < N) {
                            if (chessBoard[nni][nnj] == 0) { // 흰색 발판
                                while (!movingState.isEmpty()) {
                                    int move = movingState.pollFirst();
                                    if (move == k) {
                                        chessSite.put(move, new Chess(nni, nnj, nnDir));
                                    } else {
                                        chessSite.put(move, new Chess(nni, nnj, chessSite.get(move).dir));
                                    }
                                    gameState[nni][nnj].add(move);
                                    if (gameState[nni][nnj].size() >= 4) {
                                        return turn;
                                    }
                                }
                                while (!prevState.isEmpty()) {
                                    gameState[ci][cj].add(prevState.poll());
                                }
                            } else if (chessBoard[nni][nnj] == 1) { // 빨간 발판
                                while (!movingState.isEmpty()) {
                                    int move = movingState.pollLast();
                                    if (move == k) {
                                        chessSite.put(move, new Chess(nni, nnj, nnDir));
                                    } else {
                                        chessSite.put(move, new Chess(nni, nnj, chessSite.get(move).dir));
                                    }
                                    gameState[nni][nnj].add(move);
                                    if (gameState[nni][nnj].size() >= 4) {
                                        return turn;
                                    }
                                }
                                while (!prevState.isEmpty()) {
                                    gameState[ci][cj].add(prevState.poll());
                                }
                            } else { // 파란 발판
                                while (!prevState.isEmpty()) {
                                    gameState[ci][cj].add(prevState.poll());
                                }
                                while (!movingState.isEmpty()) {
                                    int move = movingState.pollFirst();
                                    gameState[ci][cj].add(move);
                                    if (move == k) {
                                        chessSite.put(move, new Chess(ci, cj, nnDir));
                                    } else {
                                        chessSite.put(move, new Chess(ci, cj, chessSite.get(move).dir));
                                    }
                                }

                            }
                        } else { // 장외
                            while (!prevState.isEmpty()) {
                                gameState[ci][cj].add(prevState.poll());
                            }
                            while (!movingState.isEmpty()) {
                                int move = movingState.pollFirst();
                                gameState[ci][cj].add(move);
                                if (move == k) {
                                    chessSite.put(move, new Chess(ci, cj, nnDir));
                                } else {
                                    chessSite.put(move, new Chess(ci, cj, chessSite.get(move).dir));
                                }
                            }
                        }
                    }
                } else { // 장외
                    int nnDir;
                    if (cDir == 0) {
                        nnDir = 1;
                    } else if (cDir == 1) {
                        nnDir = 0;
                    } else if (cDir == 2) {
                        nnDir = 3;
                    } else {
                        nnDir = 2;
                    }
                    int[] nDirection = directions[nnDir];
                    int nni = ci + nDirection[0], nnj = cj + nDirection[1];
                    if (0 <= nni && nni < N && 0 <= nnj && nnj < N) {
                        if (chessBoard[nni][nnj] == 0) { // 흰색 발판
                            while (!movingState.isEmpty()) {
                                int move = movingState.pollFirst();
                                if (move == k) {
                                    chessSite.put(move, new Chess(nni, nnj, nnDir));
                                } else {
                                    chessSite.put(move, new Chess(nni, nnj, chessSite.get(move).dir));
                                }
                                gameState[nni][nnj].add(move);
                                if (gameState[nni][nnj].size() >= 4) {
                                    return turn;
                                }
                            }
                            while (!prevState.isEmpty()) {
                                gameState[ci][cj].add(prevState.poll());
                            }
                        } else if (chessBoard[nni][nnj] == 1) { // 빨간 발판
                            while (!movingState.isEmpty()) {
                                int move = movingState.pollLast();
                                if (move == k) {
                                    chessSite.put(move, new Chess(nni, nnj, nnDir));
                                } else {
                                    chessSite.put(move, new Chess(nni, nnj, chessSite.get(move).dir));
                                }
                                gameState[nni][nnj].add(move);
                                if (gameState[nni][nnj].size() >= 4) {
                                    return turn;
                                }
                            }
                            while (!prevState.isEmpty()) {
                                gameState[ci][cj].add(prevState.poll());
                            }
                        } else { // 파란 발판
                            while (!prevState.isEmpty()) {
                                gameState[ci][cj].add(prevState.poll());
                            }
                            while (!movingState.isEmpty()) {
                                int move = movingState.pollFirst();
                                gameState[ci][cj].add(move);
                                if (move == k) {
                                    chessSite.put(move, new Chess(ci, cj, nnDir));
                                } else {
                                    chessSite.put(move, new Chess(ci, cj, chessSite.get(move).dir));
                                }
                            }
                        }
                    } else { // 장외=
                        while (!prevState.isEmpty()) {
                            gameState[ci][cj].add(prevState.poll());
                        }
                        while (!movingState.isEmpty()) {
                            int move = movingState.pollFirst();
                            gameState[ci][cj].add(move);
                            if (move == k) {
                                chessSite.put(move, new Chess(ci, cj, nnDir));
                            } else {
                                chessSite.put(move, new Chess(ci, cj, chessSite.get(move).dir));
                            }
                        }
                    }
                }
            }
        }
        return -1;
    }


    public static class Chess {
        int row;
        int col;
        int dir;
        public Chess (int row , int col , int dir) {
            this.row = row;
            this.col = col;
            this.dir = dir;
        }
    }

}
```