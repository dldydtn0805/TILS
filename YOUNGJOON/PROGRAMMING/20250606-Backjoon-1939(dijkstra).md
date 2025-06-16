# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

#define pll pair<int, int>

using namespace std;

int N, M, start_loca, end_loca;
vector<vector<pll> > graph(10001);

struct Compare {
    bool operator()(const pll& a, const pll& b) {
        return a.first < b.first;
    }
};

int lets_go()
{
    vector<int> visited(N + 1, 0);
    visited[start_loca] = 1000000001;
    priority_queue<pll, vector<pll>, Compare> que;
    que.push({1000000001, start_loca});
    
    while (!que.empty()) {
        pll now = que.top();
        que.pop();
        if (visited[now.second] > now.first || visited[end_loca] > now.first) continue;
        
        for (pll p : graph[now.second]) {
            if (visited[p.first] < min(p.second, now.first)) {
                visited[p.first] = min(p.second, now.first);
                que.push({visited[p.first], p.first});
            }
        }
    }
    
    return visited[end_loca];
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M;
    int s, e, dist;
    for (int i=0; i<M; ++i) {
        cin >> s >> e >> dist;
        graph[s].push_back({e, dist});
        graph[e].push_back({s, dist});
    }
    cin >> start_loca >> end_loca;
    
    cout << lets_go();

    return 0;
}

```

> ## 문제
>
> N(2 ≤ N ≤ 10,000)개의 섬으로 이루어진 나라가 있다. 이들 중 몇 개의 섬 사이에는 다리가 설치되어 있어서 차들이 다닐 수 있다.
>
> 영식 중공업에서는 두 개의 섬에 공장을 세워 두고 물품을 생산하는 일을 하고 있다. 물품을 생산하다 보면 공장에서 다른 공장으로 생산 중이던 물품을 수송해야 할 일이 생기곤 한다. 그런데 각각의 다리마다 중량제한이 있기 때문에 무턱대고 물품을 옮길 순 없다. 만약 중량제한을 초과하는 양의 물품이 다리를 지나게 되면 다리가 무너지게 된다.
>
> 한 번의 이동에서 옮길 수 있는 물품들의 중량의 최댓값을 구하는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에 N, M(1 ≤ M ≤ 100,000)이 주어진다. 다음 M개의 줄에는 다리에 대한 정보를 나타내는 세 정수 A, B(1 ≤ A, B ≤ N), C(1 ≤ C ≤ 1,000,000,000)가 주어진다. 이는 A번 섬과 B번 섬 사이에 중량제한이 C인 다리가 존재한다는 의미이다. 서로 같은 두 섬 사이에 여러 개의 다리가 있을 수도 있으며, 모든 다리는 양방향이다. 마지막 줄에는 공장이 위치해 있는 섬의 번호를 나타내는 서로 다른 두 정수가 주어진다. 공장이 있는 두 섬을 연결하는 경로는 항상 존재하는 데이터만 입력으로 주어진다.
>
> ## 출력
>
> 첫째 줄에 답을 출력한다.
>
> ## 해설
>
> 처음 문제를 봤을 때 다익스트라를 생각했다.
> 
> 주어지는 입력을 모두 받아, 시작지점 부터 끝지점까지 최대의 값을 가지고 가는 경우만 판단하면 될 것이라고 생각했다.
>
> > 1. 주어지는 입력을 모두 받는다. 방향은 양방향으로 이를 모두 graph에 기록해둔다.
>>
> > 2. 방문기록을 담을 배열 visited를 선언한다. 이때 초기화 값은 0으로 한다. 가장 큰 값을 기록해 두어야 하기 때문이다.
>>
> > 3. 현재 가지고 온 무게가 클수록 우선순위를 가지는 우선순위큐 que를 선언한다. 그리고 시작위치에 가중치를 만들어 지지 않는 경우만큼 크게 선언하여 que에 넣는다.
> >
> > 4. que가 빌때까지 반복한다.
> >
> >    > 1. que에서 제일 앞에 있는 값을 하나 꺼내 now에 할당한다.
> >    > 2. 현재 now에 기록된 가중치가 visited에 기록된 현재위치의 가중치보다 작다면 넘긴다.
> >    > 3. 2의 경우에서 걸러지지 않았다면 현재 위치에 연결된 모든 곳으로 이동한다.
> >    >    - 이동할 위치에 기록된 값이 `min(현재 가중치, 이동 위치로 가는 다리가 버틸 수 있는 가중치)` 보다 작고 
> >    >    - 현재 종료 위치의 기록된 값보다 `min(현재 가중치, 이동 위치로 가는 다리가 버틸 수 있는 가중치)`의 값이 크다면 
> >    >      - 해당 위치로 이동하고  `min(현재 가중치, 이동 위치로 가는 다리가 버틸 수 있는 가중치)`와 이동 위치를 que에 저장한 후, visited에 `min(현재 가중치, 이동 위치로 가는 다리가 버틸 수 있는 가중치)`를 기록한다.
> >
> > 5. 4의 반복이 끝났다면 도착 위치에 기록된 값을 출력한다.
>
> 위와 같은 로직으로 문제를 풀었다.
>
> 아이러니하게 문제를 풀다가 메모리 초과를 받았는데 이게 10000크기의 연결 그래프 graph를 선언해서 그런줄 알고 graph를 unordered_map으로 선언했다. 그러나 이렇게 해도 메모리 초과를 받았다. 도저히 다른데서 줄여볼 방법이 없다고 느껴져서 찾아보니까 OutofBounds 에러가 날때 가끔 메모리초과를 발생할 수도 있다는 이야기를 들었다.
>
> 아니나 다를까 graph의 크기를 노드번호가 1~10000이라 10001로 선언했어야 했는데 10000으로 선언해서 OutofBounds 에러가 나왔고 이 때문에 메모리초과가 난것 같았다.
> 
> 처음 제출한 코드에서 10001로만 바꿔 제출하니 바로 맞았다 ㅠㅠㅠㅠ
> 
> 문제를 꼼꼼하게 읽어야하는데 이런 실수를 좀 줄여나가자 제바류ㅠㅠㅠ

