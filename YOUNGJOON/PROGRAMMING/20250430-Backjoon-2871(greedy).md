# 코드

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>

#define pcl pair<char, int>

using namespace std;

struct Compare{
    bool operator()(const pcl& a, const pcl& b) {
        if (a.first == b.first) {
            return a.second < b.second;
        }
        return a.first > b.first;
    }
};

int N;
unordered_map<char, int> sentence_cnt, used_cnt;
priority_queue<pcl, vector<pcl>, Compare> que;
vector<char> cards;

void oreno_turn_draw()
{
    string sang_card = "", heu_card = "";
    while (!que.empty() && cards.size() > 0) {
        while (cards.size() > 0 && cards.back() == '1') {
            cards.pop_back();
        }
        if (cards.size() > 0) {
            sang_card += cards.back();
            used_cnt[cards.back()]++;
            cards.pop_back();
        }
        else {
            break;
        }
        
        while (!que.empty() && used_cnt[que.top().first] > 0) {
            used_cnt[que.top().first]--;
            // cout << que.top().second << "\n";
            que.pop();
        }
        if (!que.empty()) {
            heu_card += que.top().first;
            cards[que.top().second] = '1';
            que.pop();
        }
    }
    
    if (heu_card < sang_card) {
        cout << "DA\n" << heu_card;
    }
    else {
        cout << "NE\n" << heu_card;
    }
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    string deck;
    cin >> N >> deck;
    
    for (int i=0; i<N; ++i) {
        cards.push_back(deck[i]);
        que.push({deck[i], i});
        sentence_cnt[deck[i]]++;
        used_cnt[deck[i]] = 0;
    }
    
    oreno_turn_draw();

    return 0;
}
```

> - ## 문제
>
>   상근이는 희원이와 놀기 위해 집에서 게임을 준비해 왔다. 한 종이에 한 글자씩 쓰여 있고, 이러한 종이 N개가 한 줄로 놓여져 있다. 두 사람 각각은 이 종이를 모아서 단어를 만들려고 한다. 각 사람은 턴을 번갈아가면서 종이 한 장을 가져가고 자기 단어의 뒤쪽에 붙인다. 상근이가 게임을 먼저 하고, 더 이상 가져갈 종이가 없으면 게임을 종료한다.
>
>   두 단어 A와 B가 있을때, A가 B보다 사전순으로 앞선다면, A는 B보다 아름답다. 두 사람이 각자 만든 단어 중에서 더 아름다운 단어를 만든 사람이 게임을 이긴다. 만약 두 사람이 같은 단어를 만들었다면 둘 다 진다.
>
>   상근이는 이 게임을 엄청나게 잘하지만, 희원이는 아직 규칙도 헷갈리는 상황이다. 따라서, 상근이는 희원이를 위해 조금 다르게 게임을 하려고 한다. 상근이는 항상 가장 오른쪽에 있는 종이를 집어간다. 희원이가 이 사실을 알고 있을 때, 희원이가 상근이를 이길 수 있는지 구하고, 만들 수 있는 가장 아름다운 단어를 구하는 프로그램을 작성하시오.
>
>   ## 입력
>
>   첫째 줄에 짝수 N이 주어진다. (2 ≤ N ≤ 100 000)
>
>   둘째 줄에 종이에 적혀 있는 글자가 순서대로 주어진다. 글자는 모두 알파벳 소문자이다.
>
>   ## 출력
>
>   만약, 희원이가 이길 수 있다면 첫째 줄에 "DA"를, 없다면 "NE"를 출력한다. 둘째 줄에는 희원이가 만들 수 있는 가장 아름다운 단어를 출력한다.
>
> ## 해설
>
> 처음 문제를 봤을 때 상근이가 반드시 오른쪽 카드부터 가져가고, 사전순으로 빠르려면 앞에오는 문자가 사전순으로 무조건적으로 빠른게 중요 포인트이므로 희원이는 모든 카드 중에서 가장 사전순으로 빠른 카드를 집고, 최대한 오른쪽에 있는 카드를 집으면 된다고 생각했다.
>
> 상근이에게 가장 오른쪽에 있는 카드를 제공하기 위해서 vector를 이용했고,
>
> 희원이에게 가장 사전순으로 빠른 카드를 제공하기 위해서 우선순위 큐를 이용했다.
>
> > 1. 상근이가 먼저 카드를 뽑는다. 따라서 vector의 맨 뒤에 있는 카드를 뽑는다.
> >    - 하지만 vector에서 무작정 뒤에만 빼면 희원이가 뽑은 카드가 나타날 수 있기 때문에 희원이가 카드를 뽑으면 해당 인덱스를 '1'로 지정하여 vector의 맨뒤의 카드가 '1'이면 '1'이 아닐때 까지 뺀 후 해당 카드를 뽑는다.
> >    - 카드를 뽑았으면 해당 카드를 사용했다는 표시로 해당 카드값에 대해 소모값 1을 더한다.
> > 2. 상근이가 카드를 뽑았으면 희원이는 가장 사전순으로 빠른 단어를 뽑는다.
> >    - 하지만 무작정 우선순위 큐에서 사전순으로 빠른 단어를 뽑으면 이미 상근이가 뽑은카드 일 수도 있기때문에 해당 단어에 소모값이 있는지 확인하고 소모값이 있다면 해당 소모값이 0이 될때까지 우선순위 큐에서 빼낸 후 가장 우선순위가 높은 카드를 뽑는다.
> >    - 카드를 뽑았으면 해당 카드를 사용했다는 표시로 해당 카드값이 기록된 인덱스값을 이용해 vector에 1을 기록한다.
> >    - 이때 우선순위는 단어의 사전순으로 빠른순으로 우선순위를 주고 만약 같다면 카드의 인덱스 값이 뒤쪽일 수록 우선순위를 크게 준다.
> > 3. 모든 카드를 뽑았다면 우선순위를 비교하여 희원이가 이겼는지 상근이가 이겼는지 출력한다.
>
> 처음에 문제를 풀때 단순히 사전순으로만 우선순위를 주었다가 틀렸다. 반례를 생각해보다가 인덱스 값도 포함하여 우선순위를 주어야 상근이가 더 좋은 카드를 뽑는 것을 막을 수 있다고 생각하여 인덱스 우선순위도 포함하였더니 맞았다!
>
> 그리디 라고 생각하고 푼건 아닌데 생각해보면 우선순위를 주고 그대로 맡긴게 그리디긴했다... 음 좀 더 문제의 유형을 파악하는 습관을 기르면 좋겠다.

