```java
// https://www.acmicpc.net/problem/4195

/*해설
어떤 사이트의 친구 관계가 생긴 순서대로 주어졌을때, 두사람의 친구 네트워크에 몇명이 있는지를 구하라.
친구 네트워크란 친구 관계만으로 이동할 수 있는 사이다.

Union Find를 사용해서 친구 네트워크를 실시간으로 갱신시킬 수 있다.

이번에 새로 배운건 ArrayList를 함부로 쓰면 메모리 초과가 날 수 있으므로 배열로 미리 선언하는것이 좋다는 것이다.
*/

/*입력
2
3
Fred Barney
Barney Betty
Betty Wilma
3
Fred Barney
Betty Wilma
Barney Betty
*/

/*출력
2
3
4
2
2
4
*/

import java.io.*;
import java.util.*;

public class Main {
    static Integer INF = Integer.MAX_VALUE;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        StringBuilder sb = new StringBuilder("");
        int T = Integer.parseInt(st.nextToken());
        for (int tc = 0; tc < T; tc++) {
            int F = Integer.parseInt(br.readLine());
            HashMap<String, Integer> getNum = new HashMap<>();
            int[] cnt = new int[F*2+1];
            int[] parents = new int[F*2+1];

            for (int i = 0; i < F; i ++) {
                st = new StringTokenizer(br.readLine());

                String A = st.nextToken();
                String B = st.nextToken();

                if (getNum.get(A) == null) {
                    getNum.put(A, getNum.size());
                    cnt[getNum.get(A)] = 1;
                    parents[getNum.get(A)] = getNum.get(A);
                }
                if (getNum.get(B) == null) {
                    getNum.put(B, getNum.size());
                    cnt[getNum.get(B)] = 1;
                    parents[getNum.get(B)] = getNum.get(B);
                }

                sb.append(String.valueOf(union(getNum.get(A), getNum.get(B), parents, cnt))+"\n");
//                System.out.println(union(getNum.get(A), getNum.get(B), parents, getCnt));
//                System.out.println(parents);
//                System.out.println(getCnt);
            }
        }
        bw.write(sb.toString().trim());
        bw.close();
        br.close();
    }

    public static int find (int X, int[] parents) {
        if (parents[X] == X) {
            return parents[X];
        }
        return parents[X] = find(parents[X], parents);
    }

    public static Integer union (int X, int Y, int[] parents, int[] cnt) {
        if (find(X, parents) != find(Y, parents)) {
            Integer value = cnt[find(X, parents)] + cnt[(find(Y, parents))];
            parents[find(X, parents)] = find(Y, parents);
            cnt[find(X, parents)] = value;
        }
        return cnt[find(X, parents)];
    }


}

/*
 * */
```