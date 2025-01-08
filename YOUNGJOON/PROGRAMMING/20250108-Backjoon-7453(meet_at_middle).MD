# 코드

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

int N;
vector<vector<int> > numbers(4);
vector<int> array_one, array_two;
long long result = 0;

void make_zero()
{
    int one_idx = 0;
    int two_idx = 0;
    
    while (one_idx < N*N && two_idx < N*N) {
        int tmp = array_one[one_idx] + array_two[two_idx];
        if (tmp == 0) {
            // cout << array_one[one_idx] << " " << array_two[two_idx] << " ";
            long long one_same = 1, two_same = 1;
            while (one_idx < N*N - 1 && array_one[one_idx] == array_one[one_idx + 1]) {
                one_same++;
                one_idx++;
            }
            
            while (two_idx < N*N - 1 && array_two[two_idx] == array_two[two_idx + 1]) {
                two_same++;
                two_idx++;
            }
            
            one_idx++;
            two_idx++;
            // cout << one_same << " " << two_same << "\n";
            result += (one_same * two_same);
            
        }
        else if (tmp > 0) {
            two_idx++;
        }
        else {
            one_idx++;
        }
    }
    
    cout << result;
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> N;
    int num;
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<4; ++j) {
            cin >> num;
            numbers[j].push_back(num);
        }
    }
    

    for (int j=0; j<N; ++j) {
        for (int k=0; k<N; ++k) {
            array_one.push_back(numbers[0][j] + numbers[1][k]);
            array_two.push_back(numbers[2][j] + numbers[3][k]);
        }
    }
    
    sort(array_one.begin(), array_one.end());
    sort(array_two.begin(), array_two.end(), greater<int>());
    
    make_zero();

    return 0;
}

```



# 해설

> ## 문제
>
> 정수로 이루어진 크기가 같은 배열 A, B, C, D가 있다.
>
> A[a], B[b], C[c], D[d]의 합이 0인 (a, b, c, d) 쌍의 개수를 구하는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에 배열의 크기 n (1 ≤ n ≤ 4000)이 주어진다. 다음 n개 줄에는 A, B, C, D에 포함되는 정수가 공백으로 구분되어져서 주어진다. 배열에 들어있는 정수의 절댓값은 최대 228이다.
>
> ## 해설
>
> 처음에 봤을때부터 막힌 어려운 문제다 처음 보자마자 생각난건 브루트포스 -> 4000^4으로 무조건 안됨, 이분 탐색 -> 4개를 구별해야하는데 어떻게할꺼여 안될듯?, 누적합 -> 딱히 떠오르지 않음 등등 온갖 방법을 가져다 대도 안될 것 같아서 결국 고민하다가 알고리즘 분류를 봤다.
>
> 알고리즘 분류를 보고 처음 생각한 방법은 투포인터를 2개 사용하는 것이다. 이분탐색을 하는 것 처럼 우선 2개의 지점을 잡고 그 안에서 현재 2개의 지점과 합쳤을 때 0이되는 2개의 수를 투포인터를 또 이용해서 찾으려고 했다. 즉 2개의 투포인터를 사용하려고 했다.
>
> 발상자체는 괜찮았던것 같은데.. 일단 틀렸다... 시간초과가 났다. 2개의 지점을 가지고 결국 브루트포스 처럼 돌아가야했기때문에 사실상 의미가 없었다. 결국 똑같이 4000^3으로 연산횟수가 돌아갔다. 
>
> > **외부 루프** (`left`): O(N)
> >
> > **내부 루프** (`right`): O(N)
> >
> > **두 포인터 검색**: O(N)
> >
> > **각 반복의 연산**: O(1)
> >
> > **총 시간 복잡도** : O(N³)
>
> 그래서 결국 다른 사람들의 블로그 게시글을 보고 힌트를 얻었다. 여기서 얻은 방법이 `중간에서 만나기` 였다.
>
> `중간에서 만나기`는 무언가 연산을 미리 해놓고 중간에서 만나 해결한다는 `분할 정복`의 개념과 상당히 비슷해 보이는 개념인것 같다.
>
> 그래서 4개의 배열을 각각 2개씩 미리 연산해서 2개의 배열로 만드는 것이다. 그렇게하면 16000 * 16000정도의 연산으로 2.56억 정도로 가능해보였다.
>
> 그래서 나는 처음에 map을 이용해서 중복된 값들을 관리하고, 자동 정렬 기능을 이용해 굳이 정렬을 하지 않고 사용하려고 했다.
>
> 그런데 작성한 코드는 틀렸다.... 분명 로직은 똑같다고 느꼈는데 도대체 뭐가 문제였을까?
>
> 그것은 바로 map의 특성 때문이었다. map은 삽입할고 탐색할 때 O(1)이 아닌  **O(log N)** 시간이 걸리므로 다양한 숫자가 계속해서 추가되는 상황에서는 적합하지 않았다...
>
> 그래서 중복을 담은 vector를 이용해 만약 0이 되는 순간, 현재 값과 같은 값이 존재하는지(중복 값)를 확인하고 개수를 세며 투포인터를 이동시키고, 배열 2개에서 각각의 중복된 값의 개수를 곱한 값이 0이 되는 조합의 개수이므로, 이를 result에 더하는 방식으로 진행하였다.
>
> 그랬더니 틀렸습니다 가 나왔는데... 이건 또 자료형 선언의 문제였다. 처음 result는 long long으로 선언했지만, 중복값을 다루는 one_same, two_same은 int로 선언하였고 두 int형의 연산이 int의 범위를 넘어서면 오버 플로우가 발생하여 long long 에 제대로 된 값을 넣지 못하였다.
>
> 따라서 두 int형의 자료형을 long long으로 선언하여 제출하니까 맞았다.
>
> 이번 문제는 정말 감도 안잡히는 어려운 문제였다.. 구상 부터 풀이까지 전부 유형이나 블로그의 도움을 받았기 때문에 꼭 기억해두자...
>
> 말도안되는 4000^4 같은 연산은 분할 정복이나, 중간에서 만나기 같은 방법으로 그 연산 횟수를 줄일 방법을 생각해보아야한다. 이점을 기억하고 문제를 풀며, 
>
> 또한 map의 삽입에 걸리는 시간 복잡도 등을 꼭 판단하여 적합한 자료구조를 사용하자!

