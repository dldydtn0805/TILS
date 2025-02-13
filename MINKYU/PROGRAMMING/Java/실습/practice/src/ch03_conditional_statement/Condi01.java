package ch03_conditional_statement;

// 조건문 - 01
// if
public class Condi01 {
    public static void main(String[] args) {
        // 1. if
        /*
        if (condition) {
            // 조건문이 참이 때 실행되는 코드
        }
        */
        int age = 20;
        if (age >= 18) {
            System.out.println("성인입니다.");
        }
        if (age < 18) {
            System.out.println("미성년자 입니다.");
        }

        // if - else
        /*
        if (condition) {
            // 조건문이 참일 때 실행되는 코드
        } else {
            // 조건문이 거짓일 때 실행되는 코드
        }
        */
        if (age >= 18) {
            System.out.println("성인입니다.");
        } else {
            System.out.println("미성년자 입니다.");
        }

        // if - else if - else
        // if - else를 더 편하게 사용하기 위한 조건문
        /*
        if (condition1) {
            // 조건문1이 참일 경우 실행되는 코드
        } else if (condition2) {
            // 조건문1이 거짓이고, 조건문2가 참일 경우 실행되는 코드
        } else if (condition3) {
            // 조건문1과 조건문2가 거짓이고, 조건문3이 참일 경우 실행되는 코드
        }
        */
        if (age < 0 || age > 200) {
            System.out.println("사람이 아닙니다.");
        }
        else if (age >= 18) {
            System.out.println("성인입니다.");
        }
        else if  (age < 18) {
            System.out.println("미성년자 입니다.");
        }

    }
}
