# 코드

```c++
#include <iostream>
#include <vector>

using namespace std;

int N, M;
vector<vector<int> > can_solve(10);
int result = 11;
vector<int> solve_people(11, 0), visited(10, 0);


bool is_over()
{
    for (int i=1; i<=N; ++i) {
        if (!solve_people[i]) return false;
    }
    return true;
}


void match_team(int depth, int idx)
{
    if (is_over()) {
        result = min(result, depth);
        return;
    }
    
    if (depth + 1 < result) {
        for (int i=idx; i<=M; ++i) {
            if (visited[i] == 0) {
                visited[i] = 1;
                for (int a : can_solve[i]) {
                    solve_people[a]++;
                }
                match_team(depth + 1, i + 1);
                for (int a : can_solve[i]) {
                    solve_people[a]--;
                }
                visited[i] = 0;
            }
        }
    }
    
    return;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M;
    int num, solve;
    for (int i=0; i<M; ++i) {
        cin >> num;
        for (int j=0; j<num; ++j) {
            cin >> solve;
            can_solve[i].push_back(solve);
        }
    }
    
    match_team(0, 0);
    
    if (result == 11) cout << -1;
    else cout << result;

    return 0;
}

```

> ## 문제
>
> 2015년 11월 28일은 기다리고 기다리던 제1회 IUPC가 열리는 날이다. IUPC는 Inha University Programming Contest의 약자로 인하대학교 IT공대 학부생이면 누구나 참여할 수 있는 프로그래밍 경시대회이다. 
>
> IUPC의 총상금은 무려 110억 원이나 되며 고급스러운 점심과 많은 다과가 제공되어 참가자들이 대회에 집중할 수 있도록 최적의 환경을 제공한다. 그중 참가자들을 진정 열광시키는 것은 수많은 팀에게 추첨을 통해 문화상품권을 나눠준다는 점이다.
>
> 컴퓨터정보공학과에 재학 중인 강호는 대회에 참가하기 위해 팀원을 모집하려고 한다. IUPC가 여타 많은 대회와 다른 점이 있다면 문제의 수가 많고 팀원의 수가 무제한이라는 것이다. IUPC에서 모든 문제를 다 풀어 우승한 뒤 엄청난 부와 명예를 챙기고 싶은 강호는 모든 문제를 풀 수 있는 팀을 만들고 싶어 한다. 하지만 팀원의 수가 많으면 많을수록 자신에게 돌아오는 상금이 적어지기 때문에 최소한의 팀원으로 대회를 우승하고 싶어 한다.
>
> 강호가 선택할 수 있는 팀원의 목록과 각각의 팀원들이 해결할 수 있는 문제의 번호들이 주어졌을 때 강호가 IUPC에서 최소한의 팀원으로 모든 문제를 다 풀어 우승할 수 있도록 팀을 만들어보자.
>
> ## 입력
> 
> 첫 번째 줄에 문제의 수 N과 강호가 팀원으로 고를 수 있는 학생들의 수 M이 공백을 구분으로 차례대로 주어진다. N과 M은 1이상 10이하의 자연수이다.
> 
> 두 번째 줄부터 M개의 줄에 차례대로 i(1 ≤ i ≤ M)번 학생들이 풀 수 있는 문제의 개수 Oi와 i번 학생이 풀 수 있는 문제의 번호 Pij(1 ≤ j ≤ Oi, 1 ≤ Pij ≤ N)가 Oi개 주어진다.
> 
> ## 출력
> 
> 모든 문제를 풀 수 있으면서 팀원의 수가 가장 적은 팀을 구해 팀원의 수를 출력한다. 만약 모든 문제를 풀 수 있는 팀을 만들 수 없다면 -1을 출력한다,
>   
> ##  해설
>
> 처음 문제를 봤을 때 조합을 이용한 브루트포스를 떠올렸다.
>
> 문제의 조건에서 학생들의 수도 10개, 문제의 개수도 10개 정도이기 때문에 조합을 이용해 가능한 개수를 찾으면 가능할 것이라고 생각했다.
>
> >1. 현재 N개의 문제를 풀 수 있는지 여부를 판단할 배열 solve_people을 선언한다.
>>
> >   최소 인원의 수를 담을 변수 result를 11로 선언한다(최대 인원이 10명이기 때문)
> >
> >2. 재귀를 돌면서 모든 경우의 조합을 확인한다.
>>
> >   > 1. 재귀 함수를 호출하면 solve_people을 이용해 모든 문제에 인원이 1명 이상 배치되어 있는지 확인한다. 만약 모든 문제에 인원이 있다면 현재 result값과 비교하여 더 낮은 값을 기록한다.
>>   > 2. 현재 result에 적힌 값이 현재 인원 수 + 1보다 작다면 이 이후로는 현재보다 더 나은 경우가 발생할 수 없으므로 return한다.
> >   > 3. 1, 2의 경우를 모두 넘겼다면 0 ~ M - 1의 인원중 고를 수 있는 인원을 고른다.
>>   >    1. 해당 인원이 풀 수 있는 문제에 인원수를 1씩 더하고 재귀함수를 호출하고, 방문처리를 체크한다.
> >   >    2. 재귀함수 호출에서 돌아오면 해당 인원이 풀 수 있던 문제에 인원을 1씩 빼고 방문처리를 체크해제한다.
>>
> >3. 첫 재귀 함수 호출이 반환되면 result에 적힌 값을 반환한다.
>>
> 위와 같은 방법으로 문제를 풀었다. 문제를 딱 처음 봤을 때 인원과 문제의 수가 아주 적어서 바로 브루트포스로 시도해보았는데 바로 맞아서 기분이 좋다! 앞으로도 문제를 잘 파악하고 풀 수 있는 실력을 갖추도록 노력해야겠다.
