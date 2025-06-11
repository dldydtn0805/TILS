## Source

https://www.acmicpc.net/problem/2658  
  
## Commentary

직각 이등변 삼각형을 찾는 문제다  
  
조건은 다음과 같다  
  
1. 주어진 `10*10`의 입력에서 1로 면이 채워진다  
  
2. 직각 이등변 삼각형은 1개다  
  
3. 직각 이등변 삼각형의 적어도 한변은 수평선 혹은 수직선이다  
  
이 조건에 만족하는지 여부를 판단하면 된다  

DFS로 변을 돌며 수직이며 삼각형이며 이등변인지 판단해주었다.

내부와 외부의 상태가 정상인지 여부도 DFS로 판단해주었다.


## Input

```
0000000000  
0000001000  
0000011000  
0000111000  
0001111000  
0000111000  
0000011000  
0000001000  
0000000000  
0000000000  
```
## Output

```
2 7  
5 4  
8 7  
```

## Source Code


```java
  
import java.util.*;  
import java.io.*;  
  
public class Main {  
    static int[][] arr;  
    static int N = 10;  
    static boolean[][] visited;  
    static boolean[][] insideVisited;  
    static boolean[][] outsideVisited;  
    static int angle;  
    static int[] sides;  
    static boolean vertical;  
    static int si, sj;  
    static boolean triangle;  
    static int[][] ans;  
    static int cnt;  
    static boolean empty;  
    static int startDir;  
    static boolean outside;  
    static int[][] insideDirections = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};  
    static int[][] directions = {{0, -1}, {-1, -1}, {-1, 0}, {-1, 1}, {0, 1}, {1, 1}, {1, 0}, {1, -1}};  
  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        arr = new int[N][N];  
        // si, sj = 외부에 드러난 변의 한 점  
        si = -1;  
        sj = -1;  
        ArrayList<int[]> list = new ArrayList<>();  
        visited = new boolean[N][N];  
        insideVisited = new boolean[N][N];  
        outsideVisited = new boolean[N][N];  
        angle = 0;  
        vertical = false;  
        triangle = false;  
        empty = false;  
        sides = new int[3];  
        outside = false;  
  
        Arrays.fill(sides, 2);  
        for (int i = 0; i < N; i++) {  
            String line = br.readLine();  
            for (int j = 0; j < N; j++) {  
                arr[i][j] = Integer.parseInt(String.valueOf(line.charAt(j)));  
                if (arr[i][j] == 1 && si == -1) {  
                    si = i;  
                    sj = j;  
                    visited[si][sj] = true;  
                    cnt = 1;  
                }  
            }  
        }  
        ans = new int[3][2];  
        ans[0][0] = si + 1;  
        ans[0][1] = sj + 1;  
  
        for (int i = 0; i < 8; i++) {  
            int[] dir = directions[i];  
            int ni = si + dir[0];  
            int nj = sj + dir[1];  
            if (inBound(ni, nj) && !visited[ni][nj] && !isInside(ni, nj) && arr[ni][nj] == 1) {  
                startDir = i;  
                search(ni, nj, i, si, sj);  
                break;  
            }  
        }  
        Arrays.sort(ans, (a, b) -> {  
            return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];  
        });  
        if (vertical && triangle && isosceles()) {  
            checkTriangleInside();  
            for (int[] dot : ans) {  
                int dotX = dot[0] - 1;  
                int dotY = dot[1] - 1;  
                for (int[] dir : insideDirections) {  
                    int ni = dotX + dir[0];  
                    int nj = dotY + dir[1];  
                    if (inBound(ni, nj) && !outsideVisited[ni][nj] && !visited[ni][nj] && arr[ni][nj] == 0 && !isInsideTriangle(ni, nj)) {  
                        checkOutside(ni, nj);  
                    }  
                }  
            }  
        }  
        if (vertical && triangle && isosceles() && !empty && !outside) {  
            System.out.println(ans[0][0] + " " + ans[0][1]);  
            System.out.println(ans[1][0] + " " + ans[1][1]);  
            System.out.println(ans[2][0] + " " + ans[2][1]);  
        } else {  
            System.out.println(0);  
        }  
        br.close();  
    }  
  
    // 삼각형의 무게중심 계산  
    private static int[] getCentroid() {  
        int sumX = 0, sumY = 0;  
        for (int i = 0; i < 3; i++) {  
            sumX += ans[i][0] - 1; // 1-based에서 0-based로 변환  
            sumY += ans[i][1] - 1;  
        }  
        return new int[]{sumX / 3, sumY / 3};  
    }  
  
    private static void checkTriangleInside() {  
        int[] centroid = getCentroid();  
        int centerX = centroid[0];  
        int centerY = centroid[1];  
        if (sides[0] == 2 && sides[1] == 2 && sides[2] == 2) return;  
        if (inBound(centerX, centerY) && !visited[centerX][centerY]) {  
            if (arr[centerX][centerY] == 1) {  
                checkInside(centerX, centerY);  
            } else {  
                empty = true;  
            }  
        }  
  
        for (int[] dot : ans) {  
            int dotX = dot[0] - 1;   
            int dotY = dot[1] - 1;  
  
            for (int[] dir : insideDirections) {  
                int ni = dotX + dir[0];  
                int nj = dotY + dir[1];  
  
                if (inBound(ni, nj) && !insideVisited[ni][nj] && !visited[ni][nj]) {  
                    if (arr[ni][nj] == 1 && isInsideTriangle(ni, nj)) {  
                        checkInside(ni, nj);  
                    } else if (arr[ni][nj] == 0 && isInsideTriangle(ni, nj)) {  
                        empty = true;  
                    }  
                }  
            }  
        }  
    }  
  
    // 점이 삼각형 내부에 있는지 확인 (Barycentric coordinates 사용)  
    private static boolean isInsideTriangle(int px, int py) {  
        int x1 = ans[0][0] - 1, y1 = ans[0][1] - 1;  
        int x2 = ans[1][0] - 1, y2 = ans[1][1] - 1;  
        int x3 = ans[2][0] - 1, y3 = ans[2][1] - 1;  
  
        double denom = (double)((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));  
        if (Math.abs(denom) < 1e-10) return false; // 삼각형이 아님  
  
        double a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / denom;  
        double b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / denom;  
        double c = 1 - a - b;  
  
        return a >= 0 && b >= 0 && c >= 0;  
    }  
  
  
    private static void checkOutside(int ci, int cj) {  
        outsideVisited[ci][cj] = true;  
        for (int[] dir : insideDirections) {  
            int ni = ci + dir[0];  
            int nj = cj + dir[1];  
            if (inBound(ni, nj) && !visited[ni][nj] && !outsideVisited[ni][nj]) {  
                if (arr[ni][nj] == 0) {  
                    checkOutside(ni, nj);  
                } else if (arr[ni][nj] == 1) {  
                    outside = true;  
                }  
            }  
  
        }  
    }  
  
    private static void checkInside(int ci, int cj) {  
        insideVisited[ci][cj] = true;  
        cnt ++;  
        for (int[] dir : insideDirections) {  
            int ni = ci + dir[0];  
            int nj = cj + dir[1];  
            if (inBound(ni, nj) && !visited[ni][nj] && !insideVisited[ni][nj]) {  
                if (arr[ni][nj] == 1) {  
                    checkInside(ni, nj);  
                } else {  
                    empty = true;  
                }  
            }  
  
        }  
    }  
  
  
    // 이등변  
    private static boolean isosceles() {  
        return ((sides[0] == sides[1]) && sides[0] <= sides[2]  || (sides[1] == sides[2]) && sides[1] <= sides[0] || (sides[2] == sides[0] && sides[0] <= sides[1]));  
    }  
  
    // 정상 범위  
    private static boolean inBound(int row, int col) {  
        return (0 <= row && row < N && 0 <= col && col < N);  
    }  
  
    // 삼각형의 변 찾기  
    private static void search(int row, int col, int d, int pi, int pj) {  
        if (angle >= 3) {  
            triangle = false;  
            return;  
        }  
        visited[row][col] = true;  
        cnt ++;  
        int fi = row + directions[d][0];  
        int fj = col + directions[d][1];  
        // 직진 탐색  
        if (inBound(fi, fj) && (!visited[fi][fj]) && !isInside(fi, fj) && arr[fi][fj] == 1) {  
            sides[angle]++;  
            search(fi, fj, d, row, col);  
        } else {  
            // 사방 탐색  
            for (int i = 0; i < 8; i++) {  
                int[] dir = directions[i];  
                int ni = row + dir[0];  
                int nj = col + dir[1];  
                if (inBound(ni, nj) && !isInside(ni, nj) && arr[ni][nj] == 1) {  
                    if (!visited[ni][nj]) {  
                        if (angle >= 2) continue;  
                        angle++;  
                        ans[angle][0] = row + 1;  
                        ans[angle][1] = col + 1;  
                        int minD2 = Math.min(d, i);  
                        int maxD2 = Math.max(d, i);  
                        if (minD2 + 2 == maxD2 || (maxD2 + 2) % 8 == minD2) {  
                            if (vertical) {  
                                triangle = false;  
                                return;  
                            }  
                            vertical = true;  
                        }  
                        search(ni, nj, i, row, col);  
                        break;  
                    } else {  
                        if (ni == si && nj == sj) {  
                            if (ni == pi && nj == pj) continue;  
                            int minD = Math.min(startDir, i);  
                            int maxD = Math.max(startDir, i);  
                            if (minD + 2 == maxD || (maxD + 2) % 8 == minD) {  
                                if (vertical) {  
                                    triangle = false;  
                                    return;  
                                }  
                                vertical = true;  
                            }  
                            int minD2 = Math.min(d, i);  
                            int maxD2 = Math.max(d, i);  
                            if (minD2 + 2 == maxD2 || (maxD2 + 2) % 8 == minD2) {  
                                if (vertical) {  
                                    triangle = false;  
                                    return;  
                                }  
                                vertical = true;  
  
                            }  
                            if (angle < 2) {  
                                angle++;  
                                ans[angle][0] = row + 1;  
                                ans[angle][1] = col + 1;  
                                triangle = true;  
                                return;  
                            } else if (angle == 2) {  
                                sides[angle]++;  
                                triangle = true;  
                                angle++;  
                                return;  
                            } else {  
                                triangle = false;  
                                return;  
                            }  
                        }  
  
                    }  
  
                }  
            }  
        }  
    }  
  
    private static boolean isInside(int row, int col) {  
        for (int[] d : insideDirections) {  
            int ni = row + d[0];  
            int nj = col + d[1];  
            if (inBound(ni, nj)) {  
                if (arr[ni][nj] == 0) return false;  
            } else {  
                return false;  
            }  
        }  
        return true;  
    }  
}

```
