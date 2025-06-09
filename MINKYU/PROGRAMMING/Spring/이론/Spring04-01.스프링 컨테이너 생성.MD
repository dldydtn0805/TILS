# Spring

출처 : [스프링 핵심 원리 - 기본편(인프런 - 김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)

## Ch04. 스프링 컨테이너와 스프링 빈

### 04-01. 스프링 컨테이너 생성

### 스프링 컨테이너 생성 과정

스프링 컨테이너 생성 방법

- `ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);`
- ApplicationContext : Interface
  - XML 기반으로 생성 가능
  - Annotation 기반의 자바 설정 클래스로 만들 수 있음
- ApplcationContext 인터페이스의 구현체로 객체 생성

스프링 컨테이너 생성 과정

1. 스프링 컨테이너 생성

- @Configuration
- AppConfig.class를 구성 정보로 지정
- 스프링 컨테이너 내부에 스프링 빈 저장소가 빈 이름 - 빈 객체(key - value)형태로 생성됨

2. 스프링 빈 등록

- @Bean
- 스프링 컨테이너는 파라미터로 넘어온 설정 클래스 정보를 사용하여 스프링 빈 등록
- ex. 빈 이름 : memberService - 빈 객체 : MemberServiceImpl
- 빈 이름은 메서드 이름을 사용하고, 직접 부여도 가능(ex. @Bean(name="memberService2"))
- 빈 이름은 항상 다른 이름을 부여해야 함
  - 같은 이름 부여 시 다른 빈이 무시되거나 기존 빈이 덮어짐

3. 스프링 빈 의존관계 설정(준비)
4. 스프링 빈 의존관계 설정(완료)

- 설정 정보를 참고해서 의존관계 주입(DI)
- 단순히 자바 코드를 호출하는 것 같지만, 차이가 존재함(이후 배울 Singleton Container에서 설명할 내용)

### 컨테이너 빈에 등록된 빈 조회하기

1. 컨테이너 빈에 등록된 모든 빈 조회하기

- AnnotationConfigApplicationContext 구현체 타입의 메서드 getBeanDifinitionNames()를 활용하여 모든 빈 이름을 가져오
- 각 빈 이름 별로 순회하며 AnnotationConfigApplicationContext에 해당 빈 이름으로 저장되어 있는 빈 객체를 getBean() 메서드를 활용하여 가져옴

```java
// ApplicationContextInfoText (test)
package hello.core.beanfind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextInfoTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("컨테이너에 등록된 모든 빈 출력하기")
    void findAllBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();
        for(String beanDefinitionName : beanDefinitionNames) {
            Object bean = ac.getBean(beanDefinitionName);
            System.out.println("bean name : " + beanDefinitionName + ", bean Object : " + bean);
        }
    }
}
```

2. 컨테이너에 등록된 애플리케이션 빈 조회하기

- 위와 마찬가지로 비슷한 방법을 활용 가능
- getBeanDefinition() 메서드 활용 시, 해당 빈 이름을 가진 빈 객체의 정의(beanDefinition)를 알 수 있음
- 해당 beanDefinition의 getRole() 메서드를 활용하여 빈 객체의 정의에 부여된 역할을 파악 가능
  - 이 역할을 BeanDefinition.ROLE_APPLICATION과 비교 시, 해당 빈은 애플리케이션 빈임을 알 수 있음
  - 애플리케이션 빈 : 스프링 내부에서 사용하는 빈(ROLE_INFRASTRUCTURE = 2)이 아닌, 개발자가 직접 등록한 빈(ROLE_APPLICATION = 0)

```java
package hello.core.beanfind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextInfoTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("컨테이너에 등록된 애플리케이션 빈 출력하기")
    void findApplicationBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);
            // Role ROLE_APPLICATION : 애플리케이션 빈(0)
            // Role ROLE_INFRASTRUCTURE : 스프링 내부에서 사용하는 빈(2)
            if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {
                Object bean = ac.getBean(beanDefinitionName);
                System.out.println("bean name : " + beanDefinitionName + "bean role : " + beanDefinition.getRole() + ", bean Object : " + bean);

            }
        }
    }
}
```
