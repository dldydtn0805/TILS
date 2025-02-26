## 문제
https://www.acmicpc.net/problem/1933

## 해설

건문의 개수 N <= 10^6이 주어진다.

건물의 정보들이 주어진다.

건물에 대한 정보는 세 정수 L, H, R로 나타나는데, 각각 건물의 왼쪽 X좌표, 높이, 오른쪽 X 좌표를 의미한다.

L <= 10^9, R <= 10^9, H <= 10^9

L <= R이다.

스카이라인을 출력하라.

출력을할때는 높이가 변하는 지점에 대해서, 그 지점의 X 좌표와 그 지점에서의 높이를 출력하라

이 문제는 우선순위 큐로 해결할 수 있다.

두 단계로 나누어서 설명하자면,

1. 정렬
    - 건물의 모든 좌표를 X좌표 기준으로 정렬한다.
    - 좌표가 같다면 시작점이 끝점보다 앞에 오도록한다.
    - X가 같은 시작지점들은 높이가 높은것이 앞에 오도록 한다.
    - 이렇게 해야 한번에 처리가 가능하다.

2. 스카이라인 계산
    - 우선순위큐를 사용해 현재 활성화된 건물들의 높이를 관리한다.
    - 우선순위큐는 현재 보이는 건물 중 가장 높은 건물을 쉽게 찾을 수 있도록 도와준다.
    - 건물의 시작점에서는 힙에 높이를 추가하고, 현재 높이가 변경되면 결과 리스트에 추가한다.
    - 건물의 끝점을 만나면 건물이 더이상 보이지 않으므로 우선순위 큐에서 제거한다.
    - 건물의 끝점에서는 해당 건물을 힙에서 제거해야하지만, 직접 제거하는것이 어려우므로 다음과 같이 진행한다.
        - 끝점을 세트에 저장한다.
        - 끝점을 만났을때 세트에 있는 건물들을 힙에서 제거한다.
    - 최대 높이가 변경될때마다 결과 리스트에 [X 좌표, 새 높이를] 추가한다.

굉장히 어려운 문제였다. 이 문제의 핵심은 모든 건물의 시작점과 끝점을 이벤트로 생각하는것이다.


사실 시작점과 끝점을 나누어서 배열에 정렬해서 넣는것까지는 생각했으나,

1. 세트에 방문한 건물을 관리하는 것에 실패했다.

2. 시작점과 끝점을 구분해서 우선순위큐를 관리하는데 실패했다.

아이디어 자체는 거의 다 다가갔는데 우선순위 큐를 정확하게 구현하지 못한것이다.


그래도 이번에 새롭게 알게 된것은,

리스트 자료형에 데이터를 넣을떄 List<Integer> 형태로 삽입하면 시간초과 및 메모리 초과가 일어나므로 배열 형태로 넣어야하는데,

이를 간략하게 `add(new int[] {})` 이런 형태로 삽입하면 수월하다는 것이다.


## 입력
```

8
1 11 5
2 6 7
3 13 9
12 7 16
14 3 25
19 18 22
23 13 29
24 4 28
```


## 출력
```
1 11 3 13 9 0 12 7 16 3 19 18 22 3 23 13 29 0
```

## 코드 
```java
import java.io.*;
import java.util.*;

public class Main {
    static int N;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        N = Integer.parseInt(br.readLine());
        LinkedList<int[]> buildings = new LinkedList<>();
        int[] endPoints = new int[N];

        for (int i = 0; i < N ; i ++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int s = Integer.parseInt(st.nextToken());
            int h = Integer.parseInt(st.nextToken());
            int e = Integer.parseInt(st.nextToken());
            int[] starts = {i, s, h, 0};
            int[] ends = {i, e, h, 1};

            buildings.add(starts);
            buildings.add(ends);
            endPoints[i] = e;
        }

        Collections.sort(buildings, (a, b) -> {
            if (a[1] == b[1] && a[3] == b[3]) {
                return b[2] - a[2];
            } else if (a[1] == b[1]) {
                return a[3] - b[3];
            }
            return a[1] - b[1];
        });

        PriorityQueue<int[]> hq = new PriorityQueue<>((a, b) -> {
            return b[0] - a[0];
        });

        int currentHeight = 0;
        LinkedList<int[]> result = new LinkedList<>();
        HashSet<Integer> endList = new HashSet<>();

        for (int[] building : buildings) {
            int buildingIdx = building[0];
            int x = building[1];
            int height = building[2];
            int isEnd = building[3];

            if (isEnd == 0) {
                if (height > currentHeight) {
                    currentHeight = height;
                    result.add(new int[]{x, currentHeight});
                }
                hq.add(new int[]{height, endPoints[buildingIdx]});
                continue;
            }

            endList.add(x);

            while (!hq.isEmpty() && endList.contains(hq.peek()[1])) {
                hq.poll();
            }

            if (!hq.isEmpty()) {
                if (currentHeight != hq.peek()[0]) {
                    currentHeight = hq.peek()[0];
                    result.add(new int[]{x, currentHeight});
                }
            } else {
                if (currentHeight != 0) {
                    currentHeight = 0;
                    result.add(new int[]{x, currentHeight});
                }
            }
        }

        for (int[] res : result) {
            sb.append(res[0]).append(" ").append(res[1]).append(" ");
        }

        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }
}
```


## 트리맵을 활용한 풀이

트리맵을 사용한 풀이는 다음과 같다.

우선순위 큐와 로직이 비슷하지만, 활성화된 건물 체크를 트리맵을 사용해서 하는 것이 다르다.

활성화된 빌딩 중 가장 높은 높이를 찾는 것은, 높이를 내림차순으로 정렬하는 자료구조를 사용해야하는것이다.

또한 끝난 빌딩의 높이에 대해서 연산하지 않게 하기 위해 시작점과 끝점을 구분해서 모든 점을 탐색해야한다.

시작점의 경우, 자료구조에 넣어서 높이를 갱신하고, 끝점인 경우, 해당 시작점 관련 높이를 제거해주면 된다.

모든 점들을 탐색하면서 가장 높은 높이들을 정답을 만드는 자료구조에 넣어준다.

그리고 고도가 변하는 경우만 출력해주면 된다.

코드 로직은 다음과 같다.

1. 모든 건물의 시작점과 끝점을 리스트에 저장한다.
    - 시작점의 경우 : X좌표, 높이
    - 끝점의 경우 : X좌표, -높이 [음수로 표시하여 끝점을 구분한다]

2. 이 점들을 X 좌표를 기준으로 정렬한다. X 좌표가 같다면 높이가 큰 것을 먼저 처리한다.

3. TreeMap을 사용하여 현재 활성화된 건물들의 높이를 관리한다.
    - 키 : 건물 높이
    - 값 : 해당 건물을 가진 건물의 수
    - TreeMap은 높이를 내림차순으로 정렬한다 (높은 건물이 먼저 나오도록)
4. 모든 점을 순회하면서,
    - 시작점이면 해당 높이를 TreeMap에 추가한다.
    - 끝점이면 해당 높이를 TreeMap에서 제거한다.
    - 각 점에서 현재 활성화된 건물 중 가장 높은 높이 결과를 결과 리스트에 추가한다
5. 결과 리스트에서 높이가 변하는 지점만 출력한다.

이 풀이를 참고하면서 알게된 것은, 이전에 우선순위 큐로 풀었을 때와는 다르게 코드가 굉장히 깔끔하다는것에 놀랐다.

또한 TreeMap이라는 자료구조를 사용해본 것이 처음이어서 새로웠다.

간단하게 정리한 TreeMap의 메서드는 다음과 간다


## 기본 메서드

- `put(K key, V value)`: 키-값 쌍을 맵에 추가한다. **시간복잡도: O(log n)**

- `get(Object key)`: 지정된 키에 해당하는 값을 반환한다. **시간복잡도: O(log n)**

- `remove(Object key)`: 지정된 키의 매핑을 제거한다. **시간복잡도: O(log n)**

- `containsKey(Object key)`: 맵에 특정 키가 있는지를 확인한다. **시간복잡도: O(log n)**

- `containsValue(Object value)`: 맵에 특정 값이 있는지를 확인한다. **시간복잡도: O(n)**

- `isEmpty()`: 맵이 비어있는지 확인한다. **시간복잡도: O(1)**

- `size()`: 맵의 키-값 쌍의 개수를 반환한다. **시간복잡도: O(1)**

- `clear()`: 맵의 모든 매핑을 제거한다. **시간복잡도: O(n)**

## 특화 메서드

- `firstKey()`: 맵에서 가장 작은 키를 반환한다. **시간복잡도: O(log n)**

- `lastKey()`: 맵에서 가장 큰 키를 반환한다. **시간복잡도: O(log n)**

- `firstEntry()`: 가장 작은 키의 키-값 쌍을 반환한다. **시간복잡도: O(log n)**

- `lastEntry()`: 가장 큰 키의 키-값 쌍을 반환한다. **시간복잡도: O(log n)**

- `pollFirstEntry()`: 가장 작은 키의 키-값 쌍을 반환하고 맵에서 제거한다. **시간복잡도: O(log n)**

- `pollLastEntry()`: 가장 큰 키의 키-값 쌍을 반환하고 맵에서 제거한다. **시간복잡도: O(log n)**

- `ceilingKey(K key)`: 주어진 키보다 크거나 같은 키 중 가장 작은 키를 반환한다. **시간복잡도: O(log n)**

- `ceilingEntry(K key)`: 주어진 키보다 크거나 같은 키 중 가장 작은 키의 키-값 쌍을 반환한다. **시간복잡도: O(log n)**

- `floorKey(K key)`: 주어진 키보다 작거나 같은 키 중 가장 큰 키를 반환한다. **시간복잡도: O(log n)**

- `floorEntry(K key)`: 주어진 키보다 작거나 같은 키 중 가장 큰 키의 키-값 쌍을 반환한다. **시간복잡도: O(log n)**

- `higherKey(K key)`: 주어진 키보다 큰 키 중 가장 작은 키를 반환한다. **시간복잡도: O(log n)**

- `higherEntry(K key)`: 주어진 키보다 큰 키 중 가장 작은 키의 키-값 쌍을 반환한다. **시간복잡도: O(log n)**

- `lowerKey(K key)`: 주어진 키보다 작은 키 중 가장 큰 키를 반환한다. **시간복잡도: O(log n)**

- `lowerEntry(K key)`: 주어진 키보다 작은 키 중 가장 큰 키의 키-값 쌍을 반환한다. **시간복잡도: O(log n)**

## 범위 관련 메서드

- `subMap(K fromKey, K toKey)`: fromKey(포함)부터 toKey(미포함)까지의 부분 맵을 반환한다. **시간복잡도: O(k + log n)**, k는 범위 내 원소 수

- `subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)`: 지정된 범위의 부분 맵을 반환한다. 포함 여부를 설정할 수 있다. **시간복잡도: O(k + log n)**

- `headMap(K toKey)`: 맵의 처음부터 toKey(미포함)까지의 부분 맵을 반환한다. **시간복잡도: O(k + log n)**

- `headMap(K toKey, boolean inclusive)`: 맵의 처음부터 toKey까지의 부분 맵을 반환한다. toKey 포함 여부를 설정할 수 있다. **시간복잡도: O(k + log n)**

- `tailMap(K fromKey)`: fromKey(포함)부터 맵의 끝까지의 부분 맵을 반환한다. **시간복잡도: O(k + log n)**

- `tailMap(K fromKey, boolean inclusive)`: fromKey부터 맵의 끝까지의 부분 맵을 반환한다. fromKey 포함 여부를 설정할 수 있다. **시간복잡도: O(k + log n)**

- `descendingMap()`: 키의 역순으로 정렬된 맵 뷰를 반환한다. **시간복잡도: O(1)** (뷰 생성)

- `descendingKeySet()`: 키의 역순으로 정렬된 키 집합 뷰를 반환한다. **시간복잡도: O(1)** (뷰 생성)

## 컬렉션 뷰 메서드

- `keySet()`: 맵의 모든 키를 Set 형태로 반환한다. **시간복잡도: O(1)** (뷰 생성), **O(n)** (전체 순회)

- `values()`: 맵의 모든 값을 Collection 형태로 반환한다. **시간복잡도: O(1)** (뷰 생성), **O(n)** (전체 순회)

- `entrySet()`: 맵의 모든 키-값 쌍을 Set 형태로 반환한다. **시간복잡도: O(1)** (뷰 생성), **O(n)** (전체 순회)

- `navigableKeySet()`: 맵의 키를 NavigableSet 형태로 반환한다. **시간복잡도: O(1)** (뷰 생성)

## 유틸리티 메서드

- `getOrDefault(Object key, V defaultValue)`: 키가 있으면 해당 값을, 없으면 기본값을 반환한다. **시간복잡도: O(log n)**

- `putIfAbsent(K key, V value)`: 키가 없을 때만 매핑을 추가한다. **시간복잡도: O(log n)**

- `replace(K key, V value)`: 키가 있을 때만 값을 교체한다. **시간복잡도: O(log n)**

- `replace(K key, V oldValue, V newValue)`: 키와 값이 모두 일치할 때만 새 값으로 교체한다. **시간복잡도: O(log n)**

- `compute(K key, BiFunction<K, V, V> remappingFunction)`: 지정된 키의 값을 계산해 대체한다. **시간복잡도: O(log n)**

- `computeIfAbsent(K key, Function<K, V> mappingFunction)`: 키가 없거나 null이면 함수를 적용해 값을 계산하고 추가한다. **시간복잡도: O(log n)**

- `computeIfPresent(K key, BiFunction<K, V, V> remappingFunction)`: 키가 있고 값이 null이 아니면 함수를 적용해 값을 계산하고 대체한다. **시간복잡도: O(log n)**

- `merge(K key, V value, BiFunction<V, V, V> remappingFunction)`: 키가 있으면 지정된 함수로 기존 값과 새 값을 병합하고, 없으면 새 값을 추가한다. **시간복잡도: O(log n)**

- `forEach(BiConsumer<K, V> action)`: 맵의 모든 항목에 대해 지정된 작업을 수행한다. **시간복잡도: O(n)**

## 생성자

- `TreeMap()`: 자연 순서에 따라 정렬되는 빈 TreeMap을 생성한다. **시간복잡도: O(1)**

- `TreeMap(Comparator<? super K> comparator)`: 지정된 비교자에 따라 정렬되는 빈 TreeMap을 생성한다. **시간복잡도: O(1)**

- `TreeMap(Map<? extends K, ? extends V> m)`: 지정된 맵의 매핑으로 초기화된 TreeMap을 생성한다. **시간복잡도: O(n log n)**

- `TreeMap(SortedMap<K, ? extends V> m)`: 지정된 SortedMap의 매핑으로 초기화된 TreeMap을 생성한다. **시간복잡도: O(n)**


## 코드

```java
import java.io.*;
import java.util.*;

public class Main {
    static int N;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");
        N = Integer.parseInt(br.readLine());
        List<int[]> buildings = new ArrayList<>();

        for (int i = 0; i < N ; i ++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int s = Integer.parseInt(st.nextToken());
            int h = Integer.parseInt(st.nextToken());
            int e = Integer.parseInt(st.nextToken());
            buildings.add(new int[]{s, h});
            buildings.add(new int[]{e, -h});
        }

        Collections.sort(buildings, (a, b) -> {
            if (a[0] == b[0]) {
                return b[1] - a[1];
            }
            return a[0] - b[0];
        });

        TreeMap<Integer, Integer> tm = new TreeMap<>((a,b) -> {
            return b - a;
        });

        List<int[]> result = new ArrayList<>();

        for (int[] building : buildings) {
            int[] cur = building;
            int x = cur[0], h = cur[1];
            if (h > 0) {
                tm.put(h, tm.getOrDefault(h, 0)+1);
            } else {
                int key = -h;
                int val = tm.get(key);
                if (val == 1) {
                    tm.remove(key);
                } else {
                    tm.put(key, val-1);
                }
            }
            if (tm.isEmpty()) {
                result.add(new int[]{x, 0});
                continue;
            }
            result.add(new int[]{x, tm.firstKey()});
        }

        int prev = result.get(0)[1];
        sb.append(result.get(0)[0]).append(" ").append(result.get(0)[1]).append(" ");

        for (int i = 1; i < result.size(); i ++) {
            if (prev != result.get(i)[1]) {
                sb.append(result.get(i)[0]).append(" ").append(result.get(i)[1]).append(" ");
                prev = result.get(i)[1];
            }
        }

        bw.write(sb.toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }
}
```