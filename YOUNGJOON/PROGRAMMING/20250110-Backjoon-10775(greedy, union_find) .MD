# 코드

```c++
#include <iostream>
#include <vector>

using namespace std;

int N, M;
vector<int> parents;

int find_root(int x)
{
    if (parents[x] == x) {
        return x;
    }
    return parents[x] = find_root(parents[x]);
}

void union_root(int x, int y)
{
    int rx = find_root(x);
    int ry = find_root(y);
    
    if (rx == ry) {
        return;
    }
    
    parents[ry] = rx;
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> N >> M;
    
    parents.resize(N+1, 0);
    for (int i=1; i<=N; ++i) {
        parents[i] = i;
    }
    
    int num;
    int result = 0;
    for (int i=0; i<M; ++i) {
        cin >> num;
        if (parents[num] == num) {
            result++;
            union_root(num-1, num);
        }
        else {
            int target = find_root(num);
            if (target != 0) {
                result++;
                union_root(target - 1, target);
            }
            else {
                break;
            }
        }
    }
    
    cout << result;

    return 0;
}

```



# 해설

> ## 문제
>
> 오늘은 신승원의 생일이다.
>
> 박승원은 생일을 맞아 신승원에게 인천국제공항을 선물로 줬다.
>
> 공항에는 G개의 게이트가 있으며 각각은 1에서 G까지의 번호를 가지고 있다.
>
> 공항에는 P개의 비행기가 순서대로 도착할 예정이며, 당신은 i번째 비행기를 1번부터 gi (1 ≤ gi ≤ G) 번째 게이트중 하나에 영구적으로 도킹하려 한다. 비행기가 어느 게이트에도 도킹할 수 없다면 공항이 폐쇄되고, 이후 어떤 비행기도 도착할 수 없다.
>
> 신승원은 가장 많은 비행기를 공항에 도킹시켜서 박승원을 행복하게 하고 싶어한다. 승원이는 비행기를 최대 몇 대 도킹시킬 수 있는가?
>
> ## 입력
>
> 첫 번째 줄에는 게이트의 수 G (1 ≤ G ≤ 105)가 주어진다.
>
> 두 번째 줄에는 비행기의 수 P (1 ≤ P ≤ 105)가 주어진다.
>
> 이후 P개의 줄에 gi (1 ≤ gi ≤ G) 가 주어진다.
>
> ## 해설
>
> 처음 봤을때, 먼저 브루트포스를 생각했다. 그건 10만 * 10만으로 절대 불가능
>
> 그런데 잘 보니까 1~g까지의 자리안에서 들어가려면 만약 gi가 있을때 gj(gi > gj)가 있다면 gi는 굳이 gj가 들어갈만한 자리에 들어갈 필요가 없다 아니 들어가면 손해다. 그러니까 gi는 최대한 자신이 들어갈 수 있는 자리에서 가장 높은 수의 자리로 들어가는 것이 베스트라고 생각했다. 이는 그리디 알고리즘으로 볼 수 있다고 생각했다.
>
> 그렇다면, 모든 gi가 10만이라는 최악의 경우에는 브루트 포스로 감행할때 100001 * 50000 정도의 횟수이다. 횟수를 줄이긴 했지만 그냥 브루트포스로는 불가능하다. 그런데 주어지는 gi에 다음에 갈곳을 미리 기록해놓고 한번에 움직인다면 어떨까? 라는 생각이 들었다 그렇게 된다면 굳이 브루트포스처럼 많은 횟수가 아니라 1번의 연산으로 갈 곳을 찾을 수 있다고 생각했다.
>
> 이걸 위해 유니온 파인드를 이용하여 gi의 값으로 find_root를 했을때 0이 아니라면 해당 위치에 기록하고 그 위치에서 -1을해 parents에 다시 기록한다 이때, 배치한 비행기의 개수를 하나 더한다. , 만약 find_root를 호출 했을때 값이 0이라면 이는 더이상 해당 구간에 채울 수 있는 자리가 없다는 뜻으로, 이는 문제에서 제시한 종료조건으로 반복을 종료한다.
>
> 다음과 같은 방식으로 다음 자리를 빠르게 찾을 수 있도록 도와주니 바로 풀렸다!
>
> 오랜만에 빠르게 구상하고 한번에 푼 문제다! 난이도도 좀 있었는데 빠르게 풀어서 기분이 좋다! 앞으로 더 정진하도록 하자!

