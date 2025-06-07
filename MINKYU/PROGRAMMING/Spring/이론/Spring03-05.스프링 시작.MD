# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch03. 스프링 핵심 원리 이해 1 - 예제 만들기

### 03-05. 스프링 시작

기존 순수 자바 코드로 작성한 프로그램에 스프링을 적용해 보자!!

1. AppConfig 변경

- @Configuration : AppConfig에 설정을 구성한다는 의미(설정 정보, 구성 정보 담당 파일)
- @Bean : 스프링 컨테이너에 스프링 빈으로 등록한다는 의미
  - 각 메서드 위에 붙여주기
  - 각 메서드 이름이 스프링 컨테이너에 스프링 빈으로 등록됨(ex. 스프링 컨테이너인 AppConfig에 memberService가 스프링 빈으로 등록됨)
  - 스프링 컨테이너에 등록된 스프링 빈들은 다른 곳에서 꺼내서 사용할 수 있음

```java
// AppConfig
package hello.core;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.MemberRepository;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }
    @Bean
    public OrderService orderService() {
        return new OrderServiceImpl(memberRepository(), discountPolicy());
    }
    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
    @Bean
    public DiscountPolicy discountPolicy() {
        return new FixDiscountPolicy();
    }
}
```

2. App 변경

- 기존 AppConfig를 직접 가져와서 사용
- 이제는 AppConfig가 스프링 컨테이너로 등록되었으니, 스프링 컨테이너에 등록되어 있는 스프링 빈(클래스)들을 가져다 쓸 수 있음
  - 클래스 명으로 등록되어 있음
- ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
  - ApplcationContext 타입의 스프링 컨테이너를 AnnotationConfigApplicationContext 객체로 가져오기
  - 인자는 AppConfig.class
- applicationContext.getBean("이름", 타입.class);
  - 스프링컨테이너에서 특정 타입의 이름으로 등록된 클래스(스프링 빈)을 가져오기

```java
// MemberApp
package hello.core;

import hello.core.member.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MemberApp {
    public static void main(String[] args) {
//       AppConfig appConfig = new AppConfig();
//       MemberService memberService = appConfig.memberService();

        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);
        Member member = new Member(1L, "memberA", Grade.VIP);
        memberService.join(member);
        Member findMember = memberService.findMember(1L);
        System.out.println("new member = " + member.getName());
        System.out.println("find member = " + findMember.getName());
    }
}
```

```java
// OrderApp
package hello.core;

import hello.core.member.*;
import hello.core.order.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class OrderApp {
    public static void main(String[] args) {
//        AppConfig appConfig = new AppConfig();
//        MemberService memberService = appConfig.memberService();
//        OrderService orderService = appConfig.orderService();

        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);

        Long memberId = 1L;
        Member member = new Member(memberId, "memberA", Grade.VIP);
        memberService.join(member);
        Order order = orderService.createOrder(memberId, "itemA", 20000);
        System.out.println("order = " + order);
        System.out.println("order.calculatePrice = " + order.calculatePrice());
    }
}
```

#### 스프링 컨테이너와 스프링 빈

스프링 컨테이너 : 기존 개발자가 AppConfig를 통해 객체를 생성하고 DI를 했던 일을 담당

- ApplicationContext
- @Configuration이 붙은 AppConfig를 설정(구성) 정보로 사용
- @Bean이 적인 메서드를 모두 호출하여 반환된 객체를 스프링 컨테이너에 등록
  - 메서드 명을 key, 호출된 객체 정보를 value로 저장된 스프링 빈들이 존재
- 앞으로 개발자는 스프링 컨테이너를 통해서 필요한 스프링 빈(객체)를 찾으면 됨
  - applicationContext.getBean(이름, 타입)을 통해 컨테이너에 등록된 빈을 조회 가능

스프링 빈 : 스프링 컨테이너에 등록된 key - value

- key : 클래스 이름
- value : 클래스 호출 시 참조되는 객체
