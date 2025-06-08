# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch04. 스프링 컨테이너와 스프링 빈

### 04-02. 스프링 빈 조회 - 기본

### 스프링 빈 조회하기 - 기본편

1. ac.getBean() : 스프링 컨테이너에서 스프링 빈을 찾는 가장 기본적인 조회 방법

- ac.getBean(빈 이름, 빈 타입) : 빈 이름과 빈 타입으로 조회
- ac.getBean(빈 타입) : 빈 타입만으로 조회
- ac.getBean(구현체 이름, 구현체 타입) : 스프링 빈으로 지정된 구현체로 조회
  - 구현체로 조회 시, 변경에 유연성이 떨어짐(DIP)
- 조회하려는 대상 스프링 빈이 없을 경우, 예외(NoSuchBeanDefinitionException)발생
- 조회한 빈 객체가 지정된 타입의 인스턴스인지 확인(assertThat(빈객체).isInstanceOf(구현체.class))

```java
package hello.core.beanfind;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import static org.assertj.core.api.Assertions.*;

public class ApplicationContextBasicFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("빈 이름과 타입으로 조회하기")
    void findBeanByName() {
        MemberService memberService = ac.getBean("memberService", MemberService.class);
        assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }

    @Test
    @DisplayName("빈 타입으로 조회하기")
    void findBeanByType() {
        MemberService memberService = ac.getBean(MemberService.class);
        assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }

    @Test
    @DisplayName("구현체 타입으로 조회하기")
    void findBeanByInstance() {
        // 구현체 타입으로 조회 시, 변경에 대한 유연성이 떨어짐(구현체에 의존적인 코드 -> 구현체가 바뀔 때 마다 바뀌어야 함)
        MemberServiceImpl memberService = ac.getBean("memberService", MemberServiceImpl.class);
        assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }

    @Test
    @DisplayName("이름 조회 실패 에러")
    void findByBeanByNameX() {
        Assertions.assertThrows(NoSuchBeanDefinitionException.class, () -> ac.getBean("xxxxx", MemberService.class));
    }
}
```
