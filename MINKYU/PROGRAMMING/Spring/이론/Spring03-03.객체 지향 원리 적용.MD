# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch03. 스프링 핵심 원리 이해 1 - 예제 만들기

### 03-03. 객체 지향 원리 적용

앞선 상황

1. 할인 정책 구현체가 두 가지 있음

- FixDiscountPolicy
- RateDiscountPolicy

2. 두 할인 정책 구현체는 DiscountPolicy 역할을 상속받음

3. OrderService는 할인 정책 구현체에 의존 중...

- 적용하려는 정책에 따라 discountPolicy에 새롭게 할당할 객체를 변경해야 함. ㅠㅠ
  - DiscountPolicy라는 역할에도 의존 중이고
  - FixDiscountPolicy, RateDiscountPolicy에도 의존 중
- 뿐만 아니라, 확장 시에도 코드 변경이 필요함

우리가 해야 할 것 : 인터페이스에만 의존하도록 코드를 변경 해야 함

- 기존 : private final DiscountPolicy discountPolicy = new ....
- 변경 : private DiscountPolicy discountPolicy;

문제점 : 구현체가 없음 -> 코드를 어떻게 실행하지?(Null Pointer Exception 발생)

해결 방안 : 누군가가 클라이언트에 구현체를 대신 생성 및 할당해 주어야 함

- 관심사를 분리하자
- AppConfig의 등장

### AppConfig

AppConfig : 애플리케이션 전체 동작 방식을 구성(configuration)하기 위해 구현 객체 생성, 연결의 책임을 담당하는 클래스

AppConfig의 역할

1. 애플리케이션의 실제 동작에 필요한 구현 객체 생성
2. 생성한 객체 인스턴스 참조(reference)를 생성자를 통해서 주입(연결)

즉, AppConfig를 통해 역할에 구현을 할당한다

- 각 역할 별(Impl)로는 기능을 실행하는 책임만 지면 된다
  - OrderServiceImpl
  - MemberServiceImple

```java
// AppConfig
package hello.core;

import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

public class AppConfig {
    // MemberService 역할에 MemoryMemberRepository(구현체)를 할당 받은 MemberServiceImple(구현체)를 배정해 준다
    public MemberService memberService() {
        return new MemberServiceImpl(new MemoryMemberRepository());
    }

    // OrderService 역할에 MemoryMemberRepository(구현체)와 RateDiscountPolicy(구현체)를 할당 받은 OrderServideImple(구현체)를 배정해 준다
    public OrderService orderService() {
        return new OrderServiceImpl(new MemoryMemberRepository(), new RateDiscountPolicy());
    }
}
```

중요한 점 : 결국, 우리는 이 역할에 대한 배정을 담당하고 있는 AppConfig를 각 구현체 별로 가져다 써야 함

- 기존 : 다형성을 활용하여 인터페이스 = new 구현체 로 선언
- 현재 : AppConfig에서 배정 받은 역할을 가져다 씀

1. ServiceImpl : 각각 객체 생성 시 필요한 인자들은 Config에서 정의 -> 우리는 다형성을 활용 하여 ServiceImpl에서 선언 해 줄 필요가 없어짐

```java
// MemberServiceImpl
package hello.core.member;

public class MemberServiceImpl implements MemberService {
    // 기존 : private final MemberRepository memberRepository = new MemoryMemberRepository();
    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void join(Member member) {
        memberRepository.save(member);
    }

    @Override
    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
```

```java
// OrderServiceImpl
package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;
import hello.core.member.MemoryMemberRepository;

public class OrderServiceImpl implements OrderService {
    // 기존 : private final MemberRepository memberRepository = new MemoryMemberRepository();
    private final MemberRepository memberRepository;
    // 기존 : private final DiscountPolicy discountPolicy = new FixDiscountPolicy() (또는 new RateDiscountPolicy());
    private final DiscountPolicy discountPolicy;

    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

    @Override
    public Order createOrder(Long memberId, String itemName, int itemPrice) {
        Member member = memberRepository.findById(memberId);
        int discountPrice = discountPolicy.discount(member, itemPrice);

        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

2. App : AppConfig에서 선언한 Service를 가져다 쓰면 됨

```java
// MemberApp 실행
package hello.core;

import hello.core.member.*;

public class MemberApp {
    public static void main(String[] args) {
        // 기존 : ApConfig 없이
        // MemberService memberService = new MemberServiceImpl();
        AppConfig appConfig = new AppConfig();
        MemberService memberService = appConfig.memberService();

         Member member = new Member(1L, "memberA", Grade.VIP);
         memberService.join(member);
         Member findMember = memberService.findMember(1L);
         System.out.println("new member = " + member.getName());
         System.out.println("find member = " + findMember.getName());
    }
}
```

```java
// OrderApp 실행
package hello.core;

import hello.core.member.*;
import hello.core.order.*;
public class OrderApp {
    public static void main(String[] args) {
        // 기존 : ApConfig 없이
        // MemberService memberService = new MemberServiceImpl();
        // OrderService orderService = new OrderServiceImpl();

        AppConfig appConfig = new AppConfig();
        MemberService memberService = appConfig.memberService();
        OrderService orderService = appConfig.orderService();

        Long memberId = 1L;
        Member member = new Member(memberId, "memberA", Grade.VIP);
        memberService.join(member);
        Order order = orderService.createOrder(memberId, "itemA", 20000);
        System.out.println("order = " + order);
        System.out.println("order.calculatePrice = " + order.calculatePrice());
    }
}
```

### 핵심 정리

1. 자바로 개발 시 지켜야 할 것 : SOLID(객체 지향 설계 원칙)
2. 그 중에서도, DIP, OCP를 지켜야 함

- DIP : 인터페이스에만 의존
- OCP : 확장 시 코드 변경 X

3. DIP와 OCP를 위배하지 않으려면

- 다형성을 사용하면서
- 역할과 구현체의 분리 뿐만 아니라
- 역할 별 구현체를 배정하는 책임을 담당하는 게 필요하다
- 그것이 바로 AppConfig

4. AppConfig에서 역할(Service) 별로 원하는 구현체 할당
5. 각 Service은 앞으로 역할에만 의존

- 기존 : 구현체에도 의존적이었음
- 현재 : 구현체는 AppConfig에서 배정해 줌 -> 역할에만 의존적이면 됨

6. 각 App은 앞으로 AppConfig에만 의존

- 기존 : App 별로 Service(역할)을 상속 받은 ServiceImpl(구현체)에도 의존적이었음
- 현재 : AppConfig에서 이미 역할에 대한 구현체 배정을 끝냄 -> 우리는 그 역할만 가져다 쓰면 됨!

#### AppConfig 리팩토링

앞서 한 일 : AppConfig 적용

- 기존 구현체에도 의존적이던 Service와 App이 앞으로는 인터페이스에만 의존적이게 하도록 책임을 담당하는 AppConfig 생성

그런데, 지금 보니까

- AppConfig가 보니까 중복이 있네?
- 또, 역할에 따른 구현이 잘 안보이네?

리팩토링을 해서 고쳐봅시다잉~

- AppConfig에서 모든 것을 분리해서 중복과 역할에 따른 구현을 표현하자

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

public class AppConfig {
    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }
    public OrderService orderService() {
        return new OrderServiceImpl(memberRepository(), discountPolicy());
    }
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
    public DiscountPolicy discountPolicy() {
        // return new RateDiscountPolicy()
        return new FixDiscountPolicy();
    }
}
```

- new MemoryMemberRepository() 중복 제거
- 역할과 구현 클래스를 한 눈에 볼 수 있게 분리

현재 상황 : SOLID 중 S, O, D를 지키는 중

1. SRP(단일 책임 원칙) - 한 클래스는 하나의 책임만 가져야 한다.

- 클라이언트 객체는 직접 구현 객체를 생성하고, 연결하고, 실행하는 다양한 책임을 가지고 있음
- SRP 단일 책임 원칙을 따르면서 관심사를 분리함
- 구현 객체를 생성하고 연결하는 책임은 AppConfig가 담당
- 클라이언트 객체는 실행하는 책임만 담당

2. DIP(의존관계 역전 원칙) - 프로그래머는 추상화에 의존해야지, 구체화에 의존하면 안된다

- 새로운 할인 정책을 개발하고, 적용하려고 하니 클라이언트 코드도 함께 변경해야 했다. 왜냐하면 기존 클라이언트 코드(OrderServiceImpl)는 DIP를 지키며 DiscountPolicy 추상화 인터페이스에 의존하지만, FixDiscountPolicy 구현 클래스에도 함께 의존했다
- 클라이언트 코드가 DiscountPolicy 추상화 인터페이스에 의존하도록 코드를 변경했다.
- 하지만 클라이언트 코드는 인터페이스만으로는 아무것도 실행할 수 없다.
- AppConfig가 FixDiscountPolicy 객체 인스턴스를 클라이언트 코드 대신 생성해서 클라이언트 코드에 의
  존관계를 주입했다.

3. OCP(개방 / 폐쇄 원칙) - 소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다

- 다형성 사용하고 클라이언트가 DIP를 지킴
- 애플리케이션을 사용 영역과 구성 영역으로 나눔
- AppConfig가 의존관계를 FixDiscountPolicy ->
  RateDiscountPolicy로 변경해서 클라이언트에 주입하므로 클라이언트 코드는 변경하지 않아도 됨
- 소프트웨어 요소를 새롭게 확장해도 사용 영역의 변경은 닫혀 있다!
