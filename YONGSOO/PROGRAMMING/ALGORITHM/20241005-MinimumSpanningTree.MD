## 최소 스패닝 트리 [MST]

### 정의

- `신장 트리`는, 그래프에서 모든 정점에 대한 최소한의 연결만을 남긴 그래프이다.
- 한 곳으로 도달하는 경우가 두개 이상 존재하는 경우 [사이클이 존재하는 경우] 최소한의 연결라 할 수 없으므로 모든 위치에서 다른 곳으로 이동하는 경우는 단 한가지로 결정되도록 한다
- `최소 신장 트리`는 이러한 신장 트리들 중 간선의 가중치 합이 가장 작은 트리이다

### 알고리즘

- 그리디 기법을 사용하여 최적의 해를 구할 수 있다.
- 크루스칼 알고리즘 [O(ElogV)] / 프림 알고리즘[O(E+VlogV)] / 솔린 알고리즘이 알려져있다.

### 프림 알고리즘

1. 임의의 정점을 선택하여 하나의 정점을 갖는 최소 트리를 구성한다
2. 트리에 포함된 정점과 트리에 포함되지 않은 정점 간의 간선 중 가장 작은 가중치를 가지는 간선을 선택하여 트리에 추가한다
3. 모든 정점이 트리에 포함될 때 까지 2를 반복한다

- 예시코드

  ```py
  import sys
  input = sys.stdin.readline
  import heapq

  def prim(si):
      visited = [0 for _ in range(N)]
      visited[si] = 1
      candidate = adj_list[si]
      heapq.heapify(candidate)
      mst = []
      distance = 0
      while candidate:
          cur_w, cur_i , next_i = heapq.heappop(candidate)
          if visited[next_i] == 0:
              visited[next_i] = 1
              mst.append((cur_i, next_i))
              distance += cur_w
              for node in adj_list[next_i]:
                  if not visited[node[2]]:
                      heapq.heappush(candidate, node)
      for check in visited:
          if not check:
              return -1
      return total_cost - distance

  N, M = map(int, input().split())
  adj_list = [[] for _ in range(N)]
  total_cost = 0
  for _ in range(M):
      a, b, cost = map(int, input().split())
      a -= 1
      b -= 1
      total_cost += cost
      adj_list[a].append((cost, a, b))
      adj_list[b].append((cost, b, a))
  print(prim(0))

  ```

### 크루스칼 알고리즘

1. 그래프의 모든 간선의 집합 E를 만든다
2. E가 비어있지 않을때까지 다음을 반복한다

    - E의 간선들 중 가중치가 최소인 간선을 지운다
    - 삭제된 간선이 가리키는 정점 X, Y를 연결하여도 사이클이 발행하지 않는다면 연결한다

- 예시코드

  ```py
  import sys
  input = sys.stdin.readline

  def find_parent(parent, a):
      if parent[a] != a:
        parent[a] = find_parent(parent, parent[a])
      return parent[a]

  def union_parent(parent, a, b):
      a = find_parent(parent, a)
      b = find_parent(parent, b)
      if a < b:
          parent[b] = a
      else:
          parent[a] = b

  N, M = map(int, input().split())
  parent = [0] * (N + 1)
  for i in range(1, N + 1):
      parent[i] = i

  edges = []
  result = 0
  for i in range(M):
      A, B, C = map(int, input().split())
      edges.append((A, B, C))

  edges.sort(key = lambda x : x[2])

  size = 0
  for A, B, C in edges:
      if find_parent(parent, A) != find_parent(parent, B):
          union_parent(parent, A, B)
          if size == N-2:
              break
          size += 1
          result += C

  print(result)
  ```