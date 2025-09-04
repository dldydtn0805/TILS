# Dart

## Ch02. Variables

## 6. Late Variables

late : 변수값 선언 없이 변수를 만들기 위해 사용하는 키워드

- final, 변수타입 앞에 사용
- `late (final) 변수타입 변수명;` 형태로 사용
- late로 선언한 변수는 값을 지정해주기 전까지 사용 불가

```dart
void main() {
  late final String name;
  name = '민규';
  // 변수값을 지정해줘야 사용 가능
  print(name);
}
```
