package ch04_loop_statement;

// 4. 반복문
// while, do-while, for
public class Loop01 {
    public static void main(String[] args) {
        // 1. while
        /*
        while (조건식) {
            // 조건식이 참일 때 실행할 코드
        }
        */
        // while문 주의사항 : 무한루프를 방지해야 한다.(break 걸어주기)
        int cnt = 0;
        while (cnt <= 5) {
            cnt += 1;
            System.out.println(cnt);
        }

        // 2. do-while
        // while문의 조건식을 확인하기 전에 반드시 한 번은 코드를 실행하는 반복문
        // do 내부 실행코드 실행 -> while문 들어감
        /*
        do {
            // 실행 코드;
        }
        while (조건식);
        */
        int num = 0;
        do {
            System.out.println(num);
            num += 1;
        } while (num < 0);

        // break : 반복문을 즉시 종료하고 나가기 위해 사용하는 키워드
        // continue : 반복문 내부의 실행되지 않은 코드를 건너뛰고 다음 반복으로 넘어가기 위해 사용하는 키워드
        // 모든 반복문(while, do-while, for)에서 활용 가능
        int result = 0;
        while (result < 10) {
            if (result == 3) {
                break;
            }
            result += 1;
        }
        int val = 0;
        while (result < 10) {

            val += 1;
            if (val == 2) {
                continue;
            }
            result += val;
        }
        System.out.println(result);

        // 3. for
        /*
        for (초기식; 조건식; 증감식) {
            // 실행 코드
        }
        */
        int i;
        for (i = 0; i < 10; i++) {
            System.out.println(i);
        }
        // 초기식, 조건식, 증감식은 생략 가능(세미콜론은 붙여야 함)
        // for (;;) { // 실행 코드 }

        // 중첩 반목문
        /*
        for (초기식1; 조건식1; 증감식1) {
            // 실행코드 1;
            for (초기식2; 조건식2; 증감식2) {
                // 실행코드 2;
            }
        }
        */
    }


}
