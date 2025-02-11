package ch02_operator;

// 연산자 - 01
// 산술 연산자
// 증감 연산자
public class Oper01 {
    public static void main(String[] args) {
        // 1. 산술 연산자
        // +, -, *, /, %
        int a = 5;
        int b = 3;
        int plus = a + b;
        int minus = a - b;
        int multiply = a * b;
        int divide = a / b;
        int rest = a % b;
        System.out.println("a + b = " + plus);
        System.out.println("a - b = " +minus);
        System.out.println("a * b = " +multiply);
        System.out.println("a / b = " +divide);
        System.out.println("a % b = " +rest);

        /*
        산술 연산 주의사항(나눗셈)
        - 0으로 나누기 : 수학에서 허용 X
        - 0으로 나눌 경우, 프로그램 오류 발생
        Exception in thread "main" java.lang.ArithmeticException: / by zero at
        */

        /*
        +는 두 문자열을 합치기 위해 사용 가능
        string1 + string2
        */
        String str1 = "ja";
        String str2 = "va";
        String java = str1 + str2;
        System.out.println("String : " + java);

        // 문자열과 숫자를 더할 경우, 숫자가 문자열로 인식된다.
        System.out.println(java + a); // java5

        /*
        연산자 우선순위
        1. 괄호
        - ()
        2. 단항 연산자
        - ++, --, !, ~, new, (type)
        3. 산술 연산자
        - *, /, %
        - +, -
        4. shift 연산자
        - <<, >>, >>>
        5. 비교 연산자
        - <. <=, >, >=, instanceof
        6. 등식 연산자
        - ==, !=
        7. 비트 연산자
        - &, ^, |
        8. 논리 연산자
        - &&, ||
        9. 삼항 연산자
        - ? :
        10. 대입 연산자
        - =, +=, -=, *=, /=, %=
        */

        // 2. 증감 연산자
        // ++, --
        // 전위 연산자 : 증감 연산 수행 -> 다른 연산 수행(++변수, --변수)
        int num1 = 1;
        int num2 = 2;
        System.out.println(++num1); // num1 = num1 + 1 = 2 -> println(num1) = 2
        System.out.println(--num2); // num2 = num2 - 1 = 1-> println(num2) = 1
        // 후위 연산자 : 다른 연산 수행 -> 증감 연산 수행(변수++, 변수--)
        System.out.println(num1++); // println(num1) = 2 -> num1 = num1 + 1 = 3
        System.out.println(num2--); // println(num2) = 1 -> num2 = num2 - 1 = 0
    }
}
