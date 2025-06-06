# 코드

```c++
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int N;
long long tmp_HP = 0, HP = 0, attack;

void explore_room(int type, long long ATP, long long target_HP)
{
    // 현재 공격력으로 몬스터를 무찌른다. 이때 필요한 체력을 계산해야함!
    if (type == 1) {
        int turn = target_HP % attack == 0 ? target_HP / attack : target_HP / attack + 1;
        tmp_HP += ATP * (turn - 1);
    }
    // 공격력과 체력을 회복시켜주는 포션을 마신다! 체력이 회복되었다면 그만큼 최대 체력을 아낄 수 있다!
    // 최대 체력의 한도까지 늘려주지 못한다고 하니 이를 고려해서 코드를 작성해야한다.
    else {
        attack += ATP;
        if (tmp_HP -= target_HP < 0) {
            HP = max({HP, tmp_HP});
        }
        tmp_HP = max(0ll, tmp_HP - target_HP);
    }
    
    return;
    
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> attack;
    int type, ATP, target_HP;
    
    for (int i=0; i<N; ++i) {
        cin >> type >> ATP >> target_HP;
        explore_room(type, ATP, target_HP);
        
    }
    HP = max(HP, tmp_HP);
    
    cout << HP + 1;

    return 0;
}
```

> - ## 문제
>
>   용사는 공주를 구하기 위해 무시무시한 용이 있는 던전으로 향하기로 하였습니다. 우선 용사는 용사 자신과 던전을 분석하였습니다.
>
>   용사에게는 세 종류의 능력치가 있습니다. 
>
>   - *HMaxHP* : 용사의 최대 생명력입니다. 이 값은 1이상이어야 하며 던전에 들어간 이후로 변하지 않습니다.
>   - *HCurHP* : 현재 용사의 생명력입니다. 던전에 들어가기 전 이 값은 용사의 최대 생명력 *HMaxHP*와 같습니다. 이 값은 *HMaxHP*보다 커질 수 없습니다.
>   - *HATK* : 용사의 공격력입니다.
>
>   던전은 총 *N*개의 방으로 이루어져 있고 *i*번째 방을 통해서만 *i*+1번째 방으로 이동 할 수 있습니다. 방에는 포션이 있거나 몬스터가 있는데 몬스터가 있을 경우 몬스터를 쓰러트려야지 다음방으로 이동 할 수 있습니다. *N*번째 방에는 공주와 용이 있고, 용을 무찌르면 공주를 구할 수 있습니다.
>
>   몬스터가 있는 방에 올 경우 다음과 같이 전투가 진행됩니다.
>   
>   1. 용사의 공격력 *HATK*만큼 몬스터의 생명력을 깎습니다.
>   2. 몬스터의 생명력이 0 이하이면 전투가 종료되고 용사는 다음 방으로 이동합니다.
>   3. 몬스터의 공격력만큼 용사의 생명력 *HCurHP*를 깎습니다.
>   4. 용사의 생명력이 0 이하이면 전투가 종료되고 용사는 사망합니다.
>   5. 다시 1부터 진행합니다.
>   
>   포션이 있는 방에 올 경우 포션을 마셔서 현재 용사의 생명력 *HCurHP*가 일정량 회복되고 공격력 *HATK*도 일정량만큼 증가됩니다. 회복된 생명력이 최대 생명력 *HMaxHP*보다 큰 경우 용사의 현재 생명력 *HCurHP*가 최대 생명력 *HMaxHP*와 같아집니다.
>   
>   용사는 던전으로 향하기 전에 만반의 준비를 하고 있습니다. 용사는 수련을 하면 최대 생명력 *HMaxHP*를 늘릴 수 있는데 얼마나 수련해야 할지 고민입니다.
>   
>   용사는 *N*번 방에 있는 용을 쓰러트리기 위한 최소의 *HMaxHP*를 여러분이 계산해주면 좋겠다고 합니다.
>   
>   ## 입력
>   
>   첫 번째 줄에 방의 개수 *N* (1 ≤ *N* ≤ 123,456) 과 용사의 초기 공격력 *HATK* (1 ≤ *HATK* ≤ 1,000,000) 가 주어집니다.
>   
>   *i*+1번째 줄엔 *i*번째 방의 정보를 나타내는 세개의 정수 *ti*, *ai*, *hi* (*ti* ∈ {1, 2}, 1 ≤ *ai*, *hi* ≤ 1,000,000) 가 주어집니다. 
>   
>   *ti*가 1인 경우 공격력이 *ai*이고 생명력이 *hi*인 몬스터가 있음을 나타내고, *ti*가 2인 경우 용사의 공격력 *HATK*를 *ai*만큼 증가시켜주고 용사의 현재 생명력 *HCurHP*를 *hi*만큼 회복시켜주는 포션이 있음을 나타냅니다.
>   
>   ## 출력
>   
>   용사가 *N*번째 방에 있는 용을 쓰러트리기 위한 최소의 *HMaxHP*를 출력합니다.
>
> ## 해설
>
> 처음 문제를 봤을 때 단순히 매방에서 소모되는 HP 값을 모두 더한 후 해당 값에 + 1을 하면 최소의 HP값을 구할 수 있다고 생각했다. 하지만 포션이라는 변수가 존재했는데, 포션을 마시면 체력이 회복된다 하지만 포션을 최대 체력 이상 회복할 수 없었고, 여태까지 더한 HP 값에 포션 회복량을 빼주기만 하면 되겠다 생각했다.
>
> 하지만 몇가지의 예외가 있었다.
>
> ```
> 3 3
> 1 1 20
> 2 3 10
> 1 3 100
> ```
>
> 위의 반례를 보면 처음 방에서 체력을 6 소모한다.
>
> 그리고 다음 방에서 체력을 10 회복한다.
>
> 그리고 마지막 방에서 체력을 48 소모한다. 이러면 모든 값을 더 했을때 45면 된다고 한다.
>
> - 45 - 6 = 39 + 10 = 49 - 48 = 1
>
> 하지만 이는 잘못됬다 우선 포션이 최대체력 이상으로 피를 회복할 수 없기 때문 따라서 정답은 49가 되어야한다.
>
> 이를 해결하기 위해 포션에서 현재 소모체력의 값을 뺄때 0 이하로 빠지지 않게 만들어야 했다.
>
> - 6 -> 0 -> 48 = 49
>
> ```
> 3 3
> 1 1 20
> 2 3 10
> 1 1 1
> ```
>
> 위의 반례를 보면 `6 -> 0 -> 1`이 된다. 따라서 정답은 2로 출력될 것이다 하지만 이는 틀렸다.
>
> 2로 설정하면 맨 처음방에서 체력이 6 소모되어야 하므로 1번 방에서 나갈 수 없다. 따라서 최대 체력은 7이 되어야한다.
>
> 이를 해결하기 위해 포션에서 현재 소모체력의 값을 뺄때 0이 된다면 현재 소모 체력 값을 미리 기록해두어 진행중에 발생하는 최대 값을 사용하기로 했다.
>
> 이와 같이 푸니까 정답이 됬다?! 의외로 너무 간단했다 이게 구현이 맞나 싶을 정도로...
>
> 단, 코드 제출 시에 너무 아무생각없이 일단 던져보고 안되니까 틀린점을 찾아나섰는데 먼저 틀린점이 없다고 확신이 들면 진행하면 좋겠다.
>
> 그래도 오랜만에 주석도 쓰고 하니까 좀 정리가 잘되는것 같다 주석도 꼭 쓰면서 문제를 풀자!

