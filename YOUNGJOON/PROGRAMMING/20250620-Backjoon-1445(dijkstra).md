# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

#define pll pair<int, int>

using namespace std;

struct Compare
{
    bool operator()(const pair<pll, pll>& a, const pair<pll, pll>& b) {
        if (a.first.first == b.first.first) {
            return a.first.second > b.first.second;
        }
        return a.first.first > b.first.first;
    }
};

int N, M;
vector<vector<char> > board(50, vector<char>(50, ' '));
vector<vector<int> > near_trash(50, vector<int>(50, 0));
vector<pll> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
pll S, E;


pll bfs()
{
    priority_queue<pair<pll, pll>, vector<pair<pll, pll> >, Compare> que;
    que.push({{0, 0}, {S.first, S.second}});
    vector<vector<pll> > visited(N, vector<pll>(M, {9999999, 9999999}));
    visited[S.first][S.second] = {0, 0};
    
    while (!que.empty()) {
        pair<pll, pll> now = que.top();
        que.pop();
        
        if (now.first.first == visited[now.second.first][now.second.second].first) {
            if (now.first.second > visited[now.second.first][now.second.second].second) continue;
        }
        else if (now.first.first > visited[now.second.first][now.second.second].first) continue;
        
        for (int i=0; i<4; ++i) {
            int nx = now.second.first + directions[i].first;
            int ny = now.second.second + directions[i].second;
            
            if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                if (board[nx][ny] == 'F') {
                    return now.first;
                }
                else {
                    pll next_info = now.first;
                    if (board[nx][ny] == 'g') {
                        next_info.first++;
                    }
                    else {
                        if (near_trash[nx][ny] == 1) {
                            next_info.second++;
                        }
                    }
                    
                    if (visited[nx][ny].first > next_info.first || (visited[nx][ny].first == next_info.first && visited[nx][ny].second > next_info.second)) {
                        visited[nx][ny] = next_info;
                        que.push({next_info, {nx, ny}});
                    }
                }
            }
            
        }
    }
    
};


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M;
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<M; ++j) {
            cin >> board[i][j];
            if (board[i][j] == 'S') S = {i, j};
            else if (board[i][j] == 'F') E = {i, j};
            else if (board[i][j] == 'g') {
                for (int k=0; k<4; ++k) {
                    int ni = i + directions[k].first;
                    int nj = j + directions[k].second;
                    
                    if (0 <= ni && ni < N && 0 <= nj && nj < M) {
                        near_trash[ni][nj] = 1;
                    }
                }
            }
        }
    }
    
    pll result = bfs();
    
    cout << result.first << " " << result.second;

    return 0;
}

```

> ## 문제
>
> 일요일 아침에 형택이는 Maroon5의 Sunday Morning이란 노래를 들으면서 여자친구와의 로맨틱한 여행을 떠나기로 했다. 형택이는 이것저것 환상에 빠져있다가, 계획을 세우는데 실패했다. 따라서, 주위에 있는 숲을 같이 탐험하기로 했다.
>
> 깊은 숲속에는 정말 아름다운 꽃이 하나있다. 형택이는 여자친구의 마음을 감동시키기 위해서, 꽃을 보여주면서 자신의 마음을 전해주려고 급하게 계획했다.
>
> 불행하게도, 사람들이 숲에다 쓰레기를 버려서 형택이의 계획은 정말 망가지기 직전이다.
>
> 형택이는 그동안 여자친구와 사귀면서 2가지 깨달은 것이 있는데, 한 가지는 쓰레기를 통과해서 지나가는 것을 정말 싫어하는 것이고, 쓰레기를 따라 옆을 지나가는 것도 정말 불편하게 느낀다는 것이다.
>
> 형택이는 방금 쓰레기가 어디에있는지 조사를 마쳤다. 입력으로 숲의 지도가 주어진다. S는 형택이와 여자친구의 데이트 시작장소를 나타내고, F는 꽃이 있는 위치를 나타내고, g는 쓰레기가 있는 위치를 나타낸다. 그리고 .은 아무것도 없는 깨끗한 칸이다.
>
> 형택이의 목표는 S에서 F까지 가는데, 쓰레기로 차있는 칸을 되도록이면 적게 지나가는 것이다. 형택이와 여자친구는 한 번에 한 칸 움직일 수 있다. 가로 or 세로로 한 칸 움직일 수 있다. 만약 되도록 적게 지나가는 경우의 수가 여러개라면, 쓰레기 옆을 지나가는 칸의 개수를 최소로 해서 지나려고 한다. 만약 어떤 칸이 비어있는데, 인접한 칸에 쓰레기가 있으면 쓰레기 옆을 지나는 것이다. 그리고, S와 F는 세지 않는다.
>
> ## 입력
>
> 첫째 줄에 숲의 세로 크기 N과 가로 크기 M이 주어진다. N과 M은 3보다 크거나 같고, 50보다 작거나 같은 자연수이다. 둘째 줄부터 숲의 지도가 주어진다. 숲의 지도는 S, F, g, . 만으로 이루어져 있다. S는 반드시 모서리에 위치해 있고, F는 모서리에 위치해있지 않다. 그리고 S와 F는 반드시 하나만 주어진다.
>
> ## 출력
>
> 첫째 줄에 형택이와 여자친구가 가장 최적의 방법으로 숲을 지났을 때, 지나가는 쓰레기의 최소 개수를 출력하고, 공백으로 구분 한 후에 쓰레기 옆을 지나가는 칸의 개수를 출력한다.
>
> ##  해설
> 
>  처음 문제를 봤을 때 다익스트라를 생각했다.
>  
>  쓰레기를 밟는 횟수를 가중치로 보았을때 가장 적은 가중치를 가진 것부터 우선순위를 주면 가장 먼저 F 에 도착하는 시점이 쓰레기를 가장 적게 밟는 경우라고 생각했다.
>  
>  > 1. 주어지는 입력을 받는다. 이때, 시작 지점 S와 도착지점 F의 좌표는 따로 변수에 저장해둔다.
>  >
>  >    - 이때, 쓰레기인 g를 받으면 주어지는 2차원 배열과 동일한 크기의 배열인 near_trash를 선언하고, g의 4방향으로 인접한 위치에 1을 기록한다. (쓰레기의 위치는 입력하지 않는다 비어있는 칸 중 쓰레기가 인접한 곳만 이라는 언급이 있기 때문) 이렇게 하지 않으면 매번 움직일 때마다 4방향을 확인해야해서 비효율적이다.
>  >
>  > 2. {{쓰레기를 밟은 횟수, 쓰레기 옆을 지나간 횟수}, {x, y}}의 형태로 쓰레기를 밟은 횟수가 적을수록 우선순위를, 만약 쓰레기를 밟은 횟수가 같다면 쓰레기 옆을 지나간 횟수가 적을수록 우선순위를 주는 우선순위 큐 que를 선언한다. 이후, 현재 위치를 쓰레기를 밟은 횟수 0, 쓰레기 옆을 지나간 횟수 0으로 하여 que에 넣는다.
> >
> > 3. 주어지는 배열과 동일한 크기의 2차원 배열 visited를 선언한다. visited는 쓰레기를 밟은 횟수와 쓰레기 옆을 지나간 횟수를 기록한다.
> >
> > 4. que가 빌때까지 반복한다.
>>
> >    > 1. que의 맨 앞에서 값을 하나 꺼낸다. 그리고 현재 위치의 visited에 기록된 값을 비교하고 현재 값이 visited 값보다 안좋은 상황이라면 continue한다.
>>    > 2. 4방향으로 이동한다.
> >    >    - 만약 이동한 위치가 **`F`**라면 현재 쓰레기를 밟은 횟수를 반환하여 탈출한다.
>>    >    - 만약 이동한 위치가 **`g`**라면 쓰레기를 밟은 횟수를 1 늘린다.
> >    >    - 만약 이동한 위치가 **`.`**이라면 해당 위치의 near_trash를 확인하고 근처에 쓰레기가 있다면 쓰레기 옆을 지나간 횟수를 1 늘린다.
>>    >    - 위의 작업이 반영되었다면 이동한 위치에 기록된 visited보다 좋은 상황인지 확인한다.
> >    >      - 좋은 상황이라면 visited에 현재 상황을 기록하고, que에 push한다.
>>    >      - 안좋은 상황이라면 무시하고 계속해서 진행한다.
> >
>> 5. 4-2의 **`F`**를 발견한 경우에서 반환한 값을 출력한다.
> 
>위와 같은 방식으로 문제를 풀었다! 구상한 방식으로 한번에 맞아서 기분이 좋은 경우였다!
> 
>아마 기존의 다익스트라 + 쓰레기 옆을 지나가는 체크 법을 어떻게 할 것이냐가 중요한 포인트였던것 같은데 빠르게 캐치해서 문제를 풀 수 있어서 좋았다! 다음에도 빠르게 문제를 풀 수 있으면 좋겠다!!

