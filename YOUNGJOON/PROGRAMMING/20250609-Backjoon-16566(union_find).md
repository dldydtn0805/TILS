# 코드

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

int N, M, K;
vector<int> cards, bigger_card;
unordered_map<int, int> card_cnt;


void get_data()
{
    cin >> N >> M >> K;
    cards.resize(M);
    bigger_card.resize(N + 1);
    for (int i=0; i<M; ++i) {
        cin >> cards[i];
    }
    sort(cards.begin(), cards.end(), less<int>());
    
    int tmp = 0;
    for (int i=0; i<M; ++i) {
        if (cards[i] > tmp) {
            card_cnt[cards[i]] = 1;
            for (int j=tmp; j<cards[i]; ++j) {
                bigger_card[j] = cards[i];
            }
            tmp = cards[i];
        }
        else if (cards[i] == tmp) {
            card_cnt[cards[i]]++;
        }
    }
    
    return;
}


int get_number(int now)
{
    int next_num = bigger_card[now];
    if (card_cnt[next_num] > 0) {
        card_cnt[next_num]--;
        return next_num;
    }
    else {
        return bigger_card[now] = get_number(next_num);
    }
}


void pick_cards()
{
    int num;
    for (int k=0; k<K; ++k) {
        cin >> num;
        cout << get_number(num) << "\n";
    }
    
    return;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    get_data();
    pick_cards();
    
    return 0;
}

```

> ## 문제
>
> 철수와 민수는 카드 게임을 즐겨한다. 이 카드 게임의 규칙은 다음과 같다.
>
> 1. N개의 빨간색 카드가 있다. 각각의 카드는 순서대로 1부터 N까지 번호가 매겨져 있다. 이 중에서 M개의 카드를 고른다.
> 2. N개의 파란색 카드가 있다. 각각의 카드는 순서대로 1부터 N까지 번호가 매겨져 있다. 이 중에서 빨간색에서 고른 번호와 같은 파란색 카드 M개를 고른다.
> 3. 철수는 빨간색 카드를 가지고 민수는 파란색 카드를 가진다.
> 4. 철수와 민수는 고른 카드 중에 1장을 뒤집어진 상태로 낸다. 그리고 카드를 다시 뒤집어서 번호가 큰 사람이 이긴다. 이 동작을 K번 해서 더 많이 이긴 사람이 최종적으로 승리한다. 한 번 낸 카드는 반드시 버려야 한다.
>
> 철수는 뛰어난 마술사이기 때문에 본인이 낼 카드를 마음대로 조작할 수 있다. 즉, 카드를 버리고 민수 몰래 다시 들고 온다거나 민수한테 없는 카드를 내기도 한다.
>
> 민수는 뛰어난 심리학자이기 때문에 철수가 낼 카드를 알아낼 수 있다. 그래서 민수는 철수가 낼 카드보다 큰 카드가 있다면 그 카드들 중 가장 작은 카드를 내기로 했다.
>
> K번 동안 철수가 낼 카드가 입력으로 주어진다. 그렇다면 민수가 어떤 카드를 낼지 출력하라. 단, 민수가 카드를 내지 못하는 경우는 없다고 가정한다.
>
> ## 입력
>
> 첫째 줄에 세 개의 자연수 N, M, K가 주어진다. (1 ≤ M ≤ N ≤ 4,000,000, 1 ≤ K ≤ min(M, 10,000))
>
> 다음 줄에 카드의 번호를 나타내는 M개의 자연수가 주어진다. 각각의 수들은 1 이상이고 N 이하이며 서로 다르다.
>
> 다음 줄에 K개의 자연수가 주어진다. i번째 수는 철수가 i번째로 내는 카드의 번호이다. 철수가 내는 카드 역시 1 이상 N 이하이다.
>
> ## 출력
>
> K줄에 걸쳐서 수를 출력한다. i번째 줄에는 민수가 i번째로 낼 카드의 번호가 출력되어야 한다.
>
> ## 해설
>
> 처음 문제를 봤을 때 유니온 파인드를 생각했다.
>
> 주어지는 카드들을 모두 받은 후 오름차순으로 정렬한다 그리고 0 ~ M번째까지 순회하여 i번째 카드에 i+1번째 카드의 값을 기록한다. 이렇게 하면 현재 카드보다 더 큰 카드를 1번만의 찾을 수 있다고 생각했다.
>
> > 1.  주어지는 카드들을 모두 받아 오름차순으로 정렬한다.
> >
> > 2. 현재 카드보다 한 단계 큰 카드를 저장할 vector bigger_card를 선언한다. 그리고 해당 카드의 개수를 기록할 unordered_map card_cnt를 선언한다.
> >
> > 3. 0~M번째 카드를 모두 순회한다. 이때 변수 tmp를 0으로 선언한다.
> >
> >    - 만약 현재 카드의 값이 tmp보다 크다면
> >
> >    > 1. tmp부터 i 번째 카드의 값 - 1까지 다음 카드를 가르키는 bigger_card에 i번째 카드의 값을 저장한다.
> >    >
> >    >    ```
> >    >    현재 카드의 값이 3이고, tmp가 0이면
> >    >    vector에 기록된 값 - 3 3 3 X X X
> >    >    vector의 인덱스 값 - 0 1 2 3 4 5
> >    >    ```
> >    >
> >    > 2. tmp에 현재 카드 값을 저장한다.
> >    >
> >    >    ```
> >    >    tmp = 3
> >    >    ```
> >    >
> >    > 3. card_cnt의 현재 카드의 개수를 1로 만든다.
> >    >
> >    >    ```
> >    >    card_cnt[3] = 1;
> >    >    ```
> >
> >    - 만약 현재 카드의 값이 tmp와 같다면
> >
> >    > 1. card_cnt의 현재 카드의 개수를 1 더한다.
> >    >
> >    >    ```
> >    >    card_cnt[tmp]++;
> >    >    ```
> >
> > 4. 3을 통해 모든 카드들의 다음 숫자를 기록했다면, 철수가 내는 K개의 카드를 입력받아 해당 카드보다 큰 숫자를 bigger_card에서 찾는다.
> >
> >    > 1. 입력받은 값을 get_number() 함수에 인자로 넣는다.
> >    >
> >    > 2. bigger_card에 기록된 값의 카드가 존재하는지 card_cnt를 통해 확인한다.
> >    >
> >    > 3. 만약 카드가 남아있다면, 해당 카드의 개수를 -1하고 해당 카드 값을 반환한다.
> >    >
> >    > 4. 만약 카드가 남아있지 않다면, 해당 카드의 값을 get_number()의 인자로 넣어 재귀하여 더 높은 카드를 찾는다. 이때, 유니온 파인드의 find_root 처럼 bigger_card에 기록된 값을 갱신하여 이후에 또 호출되었을 때 불필요한 재귀를 하지않게 해준다.
> >    >
> >    >    ```
> >    >    int get_number(int now)
> >    >    {
> >    >        int next_num = bigger_card[now];
> >    >        if (card_cnt[next_num] > 0) {
> >    >            card_cnt[next_num]--;
> >    >            return next_num;
> >    >        }
> >    >        else {
> >    >        	// bigger_card[now]에 다음 카드를 인자로 넣어서 반환된 값을 기록해두면 이후에 또 다시 now보다 낮은 값이 호출 되었을 때 빠르게 다음 카드를 찾을 수 있다.
> >    >            return bigger_card[now] = get_number(next_num);
> >    >        }
> >    >    }
> >    >    ```
> >    >
> >    > 5. 처음 호출한 get_number가 반환한 값을 출력한다.
>
> 위와 같은 방법으로 문제를 풀었다! 약간 링크드 리스트같이 다음 수를 기록해두고 다음 수가 바뀌면 다시 갱신하는 방법은 어떨까 생각해서 시도해봤는데 바로 맞아서 기분이 좋았다! 문제의 난이도를 가리고 풀고 있는데 의외로 어려운 난이도의 문제였어서 좀 더 뿌듯했다 하핳
>
> 이대로 계속 노력해서 실력이 많이 늘었으면 좋겠다!

