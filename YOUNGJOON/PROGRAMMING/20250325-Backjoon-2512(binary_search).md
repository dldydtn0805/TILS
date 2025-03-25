# 코드

```c++
#include <iostream>
#include <vector>

using namespace std;

int N, M;
vector<int> numbers;
int result = 0;

int divide_money(int now)
{
    int cnt = 0;
    for (int a : numbers) {
        cnt += min(a, now);
    }
    
    return cnt;
}

int check_binary(int max_money)
{
    int start = 1;
    int end = max_money;
    
    while (start <= end) {
        int mid = (start + end) / 2;
        int tmp = divide_money(mid);
        
        if (tmp > M) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    
    return end;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N;
    int max_money = 0;
    numbers.resize(N);
    for (int i=0; i<N; ++i) {
        cin >> numbers[i];
        max_money = max(max_money, numbers[i]);
    }
    
    cin >> M;
    
    cout << check_binary(max_money);
    

    return 0;
}

```



> ## 문제
>
> 국가의 역할 중 하나는 여러 지방의 예산요청을 심사하여 국가의 예산을 분배하는 것이다. 국가예산의 총액은 미리 정해져 있어서 모든 예산요청을 배정해 주기는 어려울 수도 있다. 그래서 정해진 총액 이하에서 **가능한 한 최대의** 총 예산을 다음과 같은 방법으로 배정한다.
>
> 1. 모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정한다.
> 2. 모든 요청이 배정될 수 없는 경우에는 특정한 **정수** 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정한다. 상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정한다. 
>
> 예를 들어, 전체 국가예산이 485이고 4개 지방의 예산요청이 각각 120, 110, 140, 150이라고 하자. 이 경우, 상한액을 127로 잡으면, 위의 요청들에 대해서 각각 120, 110, 127, 127을 배정하고 그 합이 484로 가능한 최대가 된다. 
>
> 여러 지방의 예산요청과 국가예산의 총액이 주어졌을 때, 위의 조건을 모두 만족하도록 예산을 배정하는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에는 지방의 수를 의미하는 정수 N이 주어진다. N은 3 이상 10,000 이하이다. 다음 줄에는 각 지방의 예산요청을 표현하는 N개의 정수가 빈칸을 사이에 두고 주어진다. 이 값들은 모두 1 이상 100,000 이하이다. 그 다음 줄에는 총 예산을 나타내는 정수 M이 주어진다. M은 N 이상 1,000,000,000 이하이다. 
>
> ## 출력
>
> 첫째 줄에는 배정된 예산들 중 최댓값인 정수를 출력한다. 
>
> ## 해설
>
> 과거에 틀렸던 문제를 다시 풀어보았다. 과거에는 해당 문제를 주어지는 값들 중 최소와 최대를 구해서 그 값 안에서 값을 찾으려고 했던것 같다.
>
> 다시 문제를 봤을때 바로 떠올린 것은 이분 탐색이었다. 주어지는 예산 값중 최댓값을 구하고 1부터 최댓 값 사이로 이분탐색을 돌려 구한 mid 값을 모든 예산에 대입하고 그 합을 M과 비교하여 범위를 바꿔나갔다.
>
> 주어진 예시를 통해 찾아본 결과 end 값을 반환해야 했고, end 값을 반환하려면 구한 tmp값과 M이 같을 경우 start가 앞으로 나가야 end가 옳게 반환 될 것이므로 구간 변경을 M보다 같거나 작을때 start를 mid + 1하게 했다.
>
> 실력이 올라간 현재 다시 보니까 문제가 바로 보여서 신기했다 오오... 다음에도 과거에 틀렸던 문제를 다시 풀어보는 시간을 가져야겠다.
