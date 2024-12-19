## 플로이드 워셜 알고리즘

- 임의의 정점에서 임의의 정점까지의 최단거리를 다루는 알고리즘
- 한 사이클 연산으로 전체 그래프 상의 임의의 두 점 사이의 최단 거리를 구할 수 있다
- 전체 V개의 정점 중 임의의 서로 다른 정점 I, J가 있고 이 두 점 사이에 최단 경로가 존재한다고 가정한다
- 이때 1 ~ V 사이에는 최단 경로를 만드는 경유 정점 K가 반드시 있다.
- 즉 I부터 K까지의 거리, K부터 J까지의 거리의 최소값을 구하면 된다.

- EXAMPLE CODE
    ```py
    import sys
    input = sys.stdin.readline

    def floyd_warshall():
        dp = [[1e9 for _ in range(N+1)] for _ in range(N+1)]

        for i in range(1, N+1):
            dp[i][i] = 0

        for i in range(1, N+1):
            for j in range(1, N+1):
                dp[i][j] = min(adj_list[i][j], dp[i][j])

        for k in range(1, N+1):
            for i in range(1, N+1):
                for j in range(1, N+1):
                    dp[i][j] = min(dp[i][k] + dp[k][j], dp[i][j])

        return dp

    N, M = map(int, input().split())

    adj_list = [[1e9 for _ in range(N+1)] for _ in range(N+1)]

    for _ in range(M):
        A, B, T = map(int, input().split())
        adj_list[A][B] = T
    K = int(input())
    C = list(map(int, input().split()))

    distance = (floyd_warshall())

    value = 1e9
    ans = [0]
    for city in range(1, N+1):
        time = 0
        for friend in C:
            time = max(time , distance[city][friend] + distance[friend][city])
        if value > time:
            value = time
            ans = [city]
        elif value == time:
            ans.append(city)
    print(*sorted(ans))

    ```