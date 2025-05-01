# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

#define pll pair<int, int>

using namespace std;

int N, M, D;

vector<vector<int> > board(15, vector<int>(15, 0));
vector<pll> directions = {{0, -1}, {-1, 0}, {0, 1}};
vector<int> pick_up(3, 0);
int result = 0;

int shot_arrow(vector<vector<int> >& visited)
{
    int sumsum = 0;
    for (int t=0; t<N; ++t) {
        int now_line = N - 1 - t;
        for (int i=0; i<3; ++i) {
            queue<pair<pll, int> > que;
            que.push({{now_line, pick_up[i]}, 0});
            while (!que.empty()) {
                pll now_node = que.front().first;
                int depth = que.front().second;
                que.pop();
                if (board[now_node.first][now_node.second] == 1) {
                    if (visited[now_node.first][now_node.second] == -1) {
                        visited[now_node.first][now_node.second] = t;
                        sumsum++;
                        break;
                    }
                    else if (visited[now_node.first][now_node.second] == t) {
                        break;
                    }
                }
                for (int k=0; k<3; ++k) {
                    int nx = now_node.first + directions[k].first;
                    int ny = now_node.second + directions[k].second;
                    if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                        if (depth + 1 < D) {
                            que.push({{nx, ny}, depth + 1});
                        }
                    }
                }
            }
        }
    }
    
    return sumsum;
}

void get_score(int idx, int depth)
{
    if (depth == 3) {
        vector<vector<int> > visited(N, vector<int>(M, -1));
        result = max(result, shot_arrow(visited));
        return;
    }
    
    for (int i=idx; i<M; ++i) {
        pick_up[depth] = i;
        get_score(i + 1, depth + 1);
    }
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M >> D;
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<M; ++j) {
            cin >> board[i][j];
        }
    }
    
    get_score(0, 0);
    cout << result;

    return 0;
}

```

> ## 문제
>
> 캐슬 디펜스는 성을 향해 몰려오는 적을 잡는 턴 방식의 게임이다. 게임이 진행되는 곳은 크기가 N×M인 격자판으로 나타낼 수 있다. 격자판은 1×1 크기의 칸으로 나누어져 있고, 각 칸에 포함된 적의 수는 최대 하나이다. 격자판의 N번행의 바로 아래(N+1번 행)의 모든 칸에는 성이 있다.
>
> 성을 적에게서 지키기 위해 궁수 3명을 배치하려고 한다. 궁수는 성이 있는 칸에 배치할 수 있고, 하나의 칸에는 최대 1명의 궁수만 있을 수 있다. 각각의 턴마다 궁수는 적 하나를 공격할 수 있고, 모든 궁수는 동시에 공격한다. 궁수가 공격하는 적은 거리가 D이하인 적 중에서 가장 가까운 적이고, 그러한 적이 여럿일 경우에는 가장 왼쪽에 있는 적을 공격한다. 같은 적이 여러 궁수에게 공격당할 수 있다. 공격받은 적은 게임에서 제외된다. 궁수의 공격이 끝나면, 적이 이동한다. 적은 아래로 한 칸 이동하며, 성이 있는 칸으로 이동한 경우에는 게임에서 제외된다. 모든 적이 격자판에서 제외되면 게임이 끝난다. 
>
> 게임 설명에서 보다시피 궁수를 배치한 이후의 게임 진행은 정해져있다. 따라서, 이 게임은 궁수의 위치가 중요하다. 격자판의 상태가 주어졌을 때, 궁수의 공격으로 제거할 수 있는 적의 최대 수를 계산해보자.
>
> 격자판의 두 위치 (r1, c1), (r2, c2)의 거리는 |r1-r2| + |c1-c2|이다.
>
> ## 입력
>
> 첫째 줄에 격자판 행의 수 N, 열의 수 M, 궁수의 공격 거리 제한 D가 주어진다. 둘째 줄부터 N개의 줄에는 격자판의 상태가 주어진다. 0은 빈 칸, 1은 적이 있는 칸이다.
>
> ## 출력
>
> 첫째 줄에 궁수의 공격으로 제거할 수 있는 적의 최대 수를 출력한다.
>
> ## 제한
>
> - 3 ≤ N, M ≤ 15
> - 1 ≤ D ≤ 10
>
> ## 해설
>
> 처음 문제를 봤을 때는 모든 열에 서있는 궁수가 주어진 사거리에 대해서 턴이 진행 될때마다 각 열에 대해 얻을 수 있는 점수를 아래와 같이 계산하고
>
> ```
> 1 1 0 0 0
> 0 0 0 0 0
> 0 0 0 0 0
> 일때 사거리가 2면
> 0번 열의 궁수가 각 열에 대해 얻을 수 있는 점수는 다음과 같다.
> 1 1 0 0 0
> ```
>
> 궁수 3명이 들어갈 위치에 대한 조합을 짠 후 가장 가까이 있는 사물을 맞추고, 그 중 가장 왼쪽을 맞추기 때문에 각자가 서있는 열에 대해서의 점수는 계산하지 않으려고 했다.
>
> > 0, 2, 4열에 궁수를 배치하면 0번 궁수는 2, 4번에 대한 점수는 더하지 않고, 2번 궁수는 0, 4열에 대한 점수는 더하지 않고... 이런식으로 점수를 계산하려 했다.
>
> 그러나. 이 방법은 같은 적을 맞출 수 있다는 조건 때문에 무조건 왼쪽부터 쏘려고 해서 아래와 같은 반례에서 문제가 발생했다.
>
> ```
> 6 5 1
> 1 0 1 0 1
> 0 1 0 1 0
> 1 1 0 0 0
> 0 0 0 1 1
> 1 1 0 1 1
> 0 0 1 0 0
> ```
>
> 그리고 미리 맞는 곳을 계산한다는 문제 때문에 위와 같은 방식은 정확한 값을 만들어내지 못했다.
>
> 결국 알고리즘 분류를 보았는데 브루트 포스와 그래프 탐색이 눈에 띄었다 그래서 문제 풀이 방식을 바꾸기로 했다.
>
> > 1. 조합을 이용해 궁수가 들어갈 자리를 정한다.
> >
> > 2. 해당 궁수의 자리를 토대로 각각 궁수들은 BFS를 통해 주어진 사거리에서 가장 가깝고 왼쪽에 있는 타겟을 찾는다.
> >
> >    - 처음 궁수가 쏠 수 있는 사거리 1이 드는 위치를 queue에 넣는다.
> >
> >    - BFS를 위해 queue에서 값을 꺼낼때 현재 위치에 적이 있는지 확인한다. 적이 있다면 이미 죽은 적인지 확인하며, 이번 턴에 죽은 적이라면 동시에 쏜것으로 간주해 턴을 넘기고, 이전 턴에 죽은 적이라면 해당 위치는 지나가며, 죽지 않은 적이라면 죽이고 점수 1을 얻는다. 이때 죽은 여부 판단은 visited에 기록된 값이 현재 턴과 같은지, -1인지를 통해 확인한다.
> >
> > 3. 2번이 끝나면 적들이 한칸씩 아래로 이동한다. 이를 기준이 되는 행을 1칸씩 올려 기준위치를 변경하는 것으로 구현한다. 이는 기준이 되는 행이 0이 될때까지 반복한다.
> >
> > 4. 3번까지 모든 경우가 완료하여 얻은 점수들을 result에 max를 이용하여 최댓값으로 기록하여 출력한다.
>
> 위와 같은 방식으로 푸니 간단하게 풀 수 있었다.
>
> 처음 구상한 방법은 복잡하고, 보장성도 없고 흠.. 상당히 난해해서 된다고 해도 복잡한 더티코드였던거 같다.. 요즘 너무 일차원적 구상에 일차원적 코드로 적어서 최적화 및 코드길이가 아주 엉망인데 흠... 어떻게 해야 최적화 실력을 늘릴수 있을지 좀 고민해봐야겠다..!

