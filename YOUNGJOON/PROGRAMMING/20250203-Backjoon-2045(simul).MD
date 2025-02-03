# 코드

```c++
#include <iostream>
#include <vector>
#include <map>

#define pll pair<int, int>

using namespace std;

vector<vector<int> > board(3, vector<int>(3, 0));

int main()
{
    int num;
    
    map<pll, int> zeros;
    vector<pll> z_idx;
    
    for (int i=0; i<3; ++i) {
        for (int j=0; j<3; ++j) {
            cin >> num;
            board[i][j] = num;
            if (num == 0) z_idx.push_back({i, j});
        }
    }
    
    int basic = 0;
    
    for (int i=0; i<3; ++i) {
        int col = 0; int low = 0; int c_zero = 0; int l_zero = 0;
        pll c_p, l_p;
        for (int j=0; j<3; ++j) {
            if (board[j][i] != 0) col += board[j][i];
            else {
                c_zero++; 
                c_p = {j, i};
            }
            if (board[i][j] != 0) low += board[i][j];
            else {
                l_zero++;
                l_p = {i, j};
            }
        }
        if (c_zero == 0) basic = col;
        else if (c_zero == 1) zeros[c_p] = col;
        
        if (l_zero == 0) basic = low;
        else if (l_zero == 1) zeros[l_p] = low;
    }
    
    int left = 0; int right = 0; int le_zero = 0; int r_zero = 0;
    pll ri_p, le_p;
    for (int i=0; i<3; ++i) {
        if (board[i][i] != 0) left += board[i][i];
        else {
            le_zero++;
            le_p = {i, i};
        }
        if (board[i][2 - i] != 0) right += board[i][2 - i];
        else {
            r_zero++;
            ri_p = {i, 2 - i};
        }
    }
    
    if (le_zero == 0) basic = left;
    else if (le_zero == 1) zeros[le_p] = left;
    
    if (r_zero == 0) basic = right;
    else if (r_zero == 1) zeros[ri_p] = right;
    
    if (basic != 0) {
        for (int i=0; i<3; ++i) {
            for (int j=0; j<3; ++j) {
                if (board[i][j] == 0) board[i][j] = basic - zeros[{i, j}];
            }
        }
    }
    else {
        int xy = zeros[z_idx[2]];
        int xz = zeros[z_idx[1]];
        int yz = zeros[z_idx[0]];
        
        int x = (xy + xz - yz) / 2;
        int y = xy - x;
        int z = yz - y;
        
        board[z_idx[0].first][z_idx[0].second] = x;
        board[z_idx[1].first][z_idx[1].second] = y;
        board[z_idx[2].first][z_idx[2].second] = z;
    }
    
    for (int i=0; i<3; ++i) {
        for (int j=0; j<3; ++j) {
            cout << board[i][j] << " ";
        }
        cout << "\n";
    }

    return 0;
}

```



> ## 문제
>
> 3 by 3 크기의 마방진을 생각하자. 마방진이란 가로, 세로, 대각선 위의 수들의 합이 모두 같은 성질을 가지고 있다. 몇 가지 마방진을 예로 들면 다음과 같다.
>
> ![img](https://www.acmicpc.net/JudgeOnline/upload/201007/mbj.png)
>
> 생일빵을 맞은 정신을 잃은 동주와 세준이는 실수로 마방진에서 몇 개의 수를 지워 버리고야 말았다. 불쌍한 동주와 세준이를 도와, 마방진을 다시 완성해 보자. 마방진을 이루는 수들은 모두 20,000을 넘지 않는 자연수이다.
>
> ## 입력
>
> 첫째 줄부터 셋째 줄까지 마방진을 이루는 아홉 개의 수가 각 줄에 세 개씩 주어진다. 입력되는 수들 사이에는 빈 칸이 있으며, 지워진 수는 0으로 입력된다. 0의 개수는 3개 이하이다.
>
> ## 해설
>
> 문제를 잘 살펴보니 0은 최대 3개까지만 주어진다고 하였다 0이 1~2개는 반드시 1줄 정도는 온전하게 유지되기 때문에 해당 값에 맞추어서 값을 구하면 된다고 생각했다. 
>
> ```
> 8 1 0
> 3 0 7
> 0 9 2
> ```
>
> 위와 같이 3개의 0이 존재하며 대각선으로 이루어져 있다면 어떠한 경우에도 0이 없는 한 줄을 완성할 수 가 없다 이렇게되면 미지수 3개에 대한 값을 반드시 구해야하는데 계속보다보니 흥미로운 특징을 찾았다.
>
> ```
> 0 0 4
> 0 4 4
> 4 4 4
> ```
>
> 위와 같은 예제나 다른 예제들을 봐도 0이 최대 3개이면 어떻게든 `숫자 + 숫자 + 미지수`가 완성된다는 것이다. 이점을 이용하여 한줄이 완성되지 못하는 경우에는 방정식을 이용해 미지수들을 구하기로 했다.
>
> > 1. 먼저 발생할 수 있는 모든 라인의 값들을 찾는다 (세로 3줄, 가로 3줄, 대각선 2줄)
> >
> >    해당 라인들의 값을 구할때 0이 1개도 들어가지 않았다면 변수에 저장해준다.
> >
> >    만약 라인에 0이 1개 들어갔다면 이는 방정식에 쓰일 값으로 따로 저장해두었다.
> >
> > 2. 0이 없이 완성된 라인이 있다면 해당 값을 이용해 나머지 미지수 값을 찾는다.
> >
> >    각각 0을 위에서 찾는 순서대로 x, y, z라고 생각한다. 그리고 기록해두었던 값은 `숫자 + 숫자 + 미지수`이기 때문에 즉 `미지수 + 기록된 값 = 0이 없이 완성된 라인의 합`이 된다. 따라서 간단하게 이항하여 각각의 미지수 값들을 구해주면 된다.
> >
> > 3. 만약 0이 없이 완성된 라인이 없다면 `숫자 + 숫자 + 미지수`의 값을 이용해 미지수들의 값을 구한다.
> >
> >    > 1. `x + y + z = 숫자 + 숫자 + 미지수`가 만족하는 조건을 이용해 {x+y}, {y+z}, {x+z}의 값들을 구한다.
> >    > 2. {x+y} + {x+z} - {y+z} = 2x이기 때문에 1에서 구한 값을 이용하여 x의 값을 찾는다.
> >    > 3. 1에서 구한 식에 2에서 구한 x값을 더해 나머지 y, z의 값을 찾는다.
> >
> > 4. 구한 x, y, z의 값을 2차원 배열의 알맞은 위치에 기록하고 해당 2차원 배열을 출력한다.
>
> 왠일로 바로 구상한 방식이 맞았다! 기분이 정말 좋다고 해야하나... 근데 구상 당시에는 대각선 라인의 값을 구하는것도 적어야지하고 생각했다가 막상 제출할때는 해당 코드를 작성하지 않아서 틀렸다.. 이게 무슨 실수인지 모르겠다 곧 코테인데 정신을 똑바로 차리고 풀도록하자... 
