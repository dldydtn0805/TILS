# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch02. 객체 지향 설계와 스프링

### 02-01. 자바 진영의 추운 겨울과 스프링의 탄생

### EJB의 탄생과 한계, 새로운 오픈소스

2000년대 초반 : 자바 진영의 표준 기술의 최고봉인 EJB(Enterprise Java Beans)가 있었음

- 금융권, 아키텍처 등에서 굉장히 많이 사용
- 분산 능력이 좋고, 트랜잭션 처리가 좋음

하지만,,, EJB의 단점이 있어요!(EJB 지옥.. 개발자 선배들이 빠져버린)

- 너무 느리고
- 너무 비싸고
- 너무 복잡하고 어렵다
- EJB가 제공하는 인터페이스를 구현하고, EJB에 의존적으로 개발해야 함
  - 코드가 지저분해짐
  - 어떠한 Life Cycle로 돌아가는지도 모르겠음

POJO(Plain Old Java Object)의 등장

- 순수하고 오래된 방식의 Java Object를 사용하자
- 특정 기술에 종속되어 있지 않은 예전의 자바로 돌아가자

EJB 지옥에서 불타고 있던 두 개발자가 화가 잔뜩 나서 새로운 두 가지 오픈 소스를 만들게 되는데...

- 로드 존슨 : Spring 개발
  - EJB 컨테이너를 대체
  - 단순함
  - 사실상 현재 표준 기술
- 게빈 킹 : Hibernate 개발
  - EJB 엔티티빈 기술 대체
  - JPA(Java Persistence API) 새로운 표준 정의

### Spring의 역사

Spring : Rod Johnson이 EJB의 문제점을 지적하며 만들어진 Java 기반 프레임워크(2002)

- EJB 없이도 충분히 고품질의 확장 가능한 애플리케이션을 개발 할 수 있음을 증명
- 스프링 핵심 개념 기반 코드 작성
- BeanFactory, ApplicationContext, POJO, 제어 역전, 의존 관계 주입
- 해당 책을 집필 후, Juergen Hoeller와 Yann Caroff가 함께 오픈 소스 프로젝트를 제안
  - 전통적인 J2EE(EJB)라는 겨울을 넘은 새로운 시작을 담아서 Spring이라고 이름을 지음

우리는 강의를 본격적으로 들어가기에 앞서, 왜 이 세 개발자가 모든 것을 포기하고 Spring을 만들게 되었는지를 알아보기 위해

- Spring의 등장 이전 코드의 생김새를 파악하고 문제점을 찾아본다
- Spring을 활용한 코드 작성을 통해 Spring의 등장을 통해 어떻게 해결 가능해 졌는지 알아본다
