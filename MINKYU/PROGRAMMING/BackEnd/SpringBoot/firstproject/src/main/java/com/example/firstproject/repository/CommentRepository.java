package com.example.firstproject.repository;

import com.example.firstproject.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시글의 댓글 조회
    // nativeQuery=true -> 기존 SQL문을 그대로 쿼리 언어로 사용
    @Query(value="SELECT * FROM comment WHERE article_id = :articleId",
            nativeQuery=true)
    List<Comment> findByArticleId(Long articleId);
    // 특정 닉네임 댓글 조회
    @Query(value="SELECT * FROM comment WHERE nickname = :nickname",
            nativeQuery=true)
    List<Comment> findByNickname(String nickname);

}
