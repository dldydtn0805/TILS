## 출처 

https://www.inflearn.com/courses/lecture?courseId=325630&type=LECTURE&unitId=49595&tab=curriculum&subtitleLanguage=ko

## 스프링 통합 테스트

- DB까지 연결해서 스프링의 통합 테스트를 진행하자고

- 바로 코드 ㄱ

![alt text](image-165.png)

- 사실 이전에 한 테스트는 순수 자바 코드로 진행햇슴. 스프링과 관련 없엇슴

- 근데 지금은 `Database Connection` 정보 등 `Spring Boot`가 들고잇는게 너무 많삼

- 지금부터는 테스트를 `Spring`이랑 엮어서 해보자고

- `MemberServiceTest.java`로 가보삼

- 실행하면 바로 되는수준임; 걍 `Java JVM, Java Virtual Machine`안에서 끝나는 것이기 때문임 이걸 DB까지 연결한 테스트 해보자고

- 같은 디렉토리에 `MemberServiceIntegrationTest.java` 만드삼 (기존  `MemberServiceTest.java` 복붙)

- `Spring`이 테스트 할때는 이케 하삼

- 클래스 `Annotation`에 `@SpringBootTest` `@Transactional`달아주삼

![alt text](image-167.png)

- 이제는 `Spring Container`한테 `MemberService` `MemberRepository` 내놓으라고 해야험 그니까 기존에 있던 이부분 코드 지우삼

![alt text](image-168.png)

- 사실 테스트 코드는 제일 끝단에 있는거니간 젤 편한 방법으로 해도 된다~
    - 지난번에 DI 할때는 `Constructor Injection`으로 햇지마는 , 걍 편하게 이렇게 `Field Injection` 하자 ㅋ

```java

@SpringBootTest
@Transactional
class MemberServiceIntegrationTest {

    @Autowired  MemberService memberService;
    @Autowired MemberRepository memberRepository;

    ...
}
```

- 중요 : `MemoryMemberRepository`에서 `MemberRepository`로 바꾸삼

![alt text](image-169.png)

- 이것도 지우삼 이건, `@Transactional` 덕분에 필요가 없어졋삼 왜? 이따 설명하겟슴

![alt text](image-170.png)


- 이것도 지우삼 걍 지금 안쓰니깐

- 한번 회원가입만 돌려보자

![alt text](image-172.png)

- `@Transactional` 주석처리하삼

- 일단 `DELETE FROM MEMBER`로 `member` table에 있는 모든 데이터를 삭제하자

![alt text](image-171.png)

- 참고 : 운영 DB 데이터 말고 테스트 DB를 따로 구축함 혹은 로컬로 진행험

![alt text](image-173.png)

- 회원가입 테스트가 잘 댓삼

![alt text](image-174.png)

- DB에도 데이터가 잘 들어갓삼

- 근데 다시 돌려보면 데이터가 이미 들어잇스니깐 똑같은 테스트 하면 안대겟죵??

![alt text](image-175.png)

- 그러면 `@AfterEach`로 DB에 `delete query sql` 날려줘야할까 ?

- ㄴ

- 데이터 베이스는 기본적으로 `Transaction`이라는 개념이 잇삼 

    - `commit`을 해야 DB에 반영이 대는것
    - `Auto Commit Mode`인가 아니냐 차이지 기본적으로 `commit`이 되어야한다는 말이삼

- 근데 테스트 끝나고 `Roll back`을 한다면 ????????????????

- DB에서 데이터 반영이 안대는거삼

- 바로 그것이 `@Transactional` 이삼
![alt text](image-176.png)

- 이거를 쓰면 테스트 끝나면 `Roll back` 해줌

- 그니간 다시 `delete from member` 해주고, 저거 붙은 상태로 테스트 계속 돌리면 ㅇㅋ함 무한으로 삽가능이삼

![alt text](image-177.png)

![alt text](image-178.png)

- DB에 데이터가 안남아잇다는것;


![alt text](image-179.png)


- 전체 다 돌려도 ㅇㅋ

### 정리

- `@SpringBootTest` : `Spring Container`와 테스트를 함께 실행험

- `@Transactional` : 테스트 케이스에 이 어노테이션이 잇으면 항상 `Roll back`함. 이러면 DB에 데이터가 남지안으니간 다음 테스트에 영향을 안주는거삼
    - `Service` 이런데 붙으면 롤백하지 않고 정상 작동하고, `Test Case`에 붙었을대만 롤백하도록 동작험
    - `@Commit` 붙이면 걍 커밋험
    ![alt text](image-180.png)

- 그러면 이런 순수한 테스트, 단위 테스트 에서는 필요 업자나용?
    - 단위 테스트, `Unit Test`는 최소한의 단위로만 하는 테스트이다. 자바 코드로만 하던가 최소로만 할때말하는 것임
    - 통합 테스트, `Integration Test`는 `Spring Container`, `DB`랑 연동해서 하는거슬 통합 테스트라고 말한다는 것임

- 단위테스트, `Unit Test`는 우리가 전에 자바로만 테스트 햇던것을 말하는것

![alt text](image-181.png)

- 통합테스트, `Integration Test`는 방금한거

- 근데 가급적이면 순수한 `Unit Test`가 훨씬 좋은 테스트일 확률이 높삼. 단위로 쪼개서 하는거고 `Spring Container`없이 하는게 좋삼 

- 어쩔수없이 `Container`까지 올리는경우도 잇지만 `Unit Test` 잘만드는게 좋슴~
