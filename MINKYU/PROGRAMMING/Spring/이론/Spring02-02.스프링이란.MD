# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch02. 객체 지향 설계와 스프링

### 02-02. 스프링이란?

### 스프링 생태계

Spring : 여러 기술들의 모음

- [https://spring.io/projects](https://spring.io/projects)에서 여러 스프링 기술들(Spring Framework, Spring Boot, Spring Data, Spring Batch, ...)을 확인 가능합니당

그 중 가장 중요한 것은?

- Spring Framework
- Spring Boot

#### Spring Framework

스프링 프레임워크 : 자바 플랫폼을 위한 오픈소스 애플리케이션 프레임워크

- 엔터프라이즈급(대규모 데이터 처리 및 트랜잭션을 동시에 여러 사용자로부터 행할 수 있음) 애플리케이션을 개발하기 위한 모든 기능을 종합적으로 제공하는 경량화된 솔루션

1. 핵심 기술

- 스프링 DI 컨테이너
- AOP
- 이벤트
- 기타

2. 웹 기술

- 스프링 MVC
- 스프링 WebFlux

3. 데이터 접근 기술

- 트랜잭션
- JDBC
- ORM 지원
- XML 지원

4. 기술 통합

- 캐시(Cache)
- 이메일
- 원격 접근
- 스케줄링(Scheduling)

5. 테스트

- 스프링 기반 테스트 지원

6. 언어

- 코틀린(Kotlin)
- 그루비(Groovy)

#### Spring Boot

스프링 부트 : 스프링을 편리하게 사용할 수록 지원하는 프레임워크

- 복잡한 설정을 최소화 및 자동 설정, 컨벤션을 통해 빠른 애플리케이션 개발 지원
  - 단독으로 실행할 수 있는 스프링 애플리케이션을 쉽게 생성 가능
- 웹 애플리케이션 개발, 배포, 테스트, 모니터링의 단순화
  - Tomcat 등의 웹 서버 내장 -> 별도의 웹 서버 설치 필요 X
  - 손쉬운 빌드 구성을 위한 starter 종속성 제공
- 스프링과 3rd party(외부) 라이브러리 자동 구성
- 메트릭, 상태 확인, 외부 구성 등의 프로덕션 준비 기능 제공
- 관례에 의한 간결한 설정

#### Spring이라는 단어의 의미

우리가 앞으로 가장 많이 사용하게 될 단어, Spring의 의미는 문맥에 따라 달라진다

- Spring 기술
- Spring Framework
- Spring의 모든 것을 포함한 생태계 그 자체

### Spring의 탄생 배경

모든 것의 탄생 배경을 알기 위해서는 핵심 개념과 컨셉을 알아야 한다

Spring의 핵심 개념 : 자바 언어 기반의 프레임워크

- Java의 가장 큰 특징 : OOP
- 즉, Spring = OOP의 가장 강력한 특징을 살려주는 프레임워크
  - 좋은 객체 지향 애플리케이션을 개발할 수 있게 도와주는 프레임워크이다
  - EJB가 망한 이유 : EJB에 종속되어서 개발하게 되면, OOP를 해치게 되어 버린다... 배보다 배꼽이 더 큰 상황
