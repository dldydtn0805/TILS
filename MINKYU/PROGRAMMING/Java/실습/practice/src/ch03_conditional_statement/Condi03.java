package ch03_conditional_statement;

// 조건문 - 03
// 삼항 연산자
public class Condi03 {
    public static void main(String[] args) {
        // 삼항 연산자
        // 변수타입 변수 = (조건) ? 참일경우표현식 : 거짓일경우표현식
        // if문을 편리하게 사용하는 방법(if - else 구조와 동일)
        int age = 15;
        String state = (age >= 18) ? "성인" : "미성년자";
        System.out.println(state);
    }
}
