# TypeScript
## Ch13. protected & static 키워드
출처 : [코딩 애플](https://codingapple.com/course/typescript-crash-course/)

### 1. extends
앞서 배운 extends : interface 복사 키워드
- 클래스도 extends 문법을 통해 기존 클래스를 복사 할 수 있다
- 기존 class와 비슷한 형태(+ 추가되는 것들이 있는 형태)를 가진 새로운 class 정의 시 사용
```typescript
class 새로운클래스 extends 기존클래스 {
    // 내용
}
```

### 2. protected
protected : 보안 해제 가능한 private와 비슷한 역할의 키워드
- extends된 클래스 안에서는 사용 가능

```typescript
class 기존클래스 {
    protected x :string;

    constructor (x :string) {
        this.x = x;
    }
}

// protected 사용 방법
// 만약 x가 private일 경우, 이런 식으로 새로운 extend 클래스에서
// private 변수 변경 함수 작성 불가
// protected이기 때문에 class끼리 공유 가능한 속성으로 변경됨
class 새로운클래스 extends 기존클래스 {
    changeX(x :string) {
        this.x = x;
    }
}
```

### 3. static
static : 클래스에 직접 변수나 함수를 부여하기 위해 사용하는 키워드
- 클래스로부터 생성된 인스턴스에서는 static이 부여된 속성 사용 불가
- 클래스 메서드에도 static 사용 가능
- extends를 통해 클래스를 복사한 경우, static 키워드가 달린 것들도 함께 따라온다
- public, private, protected 키워드와 함께 사용 가능하다

**static 사용 이유**
1. 클래스 내부의 간단한 메모 역할(기본 설정값 부여)
2. 클래스로부터 생성되는 인스턴스가 사용할 필요가 없는(정확히 말하자면, 각 인스턴스 별로 달라질 이유가 없고 공동으로 같아야 하는) 변수들을 정의 시 사용

