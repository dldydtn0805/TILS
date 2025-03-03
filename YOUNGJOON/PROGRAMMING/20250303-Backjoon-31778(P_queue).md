# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int N, K;
vector<char> PPC;
vector<int> after_C;
priority_queue<int, vector<int>, greater<int> > C_que;
priority_queue<int, vector<int>, less<int> > P_que;
long long result = 0;

void change_loca()
{
    if (P_que.size() > 0 && C_que.size() > 0) {
        for (int i=0; i<K; ++i) {
            int best_C = C_que.top();
            int best_P = P_que.top();
            
            if (best_C > best_P) {
                break;
            }
            
            C_que.pop(); P_que.pop();
            PPC[best_C] = 'P'; PPC[best_P] = 'C';
            C_que.push(best_P); P_que.push(best_C);
        }
        
        for (int i=N-1; i>=0; --i) {
            if (PPC[i] == 'C') {
                if (i != N-1) {
                    after_C[i] = after_C[i + 1] + 1; 
                }
                else {
                    after_C[i] = 1;
                }
            }
            else {
                if (i != N-1) {
                    after_C[i] = after_C[i + 1]; 
                }
            }
        }
    }
    
    return;

}

void get_PPC()
{
    
    if (P_que.size() > 0 && C_que.size() > 0) {
        while (!P_que.empty()) {
            long long now_P = P_que.top();
            P_que.pop();
            long long before_P = P_que.size();
            
            result += after_C[now_P] * before_P;
        }
    }
    
    cout << result;
    
    return;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> K;
    PPC.resize(N);
    after_C.resize(N, 0);
    string data;
    cin >> data;
    
    for (int i=0; i<N; ++i) {
        PPC[i] = data[i];
        if (data[i] == 'C') {
            C_que.push(i);
        }
        else {
            P_que.push(i);
        }
    }
    
    change_loca();
    get_PPC();

    return 0;
}

```



> ## 문제
>
> 포닉스에게는 아끼던 문자열 S가 있다. S는 길이가 N이며 알파벳 대문자 `C`와 `P`만으로 이루어져 있는 문자열이다. 문자열 S의 i번째 문자는 Si와 같이 나타낸다.
>
> 포닉스는 PPC에 참가하는 팀들을 위해 문자열 S로 대회장을 장식하려 한다. 포닉스는 대회 전, S에 다음과 같은 연산을 최대 K번 시행할 수 있다.
>
> -  1≤i<j≤N인 두 정수 i, j를 골라 Si와 Sj를 바꾼다.
>
> 포닉스의 목표는 완성된 문자열 S에 **PPC 부분문자열**이 가장 많게 하는 것이다. **PPC 부분문자열**의 개수란, 1≤i<j<k≤N이고 Si=Sj= `P`, Sk= `C`인 (i,j,k)의 개수를 의미한다.
>
> 포닉스가 만들 수 있는 **PPC 부분문자열**의 개수의 최댓값을 구하여라.
>
> ## 입력
>
> 첫 번째 줄에 문자열 S의 길이 N과 연산의 최대 사용 횟수 K가 공백으로 구분되어 주어진다. (1≤K≤N≤200000)
>
> 두 번째 줄에 길이가 N인 문자열 S가 주어진다. S는 알파벳 대문자 `C`와 `P`만으로 이루어져 있음이 보장된다.
>
> ## 해설
>
> 처음 보았을때는 그리디한 접근으로 문자열을 정리한 후, 정리한 문자열에서 PPC가 만들어지는 개수를 구하려고 했다.
>
> > 문제의 조건에서 보면 딱 달라붙는 것이 아닌, 부분적으로 가능하다면 개수를 치기때문에 최대한 개수를 많이 만들게하려면 PP뒤에 최대한 많은 C를 두는 것이 좋다. 그리고 P또한 최대한 앞에 있어야 C를 뒤에 많이 둘 수 있다. 즉, P는 최대한 앞으로, C는 최대한 뒤쪽으로 보내면 되는 것이라 생각했다.
> >
> > ```
> > CCCPPCP => PPPCCCC
> > ```
> >
> > 입력을 받을때 C의 위치를 오름차순으로, P의 위치는 내림차순으로 우선순위를 두어 가장 앞쪽에 있는 C를 가장 뒤쪽에 있는 P와 바꾸고자 했다.
> >
> > 만약 이미 P와 C가 각각 앞과 뒤쪽에 모두 모여 있다면 굳이 바꿀 필요가 없으므로 (문제는 최대 변경 연산이라 하였으므로 필요한 만큼만 하면 된다.) 그때부턴 변경을 종료한다.
>
> 이제 자리를 모두 바꾸었으니 PPC가 만들어지는 개수를 구해야한다.
>
> >  N이 최대 20만개이므로, 단순히 순회하여 PPC의 개수를 구하기는 어려울 것이다. 따라서 누적합을 이용하기로 했다. 뒤에서부터 순회하여 누적해오며 현재 위치를 포함하여 뒤쪽에 C가 얼마나 있는지를 기록해둔다.
> >
> > ```
> > PPPCCCC
> > 4444321
> > ```
> >
> >   이제 이전에 사용했던 P를 내림차순으로 정리한 우선순위 큐를 이용하여 값을 구하고자 했다. 가장 우선순위가 높은 P는 가장 뒤쪽에 있는 P이다. 그렇다면 해당 P는 자신보다 이전에 있는 P모두와 결합하여 현재 자신의 위치에 기록된 C의 누적 개수만큼 PPC를 만들어낼 수 있다는 것이다.
> >
> > 따라서 내림차순으로 정렬된 P를 하나씩 꺼내어 `현재 P의 위치에 기록된 C의 누적 합 * 현재 P의 이전의 P의 개수`가 해당 P에서 구할 수 있는 최대의  PPC 개수인 것이다. 이때 **현재 P의 이전의 P의 개수는 P를 담는 우선순위큐의 개수와 같다. (내림차순으로 정렬하였으니 본인을 빼면 모두 자신보다 이전에 있는 P이기 때문)** 따라서 해당 값들을 곱하여 result에 더하면 값을 구할 수 있었다.
>
> 위와 같이 문제를 풀고 제출하였는데, 틀렸습니다가 바로 나왔다... 음... 솔직히 문제를 푸는 로직 자체는 꽤 자신이 있었기 때문에 의문을 가졌다. 실제로 계속해서 반례를 만들어 넣어봐도 전부 다 맞았기 때문도 있었다. 초기에 result 를 longlong으로 선언하기는 했었고, `현재 P의 위치에 기록된 C의 누적 합 * 현재 P의 이전의 P의 개수`가 int의 범위형을 벗어날 것 같지 않아서 그냥 int로 연산하게 두었었는데... 흠... 뭔가 이쪽이 문제가 아닐까 싶어 10만개의 테스트케이스를 만들어 돌려보았다.
>
> 그러니까 왠걸 결과 값이 이상하게 나왔다. 그래서 바로 위의 2개의 변수를 long long 자료형으로 만드니까 정답처리 되었다. 이는 계산 미스였다... int 자료형이 약 21억 정도까지는 커버가 가능했는데.... 결과 값이 최대 10억까지 나온다고 계산을 잘못했다.. ㅠㅠㅠ 실제로는 100억까지 나오는 경우였고 오버플로우가 발생할 수 밖에 없었던 것이다... 자료형 계산으로 틀리는게 너무 뼈아픈데.... 흠................... 앞으로 계속 최악의 경우의 크기를 연산하는 실력을 늘려야겠다....
