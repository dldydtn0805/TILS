# 코드

```c++
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int N;
vector<vector<char> > board;

void draw_star(int depth, int x, int y)
{
    if (depth == 1) {
        for (int i=0; i<3; ++i) {
            for (int j=0; j<3; ++j) {
                if (i == 1 && j == 1) {
                    continue;
                }
                board[i+x][j+y] = '*';
            }
        }
        return;
    }
    else {
        int next_powpow = pow(3, depth - 1);
        for (int i=0; i<3; ++i) {
            for (int j=0; j<3; ++j) {
                if (i == 1 && j == 1) {
                    continue;
                }
                draw_star(depth - 1, x + (next_powpow * i), y + (next_powpow * j));
            }
        }
        return;
    }
}

int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N;
    board.resize(N, vector<char>(N, ' '));
    
    int powpow = 0;
    int tmp = N;
    while (tmp != 1) {
        tmp /= 3;
        powpow++;
    }
    
    draw_star(powpow, 0, 0);
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<N; ++j) {
            cout << board[i][j];
        }
        cout << "\n";
    }

    return 0;
}
```

> ## 문제
>
> 재귀적인 패턴으로 별을 찍어 보자. N이 3의 거듭제곱(3, 9, 27, ...)이라고 할 때, 크기 N의 패턴은 N×N 정사각형 모양이다.
>
> 크기 3의 패턴은 가운데에 공백이 있고, 가운데를 제외한 모든 칸에 별이 하나씩 있는 패턴이다.
>
> ```
> ***
> * *
> ***
> ```
>
> N이 3보다 클 경우, 크기 N의 패턴은 공백으로 채워진 가운데의 (N/3)×(N/3) 정사각형을 크기 N/3의 패턴으로 둘러싼 형태이다. 예를 들어 크기 27의 패턴은 예제 출력 1과 같다.
>
> ## 입력
>
> 첫째 줄에 N이 주어진다. N은 3의 거듭제곱이다. 즉 어떤 정수 k에 대해 N=3k이며, 이때 1 ≤ k < 8이다.
>
> ## 출력
>
> 첫째 줄부터 N번째 줄까지 별을 출력한다.
>
> ## 해설
>
> 처음 문제를 봤을때 재귀를 떠올렸다. 단순히 구현의 시점으로 보면 매우 어렵고 모든 경우에 대해서 가운데를 비우고 나머지를 그린다는 점이 똑같기 때문에 재귀로 풀면 수월할 것이라 생각했다.
>
> 주어지는 N에 대해 N*N의 2차원 배열을 만들고 ' '로 초기화한다. 그리고 N이 3^k라는 조건에서 K의 값을 구한다.
>
> 그리고 이 값을 깊이로 이용하여 재귀를 돌린다.
>
> 매 재귀함수에서는 주어지는 인자인 depth가 1이 아니면 계속해서 재귀를 들어간다.
>
> > - 3*3의 반복문을 수행한다. 단, (1, 1)의 경우는 건너뛴다.
> >
> > - 주어진 좌표 (x, y)에 대하여 i * (depth - 1) 값을 더하여 현재 depth에서 3*3으로 나눈 좌표를 구한다.
> >
> >   그리고 해당 좌표값과 depth - 1을 인자로 재귀를 내려보낸다.
>
> 만약 depth가 1이라면 별을 그린다.
>
> > - 3*3의 반복문을 수행한다. 단, (1, 1)의 경우는 건너뛴다.
> > - 인자로 받은 좌표(x, y)에 대하여 2차원 배열의 좌표(x+i, y+j)에 '*'을 기록한다.
>
> 위의 방식 이후 모든 값을 출력해주면 되었다!
>
> 이전에 비슷한 문제에서 재귀를 쓰지 않고 푸려다가 머리에 과부하가 올정도로 어려워 했던 기억이 있는데 다시 비슷한걸 풀때는 금방 해결할 수 있어서 기분이 좋다! 다음에도 수월하게 가자! 
