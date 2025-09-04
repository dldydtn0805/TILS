# Dart

## Ch02. Variables

## 5. Final Variables

기존 배운 변수 타입 지정 방법 : 변수에 저장되는 값을 변경 가능

- String name = '민규';
- name = '현기';

final : 처음 지정된 변수값을 변경 불가능하게 만들어주는 키워드

- js, ts의 const와 동일 기능
- `final 변수명 = 변수값;`

```dart
void main() {
  final unChangableVar = 1;
  // unChangableVar = 2; 등의 변경 불가
}
```
