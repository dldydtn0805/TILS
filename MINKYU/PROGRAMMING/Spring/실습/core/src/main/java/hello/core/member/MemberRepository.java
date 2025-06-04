package hello.core.member;

public interface MemberRepository {
    // 새로운 회원 저장 메서드
    void save(Member member);
    // 회원 Id 값을 통해 회원 찾기 메서드
    Member findById(Long memberId);
}
