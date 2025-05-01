# 클론 코딩

## Twitter

## Ch18. Security Rules

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### 현재 상황

우리는 배포까지 성공했음!!

- 그런데 사실 우리가 개발 할 때 firebase를 backend대신 사용하고 있음
- frontend에서 backend의 기밀정보를 유출하려 할 수 있음
- 이를 막기 위해 보안이 필요

### Firebase Security Rules

Firebase Security Rules : Firebase 데이터베이스(Realtime Database나 Firestore)에 대한 액세스를 제어하는 규칙

- 데이터의 읽기 및 쓰기 권한을 정의하고
- 사용자 인증 상태와 데이터 구조에 따라 특정 조건을 설정

주요 역할

1. 접근 제어 : 특정 사용자나 사용자 그룹에 대해 데이터에 대한 읽기/쓰기 권한을 설정
2. 데이터 유효성 검사 : 데이터가 데이터베이스에 저장되기 전에 유효성을 검사하여 잘못된 형식이나 불필요한 데이터가 들어가지 않도록 설정

3. 보안 강화: 민감한 데이터를 보호하고, 외부 공격으로부터 데이터베이스를 안전하게 지킴
4. 개발 및 운영 관리: 개발 단계에서 적절한 권한을 설정하여 사용자 경험을 관리하고, 운영 단계에서 데이터 접근을 제어

#### Firestor Database Security 설정

1. `Firestore Database` 클릭
2. 상단의 `규칙` 클릭

3. 규칙 변경하기

- 우리가 사용하는 collections에 대한 적용 규칙
  - tweets
- 읽기, 쓰기 권한(read, create) : 요청 사용자의 authorization이 있을 경우
- 수정 권한(update) : 요청 사용자의 authorization이 있고, id값이 resource의 data.userId와 같을 경우

```javascript

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /tweets/{doc} {
      allow read, create: if request.auth != null
      allow delete, update: if request.auth.uid == resource.data.userId
    }
  }
}

```

#### Storage Security 설정

1. `Storage` 클릭
2. 상단의 `규칙` 클릭

3. 규칙 변경하기

- 우리가 사용하는 bucket에 대한 적용 규칙
  - tweets
  - avatars
- 읽기 권한(read) : 요청 사용자의 authorization이 있을 경우
- 쓰기 권한(write) : 요청 사용자의 authorization이 있고, 요청 resource의 크기가 2MB(2 _ 1024 _ 1024)를 넘지 않을 경우

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
  	match /{allPaths=**}{
			allow read: if request.auth != null
   	  allow write: if request.auth != null && request.resource.size < 2 * 1024 * 1024

    }
  }
}
```
