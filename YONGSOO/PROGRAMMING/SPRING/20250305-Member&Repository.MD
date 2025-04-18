## 출처

https://www.inflearn.com/courses/lecture?courseId=325630&type=LECTURE&unitId=49581&tab=curriculum&subtitleLanguage=ko

## 회원 도메인과 리포지토리 만들기

![alt text](image-38.png)

- hello.hello_spring 폴더에 `domain` 패키지를 만들자

- 멤버라는 클래스를 만들거임

![alt text](image-39.png)

- 요구사항에는 id, name이 잇삼

- 그리고 `command + n` `Getter and Setter`로 메서드 채워주삼

```java
package hello.hello_spring.domain;

public class Member {

    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


```

## 리포지토리

![alt text](image-40.png)

- repository 패키지 생성 후 MemberRepository도 만드삼

![alt text](image-41.png)

- 클래스 작성해주삼

- Optional : java 8에 추가된것인디 null 관련임

```java
package hello.hello_spring.repository;

import hello.hello_spring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    List<Member> findAll();
}

```

- 리포지토리 패키지에 클래스도 하나 만들어주삼

![alt text](image-42.png)

- 방금 만들었던 인터페이스를 `implements` 해서 가져오삼

- `MemberRepository 드래그` 후 `option + enter` 하면 다음과같이뜨는디 
![alt text](image-44.png)

- 꿀팁 : 옵션 엔터 누르면 import 안된 클래스 가져오기 쉽삼

- 저 창에서 이제 `Implements methods` 할수잇슴 

![alt text](image-45.png)

- 다 선택하고 OK 하삼

## 클래스 작성

- `store` : 실무에서는 동시성 문제가 있어서 `ConcurrentHashMap`을 쓰지만 여기선 걍 Map 쓰삼

- `sequence` : 키 값을 생성해주는 애임, 얘도 실무에서는 동시성 문제를 고려해서 `AtomicLong`을 사용하는디 걍 long으로 하삼

- `save` : sequence 사용해서 아이디값 세팅하고 스토어에 저장하게함

- `findById`
    - 걍 스토어에 있는거 꺼내주면 되는디 null이면 어쩔것임 ? 이것때문에 우리는 아까 MemberRepository 인터페이스에서 `Optional`이라는걸 id에 감싸주엇다
    - 이제 `Optional.ofNullable(store.get(id))`을 반환해주면 되삼
    - 이렇게 반환된 것은 클라이언트에서 뭔갈 할수가잇삼

- `findByName`
    - 람다함수 응용해서 params로 넘어온 name과 store에 있는 name과 같은 경우에만 필터링되고 찾으면 반환하는것
    - `findAny()` : 하나만 찾는것
    - 끝까지 돌렷는데 없으면 Optional에 null이 포함되서 반환되겟죵?

- `findAll()` 
    - 자바에서는 실무할때 리스트 많이씀 루프돌리기도편함
    - 강 ArrayList 생성해서 store.values 집어넣어주고 반환하삼

- 구현 끝이삼

### 코드

```java
// MemoryMemberRepository
package hello.hello_spring.repository;

import hello.hello_spring.domain.Member;

import java.util.*;

public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Member save(Member member) {
        member.setId(++sequence); // 아이디값세팅하시고
        store.put(member.getId(), member); // 스토어에 저장
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                .filter(member -> member.getName().equals(name))
                .findAny();
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values());
    }
}
```
