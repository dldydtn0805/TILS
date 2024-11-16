# TypeScript
## Ch012. public & private
출처 : [코딩 애플](https://codingapple.com/course/typescript-crash-course/)

### 1. public과 privte 키워드
타입스크립트의 장점 : JS에 없는 객체지향 언어 지원 문법, 키워드 사용 가능
- public, private, static, protected

public : 클래스로부터 만들어진 인스턴스 자체적으로 수정 가능하게끔 하는 속성 지정 키워드
- 프로퍼티 정의 시, 자동으로 지원(생략 가능)
```typescript
class User {
  public name: string;

  constructor(name :string){
    this.name = name;
  }
}

let 유저1 = new User("kim");
유저1.name = 'park';  //가능
```

private : 인스턴스 생성 시, 자체적으로 수정이 불가능한 속성 지정 키워드
- 속성 왼쪽에 private 키워드 작성
- class 정의 시, 내부에서 수정 가능
    - 클래스 내부에서 private 키워드 속성 변경 메서드를 정의하여 수정
- 클래스 메서드에도 private 키워드 지정 가능

```typescript
class User {
  private name: string;

  constructor(name :string){
    this.name = name;
  }
}

let 유저1 = new User("kim");
// 유저1.name = 'park';  : 불가능

class User {
  private name: string;

  constructor(name :string){
    this.name = name;
  }
  // private 속성 변경 함수
  changeName(name :string) {
    this.name = name;
  }
}

let 유저1 = new User("kim");
// 유저1.name = 'park';  : 불가능
유저1.changeName("park"); // 가능
```