# 코드

```c++
#include <iostream>
#include <vector>

using namespace std;

int N, K;
vector<long long> lan_lines;

int cut_lan(long long lan_length)
{
    int cnt = 0;
    for (int l : lan_lines) {
        long long tmp = l / lan_length;
        cnt += tmp;
    }
    
    return cnt;
}

int max_lan()
{
    long long start = 1;
    long long end = 1LL << 32 - 1;
    
    while (start <= end) {
        long long mid = (start + end) / 2;
        int now_cnt = cut_lan(mid);
        
        if (now_cnt < K) {
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
    
    cin >> N >> K;
    
    long long num;
    for (int i=0; i<N; ++i) {
        cin >> num;
        lan_lines.push_back(num);
    }
    
    cout << max_lan();

    return 0;
}

```



> ## 문제
>
> 집에서 시간을 보내던 오영식은 박성원의 부름을 받고 급히 달려왔다. 박성원이 캠프 때 쓸 N개의 랜선을 만들어야 하는데 너무 바빠서 영식이에게 도움을 청했다.
>
> 이미 오영식은 자체적으로 K개의 랜선을 가지고 있다. 그러나 K개의 랜선은 길이가 제각각이다. 박성원은 랜선을 모두 N개의 같은 길이의 랜선으로 만들고 싶었기 때문에 K개의 랜선을 잘라서 만들어야 한다. 예를 들어 300cm 짜리 랜선에서 140cm 짜리 랜선을 두 개 잘라내면 20cm는 버려야 한다. (이미 자른 랜선은 붙일 수 없다.)
>
> 편의를 위해 랜선을 자르거나 만들 때 손실되는 길이는 없다고 가정하며, 기존의 K개의 랜선으로 N개의 랜선을 만들 수 없는 경우는 없다고 가정하자. 그리고 자를 때는 항상 센티미터 단위로 정수길이만큼 자른다고 가정하자. N개보다 많이 만드는 것도 N개를 만드는 것에 포함된다. 이때 만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에는 오영식이 이미 가지고 있는 랜선의 개수 K, 그리고 필요한 랜선의 개수 N이 입력된다. K는 1이상 10,000이하의 정수이고, N은 1이상 1,000,000이하의 정수이다. 그리고 항상 K ≦ N 이다. 그 후 K줄에 걸쳐 이미 가지고 있는 각 랜선의 길이가 센티미터 단위의 정수로 입력된다. 랜선의 길이는 231-1보다 작거나 같은 자연수이다.
>
> ## 해설
>
> 이 문제는 이분탐색을 이용해 풀기로했다. 
>
> > 1. start = 1, end = 2^31 - 1로 선언한다.
> > 2. start가 end보다 작거나 같을때 까지 반복한다. `(start + end) / 2`를 mid 값으로 설정한다.
> > 3. mid값을 이용해 주어진 랜선을 잘랐을 때 나오는 랜선의 개수를 구한다.
> > 4. 만약 자른 랜선의 개수가 K개보다 많다면 구간을 줄인다 (end = mid - 1) 만약 자른 랜선의 개수가 K보다 많거나 같다면 구간의 크기를 늘린다 (start = mid + 1)
> >    - K개와 개수가 같아도 최대로 긴 랜선의 길이를 찾아야 하기 때문에 개수가 같으면 더 큰 구간으로 간다!
> > 5. 최종적으로 가장 큰 값을 만났을때 개수를 만족하는 상황일 것으므로 (start = mid + 1)의 조건으로 start가 end를 넘어갈 것이다. 따라서 end를 반환하여 출력한다.
>
> 위의 방식대로 코드를 짜서 제출했는데 틀렸다 ㅠㅠ 몇가지 반례를 해보니 end값의 설정이 잘못되어 있었다...
>
> 처음에는 pow를 이용해 end값을 만드려고 했으나 pow는 값을 double로 반환하기 때문에 정확성이 조금 떨어질 위험이 있어서 1 << 31 - 1로 end 값을 선언했다. 그렇다! 1부터 제곱하기 때문에 1 << 32 - 1 로 했어야 했는데 잘못 범위를 설정한 것이다 ㅠㅠ 이걸 수정했더니 바로 맞았다.
>
> 비트 연산은 익숙하지 않긴 하지만.. 꼭 잘 알고 쓸 필요가 있겠다...!
