## 백트래킹 [BACKTRACKING]

- 해를 찾는 도중 해가 절대 될 수 없다고 판단되면, 되돌아가서 해를 다시 찾아가는 기법을 말한다.

- DFS와의 차이
    - DFS
        - 그래프에서 깊은 부분을 우선적으로 탐색하는 기법이다
        - 모든 경로를 탐색하는 특징으로 불필요할 것 같은 경로를 사전에 차단하지 않기 때문에 경우의 수를 줄이지 못한다
    - DFS와 달리, 해가 절대 될 수 없다고 판단되면, 되돌아가서 다시 해를 찾는다. [가지치기의 유무]
    - 백트래킹은 모든 경우의 수에서 조건을 만족하는 경우를 탐색하는 것이기 때문에 완전 탐색 기법인 DFS와 BFS 모두 구현이 가능하다.
        - 백트래킹 특성에서 조건에 부합하지 않으면 이전 수행으로 돌아가야 함으로 BFS 보다는 DFS가 구현이 편하므로 주로 DFS를 사용한다
        
- 예시코드
    ```py
    import sys
    input = sys.stdin.readline

    def backtracking(i, j, value):
        if j == M:
            backtracking(i+1, 0, value)
        elif i == N:
            global ans
            ans = max(ans, value)
            return
        else:
            for direction in directions:
                flag_cnt = 0
                for di, dj in direction:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < N and 0 <= nj < M:
                        if not visited[ni][nj]:
                            flag_cnt += 1
                if flag_cnt == 3:
                    next_value = value
                    for di, dj in direction:
                        ni, nj = i + di, j + dj
                        print(ni, nj)
                        visited[ni][nj] = 1
                        if di == 0 and dj == 0:
                            next_value += 2 * arr[ni][nj]
                        else:
                            next_value += arr[ni][nj]
                    if j < M:
                        backtracking(i, j+1, next_value)
                    elif i < N:
                        backtracking(i+1, 0, next_value)
                    for di, dj in direction:
                        ni, nj = i + di, j + dj
                        visited[ni][nj] = 0
            if j < M:
                backtracking(i, j + 1, value)
            elif i < N:
                backtracking(i + 1, 0, value)

    N, M = map(int, input().split())

    directions = [
        [[0,0],[1,0],[0,-1]],
        [[0,0],[-1,0],[0,-1]],
        [[0,0],[0,1],[-1,0]],
        [[0,0],[0,1],[1,0]]
    ]

    arr = [list(map(int, input().split())) for _ in range(N)]
    visited = [[0 for _ in range(M)] for _ in range(N)]
    ans = 0
    if N < 2 or M < 2:
        print(0)
    else:
        backtracking(0, 0, 0)
        print(ans)

    ``` 