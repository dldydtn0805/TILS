# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <set>

#define pll pair<int, int>

using namespace std;

int N, M;
vector<vector<int> > board(20, (vector<int>(20, 0)));
vector<pll> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};


pll bfs(vector<vector<int> >& visited, int x, int y, int def_mode)
{
    int base = board[x][y], cnt = 1, rainbow_cnt = 0;
    set<pll> rainbow_blocks;
    queue<pll> que;
    que.push({x, y});
    if (def_mode == 1) board[x][y] = -2;
    
    while (!que.empty()) {
        pll now = que.front();
        que.pop();
        
        for (int i=0; i<4; ++i) {
            int nx = now.first + directions[i].first;
            int ny = now.second + directions[i].second;
            
            if (def_mode == 0) {
                if (0 <= nx && nx < N && 0 <= ny && ny < N && ((visited[nx][ny] == 0 && board[nx][ny] == base) || (board[nx][ny] == 0 && rainbow_blocks.find({nx, ny}) == rainbow_blocks.end() ) ) ) {
                    if (board[nx][ny] == base) visited[nx][ny] = 1;
                    else {
                        rainbow_blocks.insert({nx, ny});
                        rainbow_cnt++;
                    }
                    cnt++;
                    que.push({nx, ny});
                } 
            }
            else {
                if (0 <= nx && nx < N && 0 <= ny && ny < N && (board[nx][ny] == base || board[nx][ny] == 0) ) {
                    board[nx][ny] = -2;
                    que.push({nx, ny});
                }
            }
        }
    }
    
    return {cnt, rainbow_cnt};
}


void gravity()
{
    vector<vector<int> > tmp_board(20, (vector<int>(20, -2)));
    
    for (int i=N-1; i>=0; --i) {
        for (int j=0; j<N; ++j) {
            if (board[i][j] >= 0) {
                pll best_loca = {i, j};
                for (int k=i; k<=N - 1; ++k) {
                    if (tmp_board[k][j] == -2) {
                        best_loca = {k, j};
                    }
                    else break;
                }
                tmp_board[best_loca.first][best_loca.second] = board[i][j];
            }
            if (board[i][j] == -1) {
                tmp_board[i][j] = -1;
            }
        }
    }
    
    board = tmp_board;
    return;
}


void rotate_gravity()
{
    vector<vector<int> > tmp_board(20, (vector<int>(20, -2)));
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<N; ++j) {
            if (board[i][j] >= 0) {
                pll best_loca = {N-1-j, i};
                for (int k=N - 1 - j; k<=N - 1; ++k) {
                    if (tmp_board[k][i] == -2) {
                        best_loca = {k, i};
                    }
                    else break;
                }
                tmp_board[best_loca.first][best_loca.second] = board[i][j];
            }
            if (board[i][j] == -1) {
                tmp_board[N-1-j][i] = -1;
            }
        }
    }
    
    board = tmp_board;
    return;
}


int search_group()
{
    int result = 0;
    while (true) {
        int max_size = 0, max_rainbow = 0;
        pll max_loca = {-1, -1};
        vector<vector<int> > visited(20, (vector<int>(20, 0)));
        for (int i=0; i<N; ++i) {
            for (int j=0; j<N; ++j) {
                if (board[i][j] > 0 && visited[i][j] == 0) {
                    visited[i][j] = 1;
                    pll tmp = bfs(visited, i, j, 0);
                    if (max_size < tmp.first) {
                        max_size = tmp.first;
                        max_rainbow = tmp.second;
                        max_loca = {i, j};
                    }
                    else if (max_size == tmp.first) {
                        if (max_rainbow < tmp.second) {
                            max_rainbow = tmp.second;
                            max_loca = {i, j};
                        }
                        else if (max_rainbow == tmp.second) {
                            if (max_loca.first < i) {
                                max_loca = {i, j};
                            }
                            else if (max_loca.first == i) {
                                if (max_loca.second < j) {
                                    max_loca.second = j;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if (max_size > 1) {
            bfs(visited, max_loca.first, max_loca.second, 1);
            result += max_size * max_size;

            gravity();

            rotate_gravity();
            
        }
        else break;
        
    }
    
    return result;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M;
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<N; ++j) {
            cin >> board[i][j];
        }
    }
    
    cout << search_group();

    return 0;
}


```

> ## 문제
>
> 상어 중학교의 코딩 동아리에서 게임을 만들었다. 이 게임은 크기가 N×N인 격자에서 진행되고, 초기에 격자의 모든 칸에는 블록이 하나씩 들어있고, 블록은 검은색 블록, 무지개 블록, 일반 블록이 있다. 일반 블록은 M가지 색상이 있고, 색은 M이하의 자연수로 표현한다. 검은색 블록은 -1, 무지개 블록은 0으로 표현한다. (i, j)는 격자의 i번 행, j번 열을 의미하고, |r1 - r2| + |c1 - c2| = 1을 만족하는 두 칸 (r1, c1)과 (r2, c2)를 인접한 칸이라고 한다.
>
> 블록 그룹은 연결된 블록의 집합이다. 그룹에는 일반 블록이 적어도 하나 있어야 하며, 일반 블록의 색은 모두 같아야 한다. 검은색 블록은 포함되면 안 되고, 무지개 블록은 얼마나 들어있든 상관없다. 그룹에 속한 블록의 개수는 2보다 크거나 같아야 하며, 임의의 한 블록에서 그룹에 속한 인접한 칸으로 이동해서 그룹에 속한 다른 모든 칸으로 이동할 수 있어야 한다. 블록 그룹의 기준 블록은 무지개 블록이 아닌 블록 중에서 행의 번호가 가장 작은 블록, 그러한 블록이 여러개면 열의 번호가 가장 작은 블록이다.
>
> 오늘은 이 게임에 오토 플레이 기능을 만드려고 한다. 오토 플레이는 다음과 같은 과정이 블록 그룹이 존재하는 동안 계속해서 반복되어야 한다.
>
> 1. 크기가 가장 큰 블록 그룹을 찾는다. 그러한 블록 그룹이 여러 개라면 포함된 무지개 블록의 수가 가장 많은 블록 그룹, 그러한 블록도 여러개라면 기준 블록의 행이 가장 큰 것을, 그 것도 여러개이면 열이 가장 큰 것을 찾는다.
> 2. 1에서 찾은 블록 그룹의 모든 블록을 제거한다. 블록 그룹에 포함된 블록의 수를 B라고 했을 때, B2점을 획득한다.
> 3. 격자에 중력이 작용한다.
> 4. 격자가 90도 반시계 방향으로 회전한다.
> 5. 다시 격자에 중력이 작용한다.
>
> 격자에 중력이 작용하면 검은색 블록을 제외한 모든 블록이 행의 번호가 큰 칸으로 이동한다. 이동은 다른 블록이나 격자의 경계를 만나기 전까지 계속 된다.
>
> 다음은 N = 5, M = 3인 경우의 예시이다.
>
> | 2    | 2    | -1   | 3    | 1    |
> | ---- | ---- | ---- | ---- | ---- |
> | 3    | 3    | 2    | 0    | -1   |
> | 0    | 0    | 0    | 1    | 2    |
> | -1   | 3    | 1    | 3    | 2    |
> | 0    | 3    | 2    | 2    | 1    |
>
> 여기서 찾을 수 있는 크기가 가장 큰 블록 그룹을 다음과 같이 빨간색으로 표시했다.
>
> | 2    | 2    | -1   | 3    | 1    |
> | ---- | ---- | ---- | ---- | ---- |
> | 3    | 3    | 2    | 0    | -1   |
> | 0    | 0    | 0    | 1    | 2    |
> | -1   | 3    | 1    | 3    | 2    |
> | 0    | 3    | 2    | 2    | 1    |
>
> 블록 그룹이 제거되면 다음과 같이 변하고, 점수 82점을 획득한다.
>
> | 2    | 2    | -1   | 3    | 1    |
> | ---- | ---- | ---- | ---- | ---- |
> |      |      | 2    | 0    | -1   |
> |      |      |      | 1    | 2    |
> | -1   |      | 1    | 3    | 2    |
> |      |      | 2    | 2    | 1    |
>
> 중력이 작용하면 다음과 같이 변한다.
>
> |      |      | -1   | 3    | 1    |
> | ---- | ---- | ---- | ---- | ---- |
> |      |      |      | 0    | -1   |
> | 2    |      | 2    | 1    | 2    |
> | -1   |      | 1    | 3    | 2    |
> |      | 2    | 2    | 2    | 1    |
>
> 90도 반시계방향으로 회전한 결과는 다음과 같다.
>
> | 1    | -1   | 2    | 2    | 1    |
> | ---- | ---- | ---- | ---- | ---- |
> | 3    | 0    | 1    | 3    | 2    |
> | -1   |      | 2    | 1    | 2    |
> |      |      |      |      | 2    |
> |      |      | 2    | -1   |      |
>
> 다시 여기서 중력이 작용하면 다음과 같이 변한다.
>
> | 1    | -1   |      |      |      |
> | ---- | ---- | ---- | ---- | ---- |
> | 3    |      | 2    | 2    | 1    |
> | -1   |      | 1    | 3    | 2    |
> |      |      | 2    | 1    | 2    |
> |      | 0    | 2    | -1   | 2    |
>
> 오토 플레이가 모두 끝났을 때 획득한 점수의 합을 구해보자.
>
> ## 입력
>
> 첫째 줄에 격자 한 변의 크기 N, 색상의 개수 M이 주어진다.
>
> 둘째 줄부터 N개의 줄에 격자의 칸에 들어있는 블록의 정보가 1번 행부터 N번 행까지 순서대로 주어진다. 각 행에 대한 정보는 1열부터 N열까지 순서대로 주어진다. 입력으로 주어지는 칸의 정보는 -1, 0, M이하의 자연수로만 이루어져 있다.
>
> ## 출력
>
> 첫째 줄에 획득한 점수의 합을 출력한다.
>
> ## 제한
>
> - 1 ≤ N ≤ 20
> - 1 ≤ M ≤ 5
>
> ## 해설
>
> 처음 문제를 봤을 때 순수하게 구현을 떠올렸다.
>
> 문제에서 주어지는 모든 조건을 하나의 함수로 만들어 구현하면 될 것이라고 생각했다.
>
> 1. 크기가 가장 큰 블록 그룹을 찾는다. 그러한 블록 그룹이 여러 개라면 포함된 무지개 블록의 수가 가장 많은 블록 그룹, 그러한 블록도 여러개라면 기준 블록의 행이 가장 큰 것을, 그 것도 여러개이면 열이 가장 큰 것을 찾는다.
>
>    > 1. 매 호출 마다 현재 board의 방문처리를 해줄 visited를 선언한다.
>    > 2. board의 모든 값을 순회한다. visited 처리가 되어있지 않다면 해당 좌표에서 bfs를 시작해 해당 위치의 블록 그룹의 크기를 구한다.
>    > 3. 2에서 구한 블록 그룹의 값이 가장 크다면 현재 위치와 블록의 개수, 무지개 블록의 포함 개수를 기록한다.
>    > 4. 만약 2에서 구한 블록 그룹의 값이 현재 기록된 값과 같다면 아래의 조건에 따라 기록을 수정한다
>    >    - 1순위 : 무지개 블록의 수가 현재 위치의 블록 그룹이 더 많다면 현재 위치와 무지개 블록의 개수를 기록
>    >    - 2순위 : 무지개 블록의 수 마저 똑같고 현재 위치의 열의 값이 더 높다면 현재 위치를 등록
>    >    - 3순위 : 무지개 블록의 수와 현재 위치의 열의 값이 똑같다면 행의 값이 더 높을때 현재 위치를 등록
>
> 2. 1에서 찾은 블록 그룹의 모든 블록을 제거한다. 블록 그룹에 포함된 블록의 수를 B라고 했을 때, B2점을 획득한다.
>
>    > 1. 1에서 기록한 최적 위치에서 다시 BFS를 돌려 해당 그룹의 모든 값들을 제거한다. (-2)
>    > 2. 제거한 블록의 개수를 통해 점수를 result에 기록한다.
>
> 3. 격자에 중력이 작용한다.
>
>    > 1. 현재 보드와 크기가 똑같은 임시 보드를 만든다. 가장 아래 행부터 시작하여 0번째 열부터 순회를 시작한다.
>    >
>    > 2. 현재 열부터 가장 아래 행까지 순회하여 가장 아래 행에 가까운 임시 보드 위치에 현재 보드 위치의 값을 둔다.
>    >
>    >    단, 중간에 -1을 만나거나, 비어있지 않은 다른 값이 기록되어 있는것을 확인하면 바로 그 위에 값을 둔다.
>    >
>    > 3. 2의 모든 과정이 끝나면 임시 보드를 보드의 값으로 한다.
>
> 4. 격자가 90도 반시계 방향으로 회전한다. + 5. 다시 격자에 중력이 작용한다.
>
>    > 1. 현재 보드와 크기가 똑같은 임시 보드를 만든다. 0번 행, 0번째 열부터 순회를 시작한다.
>    >
>    > 2. 현재 위치가 90도 회전한 값을 생각해보면 아래와 같은 식으로 계산할 수 있다.
>    >
>    >    ```
>    >    현재 좌표가 {i, j}일 때, 90도 회전한 값은 {N-1-j, i}
>    >    ```
>    >
>    > 3. 중력을 받은 것 까지 동시에 한번의 함수에서 진행하고자 한다. 90도 회전한 값의 행에서 가장 아래 행까지 순회하여 가장 아래 행에 가까운 임시 보드 위치에 현재 보드 위치의 값을 둔다.
>    >
>    >    단, 중간에 -1을 만나거나, 비어있지 않은 다른 값이 기록되어 있는것을 확인하면 바로 그 위에 값을 둔다.
>    >
>    > 4. 2.와 3.의 과정이 끝나면 임시 보드를 보드의 값으로 한다.
>
> 5. 위의 1~4의 과정을 2개 이상의 블록은 가진 블록 그룹이 나타나지 않을때까지 반복한다. 더 이상 2개 이상의 블록을 가진 블록그룹이 나타나지 않는다면 순회를 종료하고 획득한 점수를 출력한다.
>
> 위와 같은 방식으로 문제를 풀 수 있었다.
>
> 함수를 여러개 나누어서 푸니까 생각보다 할만했던 것 같다! 단, 중력 함수 부분을 2가지로 나누어서 사용한 점은 좀 모듈화를 못한게 아닌가 생각이 들었다... 다음에는 기능 모듈화를 잘해서 깔끔하게 만들었으면 좋겠다.
