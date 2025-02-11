# 코드

```c++
#include <iostream>
#include <vector>
#include <unordered_map>

#define dividivi 1000000007

using namespace std;

long long N;
unordered_map<long long, long long> mememo;

long long get_pibo(long long now)
{
    if (mememo.find(now) != mememo.end()) {
        return mememo[now];
    }
    
    long long tmp;
    if (now % 2 == 0) {
        tmp = (get_pibo(now / 2) % dividivi) * ((get_pibo(now / 2 + 1) % dividivi) + (get_pibo(now / 2 - 1) % dividivi));
        mememo[now] = tmp % dividivi;
    }
    else {
        long long front_tmp = (get_pibo((now + 1) / 2) % dividivi);
        long long end_tmp = (get_pibo((now - 1) / 2) % dividivi);
        tmp = (((front_tmp * front_tmp) % dividivi) + ((end_tmp * end_tmp) % dividivi)) % dividivi;
        mememo[now] = tmp;
    }
    
    return mememo[now];
}

int main()
{
    cin >> N;
    
    mememo[0] = 0;
    mememo[1] = mememo[2] = 1;
    
    cout << get_pibo(N);
    

    return 0;
}

```



> ## 문제
>
> 피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.
>
> 이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.
>
> n=17일때 까지 피보나치 수를 써보면 다음과 같다.
>
> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597
>
> n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에 n이 주어진다. n은 1,000,000,000,000,000,000보다 작거나 같은 자연수이다.
>
> ## 해설
>
> 처음 문제를 보자마자 숫자의 크기를 보고 분할 정복이 떠올랐다. 그런데 큰 문제가 있었는데 어떻게 이걸 분할 정복할것이냐는 것이었다.
>
> 계속 피보나치의 수의 개념인 `Fn = Fn-1 + Fn-2 (n ≥ 2)`를 보고... 예시를 만들면서 쳐다보아도... 답이 안나왔다...
>
> 결국 뭔가 낌새가 이상하여 찾아보니 선형 대수를 이용한 행렬식 같은 개념을 이용해 점화식을 바꾸어야 한다는 것이었다.
>
> 아............... 완전히 수학 문제였다 아직 나의 수학 실력으로는 차마 생각해낼수도 없는 문제였다 완전히 능력밖이었다고 해야할까...
>
> 점화식을 만드는 것만 보고 분할 정복쪽은 한번 적어보기로 하였으나 점화식 만드는걸 보다가 그 개념까지도 결국 조금 봐버려서 바로 떠올랐다.
>
> 1,000,000,000,000,000,000는 결국 long long 자료형에 들어가는 크기이므로 2^64 보다 작다. 즉 어떠한 값을 구하기 위해서 거듭 제곱을 이용한 분할 정복을 이용하면 64번의 깊이 안에 찾을수 있다는 것이다.
>
> 찾아본 점화식은 현재 찾고자하는 숫자가 홀수일때와 짝수일때로 나뉘었다.
>
> > - 홀수 일 때
> >   - `F²((n+1) / 2) + F²((n-1) / 2)`
> > - 짝수 일 때
> >   - `F(n / 2) * (F(n / 2 + 1) + F(n / 2 - 1))`
>
> 주어진 N을 넣고 재귀를 이용하여 현재 값을 구하고자 하였다. 만약 현재 계산했던 값이 기록된 적이 없다면 재귀를 보내고, 있다면 해당 값을 반환하였다.
>
> 주어지는 숫자의 크기가 너무 커서 인덱스로 관리할 수 없었기 때문에 unordered_map을 이용하여 해당 숫자에 따른 피보나치 수를 기록해두었다.
>
> 점화식과 거듭제곱을 이용한 분할정복을 이용한다는 개념만 찾았다면 수월하게 풀 수 있는 문제였다고 생각한다. 단............. 그게 너무 어렵지 않았나 싶다........
>
> 후... 문제가 진짜 어려웠다 수학이 섞인 문제란..... 수학 공부도 좀 해야할지도....

