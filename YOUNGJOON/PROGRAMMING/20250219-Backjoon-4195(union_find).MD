# 코드

```c++
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

using namespace std;

int T, F;

string find_root(string now, unordered_map<string, string>& parents)
{
    if (parents[now] == now) {
        return parents[now];
    }
    
    return parents[now] = find_root(parents[now], parents);
}


void union_root(string x, string y, unordered_map<string, string>& parents, unordered_map<string, int>& parents_power)
{
    string rx = find_root(x, parents);
    string ry = find_root(y, parents);
    
    if (rx == ry) {
        cout << parents_power[rx] << "\n";
        return;
    }
    
    if (rx > ry) {
        swap(rx, ry);
    }
    
    parents[ry] = rx;
    parents_power[rx] += parents_power[ry];
    
    cout << parents_power[rx] << "\n";
    
    return;
    
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    
    cin >> T;
    
    for (int t=0; t<T; ++t) {
        cin >> F;
        unordered_map<string, string> parents;
        unordered_map<string, int> parents_power;
        
        string s, e;
        for (int f=0; f<F; ++f) {
            cin >> s >> e;
            if (parents.find(s) == parents.end()) {
                parents[s] = s;
                parents_power[s] = 1;
            }
            if (parents.find(e) == parents.end()) {
                parents[e] = e;
                parents_power[e] = 1;
            }
            
            union_root(s, e, parents, parents_power);
            
        }
        
    }

    return 0;
}

```



> ## 문제
>
> 민혁이는 소셜 네트워크 사이트에서 친구를 만드는 것을 좋아하는 친구이다. 우표를 모으는 취미가 있듯이, 민혁이는 소셜 네트워크 사이트에서 친구를 모으는 것이 취미이다.
>
> 어떤 사이트의 친구 관계가 생긴 순서대로 주어졌을 때, 두 사람의 친구 네트워크에 몇 명이 있는지 구하는 프로그램을 작성하시오.
>
> 친구 네트워크란 친구 관계만으로 이동할 수 있는 사이를 말한다.
>
> ## 입력
>
> 첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스의 첫째 줄에는 친구 관계의 수 F가 주어지며, 이 값은 100,000을 넘지 않는다. 다음 F개의 줄에는 친구 관계가 생긴 순서대로 주어진다. 친구 관계는 두 사용자의 아이디로 이루어져 있으며, 알파벳 대문자 또는 소문자로만 이루어진 길이 20 이하의 문자열이다.
>
> ## 해설
>
> 처음 문제를 봤을때 유니온 파인드가 떠올랐다. 이전에 유니온 파인드를 이용하여 해당 분리 집합에 몇명의 구성원이 있는지 출력하는 문제가 있었는데 이와 상당히 비슷해보였다. 단, 노드번호가 아닌 이름이 문자열로 주어진다는 점도달랐다. 이를 관리하기 위해서 parents를 배열이 아닌 unordered_map으로 선언하여 루트와 분리집합내 인원 수를 관리하였다.
>
> 입력을 받아 두 사람의 이름을 받는다. 이때 처음 나타난 이름은 parents에 자신을 부모로하여 추가하고 이때 분리집합의 인원수도 1로 저장한다.
>
> 그리고 union_root에 두 사람의 이름을 넣어 이름의 사전순이 더 낮은 부모를 가진 쪽을 부모로 하여 합친다. 그리고 해당 분리집합의 개수를 출력한다.
> 
> 이렇게 주어지는 입력마다 진행하니 정답을 받았다!
> 
>한번 제출했을때 틀렸는데 문제에서 `어떤 사이트의 친구 관계가 생긴 순서대로 주어졌을 때, 두 사람의 친구 네트워크에 몇 명이 있는지 구하는 프로그램을 작성하시오.` 라는 구문을 잘못이해했다. 같은 네트워크안에 들어있는 친구가 다시 주어지면 출력하지 않아야 하는 줄 알았던 것 생각해보면 {1, 2}, {3, 4}, {2, 3}, {1, 4} 가 주어지면 1, 4부분은 이미 연결이 되어있는 상태인데 한번도 호출 된적 없는 구성인 것이다. 따라서 이렇게 될 경우에도 분리 집합의 인원수를 출력해주어야 되는 것으로 보였다. 그래서 루트가 같을 경우에도 출력해주게 바꿨더니 정답을 받았다.
> 
>흠... 문제를 잘 파악하고 푸는것도 중요하다.... 바로 문제를 보고 알고리즘 유형 파악은 잘했지만 틀린게 아쉽다... 그래도 빠르게 1시간 안에 풀어서 기분은 좋다!  더 꼼꼼하게 하도록 하자!

