# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int T, M;

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> T;
    for (int t=0; t<T; ++t) {
        cin >> M;
        int mid, num, front_size = 0, back_size = 0;
        vector<int> mid_nums;
        cin >> mid;
        mid_nums.push_back(mid);
        priority_queue<int, vector<int>, greater<int> > back_que;
        priority_queue<int, vector<int>, less<int> > front_que;
        
        for (int i=1; i<M; ++i) {
            cin >> num;
            if (num < mid) {
                front_que.push(num);
                front_size++;
                if (front_size == back_size + 2) {
                    back_que.push(mid);
                    mid = front_que.top();
                    front_que.pop();
                    front_size--;
                    back_size++;
                }
            }
            else if (num > mid) {
                back_que.push(num);
                back_size++;
                if (back_size == front_size + 2) {
                    front_que.push(mid);
                    mid = back_que.top();
                    back_que.pop();
                    back_size--;
                    front_size++;
                }
            }
            else {
                if (front_size > 0 && front_que.top() == mid) {
                    back_que.push(num);
                    back_size++;
                    if (back_size == front_size + 2) {
                        front_que.push(mid);
                        back_que.pop();
                        back_size--;
                        front_size++;
                    }
                    
                }
                else {
                    front_que.push(num);
                    front_size++;
                    if (front_size == back_size + 2) {
                        back_que.push(mid);
                        front_que.pop();
                        back_size++;
                        front_size--;
                    }
                }
            }
            
            if (i % 2 == 0) mid_nums.push_back(mid);
        }
        
        cout << mid_nums.size() << "\n";
        int cnt = 0;
        for (int a : mid_nums) {
            cout << a << " ";
            cnt++;
            if (cnt == 10) {
                cnt = 0;
                cout << "\n";
            }
        }
        cout << "\n";
        
    }
    
    return 0;
}

```

> ## 문제
>
> 어떤 수열을 읽고, 홀수번째 수를 읽을 때 마다, 지금까지 입력받은 값의 중앙값을 출력하는 프로그램을 작성하시오.
>
> 예를 들어, 수열이 1, 5, 4, 3, 2 이면, 홀수번째 수는 1번째 수, 3번째 수, 5번째 수이고, 1번째 수를 읽었을 때 중앙값은 1, 3번째 수를 읽었을 때는 4, 5번째 수를 읽었을 때는 3이다.
>
> ## 입력
>
> 첫째 줄에 테스트 케이스의 개수 T(1 ≤ T ≤ 1,000)가 주어진다. 각 테스트 케이스의 첫째 줄에는 수열의 크기 M(1 ≤ M ≤ 9999, M은 홀수)이 주어지고, 그 다음 줄부터 이 수열의 원소가 차례대로 주어진다. 원소는 한 줄에 10개씩 나누어져있고, 32비트 부호있는 정수이다.
>
> ## 출력
>
> 각 테스트 케이스에 대해 첫째 줄에 출력하는 중앙값의 개수를 출력하고, 둘째 줄에는 홀수 번째 수를 읽을 때 마다 구한 중앙값을 차례대로 공백으로 구분하여 출력한다. 이때, 한 줄에 10개씩 출력해야 한다.다.
>
> ## 해설
>
> 처음 문제를 봤을 때 과거에 비슷한 문제를 푼 경험이 있어서 우선순위 큐를 생각했다.
>
> 변수 하나에 중앙값을 두고, 양 옆에 우선순위 큐를 1개씩 두는 것이다 단, mid 값보다 작은 값을 가질 우선순위 큐는 내림차순으로, mid 값보다 큰 값을 가질 우선순위 큐는 오름차순으로 우선순위를 두게 한다. 그리고 중앙값의 밸런스가 맞도록 한쪽에 값이 치우치면 치우친 쪽의 우선순위가 가장 높은 값을 mid로 하고 기존 mid 값을 수가 모자란 우선순위 큐에 push 하는 식으로 mid값을 조정하면 쉽게 구할 수 있다고 생각했다.
>
> > 1. 주어지는 값들을 순서대로 받는다. 처음 받은 값은 반드시 mid 이므로 mid에 입력받고 홀수번째 입력이므로 해당 값을 mid값을 저장하는 배열 mid_nums에 저장한다.
> > 2. 1 이후에 나머지 값들은 num 변수에 입력받는다.
> >    - num이 mid보다 클 경우 back_que에 push 한다.
> >    - num이 mid보다 작을 경우 front_que에 push 한다.
> >    - num의 값이 mid와 같을 경우 front_que의 top이 mid의 값과 같은지 확인한다.
> >      - 만약 다르다면 front_que에 push 한다.
> >      - 만약 같다면 back_que에 push 한다.
> > 3. 2번에서 num의 값을 push한 우선순위 큐의 크기가 push되지 않은 우선순위 큐보다 2만큼 크다면 크기가 작은 우선순위 큐에 mid 값을 넣고 크기가 큰 우선순위 큐에서 가장 우선순위가 높은 값을 pop해 mid 값으로 할당한다.
> > 4. 만약 현재 입력이 홀수번째 입력이라면 현재 mid 값을 mid_nums에 넣는다.
> > 5. 모든 입력을 받은 후 현재 mid_nums의 크기를 출력하고 mid_nums에 있는 값을 순서대로 한 줄에 10개씩 출력한다.
>
> 위와 같은 방식으로 문제를 풀었다. 처음 문제를 풀때 로직상으로는 num의 값이 mid 값고 같을 때 처리를 구상은 했었는데 문제를 풀다보니 정신이 다른데 팔려서 해당 코드를 아에 안적었다.. 이 무슨... 구상을 했으면 주석으로 해당 구상을 먼저 적고 코드를 적어가면 빠뜨리지 않고 진행할 수 있을테니까... 주석을 적는 습관을 들이자.
>
> 처음 문제를 풀어 정답을 받았을 때 한줄에 10개씩 출력하는 코드를 적지 않았었는데 어떻게 정답을 받은건지 의문이다... 실제로 주어진 예제를 출력할때도 12개를 한줄에 다 출력했었는데 그래도 정답을 받았다.. 추후에 문제를 다시 읽고나서야 이를 알고 코드를 부랴부랴 수정해서 한줄에 10개씩 제출하게하고 다시 정답을 받을 수 있었는데....
> 왜 정답을 받은걸까??

