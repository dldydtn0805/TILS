# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

#define pll pair<int, int>

using namespace std;

int T, N, M;
vector<pll> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

bool bfs(vector<vector<char> >& board, queue<pll>& que, queue<pll>& next_que, bool is_fire)
{
	while (!que.empty()) {
		pll now = que.front();
		que.pop();
		if (is_fire == false && board[now.first][now.second] == '*') continue;
		
		for (int i=0; i<4; ++i) {
			int nx = now.first + directions[i].first;
			int ny = now.second + directions[i].second;

			if (0 <= nx && nx < N && 0 <= ny && ny < M) {
			    if (board[nx][ny] != '#' && board[nx][ny] != '*') {
    				if (is_fire == true) {
    					board[nx][ny] = '*';
    					next_que.push({nx, ny});
    				}
    				else {
    				    if (board[nx][ny] == '.') {
        				    board[nx][ny] = '@';
        				    next_que.push({nx, ny});
    				    }
    				}
			    }
			}
			else {
			    if (is_fire == false) {
			        return true;
			    }
			}
		}
	}
	
	return false;
}

int get_out(queue<pll>& que, vector<vector<char> >& board, pll start)
{
    queue<pll> sang_que;
    sang_que.push(start);
    int turn = 0;
    while (!sang_que.empty() || !que.empty()) {
        turn++;
        queue<pll> next_que, next_sang_que;
        
        bool is_over = bfs(board, sang_que, next_sang_que, false);
        if (is_over) return turn;
        bfs(board, que, next_que, true);
        
        que = next_que;
        sang_que = next_sang_que;
    }

    return -1;
}

int main()
{
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	cin >> T;
	for (int t=0; t<T; ++t) {
		cin >> M >> N;
		vector<vector<char> > board(N, vector<char>(M, ' '));
		queue<pll> que;
		pll start;
		for (int i=0; i<N; ++i) {
			for (int j=0; j<M; ++j) {
				cin >> board[i][j];
				if (board[i][j] == '*') que.push({i, j});
				else if (board[i][j] == '@') start = {i, j};
			}
		}
		
        int result = get_out(que, board, start);
        if (result == -1) {
            cout << "IMPOSSIBLE \n"; 
        }
        else {
            cout << result << "\n";
        }
	}

	return 0;
}
```

> ## 문제
>
> 상근이는 빈 공간과 벽으로 이루어진 건물에 갇혀있다. 건물의 일부에는 불이 났고, 상근이는 출구를 향해 뛰고 있다.
>
> 매 초마다, 불은 동서남북 방향으로 인접한 빈 공간으로 퍼져나간다. 벽에는 불이 붙지 않는다. 상근이는 동서남북 인접한 칸으로 이동할 수 있으며, 1초가 걸린다. 상근이는 벽을 통과할 수 없고, 불이 옮겨진 칸 또는 이제 불이 붙으려는 칸으로 이동할 수 없다. 상근이가 있는 칸에 불이 옮겨옴과 동시에 다른 칸으로 이동할 수 있다.
>
> 빌딩의 지도가 주어졌을 때, 얼마나 빨리 빌딩을 탈출할 수 있는지 구하는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에 테스트 케이스의 개수가 주어진다. 테스트 케이스는 최대 100개이다.
>
> 각 테스트 케이스의 첫째 줄에는 빌딩 지도의 너비와 높이 w와 h가 주어진다. (1 ≤ w,h ≤ 1000)
>
> 다음 h개 줄에는 w개의 문자, 빌딩의 지도가 주어진다.
>
> - '.': 빈 공간
> - '#': 벽
> - '@': 상근이의 시작 위치
> - '*': 불
>
> 각 지도에 @의 개수는 하나이다.
>
> ## 출력
>
> 각 테스트 케이스마다 빌딩을 탈출하는데 가장 빠른 시간을 출력한다. 빌딩을 탈출할 수 없는 경우에는 "IMPOSSIBLE"을 출력한다.
>
> ## 해설
>
> 처음 문제를 봤을 때 bfs를 이용해 탈출 여부를 확인하면 될 것 같다고 생각했다.
>
> > 1. 테스트케이스의 개수 T 를 받는다 그리고 T만큼 반복한다.
> >
> > 2. 주어지는 빌딩의 크기인 N, M을 받는다. 그리고 주어지는 빌딩의 상황을 vector에 담는다.
> >
> >    - 이때, 자신의 위치와 불의 위치를 기록z해둔다.
> >
> > 3. 빌딩의 상황과, 자신의 위치, 불의 위치를 인자로 넣어 탈출 여부 함수를 호출한다.
> >
> >    3-1. 자신의 위치를 담당하는 큐와 불의 위치를 담당하는 큐가 둘 다 빌때까지 반복한다.
> >
> >    3-2. 각각의 큐들이 모두 빌때까지 bfs를 돌려 이동 가능한 위치들을 기록하고, 이동한 위치는 next_que에 기록해둔다.
> >
> >    3-3. 만약 현재 턴에서 탈출했다면 현재 턴의 값을 반환한다.
> >
> >    3-4. 만약 현재 턴에서 탈출하지 못했다면, next_que에 저장된 값을 각각의 큐에 옮긴 후 다음 턴을 시작한다.
> >
> > 4. 만약 계속해서 더 이상 이동할 곳이 없거나 탈출이 불가능하다면 -1을 반환한다.
> > 5. 3-3에서 반환된 값이 있다면 해당 값을 출력하고, 4에서 -1이 반환됬다면 IMPOSSIBLE을 출력한다.
>
> 위와 같이 진행해서 정답을 맞았다.
>
> 해당 문제를 푸는데 BFS 방식을 큐 하나로 하려했다가 턴관리를 위해 next_que에 담아서 옮기고... 이런 식으로 계속 빙빙 돌아서 시간이 좀 걸렸다. 한번에 아키텍처를 구상하고 진행하는 편이 좋을 것 같다.
>
> 그리고 더 이상 진행이 불가능하다는걸 판단하는 조건문 `while (!sang_que.empty() || !que.empty()) {`에서 처음에 가운데 연산자를 &&을 넣어서 문제를 틀렸었다. 불과 상근 둘 중 하나만 움직이지 못해도 실패한다고 판단한 것이다. 이를 한쪽이라도 있으면 진행하라고 || 로 고치니 정답을 맞았다!
>
> 은근 간단한 문제인데 시간이 너무 소모되었다.. 조금 집중하면서 큰 틀을 잘 그려보는 습관이 필요하겠다.

