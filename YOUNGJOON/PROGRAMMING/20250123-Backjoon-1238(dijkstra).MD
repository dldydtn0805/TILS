# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

#define pll pair<int, int>
#define INF 2000001
using namespace std;

vector<vector<pll> > graph;

int N, M, X;
int result = 0;

struct Compare
{
    bool operator()(const pll& a, const pll& b) {
        return a.first > b.first;
    }
};


void go_to_party(int start)
{
    vector<int> visited(N+1, INF);
    visited[start] = 0;
    priority_queue<pll, vector<pll>, Compare> que;
    que.push({0, start});
    
    while (!que.empty()) {
        pll now = que.top();
        que.pop();
        
        if (now.first > visited[X]) {
            continue;
        }
        
        for (pll p : graph[now.second]) {
            int next_dist = now.first + p.first;
            if (visited[X] > next_dist && visited[p.second] > next_dist) {
                que.push({next_dist, p.second});
                visited[p.second] = next_dist;
            }
        }
    }
    
    que.push({visited[X], X});
    vector<int> next_visited(N+1, INF);
    next_visited[X] = visited[X];
    
    while (!que.empty()) {
        pll now = que.top();
        que.pop();
        
        if (now.first > next_visited[start]) {
            continue;
        }
        
        for (pll p : graph[now.second]) {
            int next_dist = now.first + p.first;
            if (next_visited[start] > next_dist && next_visited[p.second] > next_dist) {
                que.push({next_dist, p.second});
                next_visited[p.second] = next_dist;
            }
        }
    }
    
    if (result < next_visited[start]) {
        result = next_visited[start];
    }
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> N >> M >> X;
    graph.resize(N+1);
    
    int s, e, dist;
    for (int i=0; i<M; ++i) {
        cin >> s >> e >> dist;
        
        graph[s].push_back({dist, e});
    }
    
    for (int i=1; i<=N; ++i) {
        go_to_party(i);
    }
    
    cout << result;

    return 0;
}

```



> ## 문제
>
> N개의 숫자로 구분된 각각의 마을에 한 명의 학생이 살고 있다.
>
> 어느 날 이 N명의 학생이 X (1 ≤ X ≤ N)번 마을에 모여서 파티를 벌이기로 했다. 이 마을 사이에는 총 M개의 단방향 도로들이 있고 i번째 길을 지나는데 Ti(1 ≤ Ti ≤ 100)의 시간을 소비한다.
>
> 각각의 학생들은 파티에 참석하기 위해 걸어가서 다시 그들의 마을로 돌아와야 한다. 하지만 이 학생들은 워낙 게을러서 최단 시간에 오고 가기를 원한다.
>
> 이 도로들은 단방향이기 때문에 아마 그들이 오고 가는 길이 다를지도 모른다. N명의 학생들 중 오고 가는데 가장 많은 시간을 소비하는 학생은 누구일지 구하여라.
>
> ## 입력
>
> 첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 10,000), X가 공백으로 구분되어 입력된다. 두 번째 줄부터 M+1번째 줄까지 i번째 도로의 시작점, 끝점, 그리고 이 도로를 지나는데 필요한 소요시간 Ti가 들어온다. 시작점과 끝점이 같은 도로는 없으며, 시작점과 한 도시 A에서 다른 도시 B로 가는 도로의 개수는 최대 1개이다.
>
> 모든 학생들은 집에서 X에 갈수 있고, X에서 집으로 돌아올 수 있는 데이터만 입력으로 주어진다.
>
> ## 해설
>
> 처음 문제를 봤을 땐 다익스트라로 생각이 바로 들었다 그래서 양방향 다익스트라를 사용해 시작점에서 X 까지, 그리고 X 부터 시작점까지를 구해 이 값들을 더한 값중 최대 값을 구하려고 했다 그렇게 코드를 적고 제출하니 시간초과가 났다...
>
> 아무리 생각해도 시간초과가 날 것 같진 않았고 플루이드 워샬은 10억이 되기때문에 불가능할 것 같아서 안쓰려다가 혹시 몰라 플루이드 워샬로도 풀어봤다.
>
> ```c++
> #include <iostream>
> #include <vector>
> #include <queue>
> #include <algorithm>
> 
> #define INF 2000001
> using namespace std;
> 
> vector<vector<int> > graph;
> 
> int N, M, X;
> int result = 0;
> 
> void go_to_party()
> {
>  for (int k=1; k<=N; ++k) {
>      for (int i=1; i<=N; ++i) {
>          for (int j=1; j<=N; ++j) {
>              if (i == j) {
>                  continue;
>              }
>              graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
>          }
>      }
>  }
> 
>  for (int i=1; i<=N; ++i) {
>      int tmp = graph[i][X] + graph[X][i];
>      if (tmp > result) {
>          result = tmp;
>      }
>  }
> 
>  return;
> }
> 
> int main()
> {
>  ios_base::sync_with_stdio(false);
>  cin.tie(NULL);
> 
>  cin >> N >> M >> X;
>  graph.resize(N+1, vector<int>(N+1, INF));
>  for (int i=0; i<=N; ++i) {
>      graph[i][i] = 0;
>  }
> 
> 
>  int s, e, dist;
>  for (int i=0; i<M; ++i) {
>      cin >> s >> e >> dist;
> 
>      graph[s][e] = dist;
>  }
> 
>  go_to_party();
> 
>  cout << result;
> 
>  return 0;
> }
> 
> ```
>
> 아니나 다를까 역시 시간초과가 났다..
>
> 그렇다면 아무리 생각해도 다익스트라 밖에 없는데 왜 그런걸까? 하고 코드를 잘 살펴보니까 우선순위 큐의 우선순위를 설정하는 Compare의 비교 연산자를 잘못 적어서 이동거리가 가장 큰 순서부터 확인했기 때문에 다익스트라 알고리즘의 장점을 하나도 가지지 못했기 때문이다.. 따라서 비교 연산자만 바꾸니까 바로 패스 됬다..
>
> 요즘 우선순위에서 실수를 일으키는 경우가 많아서 이를 좀 유의하면서 하면 좋겠다... 흑흑...
>
> 추가로 이 문제에는 아주 효율적인 방법이 있다. 나는 다익스트라를 2N번 사용하여 꽤 위험할 수 있는 방법이지만
>
> 단 2번의 연산으로 모든 노드에서의 X까지의 거리와 X에서 모든 노드까지의 거리를 알 수 있다.
>
> > 0. 이 방법으로 접근하기 위해서는 먼저 내가 이번에 작성했던 코드에서 목적지에 기록된 거리보다 큰 경우를 배제하는 백트래킹을 시행해선 안된다. 이렇게 하는 경우에는 무조건 현재 노드 A 에서 목적지 B까지의 최단거리만 연산하기 때문이다. 만약 이 조건을 없애면 현재 노드 A에서 모든 노드에 대한 최단거리가 기록된다.
> >
> > 1. 모든 간선을 받을때 정방향으로 받고 역방향으로도 받는다.
> >
> >    ```c++
> >     int s, e, dist;
> >     for (int i=0; i<M; ++i) {
> >         cin >> s >> e >> dist;
> >    
> >         graph[0][s][e] = dist;
> >         graph[1][e][s] = dist;
> >     }
> >    ```
> >
> > 2. X를 시작점(command  = 0)으로 모든 노드에 대한 최단 거리를 알 수 있게 다익스트라를 진행한다.
> >
> >    ```c++
> >    // visited를 전역에 선언하고 정방향, 역방향을 위해 2개를 만든다.
> >    vector<vector<int> > visited(2, vector<int>(N+1, INF));
> >    
> >    // 정방향인지 역방향인지 판단할 command 인자를 받는다.
> >    void go_to_party(int start, int command)
> >    {
> >        visited[command][start] = 0;
> >        priority_queue<pll, vector<pll>, Compare> que;
> >        que.push({0, start});
> >        
> >        while (!que.empty()) {
> >            pll now = que.top();
> >            que.pop();
> >            
> >            // 현재 위치에 기록된 이동 횟수보다 크다면 다음 것을 본다.
> >            // 기존에는 목적지에 기록된 이동 횟수보다 크다면 백트래킹 하였지만 그렇게 하면 출발지 부터 모든 노드에 대한 최단 거리를 알 수 없다.
> >            if (now.first > visited[command][now]) {
> >                continue;
> >            }
> >            
> >            for (pll p : graph[command][now.second]) {
> >                int next_dist = now.first + p.first;
> >                if (visited[command][p.second] > next_dist) {
> >                    que.push({next_dist, p.second});
> >                    visited[command][p.second] = next_dist;
> >                }
> >            }
> >        }
> >        
> >        return;
> >    }
> >    ```
> >
> > 3. 위의 함수를 command = 1을 하여 다시 돌려 역방향으로 진행에 모든 노드에서 X까지의 최단 거리를 구한다.
> >
> >    > 어째서 그런게 가능하지?
> >    >
> >    > 다익스트라는 출발지에서 모든 노드에 대한 최단거리를 알 수 있는 알고리즘이다. 그렇다면 만약에 모든 방향이 역으로 바뀌고 한 지점에서 다른 지점 까지의 최단 거리를 구한다면? 이는 다시 정방향으로 볼 때 모든 노드에서 X까지의 거리로 볼 수 있다.
> >
> > 4. 기록된 visited에서 최단 거리 중 최대 거리를 구한다.
> >
> >    ```c++
> >    for (int i=1; i<=N; ++i) {
> >        int tmp = visited[0][i] + visited[1][i];
> >        result = max(result, tmp);
> >    }
> >    ```
> >
> > 5. 구한 result 값을 출력한다.
>
> 위와 같은 방법이면 단 2번의 다익스트라로 값을 도출해낼 수 있다.
>
> 여태 다익스트라는 출발지와 목적지에 대한 최단거리만 구한다고 생각했는데, 출발지에서 모든 노드에 대한 최단 거리를 구할 수 있다는 것을 기억하고 단방향 그래프일때 역방향을 이용하면 한 노드까지의 대한 모든 노드의 최단거리를 구할 수 있음을 기억하자!

