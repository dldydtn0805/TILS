package ch01_variable;

// 변수 - 03
// 변수 타입
public class Var03 {
    public static void main(String[] args) {
        // 1. Literal

        // 개발자가 직접 작성한 고정된 값
        int a = 100;         // 정수 리터럴
        double b = 10.5;     // 실수 리터럴
        boolean c = true;    // 불리언 리터럴
        char d = 'A';        // 단일 문자 리터럴
        String e = "Hello!"; // 문자열 리터럴

        // 2. 숫자 타입

        // 정수형(byte, short, int, long)
        // byte : -127 ~ 127(1byte, 2^8)
        // short : -32,768 ~ 32,767(2byte, 2^16)
        // int : -2,147,483,648 ~ 2,147,483,647(4byte, 2^32)
        // long : -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807(8byte, 2^64)

        // 실수형(float, double)
        // float : -3.4E38 ~ 3.4E38, 7자리 정밀도(4byte, 2^32)
        // double : -1.7E308 ~ 1.7E308, 15자리 정밀도(8byte, 2^64)


        // 3. 기타(boolean, char, String)

        // boolean : true / false (1byte)
        // char : 단일 문자(1byte)
        // String : 문자열(길이에 따른 동적 크기)
    }
}
