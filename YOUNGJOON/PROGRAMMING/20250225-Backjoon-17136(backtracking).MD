# 코드

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

#define pll pair<int, int>

using namespace std;

vector<vector<int> > board(10, vector<int>(10, 0));
vector<vector<int> > can_size(10, vector<int>(10, 0));
vector<vector<bool> > visited(10, vector<bool>(10, false));
unordered_map<int, int> use_paper = {{1, 5}, {2, 5}, {3, 5}, {4, 5}, {5, 5}};
vector<pll> direction = {{0, 1}, {1, 0}, {1, 1}};
int result = 26;

int find_size(int x, int y)
{
    int now_size = 1;
    queue<pll> passed;
    passed.push({x, y});
    vector<vector<bool> > tmp_visited(10, vector<bool>(10, false));
    tmp_visited[x][y] = true;
    
    while (now_size < 5) {
        queue<pll> tmp;
        while (!passed.empty()) {
            pll now = passed.front();
            passed.pop();
            for (int i=0; i<3; ++i) {
                int nx = now.first + direction[i].first;
                int ny = now.second + direction[i].second;
                
                if (0 <= nx && nx < 10 && 0 <= ny && ny < 10 && board[nx][ny] == 1) {
                    if (tmp_visited[nx][ny] == false) {
                        tmp_visited[nx][ny] = true;
                        tmp.push({nx, ny});
                    }
                }
                else {
                    return now_size;
                }
            }
        }
        passed = tmp;
        now_size++;
    }
    
    return now_size;
}

void attach_paper()
{
    for (int i=0; i<10; ++i) {
        for (int j=0; j<10; ++j) {
            if (board[i][j] == 1) {
                can_size[i][j] = find_size(i, j);
            }
        }
    }
    
    return;
}

void in_to_the_brain(int x, int y, int papers)
{
    if (papers > result) {
        return;
    }
    
    if (y == 10) {
        x++;
        y = 0;
        if (x == 10) {
            if (result > papers) {
                result = papers;
            }
            return;
        }
    }
    
    if (visited[x][y] == false && board[x][y] == 1) {
        int now_power = can_size[x][y];
        while (now_power > 0) {
            bool is_ok = true;
            for (int i=0; i<now_power; ++i) {
                if (is_ok == false) {
                    break;
                }
                for (int j=0; j<now_power; ++j) {
                    if (visited[x + i][y + j] == true) {
                        is_ok = false;
                        break;
                    }
                }
            }
            
            if (is_ok == true) {
                for (int i=0; i<now_power; ++i) {
                    for (int j=0; j<now_power; ++j) {
                        visited[x + i][y + j] = true;
                    }
                }
                use_paper[now_power]--;
                
                if (use_paper[now_power] < 0) {
                    for (int i=0; i<now_power; ++i) {
                        for (int j=0; j<now_power; ++j) {
                            visited[x + i][y + j] = false;
                        }
                    }
                    use_paper[now_power]++;
                    now_power--;
                    
                    continue;
                }
                
                in_to_the_brain(x, y + 1, papers + 1);
                
                for (int i=0; i<now_power; ++i) {
                    for (int j=0; j<now_power; ++j) {
                        visited[x + i][y + j] = false;
                    }
                }
                use_paper[now_power]++;
            }
            
            now_power--;
            
        }
    }
    else {
        in_to_the_brain(x, y + 1, papers);
    }
    
    return;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int num;
    
    for (int i=0; i<10; ++i) {
        for (int j=0; j<10; ++j) {
            cin >> num;
            board[i][j] = num;
        }
    }
    
    attach_paper();
    
    in_to_the_brain(0, 0, 0);
    
    if (result != 26) {
        cout << result;
    }
    else {
        cout << -1;
    }

    return 0;
}

```



> ## 문제
>
> <그림 1>과 같이 정사각형 모양을 한 다섯 종류의 색종이가 있다. 색종이의 크기는 1×1, 2×2, 3×3, 4×4, 5×5로 총 다섯 종류가 있으며, 각 종류의 색종이는 5개씩 가지고 있다.
>
> ![img](https://upload.acmicpc.net/496452ae-ce36-4d77-93f7-19d7f3f9ce28/-/preview/)
>
> <그림 1>
>
> 색종이를 크기가 10×10인 종이 위에 붙이려고 한다. 종이는 1×1 크기의 칸으로 나누어져 있으며, 각각의 칸에는 0 또는 1이 적혀 있다. 1이 적힌 칸은 모두 색종이로 덮여져야 한다. 색종이를 붙일 때는 종이의 경계 밖으로 나가서는 안되고, 겹쳐도 안 된다. 또, 칸의 경계와 일치하게 붙여야 한다. 0이 적힌 칸에는 색종이가 있으면 안 된다.
>
> 종이가 주어졌을 때, 1이 적힌 모든 칸을 붙이는데 필요한 색종이의 최소 개수를 구해보자.
>
> ## 입력
>
> 총 10개의 줄에 종이의 각 칸에 적힌 수가 주어진다.
>
> ## 해설
>
> 처음 보았을때 그리디 알고리즘을 생각했다. 10*10의 배열을 순회하면서 1인 경우 해당위치에서 발생할 수 있는 가장 큰 색종이를 적어 우선순위 큐에 넣었다. 그리고 모든 위치에서 발생할 수 있는 색종이의 개수를 큰 순위부터 꺼내어 가장 큰 색종이부터 붙이기로 했다.
>
> 그러나 이 방법은 바로 틀렸다. 우선순위를 크기로만 주었더니
>
> ```
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> 1 1 1 1 1 1 1 1 1 1
> ```
>
> 이 반례에서 뜬금없이 한 가운데에 5*5 색종이를 붙여버려서 더 이상 붙이지못하고 -1을 출력했던 것이다.
>
> 그래서 우선순위를 색종이의 크기 뿐만 아니라 좌표가 가장 위쪽이면서 왼쪽에 가까운 순으로 우선순위를 주었다.
>
> 위의 반례도 잘 맞았고 제출을 시도했는데 틀렸다... 그리고 반례를 알게되었다.
>
> ```
> 1 1 1 1 1 1 0 0 0 0
> 1 1 1 1 1 1 0 0 0 0
> 1 1 1 1 1 1 0 0 0 0
> 1 1 1 1 1 1 0 0 0 0
> 1 1 1 1 1 1 0 0 0 0
> 1 1 1 1 1 1 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> ```
>
> 위의 반례는 위의 우선순위 순서대로 붙여버리면 5*5를 가장 먼저 붙여버리고 1크기의 색종이를 감당하지 못해 -1을 출력한다.
>
> 그러나 3*3 색종이 4개를 쓰면 위의 반례는 해결이 가능하다.. 이를 해결하려고 고민하다가 분류를 봤는데 브루트 포스 알고리즘 이었다.
>
> 즉, 모든 경우의 수를 판단해보아야 했던 것이다.
>
> 그래서 위의 풀이는 버리고, 현재 위치에서 발생할 수 있는 최대 색종이 크기를 기록해둔 다음, 재귀를 통해 경우의 수를 살펴보기로 했다. 현재 위치에서 가능한 최대 크기부터 색종이를 붙여 다음 재귀로 보낸다. 만약 현재 위치가 색종이를 붙이는게 가능하더라도 현재 색종이가 붙여져 있다면 단순히 다음으로 보냈다. 만약 도중에 색종이의 개수가 초과되어 다시 돌아왔다면 색종이의 크기를 1개씩 줄여 다시 붙이고 또 다시 다음 재귀로 보냈다. 재귀를 돌다가 (9, 9)에 도달하면 현재까지 이용한 색종이 수를 result에 기록하였다. 이렇게 하면 현재 위치에서 만들 수 있는 모든 색종이를 다 붙여보게 되는 것이고, 모든 경우를 확인할 수 있다고 생각했다.
>
> 모든 색종이의 개수는 25개이므로 이를 넘지 못한다 따라서 result를 26으로 선언해두고 모든 순회가 끝났을때 26을 유지한다면 -1을 출력하게 하였다.
>
> 최솟값을 찾는 것이므로 이미 기록된 result 값보다 색종이를 더 쓰는 경우는 볼필요가 없으니 return 시켰다.
>
> 호기롭게 제출했는데 바로 틀려버렸다. 그 이유는 색종이를 붙일 수 있는 상황인지 (다른 색종이가 붙음으로써 현재 기준점이 아닌 모든 색종이가 차지할 공간이 이용되고있지 않은지)를 판단하지 않고 그냥 돌려버려서 생길 수 없는 경우가 발생하였다.
>
> 따라서 색종이를 붙이기전 먼저 붙일 수 있는지 확인을 하는 로직을 추가하였다.
>
> 이렇게 하였더니 왠걸? 특정 반례에서 틀렸다.
>
> ```
> 0 0 0 0 0 0 0 0 0 0
> 0 1 1 0 0 0 0 0 0 0
> 0 1 1 1 0 0 0 0 0 0
> 0 0 1 1 1 1 1 0 0 0
> 0 0 0 1 1 1 1 0 0 0
> 0 0 0 0 1 1 1 0 0 0
> 0 0 1 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> ```
>
> 위의 반례에서 -1을 출력한 것이다. 원래대로 라면
>
> ```
> 0 0 0 0 0 0 0 0 0 0
> 0 1 1 0 0 0 0 0 0 0
> 0 1 1 2 0 0 0 0 0 0
> 0 0 3 4 6 6 6 0 0 0
> 0 0 0 5 6 6 6 0 0 0
> 0 0 0 0 6 6 6 0 0 0
> 0 0 7 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> 0 0 0 0 0 0 0 0 0 0
> ```
>
> 과 같이 되어야 하는데 뭐가 문제였을까 디버깅을 해보며 살펴보았다.
>
> 문제는 한 종류의 색종이가 5개 초과로 사용되어 return 되는 경우가 발생했을 시, 일어났다. 코드 상에서 색종이가 6개 사용된 순간 남아있는 색종이의 개수가 -1로 된 상태에서 다시 0개로 만들지 않고 return 해버린것이다. 그럼으로 5개 이상 사용될때마다 최대 색종이 개수가 1개씩 떨어져 버렸다. 이 때문에 제대로된 답을 출력하지 못하였다. 그래서 색종이 5개 초과 사용시 다시 색종이를 되돌리는 코드를 작성했다.
>
> 그런데도 오류가 해결되지 않았다. 계속해서 디버깅 해보니 색종이가 5개 초과로 사용되면 현재 색종이의 크기를 줄이는 코드가 있는데, 색종이의 크기를 줄여버리고 색종이의 개수를 늘려 올바른 색종이의 개수를 올려주지 못해 문제가 생긴것이었다.... 따라서 코드의 순서를 바꿔주었더니 통과되었다......
>
> 아주 다사다난하게 문제를 풀었다.................. 하 정말 코드도 이게 맞나? 싶을 정도로 아주 난잡한 것 같다. 색종이의 여부를 굳이 순회하여 미리 판단하고 다시 이를 현재 넣을 수 있는지? 판단하고 그제서야 기록하고 이게 효율적인지도 모르겠다... 계속해서 이 에러를 수정하자고 이 코드를 붙이고 저 코드를 붙이고 하니 누더기 코드가 되어서 제대로 알아보기도 벅찼다.. 후... 다음에는 꼭 깔끔하고 빠르게 풀 수 있었으면 좋겠다... 
