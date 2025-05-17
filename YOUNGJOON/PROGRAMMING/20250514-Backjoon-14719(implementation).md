# 코드

```c++
#include <iostream>
#include <vector>
#include <algorithm>

#define pll pair<int, int>

using namespace std;

struct Compare {
    bool operator()(const pll& a, const pll& b) {
        if (a.first == b.first) {
            return a.second > b.second;
        }
        return a.first > b.first;
    }
};

int N;
vector<pll> papers;

void set_paper()
{
    int result = 0;
    vector<int> DP(N, 1);
    for (int i=1; i<N; ++i) {
        for (int j=0; j<i; ++j) {
            if (papers[j].first >= papers[i].first && papers[j].second >= papers[i].second) {
                DP[i] = max(DP[i], DP[j] + 1);
            }
        }
    }

    for (int i=0; i<N; ++i) {
        result = max(result, DP[i]);
    }
    
    cout << result;
    return;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N;
    int s, e;
    for (int i=0; i<N; ++i) {
        cin >> s >> e;
        if (s > e) swap(s, e);
        papers.push_back({s, e});
    }
    
    sort(papers.begin(), papers.end(), Compare());

    set_paper();

    return 0;
}
```

> ## 문제
>
> 2차원 세계에 블록이 쌓여있다. 비가 오면 블록 사이에 빗물이 고인다.
>
> ![img](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14719/1.png)![img](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14719/2.png)
>
> 비는 충분히 많이 온다. 고이는 빗물의 총량은 얼마일까?
>
> ## 입력
>
> 첫 번째 줄에는 2차원 세계의 세로 길이 H과 2차원 세계의 가로 길이 W가 주어진다. (1 ≤ H, W ≤ 500)
>
> 두 번째 줄에는 블록이 쌓인 높이를 의미하는 0이상 H이하의 정수가 2차원 세계의 맨 왼쪽 위치부터 차례대로 W개 주어진다.
>
> 따라서 블록 내부의 빈 공간이 생길 수 없다. 또 2차원 세계의 바닥은 항상 막혀있다고 가정하여도 좋다.
>
> ## 출력
>
> 2차원 세계에서는 한 칸의 용량은 1이다. 고이는 빗물의 총량을 출력하여라.
>
> 빗물이 전혀 고이지 않을 경우 0을 출력하여라.
>
> ## 해설
>
> 처음 문제를 봤을 때 스택과 비슷한 느낌으로 진행하면 어떨까 생각했다.
>
> > 1. 모든 열을 순회한다. 이때 현재 선택된 벽의 높이가 0이라면 현재 벽을 기준 벽으로 선택한다.
> >
> > 2. 현재 기준 벽이 선택되어 있다면, 지나치는 벽들의 높이를 보고 아래와 같이 진행한다.
> >
> >    2-1. 닫는 벽이 선택되어 있지 않다면, 현재 벽을 닫는 벽으로 선택하고 현재 위치를 기록한다.
> >
> >    2-2. 닫는 벽이 선택되어 있고, 현재 벽이 닫는 벽보다 낮다면 공간 차지 개수에 벽의 개수를 더한다.
> >
> >    2-3. 닫는 벽과 현재 벽의 높이가 같다면 현재 벽을 새로운 닫는 벽으로 선택하고 현재 위치를 기록한다.
> >
> >    2-4. 닫는 벽이 선택되어 있고, 닫는 벽보다 현재 벽이 더 높지만, 기준 벽보다는 낮다면 닫는 벽을 현재 벽으로 갱신하고 현재 위치를 기록한다. 그 다음 공간 차지 개수에 이전 닫는 벽의 개수를 더한다.
> >
> >    2-5. 현재 벽이 기준 벽보다 크거나 같다면 더 이상 물을 모을 수 없으므로
> >
> >    - 닫는 벽을 현재 벽으로 갱신하고 현재 위치를 기록한 후 공간 차지 개수에 이전 닫는 벽의 개수를 더한다.
> >    - 그런 다음 기준 벽과 닫는 벽 중 더 낮은 값을 기준으로 둘 사이의 거리를 계산하여 최대 잠기는 물의 양을 구한 후 공간 차지 개수를 뺀 값을 물의 양에 더해준다.
> >    - 현재 닫는 벽이 새로운 기준 벽이 된다.
> >
> >    2-6. 만약 끝까지 가도 2-5의 경우가 생기지 않을 경우에는 현재 기록되어 있는 최대로 크고 멀리 있는 닫는 벽까지의 물양을 얻고 닫는 벽을 새로운 기준 벽으로 바꿔 해당 위치에서 다시 순회한다.
> >
> > 3. 얻은 총 물양을 출력한다.
>
> 위와 같은 방식으로 구현하니까 정답처리 받을 수 있었다. 첫 제출 당시 틀렸었는데... 2-6을 구현하지 않고 제출해서 문제가 틀렸다.
>
> 틀린 이후 반례를 찾다가 알아내서 구현했었는데... 으음.. 구현은 이런 자잘한 실수가 많다 구현을 들어가기전에 어떻게 해야할지 1차적으로 큰 그림을 그리고 주석을 달면서 차근히 접근하며 풀어야 실수가 적어질 것이다... 꼭 기억해두자
