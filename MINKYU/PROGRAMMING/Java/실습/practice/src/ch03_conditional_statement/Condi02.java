package ch03_conditional_statement;

// 조건문 - 02
// switch
public class Condi02 {
    public static void main(String[] args) {
        // switch
        /*
        switch (조건값) {
           case 값1:
               // 조건값 == 값1일 경우 실행되는 코드;
               break;
           case 값2:
               // 조건값 == 값2일 경우 실행되는 코드;
               break;
           case 값3:
               // 조건값 == 값3일 경우 실행되는 코드;
               break;
           default:
               // 위의 case에 걸리지 않은 경우 실행되는 코드;
               break;
        }
        */

        int grade = 2;
        int coupon; // 등급에 따라

        // grade가 조건의 값
        switch (grade) {
            // grade == 1일 경우
            case 1:
                coupon = 1000;
                break;
            // grade == 2일 경우
            case 2:
                coupon = 2000;
                break;
            // grade == 3일 경우
            case 3:
                coupon = 3000;
                break;
            // grade가 1, 2, 3이 아닐 경우
            default:
                coupon = 500;
                break;
        }
        // switch문에서 여러 조건에 같은 실행 코드를 넣고 싶다면?
        /*
        case 조건값1:
        case 조건값2:
            // 조건식이 조건값1 또는 조건값2중 한 값과 동일할 경우 실행되는 코드
        */


        // Java14의 새로운 switch문
        /*
        변수타입 변수 = switch (조건값) {
            case 값1 -> 변수값1;
            case 값2 -> 변수값2;
            case 값3 -> 변수값3;
            default -> 변수값;
        }
        */
    }
}
