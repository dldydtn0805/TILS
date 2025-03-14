# 코드

```c++
#include <iostream>
#include <vector>
#include <string>

using namespace std;

string target, bomb;
int bomb_size, target_size;
vector<string> stackers;

void find_bomb()
{
    for (int i=0; i<target_size; ++i) {
        if (stackers.size() == 0) {
            stackers.push_back(string(1, target[i]));
        }
        else {
            if (target[i] == bomb[0]) {
                stackers.push_back(string(1, target[i]));
            }
            else {
                stackers.back() += target[i];
            }
        }
        if (stackers.back().size() == bomb_size && stackers.back() == bomb) {
            stackers.pop_back();
        }
    }
    
    return;
}

int main()
{
    cin >> target >> bomb;
    bomb_size = bomb.size();
    target_size = target.size();
    
    find_bomb();
    
    if (stackers.size() == 0) {
        cout << "FRULA";
    }
    else {
        for (string s : stackers) {
            cout << s;
        }
    }
    
    return 0;
}
```



> ## 문제
>
> 상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.
>
> 폭발은 다음과 같은 과정으로 진행된다.
>
> - 문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.
> - 새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.
> - 폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.
>
> 상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.
>
> 폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.
>
> ## 입력
>
> 첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.
>
> 둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.
>
> 두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.
>
> ## 해설
>
> 처음 문제를 보고 스택을 생각했다. 그러나 주어진 예시중 `cc44`가 있고 폭탄 문자열이 `c4`일때 폭탄 문자열이 만들어지고나서 남아있는 대상에 대해서도 폭탄 문자열인지를 판단해야했다. 나는 그래서 이걸 효율적으로 하기위해서 재귀를 이용하기로했다. 중간에 폭탄 문자열이 다시 시작되면 해당 위치에서 다시 함수를 호출하면 아무리 가운데에 여러개의 폭탄 문자열이 중복되어 사라져야 하더라도 충분히 해결할 수 있다고 생각했다.
>
> 호기롭게 제출했지만 시간초과가 났다. 아... 이게 무슨일일까... 싶어 알아보니 재귀호출을 하게되면 해당 문자열이 만들어지는지를 확인해고 반환한 후에 다시 이전 단계의 재귀에서 해당 문자열을 다시 순회를 시작하므로 최악의 경우 `O(N * M)`의 연산횟수가 들어가며, 만들어졌을때 해당 인덱스가 사라진 여부를 판단하는 연산까지 추가로하니 `O(N*M*M)`까지도 가능한 비효율적 방법이었다.
>
>  `O(N)`의 연산을 하려면 역시 스택으로 되돌아가야겠다고 생각했다. 위의 방법에서 단, 위 방법에서 힌트를 얻었는데 마치 재귀하는것 처럼 폭탄 문자열의 맨 첫번째 글자가 나타날때마다 새로운 스택을 만드는 것이다. 즉, 2차원 스택을 사용하는 것이다.
>
> > 맨처음에는 첫 글자를 스택에 집어넣는다. 그리고 계속해서 현재 존재하는 가장 뒤에 있는 스택에 글자들을 넣고 만약 폭탄 문자열과 길이가 같아졌을때, 폭탄 문자열과 똑같은 문자인지 확인한다. 만약 같으면 pop_back()을 이용해 해당 스택을 제거하고, 아니라면 계속해서 해당 스택에 문자를 집어넣는다.
> >
> > 진행중에 폭탄 문자열의 첫번째 글자가 나타나면 새로운 스택을 만들어 가장 맨 뒤에 넣는다. 이렇게하면 `CC44` 같은 경우 
> >
> > `{{C}} -> {{C}, {C}} -> {{C}, {C4}} -> {{C}} -> {{C4}} -> {}` 순으로 재귀에서 생각한 방식처럼 진행이 가능한 것이다! 이렇게 하면 모든 순회가 끝난후에 스택에 들어있는 모든 문자를 출력해주면 되고 만약 스택이 비어있다면 FRULA를 출력하면 되었다!
>
> 위의 방법을 쓰니 재귀와는 다르게 이전 인덱스로 다시 돌아가 연산을 다시하는 경우가 발생하지 않았고, 해당 문자열이 사라진 여부까지도 굳이 판별하지 않아도 되니 시간적으로 상당히 이득이었다!
>
> 재귀 방식도 작은 테스트케이스에서는 상당히 잘 돌아갔기 때문에 만약, 코딩테스트였다면 맞춘줄알고 신나서 제출했을것이다........
>
> 흠.... 구현하기전에 최악의 시간복잡도에 대해서 한번 생각해보는 것이 상당히 중요한것 같다. 다음에는 꼭 유의하면서 하자....!

