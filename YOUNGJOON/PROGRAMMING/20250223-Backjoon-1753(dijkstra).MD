# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

#define pll pair<int, int>

using namespace std;

int V, E, K;
unordered_map<int, unordered_map<int, int> > graph;

struct Compare
{
    bool operator()(const pll& a, const pll& b) {
        return a.first > b.first;
    }
};

void find_dist()
{
    vector<int> visited(V+1, 20000001);
    visited[K] = 0;
    priority_queue<pll, vector<pll>, Compare> que;
    que.push({0, K});
    
    while (!que.empty()) {
        pll now = que.top();
        que.pop();
        
        if (now.first > visited[now.second]) {
            continue;
        }
        
        for (auto p : graph[now.second]) {
            int next_dist = now.first + p.second;
            if (visited[p.first] > next_dist) {
                visited[p.first] = next_dist;
                que.push({next_dist, p.first});
            }
        }
    }
    
    for (int i=1; i<=V; ++i) {
        if (visited[i] != 20000001) {
            cout << visited[i] << "\n";
        }
        else {
            cout << "INF" << "\n";
        }
    }
    
    return;
    
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    
    cin >> V >> E >> K;
    
    int s, e, dist;
    for (int i=0; i<E; ++i) {
        cin >> s >> e >> dist;
        
        if (graph[s].find(e) == graph[s].end()) {
            graph[s][e] = dist;
        }
        else {
            if (graph[s][e] > dist) {
                graph[s][e] = dist;
            }
        }
    }
    
    find_dist();

    return 0;
}

```



> ## 문제
>
> 방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.
>
> ## 입력
>
> 첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.
>
> ## 해설
>
> 처음 보았을때 다익스트라를 이용하면 된다고 생각했다. 시작지점이 주어지므로 시작지점부터 모든 지점까지의 최단 거리를 구하기 위해 다익스트라를 진행한다. 기존에 배웠던 다익스트라는 목적지를 두고 해당 목적지의 기록된 값보다 크면 모두 무시했지만 이번에는 모든 경로의 길이를 구하여야 하기때문에 우선순위 큐가 빌때까지 계속해서 반복을 진행한다.
>
> 출발지부터 시작해서 모든 노드에 대해 최단거리가 기록되면, 1번 노드부터 이동거리를 출력한다. 단, 출발지점에서 시작했을 때 도달할 수 없는 노드는 INF를 출력했다.
>
> 호기롭게 제출했는데 틀렸다 처음에는 주어지는 간선이 여러 종류가 주어지기 때문에 문제가 생기나 싶었다 그래서 unordered_map을 이용하여 각 노드에 대해 가장 짧은거리만 저장하려고했다. 그러나 이렇게 해도 틀렸다.....
>
> 로직은 맞는거 같은데... 하면서 계속 쳐다봤는데 어이없는 실수를 했다. 우선순위 큐에 넣은 우선순위 기준인 Compare의 부등호가 반대로 바뀌어 제대로된 다익스트라를 진행하지 못했던 것이다... 아... 저번에도 이런 실수를 한번 한거 같은데 정말 문제다 문제를 꼭 유의하고 실수하지 않았는지 살펴보는 습관을 들이도록하자....
