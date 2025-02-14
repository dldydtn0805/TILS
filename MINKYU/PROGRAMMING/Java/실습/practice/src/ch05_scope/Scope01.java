package ch05_scope;

// 05 - 형 변환
// 지역 변수와 스코프
public class Scope01 {
    public static void main(String[] args) {
        // 스코프 : 변수의 생존 범위
        // 효율적인 메모리 사용
        // 코드 단순화
        int m = 10; // main {} 코드 블록에서 선언

        if (true) {
            int x = 20; // if {} 코드 블록에서 선언
            System.out.println(m); // if 내부에서 외부에 선언된 변수 m 사용 가능
            System.out.println(x); // 얘는 당연히 사용 가능


        } // if문 종료 -> x 소멸

        // System.out.println(x); : 실행 안됨
        System.out.println(m);
    } // main 블록 종료 -> m 소멸
}
