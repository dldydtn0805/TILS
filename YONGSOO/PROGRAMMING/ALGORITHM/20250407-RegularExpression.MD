## Source

https://www.acmicpc.net/problem/1013

## Commentary


전파의 기본 단위는 0, 1 두가지로 구성되어 있으며,

x + () 는 임의의 개수 (최소 1개) x의 반복으로 이루어진 전파의 집합을 나타낸다

- (xyz) + ()는 괄호 내의 xyz 의 반복으로 이루어진 전파의 집합을 나타낸다

1+ = {1, 11, 111, 1111, 11111, ...}

10+ = {10, 100, 1000, 10000, 100000, ...}

(01)+ = {01, 0101, 010101, 01010101, 0101010101, ....}

10+11 = {1011, 10011, 100011, 1000011, ....}

(10+1)+ = {101, 1001, 10001, 1011001, 1001101, 100011011000001, ...}

{x | y} 는 x 혹은 y를 의미하는 것으로, {0 + | 1 +} 는 {0, 1, 00, 11, 000, ...} 의 집합이다


다음은 수신한 전파 기록의 패턴 분석이다

(100+1+ | 01)+

다양한 전파 기록중에서 위의 패턴을 지니는 전파를 가려내고자 한다

---

테스트 케이스의 개수 T가 주어진다

각 테스트 케이스에 대해 전파를 표현하는 {0, 1} 만으로 이루어진 문자열이 공백 없이 주어진다

문자열의 길이는 (1 <= N <= 2*10^2) 의 범위를 갖는다


각 테스트 케이스에 대해 제시한 패턴이면 "YES" 그렇지 않은 경우는 "NO"를 출력한다

---

우리가 원하는 전파기록은 (100+1+ | 01)+ 패턴을 가져야한다

해당 패턴의 집합은 다음과 같다

{01, 0101, 1001, 10001, 10011, 100011, 010101, ... }

문자열의 길이 제한은 2*10^2 이다.

N이 최대 길이가 200개일떄, 위 패턴은 총 몇개가 있을 수 있는가?

너무 많이 필요할거같은데...

예전에 이런 문제를 푼적이 있었다

그때는 문자열 표현식을 사용해서 일치하는지 여부를 판단했던 것 같은데


# 📘 Java 정규 표현식(Regular Expressions) 전체 문법 정리

---

## 🔤 기본 문자 클래스

| 표현식 | 의미                           | 설명 |
|--------|--------------------------------|------|
| `.`    | 임의의 한 문자 (줄바꿈 제외)       | 모든 문자 1개 |
| `\d`   | Digit (숫자)                   | `[0-9]` |
| `\D`   | Digit 아님                     | `[^0-9]` |
| `\w`   | Word character                | `[a-zA-Z0-9_]` |
| `\W`   | Word character 아님            | `[^a-zA-Z0-9_]` |
| `\s`   | Whitespace (공백)             | space, tab, 줄바꿈 등 |
| `\S`   | 공백 아님                      | `[^ \t\n\x0B\f\r]` |

---

## 🔁 수량자 (Quantifiers)

| 표현식     | 의미                     |
|------------|--------------------------|
| `*`        | 0번 이상 반복             |
| `+`        | 1번 이상 반복             |
| `?`        | 0번 또는 1번              |
| `{n}`      | n번 반복                  |
| `{n,}`     | n번 이상 반복             |
| `{n,m}`    | n~m번 반복                |

---

## 📦 문자 클래스 (Character Classes)

| 표현식      | 의미                                |
|-------------|-------------------------------------|
| `[abc]`     | a, b, c 중 하나                      |
| `[^abc]`    | a, b, c 제외한 문자                  |
| `[a-z]`     | a부터 z까지의 소문자                 |
| `[A-Z]`     | A부터 Z까지의 대문자                 |
| `[0-9]`     | 0부터 9까지의 숫자                   |
| `[a-zA-Z]`  | 모든 영문자                          |
| `[a-zA-Z0-9_]` | 모든 영숫자 + 언더스코어 `_`      |

---

## 🎯 경계 (Anchors)

| 표현식 | 의미                         |
|--------|------------------------------|
| `^`    | 문자열의 시작                 |
| `$`    | 문자열의 끝                   |
| `\b`   | 단어 경계 (word boundary)    |
| `\B`   | 단어 경계 아님                |
| `\A`   | 입력의 시작                   |
| `\Z`   | 입력의 끝                     |

---

## 🔗 그룹과 캡처 (Groups & Capturing)

| 표현식        | 의미                              |
|---------------|-----------------------------------|
| `(abc)`       | abc를 하나의 그룹으로 캡처         |
| `(?:abc)`     | 캡처하지 않는 그룹 (non-capturing) |
| `(?=abc)`     | 앞쪽 긍정 탐색 (lookahead)         |
| `(?!abc)`     | 앞쪽 부정 탐색 (negative lookahead) |
| `(?<=abc)`    | 뒤쪽 긍정 탐색 (lookbehind)        |
| `(?<!abc)`    | 뒤쪽 부정 탐색 (negative lookbehind) |

---

## 🔀 OR 연산자 (Alternation)
- `a|b` :  a 또는 b                 
- `(abc|def)` : abc 또는 def         

---

## 🧪 자바에서의 사용 방법

### 1. `String.matches()`

```java
"abc123".matches("[a-z]+\d+"); // true
```

### 2. `Pattern` & `Matcher`

```java
Pattern pattern = Pattern.compile("\\d{3}-\\d{4}-\\d{4}");
Matcher matcher = pattern.matcher("전화번호는 010-1234-5678입니다.");
if (matcher.find()) {
    System.out.println(matcher.group()); // 010-1234-5678
}
```

### 3. 반복 검색

```java
while (matcher.find()) {
    System.out.println(matcher.group());
}
```

### 4. 치환

```java
String result = input.replaceAll("\\d", "*");
```

---

## 🧼 자주 쓰는 실전 예제

| 패턴 | 설명 |
|------|------|
| `\d{3}-\d{4}-\d{4}` | 휴대폰 번호 (010-1234-5678) |
| `^[a-zA-Z0-9_]{5,12}$` | 아이디: 5~12자 영문/숫자/_ |
| `\w+@\w+\.\w+` | 이메일 주소 |
| `\d+(,\d{3})*` | 천 단위 구분 쉼표 포함 숫자 (ex: 1,000,000) |


## Logic

코드 로직은 다음과 같다

- ^ : 문자열의 시작

- (...) : 그룹화

- 100{1,}1{1,} : "10"으로 시작하고, 그다음에 하나 이상의 "0"이 오고, 다음에 하나 이상의 "1"이 오는 패턴

- | : 또는

- 01 : 문자열 "01"

- {1,} : 앞의 그룹이 한번 이상 반복

- $ : 문자열의 끝

이 코드는 다음 패턴 중 하나 이상이 반복되는 문자열을 확인한다

1. "10" 다음에 하나 이상의 0, 그리고 하나 이상의 1이 오는 패턴
2. "01" 패턴



## Input
```
3
10010111
011000100110001
0110001011001
```

## Output
```
NO
NO
YES
```

## Source Code

```java

import java.io.*;
import java.util.*;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder("");

        while (T-- > 0) {
            String signal = br.readLine();
            sb.append(solve(signal) ? "YES" : "NO").append("\n");
        }

        bw.write(sb.toString());
        bw.close();
        br.close();
    }

    public static boolean solve (String signal) {
        // (100+1+ | 01)+
        Pattern pattern = Pattern.compile("^(100{1,}1{1,}|01){1,}$");
        return pattern.matcher(signal).matches();
    }
}

```