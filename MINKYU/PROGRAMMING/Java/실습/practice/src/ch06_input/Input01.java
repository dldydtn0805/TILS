package ch06_input;

import java.io.*;
import java.util.StringTokenizer;

// 01 - 입력
// BufferedReader
public class Input01 {
    // 키보드 입력 받기
    // I/O와 관련된 예외 처리를 위해 throws IOException 조건 추가
    public static void main(String[] args) throws IOException {
        // 버퍼리더 타입의 br 변수 만들기
        // BufferReader의 메모리 영역 할당(인스턴스화)
        // 통로 : InputStreamReader
        // System.in을 인자로 받아 사용자가 현재 시스템에서 값을 받음을 지정
        BufferedReader br = new BufferedReader(new InputStreamReader((System.in)));

        // split() vs StringTokenizer.nextToken()

        /*
        input이 A B C D B일 경우
        String[] s = br.readLine().split("")
        - 문자열로 입력을 받고, split을 통해 공백을 제거
        - s = { "A", "B", "C", "D", "E" }

        StringTokenizer st = new StringTokenizer(br.readLine());
        - String A = st.nextToken(); // A
        - String B = st.nextToken(); // B
        입력받은 한 줄이 int형으로 받고 싶을 경우
        - int n = Integer.parseInt(st.nextToken());
        - int m = Integer.parseInt(st.nextToken()); 이런 식으로
        */

        // StringTokenizer : 버퍼 단점(줄바꿈 밖에 구분을 못함) 보완
        // .nextToken() : 저장된 토큰값을 불러오고 삭제
        // br.readLine() : 사용자에게서 한 줄 입력값 받기
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        // 받은 입력값을 Integer로 변경해야 할 경우
        int n = Integer.parseInt(st.nextToken());

    }
}
