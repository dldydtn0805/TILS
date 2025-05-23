## 출처

https://www.inflearn.com/courses/lecture?courseId=325630&type=LECTURE&unitId=49583&subtitleLanguage=ko

## 회원 서비스 제작
![alt text](image-66.png)

- `hello.hello_spring` 아래에 패키지 하나만드삼 `service`

![alt text](image-67.png)

- 거따가 클래스도 하나 ㄱ `MemberService`

### 회원가입 

```java
package hello.hello_spring.service;

import hello.hello_spring.domain.Member;
import hello.hello_spring.repository.MemberRepository;
import hello.hello_spring.repository.MemoryMemberRepository;

public class MemberService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();

    // 회원가입
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    };
}

```

- 걍 `MemoryMemberRepository` 가져와가지고 `save()` 메서드만 호출하면 댐

- 근데 비즈니스 로직에서 같은 이름 회원 ㄴ임

- 꿀팁 : `command + option + v` 하면 바로 변수로 만들어줌 ㅎ

![alt text](image-68.png)

```java
    // 회원가입
    public Long join(Member member) {
        // 같은 이름이 있는 중복 회원 ㄴ
        Optional<Member> result = memberRepository.findByName(member.getName());
        result.ifPresent(m -> {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });
        memberRepository.save(member);
        return member.getId();
    };
```

- `result`는 `Optional`이므로 위처럼 값이 이미 있다면 `ifPresent`로 `IllegalStateException`을 줄 수 있다

- `Optional`로 감싸면 거기잇는 여러 메서드쓸수잇삼 그중 하나임. 지금은 `null`일 가능성이 있으면 `Optional`로 한번 감싸는 이유다

- 꺼내고싶으면 걍 `get()`으로 꺼내면 되공ㅎ 근데 바로꺼내는거 권장은 안함

- 보통은 `orElseGet()`으로 꺼내서 값이 있으면 꺼내고 없으면 어떤 메서드를 실행해 혹은 디폴트 값을 넣어서 꺼내 뭥  이렇게 한댕용

- `Optional` 꺼낼때 어케 거내면 좋으냐 ?

```java
    // 회원가입
    public Long join(Member member) {
        // 같은 이름이 있는 중복 회원 ㄴ
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
        memberRepository.save(member);
        return member.getId();
    };
```

- 이렇게 거내면 이쁘죵 ㅎ?

1. `findByName`을 해
2. 이미 이름이 잇으면 `ifPresent`에서 걸림

- 그런데 이런경우에 메서드로 뽑는게 좋ㅂ습니다

- 꿀팁 : `ctrl + t` 누르고 `Extract Method` 찾아서 선택

![alt text](image-69.png)

![alt text](image-70.png)

- `validateDuplicateMember`로 이름을 지어주자

```java
public class MemberService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();

    // 회원가입
    public Long join(Member member) {
        validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    };

}
```


- 자 그런데 `repository` 클래스는 넣엇다 뺏다 그냥 이름이죵? 근데 `service` 클래스는 좀 비즈니스적인 용어를 써야함; 개발자든 기획자든 갑자기 회원가입 로직 이상해 ㅇㅁㄹㄴㅇㄹㅁㄹㅇㅇ 이러면 ㅇㅋ 조인쪽 살펴보자 ! 할수잇삼 이름이랑 기능이랑 매칭이 되도록해야한다는말이삼ㅇ

    - `service` : 비즈니스에 의존적으로 작명
    - `repository` : 비교적 기계적, 단순한 용어로 작명


### 회원조회

- 이지;

```java
public class MemberService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();
    ...
    // 전체 회원 조회
    public List<Member> findMembers() {
        return memberRepository.findAll(); 
    };
    // 특정 회원 조회
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}

```

- 자이제 테스트 코드로 잘되는ㄷ지 검증해보러갖시다