package com.example.firstproject.entity;

import com.example.firstproject.dto.CommentDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.boot.model.naming.IllegalIdentifierException;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // comment - article은 n : 1 관계
    @JoinColumn(name="article_id") // fk생성(이름은 article_id)
    private Article article;

    @Column
    private String nickname;
    @Column
    private String body;

    public static Comment createComment(CommentDto dto, Article article) {
        if (dto.getId() != null) {
            throw new IllegalArgumentException("댓글 생성 실패! 댓글의 id가 없어야 합니다.");
        }
        if (dto.getArticleId() != article.getId()) {
            throw new IllegalArgumentException("댓글 생성 실패! 게시글의 id가 잘못되었습니다.");
        }

        return new Comment(dto.getId(), article, dto.getNickname(), dto.getBody());
    }

    // 기존 댓글과 수정된 댓글 중 변경된 부분만 수정하는 메서드
    public void patch(CommentDto dto) {
        // 예외 발생
        if (this.id != dto.getId()) {
            throw new IllegalIdentifierException("댓글 수정 실패! 잘못된 id가 입력되었습니다.");
        }
        if (dto.getNickname() != null) {
            this.nickname = dto.getNickname();
        }
        if (dto.getBody() != null) {
            this.body = dto.getBody();
        }
    }
}
