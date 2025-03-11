# 코드

```c++
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

vector<int> command(10, 0); 
int result = 0;
int visited[33]{0};
unordered_map<int, int> graph, points, special_route;
vector<int> pawn(4, 0);

void dfs(int score, int depth)
{
    if (depth == 10) {
        if (result < score) {
            result = score;
        }
        return;
    }
    
    for (int i=0; i<4; ++i) {
        int now = pawn[i];
        if (now != 21) {
            int next = now;
            if (now == 5 || now == 10 || now == 15) {
                next = special_route[now];
                for (int j=1; j<command[depth]; ++j) {
                    if (next != 21) {
                        next = graph[next];
                    }
                    else break;
                }
            }
            else {
                for (int j=0; j<command[depth]; ++j) {
                    if (next != 21) {
                        next = graph[next];
                    }
                    else break;
                }
            }
            
            if (visited[next] == 0) {
                if (next != 21) {
                    visited[now] = 0;
                    visited[next] = 1;
                    pawn[i] = next;
                    dfs(score + points[next], depth + 1);
                    visited[now] = 1;
                    visited[next] = 0;
                    pawn[i] = now;
                }
                else {
                    visited[now] = 0;
                    pawn[i] = next;
                    dfs(score, depth + 1);
                    visited[now] = 1;
                    pawn[i] = now;
                }
            }
        }
    }
    
    return;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    
    for (int i=0; i<10; ++i) {
        cin >> command[i];
    }
    vector<pair<int, bool> > pawn(4, {0, false});
    
    graph[0] = 1; points[0] = 0;
    for (int i=1; i<=30; ++i) {
        graph[i] = i + 1;
    }
    graph[21] = -1; graph[27] = 25; graph[30] = 25; graph[25] = 31; graph[31] = 32; graph[32] = 20;
    
    for (int i=1; i<=20; ++i) {
        points[i] = i * 2;
    }
    points[21] = 0; points[22] = 13; points[23] = 16; points[24] = 19; points[25] = 25; points[26] = 22;
    points[27] = 24; points[28] = 28; points[29] = 27; points[30] = 26; points[31] = 30; points[32] = 35;
    
    special_route[5] = 22; special_route[10] = 26; special_route[15] = 28;
    
    dfs(0, 0); 

    cout << result;
    
    return 0;
}

```



> ## 문제
>
> 주사위 윷놀이는 다음과 같은 게임판에서 하는 게임이다.
>
> ![img](https://upload.acmicpc.net/43409ac6-54bf-4a21-b542-e01a8211e59f/-/preview/)
>
> - 처음에는 시작 칸에 말 4개가 있다.
> - 말은 게임판에 그려진 화살표의 방향대로만 이동할 수 있다. 말이 파란색 칸에서 이동을 시작하면 파란색 화살표를 타야 하고, 이동하는 도중이거나 파란색이 아닌 칸에서 이동을 시작하면 빨간색 화살표를 타야 한다. 말이 도착 칸으로 이동하면 주사위에 나온 수와 관계 없이 이동을 마친다.
> - 게임은 10개의 턴으로 이루어진다. 매 턴마다 1부터 5까지 한 면에 하나씩 적혀있는 5면체 주사위를 굴리고, 도착 칸에 있지 않은 말을 하나 골라 주사위에 나온 수만큼 이동시킨다.
> - 말이 이동을 마치는 칸에 다른 말이 있으면 그 말은 고를 수 없다. 단, 이동을 마치는 칸이 도착 칸이면 고를 수 있다.
> - 말이 이동을 마칠 때마다 칸에 적혀있는 수가 점수에 추가된다.
>
> 주사위에서 나올 수 10개를 미리 알고 있을 때, 얻을 수 있는 점수의 최댓값을 구해보자.
>
> ## 입력
>
> 첫째 줄에 주사위에서 나올 수 10개가 순서대로 주어진다.
>
> ## 해설
>
> 처음에는 주어진 노드의 점수 값들을 기준으로 visited를 만들어 DFS를 이용해 모든 경우의 수를 판단하려고 했다.
>
> 어떠한 경우에서 노드 4개를 10번까지 반복하는 것이므로 `4^10`정도면 된다고 생각해서 시간자체는 얼마 걸리지 않을 거라고 생각했다.
>
> 어차피 빨간색 화살표대로 가는 경우는 현재 점수에 2를 더하면 되므로 따로 라인을 정리해두지 않고 특별한 경우인 10, 20, 30부분에 대해서만 unordered_map을 이용해 어디로 가야하는지 명시해주었다.
>
> 호기롭게 제출했으나 틀렸다! 이유가 뭐인고 하니 특별한 루트로 가는 경우와 일반 경우에 점수가 겹치는 노드가 있어서 visited를 정상적으로 만들지 못했던 것이다...  어떻게든 코드를 살려보려고 했으나 점수를 기준으로 노드를 나눈다면 결국 겹치는 것 때문에 문제가 생겼고 위의 방식을 포기하기로 했다...
>
> 결국 위 방법의 반례를 찾다가 다른 사람들의 코드를 보게되었는데 접근은 상당히 비슷?했다! 단, 노드를 점수가 아닌 번호로 지정하고 단방향 그래프 순회처럼 어디로 가면 될지를 기록해주고 따로 해당 노드에 대한 점수를 기록해주면 간단한 것이었다! 
>
> >  0번 노드는 출발지점
> >
> > 1~20번 노드는 일반적으로 진행되는 2~40까지의 노드
> >
> > 21번 노드는 도착지점
> >
> > 22~32번 노드는 중간 특별루트에 있는 노드로 나누었다.
> >
> > 0~21까지는 순서대로 1씩 늘려가며 unordered_map을 통해 해당 노드에 다음 노드를 기록해주었다.
> >
> > 그리고 만약 시작시 5번 노드, 10번 노드, 15번 노드라면 특별루트로 갈아타도록 unordered_map을 이용해 새로운 좌표를 지정해주었다.
> >
> > 22번부터 32번 노드까지는 위의 그림에 나타난 순서대로 값을 지정했다!
> >
> > ```c++
> >     for (int i=1; i<=30; ++i) {
> >         graph[i] = i + 1;
> >     }
> >     graph[21] = -1; graph[27] = 25; graph[30] = 25; graph[25] = 31; graph[31] = 32; graph[32] = 20;
> > // 22번 부터 25번까지는 그대로 +1로 진행 26번은 10번 노드에서 올라오는 경우 28번 노드는 15번 노드에서 넘어오는 경우로해서 중간 25번 노드에 모이고 32번 노드까지가서 20번 노드로 가는 루트로 짰다!
> > ```
> >
> > 그 다음 주어진 주사위의 수만큼 전진하고 해당 위치에 말이 있는지를 visited를 통해 노드번호로 확인하여 있다면 다음 말로 넘기고, 없다면 해당 위치에 두고 다음 주사위로 넘어간다.(재귀)
> >
> > 만약 도착지점에 들어갔다면, 점수를 주지않고 말의 번호를 도착지점으로 지정해두어 재귀 시작시 말을 꺼내쓸 때 도착지점인 21번 노드에 있는 말은 사용하지 않게 했다! 
>
> 위와 같은 방법으로 진행하니 문제가 풀렸다! 뭔가 문제를 풀때 방식을 너무 어렵게 풀어나가는 경향이 있는것 같다... 굳이 점수값을 노드기준으로 하지않고 맵을 이용했다면 처음 발상에서 unordered_map을 이용해 특별한 구간은 다음 노드를 지정해준 방식을 생각했었으니 혼자 힘으로 풀었을 것 같은데.. 좀 아쉽다.
>
> 결국 if 긴하지만 좀 더 노력해서 문제를 너무 복잡하게가 아니라 큰 그림을 그려서 풀이 방식을 쉽게 접근해보는 안목을 길러야겠다!
