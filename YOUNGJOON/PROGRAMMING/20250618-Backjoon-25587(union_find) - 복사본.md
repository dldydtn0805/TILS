# 코드

```c++
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int N, M, cnt = 0;

vector<int> water_flow(100001), rain_drop(100001), parents(100001), water_overflow(100001, -1);


int find_root(int x)
{
    if (parents[x] == x) {
        return x;
    }
    return parents[x] = find_root(parents[x]);
}


void union_root(int x, int y)
{
    int r_x = find_root(x);
    int r_y = find_root(y);
    
    if (r_x == r_y) return;
    
    if (r_x > r_y) swap(r_x, r_y);
    
    parents[r_y] = r_x;
    water_flow[r_x] += water_flow[r_y];
    rain_drop[r_x] += rain_drop[r_y];

    if (water_flow[r_x] >= rain_drop[r_x]) {
        if (water_overflow[r_x] > 0) {
            cnt -= water_overflow[r_x];
            water_overflow[r_x] *= -1;
        }
        if (water_overflow[r_y] > 0) {
            cnt -= water_overflow[r_y];
            water_overflow[r_y] *= -1;
        }
    }
    else {
        if (water_overflow[r_x] < 0) {
            water_overflow[r_x] *= -1;
            cnt += water_overflow[r_x];
        }
        if (water_overflow[r_y] < 0) {
            water_overflow[r_y] *= -1;
            cnt += water_overflow[r_y];
        }
    }
    water_overflow[r_x] += water_overflow[r_y];
    
    // cout << "진행결과 현재 홍수가 난 마을은 " << cnt << "개이고, 현재 배수로의 크기는 " << water_flow[r_x] << "이고, 현재 강수량은 " << rain_drop[r_x] << "이라서 " << water_overflow[r_x] << "의 연합의 현황이 된다. \n";
    
    return;
}


int main()
{
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    cin >> N >> M;
    
    for (int i=1; i<=N; ++i) {
        cin >> water_flow[i];
    }
    for (int i=1; i<=N; ++i) {
        cin >> rain_drop[i];
        if (rain_drop[i] > water_flow[i]) {
            cnt++;
            water_overflow[i] *= -1;
        }
    }
    for (int i=1; i<=N; ++i) {
        parents[i] = i;
    }
    
    int command, s, e;
    
    for (int i=0; i<M; ++i) {
        cin >> command;
        if (command == 1) {
            cin >> s >> e;
            union_root(s, e);
        }
        else {
            cout << cnt << "\n";
        }
    }
    
    return 0;
}

```

> ## 문제
>
> ChAOS 나라에는 총 N$N$개의 도시가 있고 각각 1,2,3,…,N번 도시라고 부른다. ChAOS 나라에 각 도시에는 홍수를 막기 위해 배수로가 설치되어 있다. i번 도시의 배수로는 강수량이 Ai이하일 때만 홍수를 막을 수 있다. 추가로 한 도시에만 폭우가 올 때를 대비해, 두 개의 도시를 정해서 양쪽 도시의 배수로 용량을 공유할 수 있는 공사를 하기로 했다. 예를 들어 1번 도시와 2번 도시에 공사를 하고 난 후, 1번 도시와 2번 도시의 강수량의 합이 A1+A2이하라면 1, 2번 도시 모두에 홍수가 나는 것을 막을 수 있고, 그렇지 않다면 1, 2번 도시 모두에 홍수가 나게 된다. 그 후 2, 3번 도시에도 공사를 하면, 세 도시의 강수량의 합이 A1+A2+A3이하라면 1, 2, 3번 도시 모두에 홍수가 나는 것을 막을 수 있고, 그렇지 않다면 1, 2, 3번 도시 모두에 홍수가 나게 된다.
>
> 그리고 현재 ChAOS 나라에는 전국적으로 폭우가 오고 있다. 현재 i번 도시의 강수량은 Bi다. 여기서 두 가지의 쿼리를 처리하는 프로그램을 작성하자.
>
> -  1 x y : x번 도시와 y번 도시에 공사를 한다.
> -  2 : 현재 상태에서 홍수가 날 도시의 개수를 출력한다.
>
> 단, 2번 쿼리는 최소 한 개 주어진다.
>
> ## 입력
>
> 첫 번째 줄에 도시의 개수인 정수 N (3≤N≤100000과 쿼리의 개수인 정수 M(1≤M≤100000)이 주어진다.
>
> 두 번째 줄에는 i번 도시의 배수로 용량을 의미하는 N개의 정수 A1,A2,A3,...,An이 주어진다. (0≤Ai≤1000)
>
> 세 번째 줄에는 i번 도시의 강수량을 의미하는 N$N$개의 정수 B1,B2,B3,...,Bn이 주어진다. (0≤Bi≤1000)
>
> 네 번째 줄부터 M+3번째 줄까지는 1 x y 또는 2 형태의 쿼리 M개가 한 줄에 하나씩 주어진다. (1≤x,y≤N)
>
> ## 출력
>
> 각각의 2번 쿼리마다 정답을 한 줄에 하나씩 출력한다.
>
> ##  해설
>
> 처음 문제를 봤을 때 유니온 파인드를 생각했다.
>
> 각 마을의 연합을 유니온파인드를 통해 관리하고, 연합의 root를 이용해 강수량과 배수량을 관리하여 매 연산마다 홍수가 나는 도시의 개수를 관리하면 될것이라 생각했다.
>
> > 1. 현재 홍수난 나라의 개수를 다룰 정수형 변수 cnt와 현재 root를 담을 배열 parent, 각 나라의 강수량과 배수량을 담을 배열 water_flow, rain_drop 그리고 현재 연합의 나라 수와 홍수 여부를 나타낼 water_overflow를 선언한다.
> > 2. 주어지는 나라의 root를 자기 자신으로 설정한다.
> > 3. 주어지는 나라의 강수량과 배수량을 현재 자신의 나라 번호를 인덱스로 하여 기록한다. 이때 시작부터 홍수가 난 나라가 있다면 그 개수만큼 cnt 를 더한다.
> > 4. 주어지는 입력대로 명령을 수행한다.
> >    - `'1'`일 경우
> >      - 주어지는 2개의 나라를 union_root() 함수를 이용해 합친다.
> >      - 이때 두 나라 중 root는 번호가 더 낮은 나라가 root가 되며, 두 나라의 강수량과 배수량을 더한다.
> >      - 두 나라의 합친 강수량과 배수량을 보고 연합이 홍수가 났는지 안전한지 판단한다.
> >        - 만약 안전하다면 두 나라 중 홍수가 난 나라가 있는지 water_overflow를 이용해 확인(양수면 홍수가 난것)하고 홍수가 난 나라가 있다면 그 나라의 개수만큼 cnt에서 빼고 안전함을 표시한다.
> >        - 만약 홍수가 났다면 두 나라 중 안전한 나라가 있는지 water_overflow를 이용해 확인(음수면 안전한 것)하고 안전한 나라가 있다면 그 나라의 개수만큼 cnt에 더하고 홍수가 났다고 바꾼다.
> >    - `'2'`일 경우
> >      - 현재 cnt를 출력한다.
>
> 위와 같은 방식으로 문제를 풀 수 있었다.
>
> 코드를 작성하고 나서 몇가지 임의의 테스트 케이스를 돌려보다가 이상한 답을 배출하는 것을 보았다. 그래서 디버깅하다보니 4번의 '1'일 경우에서 안전한 나라를 홍수난 나라로 바꾸거나 홍수난 나라를 안전한 나라로 바꾸는 연산을 잘못하고 있었었다. 부등호가 바뀌고 더하기 연산의 순서가 잘못되어있었다. 이런 사소한 실수를 줄이도록 반드시 꼼꼼하게 코드를 작성하자...!
>
> 그래도 임의의 반례를 만들어서 돌려보고 문제점을 파악해보는 자세는 나쁘지 않은 것 같다! 실제 코딩테스트에서는 반례를 구하기 힘드니 직접 만들어보고 히든 케이스를 통과할 수 있는지 유추하며 문제를 푸는 습관을 들이자!!!
