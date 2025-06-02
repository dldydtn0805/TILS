# 코드

```c++
#include <iostream>
#include <vector>

using namespace std;

vector<vector<int> > board(7, vector<int>(3, 0));

void is_possible(vector<vector<int> >& connected, int& result, int depth, int idx, int cnt, int draw_idx, int draw_cnt)
{
    if (depth == 6) {
        for (int i=0; i<6; ++i) {
            for (int j=0; j<3; ++j) {
                if (board[i][j] != 0) return;
            }
        }
        result = 1;
        return;
    }
    
    if (cnt > 0) {
        for (int i=idx; i<6; ++i) {
            if (i != depth && connected[depth][i] == 0 && board[i][2] > 0) {
                connected[depth][i] = 1; connected[i][depth] = 1;
                board[i][2]--;
                board[depth][0]--;
                is_possible(connected, result, depth, i + 1, cnt - 1, draw_idx, draw_cnt);
                connected[depth][i] = 0; connected[i][depth] = 0;
                board[i][2]++;
                board[depth][0]++;
            }
        }
    }
    
    if (cnt == 0 && draw_cnt > 0) {
        for (int i=draw_idx; i<6; ++i) {
            if (i != depth && connected[depth][i] == 0 && board[i][1] > 0) {
                connected[depth][i] = 1; connected[i][depth] = 1;
                board[i][1]--;
                board[depth][1]--;
                is_possible(connected, result, depth, idx, cnt, i, draw_cnt - 1);
                connected[depth][i] = 0; connected[i][depth] = 0;
                board[i][1]++;
                board[depth][1]++;
            }
        }
    }
    
    if (cnt == 0 && draw_cnt == 0) {
        is_possible(connected, result, depth + 1, 0, board[depth + 1][0], 0, board[depth + 1][1]);
    }
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    
    for (int t=0; t<4; ++t) {
        vector<vector<int> > connected(6, vector<int>(6, 0));
        int result = 0, wins = 0, loses = 0;
        bool is_collect = true;
        for (int i=0; i<6; ++i) {
            for (int j=0; j<3; ++j) {
                cin >> board[i][j];
                if (j == 0) wins += board[i][j];
                if (j == 2) loses += board[i][j];
            }
        }
        
        for (int i=0; i<6; ++i) {
            if (board[i][0] + board[i][1] + board[i][2] != 5) {
                is_collect = false;
                break;
            }
        }
        
        if (wins != loses) is_collect = false;
        
        if (is_collect) is_possible(connected, result, 0, 0, board[0][0], 0, board[0][1]);
        
        cout << result << " ";
        
    }

    return 0;
}

```

> ## 문제
>
> 월드컵 조별 최종 예선에서는 6개국으로 구성된 각 조별로 동일한 조에 소속된 국가들과 한 번씩, 각 국가별로 총 5번의 경기를 치른다. 조별리그가 끝난 후, 기자가 보내온 각 나라의 승, 무승부, 패의 수가 가능한 결과인지를 판별하려고 한다. 다음은 가능한 결과와 가능하지 않은 결과의 예이다.
>
> | 나라승무패A500B302C203D005E401F104 | 나라승무패A410B302C410D113E005F113 | 나라승무패A500B401C221D203E104F005 | 나라승무패A500B311C211D203E005F104 |
>| :--------------------------------: | :--------------------------------: | :--------------------------------: | :--------------------------------: |
> |         예제 1 가능한 결과         |         예제 2 가능한 결과         |        예제 3 불가능한 결과        |        예제 4 불가능한 결과        |
>
> 네 가지의 결과가 주어질 때 각각의 결과에 대하여 가능하면 1, 불가능하면 0을 출력하는 프로그램을 작성하시오.
> 
> ## 입력
> 
> 첫째 줄부터 넷째 줄까지 각 줄마다 6개국의 결과가 나라별로 승, 무승부, 패의 순서로 빈칸을 하나 사이에 두고 18개의 숫자로 주어진다. 승, 무, 패의 수는 6보다 작거나 같은 자연수 또는 0이다.
>
> ## 출력
>
> 입력에서 주어진 네 가지 결과에 대하여 가능한 결과는 1, 불가능한 결과는 0을 빈칸을 하나 사이에 두고 출력한다.
>
> ## 해설
> 
> 처음 문제를 봤을 때 그리디한 방식으로 풀려고 했다.
> 
> > 1. 패가 가장 적은 나라부터 선택한다. 해당 패를 승의 수가 가장 많은 나라를 우선으로하여 승과 패를 짝지어준다.
> > 2. 승과 패를 모두 짝지었다면 나머지 무승부도 짝지어준다.
>
> 이런식으로 하려 했으나 몇가지 반례에 적용시켜보니 보장이 안된다는 느낌을 받았다. 우선적으로 어떤 나라에서 한 나라에 대해 경기를 단 한 번 밖에 진행하지 못하고, 패와 승을 먼저 처리했다가 무승부를 처리하면 무승부를 옳게 매칭 시킬수 없을 확률이 있었다.
>
> 결국 조합을 이용한 브루트 포스를 해야하나 고민하던 중 확신이 없어 헤매다가 분류를 보고 확신을 얻어 브루트 포스로 진행했다.
> 
> 재귀를 이용해 모든 조합을 구하고 주어진 경우와 똑같은 경우가 있는지 확인하는 방법으로 진행하기로 했다.
> 
> > 1. 주어지는 현황을 입력받는다. 이후 먼저 현재 승과 패의 짝이 맞는지, 모든 나라의 경기 수가 5개가 맞는지 확인한다. 만약 아니라면 0을 출력한다.
> >
>>> 2. 재귀를 이용해 모든 조합의 경우를 따져보기로 한다.
> >
>>>    인자로는 
> >
> >    - 현재 연결 여부를 판단하는 2차원 배열
> >    - 결과값을 가지는 result, 현재 나라의 번호를 나타내는 depth
> >    - 현재 나라와 대결할 나라의 범위를 정할 idx
> >    - 현재 승리의 개수를 나타내는 cnt
> >    - 현재 나라와 무숭부 처리할 나라의 범위를 정할 draw_idx
>>    - 현재 무승부 개수를 나타내는 draw_cnt를 인자로한다.
> >
>> 3. 0번 나라부터 재귀를 시작한다.
> >
> >    > 1. 현재 나라의 승리 개수가 만족할 때까지 패배할 나라를 재귀를 통해 정한다. 이때 board에 적힌 승리와 패배값을 사용한 상태에 맞게 갱신한다.
> >    > 2. 현재 나라의 승리 개수가 0개(cnt = 0)가 된다면 현재 나라의 무승부 개수가 0이 될 때까지 무승부할 나라를 재귀를 통해 정한다. 이때 board에 적힌 무승부의 값을 사용한 상태에 맞게 갱신한다.
> >    > 3. 만약 1, 2 진행 중 연결관계와 같은 이슈로 더 이상 선택할 나라가 없다면 return한다.
> >    > 4. 3의 경우가 아닌 cnt =0, draw_cnt=0이 만족했다면 나라의 번호를 1개 올려 해당 나라의 승리 수와 무승부수를 각각 cnt와 draw_cnt 값으로 하여 재귀를 보낸다.
> >    > 5. 만약 1~4를 거쳐 최종적으로 depth = 6이 된다면 0~5번의 6개의 나라를 모두 보았다는 뜻이므로 이때 모든 board의 값이 0이 되었다면 result를 1로 하고 return 한다.
>>
> > 4. 모든 재귀가 끝났을 때 result의 값을 출력한다.
>
> 위와 같은 방식으로 문제를 풀었다. 재귀를 할때 평소에는 조합을 하나의 인자를 기준으로 짰었는데 이번에는 depth와 cnt, draw_cnt를 이용해 재귀를 해서 잘 돌아갈까 짜면서 의구심이 들었는데 잘 돌아가서 만족스러웠다! 새로운 시도로 문제를 풀어보아서 좋은 경험이 되었던 것 같다!
