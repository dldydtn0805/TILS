package ch02_operator;

// 연산자 - 02
// 비교 연산자
public class Oper02 {
    public static void main(String[] args) {
        // 3. 비교 연산자
        // ==, !=, >, <, >=, <=
        // 결과값 : true or false(boolean)
        int a = 2;
        int b = 3;
        System.out.println("a == b 결과 : " + (a == b));
        System.out.println("a != b 결과 : " + (a != b));
        System.out.println("a > b 결과 : " + (a > b));
        System.out.println("a < b 결과 : " + (a < b));
        System.out.println("a >= b 결과 : " + (a >= b));
        System.out.println("a <= b 결과 : " + (a <= b));

        // 문자열 비교(리터럴 또는 문자열을 저장한 변수)
        // 문자열1.equals(문자열2) : 문자열1과 문자열2가 같은지에 대한 여부
        String str1 = "hello";
        String str2 = "hEllo";
        boolean result1 = "hello".equals("hello");
        boolean result2 = str1.equals("hello");
        boolean result3 = str2.equals("hello");
        boolean result4 = str1.equals(str2);
        System.out.println("\"hello\".equals(\"hello\") : " + result1);
        System.out.println("str1.equals(\"hello\") : " + result2);
        System.out.println("str2.equals(\"hello\"); : " + result3);
        System.out.println("str1.equals(str2); : " + result4);

        // 4. 논리 연산자
        // &&(AND), ||(OR), !(NOT)
        // 5. 대입 연산자
        // =, +=, -=, *=, /=, %=
        // 6. 삼항 연산자
        // 조건식 ? 참일경우 : 거짓일경우


    }
}
