package ch02_operator;

// 연산자 - 03
// 논리 연산자
public class Oper03 {
    public static void main(String[] args) {
        // 4. 논리 연산자
        // &&(AND), ||(OR), !(NOT)
        // 결과값 : true or false (boolean)

        // && (AND)
        System.out.println(true && true);   // true
        System.out.println(true && false);  // false
        System.out.println(false && true);  // false
        System.out.println(false && false); // false
        // || (OR)
        System.out.println(true || true);   // true
        System.out.println(true || false);  // true
        System.out.println(false || true);  // true
        System.out.println(false || false); // false
        // ! (NOT)
        System.out.println(!true);          // false
        System.out.println(!false);         // true

        // 논리연산자 활용
        // (조건식1) (논리연산자) (조건식2) 형태로 사용 가능
        int a = 10;
        boolean result1 = a > 5 && a > 15;
        boolean result2 = a > 5 || a > 15;
        boolean result3 = !(a > 5);
        System.out.println("a > 5 && a > 15 : " + result1);
        System.out.println("a > 5 || a > 15 : " + result2);
        System.out.println("!(a < 5) : " + result3);
    }
}
