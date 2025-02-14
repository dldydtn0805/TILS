package ch05_scope;

// 05 - 형 변환
// 형 변환
public class Scope02 {
    public static void main(String[] args) {
        // 형 변환
        // 1. 암묵적 형 변환 : 작은 범위에서 큰 범위로의 형 변환
        // 자동으로 됨
        // int -> long -> double
        int intValue = 10;
        long longValue;
        double doubleValue;

        longValue = intValue;   // longValue = (long) intValue; 라는 의미
        doubleValue = intValue; // doubleValue = (double) intValue; 라는 의미
        System.out.println(longValue);   // 10
        System.out.println(doubleValue); // 10.0

        doubleValue = 20L; // long(20L) -> double(20.0)
        // 2. 명시적 형 변환 : 큰 범위에서 작은 범위로의 형 변환
        // 오버플로우, 값 손실 등 주의
        double doubleValue2 = 1.5;
        int intValue2;
        intValue = (int) doubleValue; // 명시적 형 변환
        // intValue = doubleValue;는 컴파일 에러 발생

        // 형 변환 예제
        // 서로 같은 타입간의 계산은 같은 타입의 결과를 낸다
        // 서로 다른 타입간의 계산은 큰 범위로 자동 형 변환이 된다
        int div1 = 3 / 2;
        // int / int -> int (1)
        System.out.println(div1);
        // int / int -> int (1)
        // 그걸 double로 형 변환 (1.0)
        double div2 = 3 / 2;
        System.out.println(div2);
        // double / int -> double (1.5)
        double div3 = 3.0 / 2;
        System.out.println(div3);
        // (double) int / int -> double / double -> double (1.5)
        double div4 = (double) 3 / 2;
        System.out.println(div4);
    }
}
