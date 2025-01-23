# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

#define INF 2000001
using namespace std;

vector<vector<int> > graph;

int N, M, X;
int result = 0;

void go_to_party()
{
    for (int k=1; k<=N; ++k) {
        for (int i=1; i<=N; ++i) {
            for (int j=1; j<=N; ++j) {
                if (i == j) {
                    continue;
                }
                graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    
    for (int i=1; i<=N; ++i) {
        int tmp = graph[i][X] + graph[X][i];
        if (tmp > result) {
            result = tmp;
        }
    }
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> N >> M >> X;
    graph.resize(N+1, vector<int>(N+1, INF));
    for (int i=0; i<=N; ++i) {
        graph[i][i] = 0;
    }
    
    
    int s, e, dist;
    for (int i=0; i<M; ++i) {
        cin >> s >> e >> dist;
        
        graph[s][e] = dist;
    }
    
    go_to_party();

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
>     for (int k=1; k<=N; ++k) {
>         for (int i=1; i<=N; ++i) {
>             for (int j=1; j<=N; ++j) {
>                 if (i == j) {
>                     continue;
>                 }
>                 graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
>             }
>         }
>     }
>     
>     for (int i=1; i<=N; ++i) {
>         int tmp = graph[i][X] + graph[X][i];
>         if (tmp > result) {
>             result = tmp;
>         }
>     }
>     
>     return;
> }
> 
> int main()
> {
>     ios_base::sync_with_stdio(false);
>     cin.tie(NULL);
>     
>     cin >> N >> M >> X;
>     graph.resize(N+1, vector<int>(N+1, INF));
>     for (int i=0; i<=N; ++i) {
>         graph[i][i] = 0;
>     }
>     
>     
>     int s, e, dist;
>     for (int i=0; i<M; ++i) {
>         cin >> s >> e >> dist;
>         
>         graph[s][e] = dist;
>     }
>     
>     go_to_party();
> 
>     cout << result;
> 
>     return 0;
> }
> 
> ```
>
> 아니나 다를까 역시 시간초과가 났다..
>
> 그렇다면 아무리 생각해도 다익스트라 밖에 없는데 왜 그런걸까? 하고 코드를 잘 살펴보니까 우선순위 큐의 우선순위를 설정하는 Compare의 비교 연산자를 잘못 적어서 이동거리가 가장 큰 순서부터 확인했기 때문에 다익스트라 알고리즘의 장점을 하나도 가지지 못했기 때문이다.. 따라서 비교 연산자만 바꾸니까 바로 패스 됬다..
>
> 요즘 우선순위에서 실수를 일으키는 경우가 많아서 이를 좀 유의하면서 하면 좋겠다... 흑흑...

