# Dart

## Ch02. Variables

## 3. Dynamic Type

### Dynamic

Dynamic : 여러 가지 타입을 가질 수 있는 변수에 사용되는 키워드

- 변수 선언 시, var 키워드를 활용하고 해당 변수에 값을 지정해 주지 않으면 자동으로 Dynamic 타입이 된다
  - ex. var name;
  - name = '민규';
  - name = 123;
  - name = false;
- 변수 선언 시, dynamic 키워드를 활용할 경우, 자동으로 Dynamic 타입이 된다
  - ex. dynamic name;
  - name = '민규';
  - name = 123;
  - name = false;

dynamic은 변수에 값이 지정되기 전까지 어떤 변수타입인지 알 수 없다

- 따라서, dynamic 타입의 변수를 활용할 경우, 다음과 같이 쓴다
  - if (변수명 is 변수타입) { // 변수명이 변수타입일 경우 실행되는 문장 }
  - ex. if (name is String) {
    ///
    }

dynamic 주의점

- 타입 지정 X -> 웬만하면 쓰지 말 것
- 반드시 두 개 이상의 타입이 필요한 경우에만 활용
