# Dart

## Ch02. Variables

## 4. Nullable Variables

### Null Safety

Nullable Variables : null 타입이 될 수도 있는 변수들

- 모든 변수들은 기본적으로 non-nullable이다
- 만약, 변수 타입 뒤에 물음표(?)를 붙일 경우, 해당 변수는 Nullable이 된다
- `변수타입? 변수명 = 변수값;`
  - 해당 변수명은 지정된 변수타입을 가질 수도, null일 수도 있다

Null Safety : 개발자가 null 값을 참조할 수 없도록 하는 것

- 코드에서 null값을 참조 시, Runtime Error 발생
  - 사용자가 애플리케이션을 실행하는 중 에러가 발생함
  - 굉장히 심각한 문제...
- 이를 방지해주는 기능(컴파일 전 에러 파악)

다음과 같은 상황을 살펴보자

- isEmpty라는 메서드가 존재
  - String 타입의 인자를 받고, bool 타입을 리턴
  - 인자의 길이(.length)가 0인지를 판별하는 메서드
- main 메서드에서 isEmpty(null);을 실행하고자 함

```dart
bool isEmpty(String string) => string.length == 0;

main() {
  isEmpty(null);
}
```

1. Null Safety가 없을 경우

- null타입에는 length라는 Method가 존재하지 않음 -> NoSuchMethodError 발생
- 이런 에러가 컴파일 과정에서 발생하는 것이 아닌, null 참조 시 발생
- 사용자가 값을 참조할 때 에러가 발생해버림

2. Null Safety가 있을 경우

- null 타입이 될 수 있는 인자를 해당 함수에 넣었을 때, `변수명 != null`에 대한 조건식을 붙여야 함
- if (변수명 != null) {}
- 단축식 : 변수명?.~~~

```dart
void main() {
  // name이라는 변수는 String 타입 혹은 null 타입(?를 통해 null이 될 수 있음을 지정 가능)
  String? name = '민규';
  if (name != null) {
    name.isNotEmpty;
  }
  // name?.isNotEmpty
}
```
