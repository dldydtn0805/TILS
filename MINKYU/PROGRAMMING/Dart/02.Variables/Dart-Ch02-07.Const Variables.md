# Dart

## Ch02. Variables

## 7. Const Variables

const : dart의 compile-time constant

- 한 번 선언 시 수정 불가
- compile-time에 알고 있어야 하는 값
- 즉, 컴파일 전에 알고 있어야 하는 값
  - 앱스토어에 앱을 올리기 전에 알고 있어야 하는, 변경 불가능한 값

final vs const

1. final : 한 번 선언 시 수정 불가능한 변수에 지정해주는 keyword

- compile 이후 지정 가능
  - ex. API를 통해 받아오는 값
- JS, TS의 const와 같은 기능을 하는 키워드

2. const : 한 번 선언 시 수정 불가능한 변수에 지정해주는 compile-time constant 키워드

- compile 전에 미리 지정해 줘야 함
  - ex. API 등을 통해 받아오는 값이 아닌, 정적으로 저장되어 있어야 하는 값

```dart
void main() {
  // API를 통해 동적으로 받아와서 저장 시, final 사용
  final API = fetchApi();
  // 컴파일 전부터 저장되어 있어야 할 경우, const 사용
  const name = '민규';
}
```
