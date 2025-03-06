# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

#define pll pair<int, int>

using namespace std;

int N, M, x, y, dir;
vector<vector<int> > board;
vector<pll> directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

void run_robot()
{
    int result = 0;
    
    while (true) {
        if (board[x][y] == 0) {
            board[x][y] = 2;
            result++;
        }
        bool is_dust = false;
        
        for (int i=0; i<4; ++i) {
            int tx = x + directions[i].first;
            int ty = y + directions[i].second;
            
            if (0 <= tx && tx < N && 0 <= ty && ty < M && board[tx][ty] == 0) {
                is_dust = true;
                break;
            }
        }
        
        if (is_dust == false) {
            int back_point = (dir + 2) % 4;
            int nx = x + directions[back_point].first;
            int ny = y + directions[back_point].second;
            
            if (0 <= nx && nx < N && 0 <= ny && ny < M && board[nx][ny] != 1) {
                x = nx;
                y = ny;
            }
            else {
                break;
            }
        }
        else {
            int next_dir = (dir + 3) % 4;
            dir = next_dir;
            int nx = x + directions[next_dir].first;
            int ny = y + directions[next_dir].second;
            
            if (0 <= nx && nx < N && 0 <= ny && ny < M && board[nx][ny] == 0) {
                x = nx;
                y = ny;
            }
        }
    }
    
    cout << result;
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    
    cin >> N >> M;
    board.resize(N, vector<int>(M));

    cin >> x >> y >> dir;

    int num;

    for (int i=0; i<N; ++i) {
        for (int j=0; j<M; ++j) {
            cin >> num;
            board[i][j] = num;
        }
    }
    
    run_robot();

    return 0;
}

```



> ## 문제
>
> 로봇 청소기와 방의 상태가 주어졌을 때, 청소하는 영역의 개수를 구하는 프로그램을 작성하시오.
>
> 로봇 청소기가 있는 방은 N×M크기의 직사각형으로 나타낼 수 있으며, 1×1 크기의 정사각형 칸으로 나누어져 있다. 각각의 칸은 벽 또는 빈 칸이다. 청소기는 바라보는 방향이 있으며, 이 방향은 동, 서, 남, 북 중 하나이다. 방의 각 칸은 좌표 (r,c)로 나타낼 수 있고, 가장 북쪽 줄의 가장 서쪽 칸의 좌표가 (0,0), 가장 남쪽 줄의 가장 동쪽 칸의 좌표가 (N−1,M−1)이다. 즉, 좌표 (r,c)는 북쪽에서 (r+1)번째에 있는 줄의 서쪽에서 (c+1)번째 칸을 가리킨다. 처음에 빈 칸은 전부 청소되지 않은 상태이다.
>
> 로봇 청소기는 다음과 같이 작동한다.
>
> 1. 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
> 2. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우,
>    1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
>    2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
> 3. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우,
>    1. 반시계 방향으로 90∘ 회전한다.
>    2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
>    3. 1번으로 돌아간다.
>
> ## 입력
>
> 첫째 줄에 방의 크기 N과 M이 입력된다. (3≤N,M≤50) 줄에 처음에 로봇 청소기가 있는 칸의 좌표 (r,c)와 처음에 로봇 청소기가 바라보는 방향 d가 입력된다. d가 0인 경우 북쪽, 1인 경우 동쪽, 2인 경우 남쪽, 3인 경우 서쪽을 바라보고 있는 것이다.
>
> 셋째 줄부터 N개의 줄에 각 장소의 상태를 나타내는 N×M개의 값이 한 줄에 M개씩 입력된다. i번째 줄의 j번째 값은 칸 (i,j)의 상태를 나타내며, 이 값이 0인 경우 (i,j)가 청소되지 않은 빈 칸이고, 1인 경우 (i,j)에 벽이 있는 것이다. 방의 가장 북쪽, 가장 남쪽, 가장 서쪽, 가장 동쪽 줄 중 하나 이상에 위치한 모든 칸에는 벽이 있다. 로봇 청소기가 있는 칸은 항상 빈 칸이다.
>
> ## 해설
>
> 문제를 처음 보았을때 조건을 구현만 잘하면 될 것이라고 생각했다. 따라서 주어진 조건을 차분히 구현하기로 했다.
>
> 주어지는 입력들을 받고 현재 로봇 청소기의 위치를 전역 변수 x, y에 저장하고 방향을 dir에 저장한다.
>
> > 0. 먼저 while문을 통해 게임이 끝날때까지 주어진 조건을 반복했다.
> >
> > 1. 현재 있는 x, y의 위치의 먼지가 있다면 청소하고 result++를 한다.
> >
> > 2. 4방향을 순회하여 만약 먼지가 있는 곳이 있다면 즉시 반시계 방향으로 90도 회전하기 위해 현재 방향에서 +3을 한후 % 4를 하여 나머지 연산을 한다. 그리고 회전 한 방향에 먼지가 있다면 전진한다.
> >
> > 3. 만약 4방향을 모두 순회했을때 먼지가 없다면 ((현재 방향 + 2) % 4)를 해 뒤의 방향을 구하고 해당 방향 다음 칸에 있는것이 벽인지 빈칸인지 확인한다.
> >
> >    3-1. 만약 벽(1)이라면 즉시 while문을 종료시킨다.
> >
> >    3-2. 만약 빈칸이라면 방향은 기존 방향으로 유지한채 뒤로 1칸의 좌표로 x, y를 갱신한다.
> >
> > 4. 3-1에 의해 while문이 끝나면 result를 출력한다.
>
> 위와 같은 방법을 코드로 구현하여 풀었더니 바로 정답을 받았다!
>
> 이틀 전에 풀었던 문제의 하위호환 같은 느낌이라 금방 풀었다! 다만 입력을 받는데 잘못 받는 실수와 문제를 잘못 읽는 실수를 했는데...  좀 차분하고 꼼꼼하게 문제를 보고 풀기 시작하는게 좋겠다...!
