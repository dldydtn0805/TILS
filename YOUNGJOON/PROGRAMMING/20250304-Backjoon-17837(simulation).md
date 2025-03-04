# 코드

```c++
#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>

#define pll pair<int, int>

using namespace std;

int N, K;
vector<vector<int> > board;
vector<vector<vector<int> > > stack_board;

vector<pll> direction = {{0, 0}, {0, 1}, {0, -1}, {-1, 0}, {1, 0}};
unordered_map<int, pll> my_pawns;
unordered_map<int, int> pawn_dir, pawn_idx;
map<vector<pair<int, pll> >, int> previous;
int play_time = 1;

void change_dir(int a)
{
    if (pawn_dir[a] == 1) {
        pawn_dir[a] = 2;
    }
    else if (pawn_dir[a] == 2) {
        pawn_dir[a] = 1;
    }
    else if (pawn_dir[a] == 3) {
        pawn_dir[a] = 4;
    }
    else if (pawn_dir[a] == 4) {
        pawn_dir[a] = 3;
    }
    
    return;
}

int move_pawn(int loca, pll now_pawns, int nx, int ny, bool is_blue, vector<int>& up_on_the_pawn)
{
    if (0 <= nx && nx < N && 0 <= ny && ny < N) {
        if (board[nx][ny] == 0) {
            int now_size = up_on_the_pawn.size();
            for (int a=now_size - 1; a>=0; --a) {
                my_pawns[up_on_the_pawn[a]] = {nx, ny};
                stack_board[nx][ny].push_back(up_on_the_pawn[a]);
                pawn_idx[up_on_the_pawn[a]] = stack_board[nx][ny].size() - 1;
                if (stack_board[nx][ny].size() >= 4) {
                    return play_time;
                }
            }
        }
        else if (board[nx][ny] == 1) {
            for (int a : up_on_the_pawn) {
                my_pawns[a] = {nx, ny};
                stack_board[nx][ny].push_back(a);
                pawn_idx[a] = stack_board[nx][ny].size() - 1;
                if (stack_board[nx][ny].size() >= 4) {
                    return play_time;
                }
            }
        }
        else {
            if (is_blue != true) {
                change_dir(loca);
                int nnx = now_pawns.first + direction[pawn_dir[loca]].first;
                int nny = now_pawns.second + direction[pawn_dir[loca]].second;
                int tr = move_pawn(loca, now_pawns, nnx, nny, true, up_on_the_pawn);
                return tr;
            }
            else {
                int upper_size = up_on_the_pawn.size();
                for (int i=upper_size - 1; i>=0; --i) {
                    stack_board[now_pawns.first][now_pawns.second].push_back(up_on_the_pawn[i]);
                }
            }
        }
    }
    else {
        if (is_blue != true) {
            change_dir(loca);
            int nnx = now_pawns.first + direction[pawn_dir[loca]].first;
            int nny = now_pawns.second + direction[pawn_dir[loca]].second;
            int tr = move_pawn(loca, now_pawns, nnx, nny, true, up_on_the_pawn);
            return tr;
        }
        else {
            int upper_size = up_on_the_pawn.size();
            for (int i=upper_size - 1; i>=0; --i) {
                stack_board[now_pawns.first][now_pawns.second].push_back(up_on_the_pawn[i]);
            }
        }
    }
    
    return -1;
}

int lets_play()
{
    while (play_time <= 1000) {
        vector<pair<int, pll> > tmp;
        
        for (int i=1; i<=K; ++i) {
            pll now_pawns = my_pawns[i];
            vector<int> up_on_the_pawn;
            int area_size = stack_board[now_pawns.first][now_pawns.second].size();
            while (area_size - 1 >= pawn_idx[i]) {
                up_on_the_pawn.push_back(stack_board[now_pawns.first][now_pawns.second][area_size - 1]);
                stack_board[now_pawns.first][now_pawns.second].pop_back();
                area_size--;
            }
            
            int nx = now_pawns.first + direction[pawn_dir[i]].first;
            int ny = now_pawns.second + direction[pawn_dir[i]].second;
            
            int tmp_result = move_pawn(i, now_pawns, nx, ny, false, up_on_the_pawn);
            
            if (tmp_result != -1) {
                return tmp_result;
            }
            
            // for (int i=0; i<N; ++i) {
            //     for (int j=0; j<N; ++j) {
            //         cout << stack_board[i][j].size() << " ";
            //     }
            //     cout << "\n";
            // }
            // cout << "\n";
            
        }
        
        // cout << "--------------\n";
        
        for (int i=1; i<=K; ++i) {
            tmp.push_back({pawn_dir[i], {my_pawns[i].first, my_pawns[i].second}});
            // cout << "나는 " << i << "이고 내 방향은 " << pawn_dir[i] <<"이고 내위치는 " << my_pawns[i].first << " " << my_pawns[i].second << "야\n";
        }
        
        if (previous.find(tmp) != previous.end()) {
            return -1;
        }
        else {
            previous[tmp] = 1;
        }
        play_time++;
    }
    
    return -1;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    
    cin >> N >> K;
    board.resize(N, vector<int>(N, 0));
    stack_board.resize(N, vector<vector<int> >(N, vector<int>()));
    int num, x, y, dir;
    
    for (int i=0; i<N; ++i) {
        for (int j=0; j<N; ++j) {
            cin >> num;
            board[i][j] = num;
        }
    }
    
    vector<pair<int, pll> > first_time;
    
    for (int i=1; i<=K; ++i) {
        cin >> x >> y >> dir;
        my_pawns[i] = {x - 1, y - 1};
        pawn_dir[i] = dir;
        pawn_idx[i] = 0;
        stack_board[x - 1][y - 1].push_back(i);
        first_time.push_back({dir, {x - 1, y - 1}});
    }
    previous[first_time] = 1;
    
    cout << lets_play();

    return 0;
}

```



> ## 문제
>
> 재현이는 주변을 살펴보던 중 체스판과 말을 이용해서 새로운 게임을 만들기로 했다. 새로운 게임은 크기가 N×N인 체스판에서 진행되고, 사용하는 말의 개수는 K개이다. 말은 원판모양이고, 하나의 말 위에 다른 말을 올릴 수 있다. 체스판의 각 칸은 흰색, 빨간색, 파란색 중 하나로 색칠되어있다.
>
> 게임은 체스판 위에 말 K개를 놓고 시작한다. 말은 1번부터 K번까지 번호가 매겨져 있고, 이동 방향도 미리 정해져 있다. 이동 방향은 위, 아래, 왼쪽, 오른쪽 4가지 중 하나이다.
>
> 턴 한 번은 1번 말부터 K번 말까지 순서대로 이동시키는 것이다. 한 말이 이동할 때 위에 올려져 있는 말도 함께 이동한다. 말의 이동 방향에 있는 칸에 따라서 말의 이동이 다르며 아래와 같다. 턴이 진행되던 중에 말이 4개 이상 쌓이는 순간 게임이 종료된다.
>
> - A번 말이 이동하려는 칸이
>   - 흰색인 경우에는 그 칸으로 이동한다. 이동하려는 칸에 말이 이미 있는 경우에는 가장 위에 A번 말을 올려놓는다.
>     - A번 말의 위에 다른 말이 있는 경우에는 A번 말과 위에 있는 모든 말이 이동한다.
>     - 예를 들어, A, B, C로 쌓여있고, 이동하려는 칸에 D, E가 있는 경우에는 A번 말이 이동한 후에는 D, E, A, B, C가 된다.
>   - 빨간색인 경우에는 이동한 후에 A번 말과 그 위에 있는 모든 말의 쌓여있는 순서를 반대로 바꾼다.
>     - A, B, C가 이동하고, 이동하려는 칸에 말이 없는 경우에는 C, B, A가 된다.
>     - A, D, F, G가 이동하고, 이동하려는 칸에 말이 E, C, B로 있는 경우에는 E, C, B, G, F, D, A가 된다.
>   - 파란색인 경우에는 A번 말의 이동 방향을 반대로 하고 한 칸 이동한다. 방향을 반대로 바꾼 후에 이동하려는 칸이 파란색인 경우에는 이동하지 않고 가만히 있는다.
>   - 체스판을 벗어나는 경우에는 파란색과 같은 경우이다.
>
> 다음은 크기가 4×4인 체스판 위에 말이 4개 있는 경우이다.
>
> ![img](https://upload.acmicpc.net/0aec7e3d-e8f5-428a-bebc-6a0fd514b387/-/preview/)
>
> 첫 번째 턴은 다음과 같이 진행된다.
>
> | ![img](https://upload.acmicpc.net/46796304-b486-4420-9d2c-ea49e2d5665b/-/preview/) | ![img](https://upload.acmicpc.net/04643ced-fdfd-46f5-a07e-374704dbb1c5/-/preview/) | ![img](https://upload.acmicpc.net/46f4bfab-841b-41c8-842e-56027816f846/-/preview/) | ![img](https://upload.acmicpc.net/fcccf76c-9431-4ff5-8a05-7dbd2feff142/-/preview/) |
> | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
> |                                                              |                                                              |                                                              |                                                              |
>
> 두 번째 턴은 다음과 같이 진행된다.
>
> | ![img](https://upload.acmicpc.net/36568153-8c2a-4fe9-b45f-72036c97f5aa/-/preview/) | ![img](https://upload.acmicpc.net/babead43-4acc-425d-917a-54dcc6f45414/-/preview/) | ![img](https://upload.acmicpc.net/1edd5ed8-0f4c-4c6d-b304-3b7642f42c6f/-/preview/) | ![img](https://upload.acmicpc.net/028a5dd2-5524-4475-8439-9e7794e28ee4/-/preview/) |
> | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
> |                                                              |                                                              |                                                              |                                                              |
>
> 체스판의 크기와 말의 위치, 이동 방향이 모두 주어졌을 때, 게임이 종료되는 턴의 번호를 구해보자.
>
> ## 입력
>
> 첫째 줄에 체스판의 크기 N, 말의 개수 K가 주어진다. 둘째 줄부터 N개의 줄에 체스판의 정보가 주어진다. 체스판의 정보는 정수로 이루어져 있고, 각 정수는 칸의 색을 의미한다. 0은 흰색, 1은 빨간색, 2는 파란색이다.
>
> 다음 K개의 줄에 말의 정보가 1번 말부터 순서대로 주어진다. 말의 정보는 세 개의 정수로 이루어져 있고, 순서대로 행, 열의 번호, 이동 방향이다. 행과 열의 번호는 1부터 시작하고, 이동 방향은 4보다 작거나 같은 자연수이고 1부터 순서대로 →, ←, ↑, ↓의 의미를 갖는다.
>
> 같은 칸에 말이 두 개 이상 있는 경우는 입력으로 주어지지 않는다.
>
> ## 해설
>
> 처음 보았을때는 주어지는 조건대로 구현하려고 했다. 턴이 1000번이 되기전까지 계속해서 주어진 방식으로 진행하면 된다고 생각했다.
>
> 단, 게임이 끝나는 조건인 절대로 게임이 끝나지 않는 조건은 이전에 만들어졌던 배치가 또 다시 만들어진다면 이는 무한 루프이므로 게임이 끝나지 않는다라는 조건으로 구현하기로 했다.
>
> 아래와 같은 순서대로 게임을 구현했다.
>
> > > 우선 각 체스말의 방향, 현재 위치, 자신의 위치에 몇번째로 쌓여있는지를 unordered_map을 각각 선언하여 저장해두었다. 배열 하나로 저장하기에는 한 배열에 여러가지 체스말이 순서대로 쌓여있어야 하기 때문에 다루기 어렵다고 생각했다. 
> > >
> > > 그리고 게임의 각 발판을 나타내는 2차원 배열과 현재 체스말들의 위치를 나타내는 2차원 배열을 선언하였다. 
> > >
> > > 그리고 처음 받은 위치들을 1번 체스말 부터 방향, 현재 행과 열의 위치를 저장하였다. 이는 추후 무한 루프가 발생하는지 확인하기 위해 map에다가 저장하였다. (처음에는 unordered_map을 이용하여 저장하려고 했으나, vector<pair<int, pll> >과 같은 인자에 대한 해시가 없기 때문에 이용하기가 어려웠다. 따라서 최대 1000개의 개수밖에 생기지 않아 map에서도 find()연산이 굳이 오래걸릴 것 같지 않아 map으로 이용하기로 하였다.)
> >
> > 0. 턴이 1000을 넘을때까지 반복한다.
> >
> > 1. 1번 폰 부터 마지막 폰까지 순서대로 이동을 시작한다. 현재 정해진 방향으로 이동하며 만약 현재 자신의 위에 쌓여있는 폰들이 있다면 같이 데리고 이동한다. (맨 뒤에서부터 자신의 인덱스까지 도달하기까지 모든 체스말들을 vector에 순서대로 넣는다.)
> >
> >    
> >
> >    1-1. 만약 이동하는 위치가 0번 발판이라면 현재 이동방향을 유지한채 위에 쌓여있는 폰들과 같이 이동한다. 기존 위치에서 자신과 쌓여있던 폰들을 제거하고 이동하는 위치에 vector의 반대 순서로 쌓는다. 이때, 체스말의 바뀐 인덱스 값을 갱신한다. (vector가 뒤에서부터 체스말을 저장했기 때문에 반대로 쌓는다.)
> >
> >    
> >
> >    1-2. 만약 이동하는 위치가 1번 발판이라면 현재 이동방향을 유지한채 위에 쌓여있는 폰들과 같이 이동한다. 기존 위치에서 자신과 쌓여있던 폰들을 제거하고 이동하는 위치에 vector의 순서대로 쌓는다. 이때, 체스말의 바뀐 인덱스 값을 갱신한다. (vector가 뒤에서부터 체스말을 저장했기 때문에 처음부터 순서대로 쌓는다.)
> >
> >    
> >
> >    1-3. 만약 이동하는 위치가 2번 발판이거나 체스판의 바깥이라면, 현재 이동방향을 역방향으로 바꾸고 다시 이동을 시도한다. 만약 바뀐 이동위치가 0번이나 1번 발판이라면 위의 1-1, 1-2의 방식을 적용하고 바뀐 이동위치까지 2번 발판이거나 체스판의 바깥이라면, 더 이상 아무것도 하지않고 제자리에 멈춘다. **이때 미리 꺼냈던 체스말들을 기존 순서가 틀어지지 않게 vector의 반대 순서로 쌓는다.  (vector가 뒤에서부터 체스말을 저장했기 때문에 반대로 쌓는다.) **
> >
> >    
> >
> > 2. 1의 반복중에 어떤 위치에서 체스말이 4개가 쌓인 경우가 발생한다면, 즉시 현재 턴 수를 반환하고 탈출한다.
> >
> >    
> >
> > 3. 1의 과정에서 모든 체스말의 이동이 끝나면 현재 만들어진 배치상황이 과거에 만들어진 적이 있는지 map에 find()연산을 이용해 확인한다. 만약 없다면 현재 배치상황을 map에 저장하고, 기존에 발생한 적 있는 배치상황이라면 즉시 탐색을 종료하고 -1을 반환한다.
> >
> >    
> >
> > 4. 1~3의 과정을 끝내면 턴의 수를 1늘려 다시 1~3의 과정을 반복하며 이를 1000턴이 넘을때까지 반복한다. 만약 1001턴이 될때까지 게임이 끝나지 않으면 -1을 반환한다.
>
> 위의 과정을 코드로 작성하여 제출하였더니 맞았다.
>
> 몇번 문제가 있었는데 아래에 서술하겠다.
>
> > 1. 기존의 위치에 저장된 체스말들을 이동하려는 체스말의 위쪽을 전부 떼어 이동하기
> >    - 이걸 처음에 현재 체스말의 인덱스 부터 vector의 끝까지 빼서 저장하고 현재 위치에서 .erase()를 이용하여 삭제하려고 했다. 그러나 무슨 이유에선지 삭제가 잘 이루어지지 않았고 그냥 stack에서 꺼내는 것 처럼 해당 값의 인덱스에 도달할 때까지 계속 빼내었다. 결과적으로 역순으로 빠졌기 때문에 위의 1-1과 1-2, 1-3에서 다시 저장할때 역순을 뒤바꾸어 구현하였다.
> > 2. 사라져버리는 체스말들
> >    - 호기롭게 제출했다가 4%에서 틀렸습니다를 받았는데 다른 반례들을 다 넣어보아도 값이 너무 잘 나왔다... 그래서 마지막 테스트케이스의 진행상황을 출력해준 예제가 있어서 이를 이용하기로 했다. 이를 출력해서 비교해보니 이상하게 체스말들이 사라지고 있었다 원인을 찾아보니 1-3의 경우가 2번 연속 발생했을때 그냥 함수를 탈출하였고 이때 미리 꺼내놓은 체스말을 담은 vector는 그냥 사라져버렸다. 이를 다시 현재 위치에 올바른 순서대로 다시 채워넣으니 체스말이 사라지는 경우가 없어져 정답처리 받을 수 있었다!
>
> 오랜만에 어려운 구현 문제를 풀었다...! 반례에서 조금 힌트를 얻었지만 구현자체는 어느정도 잘 된 것 같아서 만족은 하지만.... 구현 문제는 차분하게 순서대로 구현해야 빼먹는게 없는데 계속 이 함수를 하다가 갑자기 다른 함수를 고치러가고 했더니 구현할때 어...? 이 함수에 뭘 넣으려고 했더라? 하면서 이미 구상했던 것도 빼먹었다. 그래서 체스말이 사라지는 코드가 작성됬던것 같다... 구상을 깔끔하게 정리를 먼저 하고 코드를 작성하고, 미리 주석을 달아 놓는다면 빼먹는 경우가 적을 것 같다...! 다음에는 이렇게 풀도록 하자!
