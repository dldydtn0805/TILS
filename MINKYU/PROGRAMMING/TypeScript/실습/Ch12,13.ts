/* Q1. 다음 x, y, z 속성의 특징을 설명해보십시오.

class User {
    private static x = 10;
    public static y = 20;
    protected z = 30;
}
*/
/*
1. private static x = 10;
- static 키워드 -> 클래스명.속성 이런 식으로만 접근 가능(인스턴스명.속성 이런 식으로는 접근 불가능)
- private 키워드 -> x는 클래스 내부 메서드를 통해서만 수정 가능

2. public static y = 20;
- static 키워드 -> 위와 동일
- public 키워드 -> y는 클래스 외부에서도 수정 가능(클래스명.속성 = 다른값; 이런 식으로)

3. protected z = 30;
- protected 키워드 -> private과 동일하게 클래스 내부에서만 사용 가능 
- but, extends로 복사한 클래스 내부에서도 사용 가능(private은 복사 클래스에서는 XXXX)
*/


/* Q2. x 속성에 숫자를 더해주는 함수가 필요합니다.
    
class User {
    private static x = 10;
    public static y = 20;
    }
    User.addOne(3) //이렇게 하면 x가 3 더해져야함
    User.addOne(4) //이렇게 하면 x가 4 더해져야함
    User.printX()  //이렇게 하면 콘솔창에 x값이 출력되어야함
저렇게 User.addOne() 쓸 때마다 x가 증가하는 함수는 어떻게 만들 수 있을까요? 
그리고 x값을 콘솔창에 출력해주는 printX() 함수도 한번 만들어보십시오.
(조건) private static x = 10; 이 코드 수정금지 
*/

class User {
    private static x:number = 10;
    public static y:number = 20;
    static addOne(num :number) :void {
        User.x += num;
    }
    static printX():void {
        console.log(User.x);
    }
}
User.addOne(3) //이렇게 하면 x가 3 더해져야함
User.addOne(4) //이렇게 하면 x가 4 더해져야함
User.printX()  //이렇게 하면 콘솔창에 x값이 출력되어야함
