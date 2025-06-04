# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch03. 스프링 핵심 원리 이해 1 - 예제 만들기

### 사전 준비

1. Java 11
2. IDE : IntelliJ or Eclipse
3. 스프링 부트 스타터 사이트에서 스프링 프로젝트 생성

- 프로젝트 선택
  - Project: Gradle Project
  - Spring Boot: 2.3x
  - Language: Java
  - Packaging: Jar
  - Java: 11
- Project Metadata
  - groupId: hello
  - artifactId: core
- Dependencies: no dependency
  - 별도의 의존 관계 설정 X

4. 생성한 프로젝트 빌드 압축 폴더 압축 풀기 후 import
5. core/src/main/java/hello.core/CoreApplication 실행

6. 꿀팁

- File - Settings 클릭
- gradle 검색 -> Build Tools에 Gradle 클릭
- Build and run using과 Run tests using을 Gradle에서 IntelliJ IDEA로 변경
  - Run 시 Gradle로 할 경우 너무 느림

설정 끝!

- 당장 초반 강의에서는 순수 자바로 할 거지만
- 이후 강의에서는 Spring을 쓸 거기 때문에 미리 설정해 놓았음!
