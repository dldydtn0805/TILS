## Source

https://www.acmicpc.net/problem/12905  
  
## Commentary
  
N명이 교싶의 앞에 모여서  원형으로 있다. 각 사람은 시계반대방향으로 0번부터 N-1번까지 있다  
  
캠프에 참가한 사람은 정직한 사람이거나 거짓말쟁이다.  
  
정직한 사람은 항상 사실만을 말하고, 거짓말쟁이는 항상 거짓말을 말한다  
  
백준은 사람들에게 오른쪽에 있는 사람이 거짓말쟁이인지 묻는 질문을 한다  
  
정직한 사람은 정직하게 거짓말쟁이는 거짓말로 대답을 한다.  
  
답변을 거부할 수도 있다  
  
사람들의 대답이 주어졌을떄, 그러한 대답이 나오는 정직한 사람과 거짓말쟁이의 조합이 존재하면, 거짓말쟁이 수의 최솟값을,  
  
가능한 조합이 없으면 -1을 출력하라  
  
---  
  
사람의 수 N이 주어진다  
  
(2 <= N <= 50)  
  
답변이 L인 경우, 거짓말쟁이, H인 경우 정직한 사람이라고 대답한 것이고, ?인경우 답변을 거부한 것이다  
  
입력으로 주어진 대답이 나오는 정직한 사람과 거짓말쟁이의 조합이 존재하면 거짓말쟁이 수의 최솟값을,  
  
가능한 조합이 없으면 -1을 출력하라  
  
---  

백트래킹으로 해를 구성하는 문제다.

초기 사람의 상태는 마지막 (N-1) 사람의 대답에 따라 결정된다.

curLying은 curIdx의 사람이 거짓말쟁이라면 true, 아니면 false다

totalLying은 curIdx 이전까지 거짓말쟁이의 수이다.

rootLying은 마지막 사람이 거짓말쟁이라면 true, 아니면 false다

res는, prunning을 위해 참조로 전달한다.

```java
// 마지막 사람이 처음 사람이 거짓말 쟁이라고 주장한 경우
if (students.charAt(N-1) == 'L') {  
	// 그 말이 참인 경우, 처음 사람은 거짓말쟁이고, 마지막 사람은 정직한 사람이다
	backtracking(students, 0, true, 0, false, res);  
	// 그말이 거짓인 경우, 처음 사람은 정직하고, 마지막 사람은 거짓말쟁이다
	backtracking(students, 0, false, 1, true, res);  
// 처음 사람이 정직한 사람이라고 주장한 경우, 
} else if (students.charAt(N-1) == 'H') {  
	// 그 말이 참인 경우, 처음 사람은 정직하고, 마지막 사람도 정직하다
	backtracking(students, 0, false, 0, false, res); 
	// ...
	backtracking(students, 0, true, 1, true, res);  
} else {  
	// 마지막 사람이 어떤 대답을 한지 모르기 때문에, 모든 상황을 가정한다
	backtracking(students, 0, true, 0, false, res);  
	backtracking(students, 0, false, 0, false, res);  
	backtracking(students, 0, true, 1, true, res);  
	backtracking(students, 0, false, 1, true, res);  
}  
```


핵심 로직은, curLying이 true인지 여부에 따라 재귀를하며 totalLying을 더해간다.

```java
// 거짓말쟁이라면 totalLying+1을 해야한다
if (curLying) {  
	// 거짓말쟁이의 주장과 반대로 다음사람의 상태를 둔다
	if (students.charAt(curIdx) == 'L') {  
		backtracking(students, curIdx+1, false, totalLying+1, rootLying, res);  
	} else if (students.charAt(curIdx) == 'H'){  
		backtracking(students, curIdx+1, true, totalLying+1, rootLying, res);  
	} else {  
		// 대답을 거부한 경우, 모든 조합을 고려한다.
		backtracking(students, curIdx+1, false, totalLying+1, rootLying, res);  
		backtracking(students, curIdx+1, true, totalLying+1, rootLying, res);  
	}  
// 정직한사람이라면
} else {  
	// 정직한 사람의 주장 그대로 다음 사람의 상태를 둔다
	if (students.charAt(curIdx) == 'L') {  
		backtracking(students, curIdx+1, true, totalLying, rootLying, res);  
	} else if (students.charAt(curIdx) == 'H'){  
		backtracking(students, curIdx+1, false, totalLying, rootLying, res);  
	} else {  
		// ...
		backtracking(students, curIdx+1, false, totalLying, rootLying, res);  
		backtracking(students, curIdx+1, true, totalLying, rootLying, res);  
	}  
}  
```

그리고 마지막 사람까지 다다른 경우, 

```java
if (curIdx == students.length()-1) {  
	if (curLying == rootLying) {  
		res[0] = Math.min(res[0], totalLying);  
	}  
	return;  
}  
```

현재 거짓말을 하는 상태인지 여부가, 처음에 판단한 마지막 사람이 거짓말을 했는지 여부와 같을 경우만 올바른 조합이므로 갱신을 해준다.

그리고 `res[0] < totalLying`이라면 탐색할 가치가 없으므로 탐색하지 않는다

## Input

```
3  
LLH
```
  
## Output

```
1
```

## Source Code

```java
import java.io.*;  
import java.util.*;  
public class Main {  
    public static void main(String[] args) throws IOException {  
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));  
        int N = Integer.parseInt(br.readLine());  
        String students = br.readLine();  
        int[] res = {Integer.MAX_VALUE};  
        if (students.charAt(N-1) == 'L') {  
            backtracking(students, 0, true, 0, false, res);  
            backtracking(students, 0, false, 1, true, res);  
        } else if (students.charAt(N-1) == 'H') {  
            backtracking(students, 0, true, 1, true, res);  
            backtracking(students, 0, false, 0, false, res);  
        } else {  
            backtracking(students, 0, true, 0, false, res);  
            backtracking(students, 0, false, 0, false, res);  
            backtracking(students, 0, true, 1, true, res);  
            backtracking(students, 0, false, 1, true, res);  
        }  
        System.out.print(res[0] == Integer.MAX_VALUE ? -1 : res[0]);  
        bw.close();  
        br.close();  
    }  
    public static void backtracking (String students, int curIdx, boolean curLying, int totalLying, boolean rootLying, int[] res) {  
        if (curIdx == students.length()-1) {  
            if (curLying == rootLying) {  
                res[0] = Math.min(res[0], totalLying);  
            }  
            return;  
        }  
        if (res[0] < totalLying) return;  
        if (curLying) {  
            if (students.charAt(curIdx) == 'L') {  
                backtracking(students, curIdx+1, false, totalLying+1, rootLying, res);  
            } else if (students.charAt(curIdx) == 'H'){  
                backtracking(students, curIdx+1, true, totalLying+1, rootLying, res);  
            } else {  
                backtracking(students, curIdx+1, false, totalLying+1, rootLying, res);  
                backtracking(students, curIdx+1, true, totalLying+1, rootLying, res);  
            }  
        } else {  
            if (students.charAt(curIdx) == 'L') {  
                backtracking(students, curIdx+1, true, totalLying, rootLying, res);  
            } else if (students.charAt(curIdx) == 'H'){  
                backtracking(students, curIdx+1, false, totalLying, rootLying, res);  
            } else {  
                backtracking(students, curIdx+1, false, totalLying, rootLying, res);  
                backtracking(students, curIdx+1, true, totalLying, rootLying, res);  
            }  
        }  
    }  
}  
/*  
50  
??????????????????????????????????????????????????  
 * */
```
