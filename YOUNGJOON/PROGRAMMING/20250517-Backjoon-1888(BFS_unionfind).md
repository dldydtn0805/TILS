# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

#define pll pair<int, int>

using namespace std;

int N, M, K;
vector<int> parents;
vector<vector<int> > board(100, vector<int>(100, 0)); 
vector<vector<pll> > visited(100, vector<pll>(100, {0, 0}));
vector<pll> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}, {1, 1}, {1, -1}, {-1, -1}, {-1, 1}};


void lets_color_it(int base, int color, int x, int y)
{
    queue<pll> que;
    que.push({x, y});
    visited[x][y].first = color;
    
    while (!que.empty()) {
        pll now = que.front();
        que.pop();
        
        for (int i=0; i<4; ++i) {
            int nx = now.first + directions[i].first;
            int ny = now.second + directions[i].second;
            
            if (0 <= nx && nx < N && 0 <= ny && ny < M && visited[nx][ny].first == 0 && board[nx][ny] == base) {
                visited[nx][ny].first = color;
                que.push({nx, ny});
            }
        }
    }
    
    return;
}


void draw_color()
{
    int coloring = 0;
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<M; ++j) {
            if (visited[i][j].first == 0 && board[i][j] != 0) {
                coloring++;
                lets_color_it(board[i][j], coloring, i, j);
            }
        }
    }
    K = coloring;
    return;
}

int find_root(int x)
{
    if (parents[x] == x) return x;
    return parents[x] = find_root(parents[x]);
}

void union_root(int x, int y)
{
    int r_x = find_root(x);
    int r_y = find_root(y);
    
    if (r_x == r_y) return;
    if (r_x > r_y) swap(r_x, r_y);
    parents[r_y] = r_x;
    return;
}


bool check_connect(int now_turn)
{
    for (int i=0; i<N; ++i) {
        for (int j=0; j<M; ++j) {
            if (visited[i][j].first != 0 && visited[i][j].second == now_turn) {
                for (int k=0; k<4; ++k) {
                    int nx = i + directions[k].first;
                    int ny = j + directions[k].second;
                    
                    if (0 <= nx && nx < N && 0 <= ny && ny < M && visited[nx][ny].first != 0 && visited[nx][ny].first != visited[i][j].first) {
                        union_root(visited[i][j].first, visited[nx][ny].first);
                    }
                }
            }
        }
    }
    
    bool is_connect = true;
    
    for (int i=1; i<=K; ++i) {
        int tmp = find_root(i);
        if (tmp != 1) {
            is_connect = false;
            break;
        }
    }
    
    return is_connect;
}


int lets_move_out()
{
    parents.resize(K+1);
    for (int i=1; i<=K; ++i) {
        parents[i] = i;
    }
    
    int result = 0;
    bool start_check = check_connect(result);
    if (start_check) return result;
    
    while (true) {
        result++;
        for (int i=0; i<N; ++i) {
            for (int j=0; j<M; ++j) {
                if (visited[i][j].second == result - 1 && board[i][j] != 0) {
                    int col_start = max(0, i - board[i][j]);
                    int col_end = min(N - 1, i + board[i][j]);
                    int low_start = max(0, j - board[i][j]);
                    int low_end = min(M - 1, j + board[i][j]);
                    for (int p=col_start; p<=col_end; ++p) {
                        for (int q=low_start; q<=low_end; ++q) {
                            if (board[p][q] < board[i][j]) {
                                if (board[p][q] != 0) {
                                    union_root(visited[i][j].first, visited[p][q].first);
                                }
                                board[p][q] = board[i][j];
                                visited[p][q] = {visited[i][j].first, result};
                            }
                        }
                    }
                }
            }
        }
        
        bool now_result = check_connect(result);
        if (now_result) break;
    }
    
    return result;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M;
    string data;
    for (int i=0; i<N; ++i) {
        cin >> data;
        for (int j=0; j<M; ++j) {
            board[i][j] = data[j] - '0';
        }
    }
    
    draw_color();
    cout << lets_move_out();

    return 0;
}
```

> ## 문제
>
> 벽에 곰팡이가 자라고 있다. 곰팡이들은 현재 여러 개의 덩어리를 이루고 있는 상태인데, 이들이 점점 자라나서 한 덩어리로 될 때까지 얼마의 시간이 걸릴지 알고 싶다. 이를 계산하는 프로그램을 작성해 보자.
>
> 곰팡이가 피어 있는 벽은 m행 n열의 격자로 나뉘어 있고, 한 칸 당 한 개의 곰팡이가 있다. 곰팡이의 덩어리라는 것은, 격자 상에 가로세로로 인접한 곰팡이들의 집합을 말한다.
>
> 맨 처음 상태에서는 한 덩어리 안의 곰팡이들이 모두 같은 종으로, 자라는 속도도 같다. 그러나 서로 다른 덩어리에 속한 곰팡이는 종이 달라 자라는 속도도 다를 수 있다. 또, 시간이 지남에 따라 서로 다른 종의 곰팡이 덩어리가 한 덩어리로 합쳐지는 경우도 있을 수 있다. 만약 어느 곰팡이의 자라는 속도가 k라면, 하루가 지났을 때 그 곰팡이가 피어있던 자리를 중심으로 2k+1행 2k+1열의 격자에 같은 종의 곰팡이가 번진다는 의미이다. 만약 서로 다른 종의 곰팡이가 같은 칸에 번져 오면, 자라는 속도가 빠른 곰팡이가 그 칸을 차지한다.
>
> ## 입력
>
> 첫 줄에 곰팡이가 피어 있는 벽의 크기를 나타내는 두 정수 m과 n이 주어진다. (1 ≤ m, n ≤100) 둘째 줄부터는 벽의 상황이 한 줄에 한 행씩 주어진다. 곰팡이가 피어있는 곳은 그 곰팡이의 자라는 속도로, 그렇지 않은 곳은 0으로 표시되어 있다. 자라는 속도는 1이상 5이하의 정수이다. 각 숫자 사이에는 빈 칸이 없다.
>
> ## 출력
>
> 첫 줄에 곰팡이가 한 덩어리가 되기까지 걸리는 시간을 하루 단위로 출력한다.
>
> ## 해설
>
> 처음 문제를 봤을 때 BFS를 떠올렸다. 주어지는 곰팡이들의 번식 방식대로 늘리다가 곰팡이들이 합쳐지면 현재 턴의 값을 출력하기로 했다.
>
> > 1. 주어진 곰팡이 덩어리들을 구분하기 위해 BFS를 돌려 덩어리들의 번호를 visited에 기록한다.
>>
> > 2. 현재 턴을 0으로 선언하고 반복 시작 전에 현재 모든 덩어리가 연결되어 있는지 확인한다. 만약 연결되었다고 하면 답은 0이다.
>>
> > 3. 덩어리가 모두 연결될 때까지 반복한다.
>>
> >    3-1. 턴의 값을 1올리고 주어진 곰팡이들의 성장 속도에 맞게 곰팡이들을 기록한다. 만약 여러 종류의 곰팡이가 같은 위치에 번식하려 한다면 곰팡이의 성장 속도가 높은 값이 해당 자리를 갖는다.
>>
> >    - 만약, 곰팡이가 이미 다른 곰팡이가 있는 자리를 가지려고 한다면 두 곰팡이를 유니온하여 두 곰팡이 덩어리가 연결되었음을 기록한다.
> >
>>    3-2. 3-1이 끝나면 현재 턴에 늘어난 모든 곰팡이의 4방향을 확인하여 덩어리가 연결되어 있는지 확인한다. 이때 바로 옆에 다른 곰팡이가 있다면 유니온 파인드를 이용하여 곰팡이가 서로 연결되었음을 기록한다.
> >
>>    - 만약 모든 곰팡이 덩어리의 root가 같다면 모두 연결되었다는 뜻으로 현재 턴의 값을 반환한다.
> >    - 아니라면 다음 턴을 진행한다.
> >
> > 4. 3에서 반환한 턴의 수를 출력한다.
> 
> 위와 같은 방식으로 문제를 해결할 수 있었다. 처음에 여러가지 방법을 빠뜨리고 했는데, 곰팡이가 아에 없는 엣지케이스의 경우나, 곰팡이가 성장 속도가 너무 커 한 턴만에 모두 덮어버리면 3-2의 경우에서 오직 1개의 곰팡이만 있으므로 문제가 발생하는 등 여러 문제를 고치지 못했다.
> 
>하지만 이 모든 문제보다 4방향 순회시 i, j, k를 제대로 안써서 에러가 나는 문제 때문에 결국 문제를 틀렸다... 제발 복붙을 할거면 제대로 확인하고 복붙하자 ㅠㅠㅠ 복붙은 실수의 가장 큰 요인이 된다... 그냥 타자를 치던가...
