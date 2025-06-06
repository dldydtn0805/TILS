## 문제

https://www.acmicpc.net/problem/20956

## 해설

지호는 항상 양이 가장 많은 아이스크림을 선택하여 전부 먹는다.

양이 가장 많은 아이스크림이 여러개라면 가장 왼쪽에 있는것을 먹는다.

지호는 민트초코맛을 싫어한다. 아이스크림의 양이 7의 배수라면 민트초코 맛이다

민트초코 맛 아이스크림을 먹은 지호는 아이스크림의 순서를 좌우로 뒤집는다.

K개의 아이스크림이 있다면 i번째 아이스크림과 K - i + 1 번째 아이스크림의 위치를 바꾼다.

지호는 N개의 아이스크림 중 M 개의 아이스크림을 먹으려 한다.

지호가 먹은 아이스크림의 번호를 구하시오.

전체 아이스크림 1 <= N <= 10^6 개가 있다.

지호가 먹을 아이스크림 1 <= M <= N 개가 있다.

A[i]는 i번 아이스크림의 양을 의마한다.

M 개의 줄에 지호가 i 번째로 먹을 아이스크림의 번호를 출력하라

핵심 포인트는 다음과 같다.

- 지호는 항상 가장 많은 양의 아이스크림을 선택하여 먹는다.
    - 가장 많은 아이스크림이 여러개 있다면 왼쪽에 있는 것을 먹는다.

- 먹은 아이스크림의 양이 7의 배수라면 모든 아이스크림의 좌우 순서가 뒤집힌다.

트리맵을 사용하면 아주 간단하게 해결할 수 있지 않을까?

트리맵은 다음과 같이 정의했다.

키 : 아이스크림의 양
값 : 아이스크림의 인덱스를 가지고 있는 트리 세트

1. 아이스크림의 양이 많은 것부터 순차적으로 순회한다.

2. 기본적으로 아이스크림은 인덱스가 작은 것부터 순차적으로 순회한다.

    - 하지만 아이스크림의 양이 7의 배수인 경우 인덱스가 큰 것부터 순회한다.

아이스크림의 인덱스를 빠르게 가져오기 위해 트리 세트 구조를 사용했다.

인덱스는 겹치는 값이 없기 때문에 트리 세트를 사용할 수 있었고, 빠르게 가장 큰 값과, 가장 작은 값을 선택적으로 가져올 수 있게 만들어 준다. 

스틸 함수에서 훔친 아이스크림의 개수가 M개가 됐음을 감지한다면 훔친 아이스크림 목록을 반환하도록 만들면 된다.

## 📌 TreeSet & TreeMap 메서드 정리 (시간 복잡도 포함)

## ✅ TreeSet 메서드
| 메서드 | 설명 | 시간 복잡도 |
|--------|----------------------------|------------|
| `add(E e)` | 요소 추가 | `O(log N)` |
| `remove(Object o)` | 요소 삭제 | `O(log N)` |
| `contains(Object o)` | 특정 요소 존재 여부 확인 | `O(log N)` |
| `first()` | 첫 번째(가장 작은) 요소 가져오기 | `O(log N)` |
| `last()` | 마지막(가장 큰) 요소 가져오기 | `O(log N)` |
| `pollFirst()` | 첫 번째 요소 가져오면서 삭제 | `O(log N)` |
| `pollLast()` | 마지막 요소 가져오면서 삭제 | `O(log N)` |
| `higher(E e)` | 주어진 값보다 큰 요소 중 가장 작은 값 반환 | `O(log N)` |
| `lower(E e)` | 주어진 값보다 작은 요소 중 가장 큰 값 반환 | `O(log N)` |
| `ceiling(E e)` | 주어진 값 이상인 요소 중 가장 작은 값 반환 | `O(log N)` |
| `floor(E e)` | 주어진 값 이하인 요소 중 가장 큰 값 반환 | `O(log N)` |
| `subSet(E fromElement, E toElement)` | 특정 범위의 요소 반환 (`from` 이상, `to` 미만) | `O(log N) + O(M)` |
| `headSet(E toElement)` | 특정 값보다 작은 모든 요소 반환 | `O(log N) + O(M)` |
| `tailSet(E fromElement)` | 특정 값보다 큰 모든 요소 반환 | `O(log N) + O(M)` |
| `size()` | 요소 개수 반환 | `O(1)` |
| `isEmpty()` | 비어있는지 확인 | `O(1)` |

---

## ✅ TreeMap 메서드
| 메서드 | 설명 | 시간 복잡도 |
|--------|----------------------------|------------|
| `put(K key, V value)` | 키-값 쌍 추가 | `O(log N)` |
| `remove(Object key)` | 특정 키 삭제 | `O(log N)` |
| `get(Object key)` | 특정 키의 값 가져오기 | `O(log N)` |
| `containsKey(Object key)` | 특정 키 존재 여부 확인 | `O(log N)` |
| `containsValue(Object value)` | 특정 값 존재 여부 확인 | `O(N)` |
| `firstKey()` | 가장 작은 키 반환 | `O(log N)` |
| `lastKey()` | 가장 큰 키 반환 | `O(log N)` |
| `firstEntry()` | 가장 작은 키-값 쌍 반환 | `O(log N)` |
| `lastEntry()` | 가장 큰 키-값 쌍 반환 | `O(log N)` |
| `pollFirstEntry()` | 가장 작은 키-값 쌍 반환 및 삭제 | `O(log N)` |
| `pollLastEntry()` | 가장 큰 키-값 쌍 반환 및 삭제 | `O(log N)` |
| `higherKey(K key)` | 주어진 키보다 큰 키 중 최소값 반환 | `O(log N)` |
| `lowerKey(K key)` | 주어진 키보다 작은 키 중 최대값 반환 | `O(log N)` |
| `ceilingKey(K key)` | 주어진 키 이상인 키 중 최소값 반환 | `O(log N)` |
| `floorKey(K key)` | 주어진 키 이하인 키 중 최대값 반환 | `O(log N)` |
| `subMap(K fromKey, K toKey)` | 특정 범위의 키-값 쌍 반환 (`from` 이상, `to` 미만) | `O(log N) + O(M)` |
| `headMap(K toKey)` | 특정 키보다 작은 모든 키-값 쌍 반환 | `O(log N) + O(M)` |
| `tailMap(K fromKey)` | 특정 키보다 큰 모든 키-값 쌍 반환 | `O(log N) + O(M)` |
| `size()` | 요소 개수 반환 | `O(1)` |
| `isEmpty()` | 비어있는지 확인 | `O(1)` |

---

## 🔥 추가 설명
- **`O(log N)`**: `TreeSet`과 `TreeMap`은 **레드-블랙 트리(Red-Black Tree)**를 기반으로 하기 때문에, 대부분의 연산이 `O(log N)`에 수행됩니다.
- **`O(N)`**: `containsValue()`는 키를 이용한 탐색이 아니라 **모든 값을 순회해야 하므로 `O(N)`**입니다.
- **`O(log N) + O(M)`**: 특정 범위의 데이터를 가져오는 메서드(`subSet()`, `headSet()`, `tailSet()`)는 **검색하는 데 `O(log N)`, 데이터를 반환하는 데 `O(M)`**의 시간이 걸립니다.

🚀 **`TreeSet`은 중복 없는 정렬된 데이터 저장, `TreeMap`은 정렬된 키-값 저장이 필요할 때 사용하면 좋습니다!**


## 입력
```txt
5 4
7 6 8 6 5
```

## 출력
```txt
3
1
4
2
```

## 코드

```java


import java.io.*;
import java.util.*;

public class Main {
    static int INF = Integer.MAX_VALUE;
    static int[][] directions = {{-1,0},{0,1},{1,0},{0,-1}}; // 북 동 남 서
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringBuilder sb = new StringBuilder("");

        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        int[] A = new int[N];
        for (int i = 0 ; i < N; i ++) {
            A[i] = Integer.parseInt(st.nextToken());
        }

        TreeMap<Integer, TreeSet<Integer>> iceCreams = new TreeMap<>((a,b)->{
            return b-a;
        });

        for (int i = 0; i < N; i ++) {
            if (!iceCreams.containsKey(A[i])) {
                iceCreams.put(A[i], new TreeSet<>());
                iceCreams.get(A[i]).add(i+1);
            } else {
                iceCreams.get(A[i]).add(i+1);
            }
        }

        bw.write(steel(iceCreams, M).toString().trim());
        bw.flush();
        bw.close();
        br.close();
    }

    public static StringBuilder steel (TreeMap<Integer, TreeSet<Integer>> iceCreams, int M) {
        int cnt = 0;
        StringBuilder sb = new StringBuilder("");
        boolean rage = false;
        while (!iceCreams.isEmpty()) {
            Map.Entry<Integer, TreeSet<Integer>> cur = (iceCreams.pollFirstEntry());
            while (!cur.getValue().isEmpty() && cnt < M) {
                if (rage) {
                    sb.append(cur.getValue().pollLast()).append("\n");
                    if (cur.getKey() % 7 == 0) {
                        rage = !rage;
                    }
                    cnt ++;
                    if (cnt == M) {
                        return sb;
                    }
                } else {
                    sb.append(cur.getValue().pollFirst()).append("\n");
                    if (cur.getKey() % 7 == 0) {
                        rage = !rage;
                    }
                    cnt ++;
                    if (cnt == M) {
                        return sb;
                    }
                }
            }

        }
        return sb;
    }

}
```