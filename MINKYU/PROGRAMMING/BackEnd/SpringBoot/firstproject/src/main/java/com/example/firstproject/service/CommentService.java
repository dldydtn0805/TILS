package com.example.firstproject.service;

import com.example.firstproject.dto.CommentDto;
import com.example.firstproject.entity.Article;
import com.example.firstproject.entity.Comment;
import com.example.firstproject.repository.ArticleRepository;
import com.example.firstproject.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ArticleRepository articleRepository;

    public List<CommentDto> comments(Long articleId) {
        // Comment 엔터티 리스트
        List<Comment> comments = commentRepository.findByArticleId(articleId);
        // 리턴할 DTO 리스트를 담을 변수
        List<CommentDto> dtos = new ArrayList<CommentDto>();
        // 모든 Comment 타입 엔티티를 CommentDto 타입의 DTO로 변환하여 리턴 리스트에 담기
        for (int i = 0; i < comments.size(); i++) {
            Comment comment = comments.get(i);
            CommentDto dto = CommentDto.createCommentDto(comment);
            dtos.add(dto);
        }
        return dtos;
    }

    @Transactional // 트랜잭션 처리(롤백을 위한)
    public CommentDto create(Long articleId, CommentDto dto) {
        Article article = articleRepository.findById(articleId).orElseThrow(() ->
                new IllegalArgumentException("댓글 생성 실패!" + "대상 게시글이 없습니다."));
        // 댓글 엔티티 생성
        Comment comment = Comment.createComment(dto, article);
        // DB에 저장
        Comment created = commentRepository.save(comment);
        // DTO로 변환 후 반환
        return CommentDto.createCommentDto(created);
    }
}
