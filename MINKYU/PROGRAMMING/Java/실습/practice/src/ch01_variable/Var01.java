package ch01_variable;

// 변수 - 01
// 선언과 초기화
public class Var01 {
    public static void main(String[] args) {
        /*
        변수를 사용하지 않고 10을 100번 출력하려면?
        System.out.println(10);
        System.out.println(10);
        System.out.println(10);
        ....
        이렇게 엄청나게 수고를 들이며 작성해야 한다..

        물론 반복문이 있음! 하지만, 10을 100번 출력하다가 20을 50번 출력하고, 40을 120번 출력하고,,,
        이런 식으로 노가다를 해야 하는 경우?
        - 변수를 사용하여 더욱 편하게 출력 가능!
        */

        // 변수 선언
        // 컴퓨터의 메모리 공간을 확보하여, 해당 공간에 데이터를 저장 가능하게끔 한다.
        // 변수명을 통해 해당 메모리 공간에 접근 가능
        int a; // 숫자형 정수(integer)을 저장 가능한 데이터 저장소(변수) a를 선언.
        // 변수 초기화
        a = 10; // 숫자형 정수를 저장 가능한 변수 a에 데이터 타입이 일치하는 값(10)을 대입

        // 변수에 저장된 값 출력
        System.out.println(a); // int형 값을 저장하는 변수 a에 저장된 값을 출력하시오.
        int b;
        // 선언한 변수에 값을 대입하지 않고 출력할 경우
        // Variable 'b' might not have been initialized
        // 초기화 해주세요~
        // System.out.println(b);

        // 선언한 변수에 저장된 값을 변경할 수도 있다!
        a = 20;
        System.out.println(a);
    }
}
