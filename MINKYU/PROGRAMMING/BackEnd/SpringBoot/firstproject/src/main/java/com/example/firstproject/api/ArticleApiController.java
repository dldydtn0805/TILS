package com.example.firstproject.api;

import com.example.firstproject.dto.ArticleForm;
import com.example.firstproject.entity.Article;
import com.example.firstproject.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 클래스가 REST 컨트롤러임을 선언
@RestController
public class ArticleApiController {
    // 게시글 레포 주입
    @Autowired
    private ArticleRepository articleRepository;
    // GET
    // 모든 게시글 조회
    @GetMapping("/api/articles")
    private List<Article> index() {
        return articleRepository.findAll();
    }

    // 단일 게시글 조회
    @GetMapping("/api/articles/{id}")
    private Article show(@PathVariable Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    // POST
    // 게시글 작성
    @PostMapping("/api/articles")
    // dto가 Request의 body에 담겨서 옴을 명시하는 어노테이션
    private Article create(@RequestBody ArticleForm dto) {
        Article article = dto.toEntity();
        return articleRepository.save(article);
    }
    // PATCH
    // 게시글 수정
    @PatchMapping("/api/articles/{id}")
    private ResponseEntity<Article> update(@PathVariable Long id, @RequestBody ArticleForm dto) {
        Article article = dto.toEntity();
        if (!id.equals(article.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Article target = articleRepository.findById(id).orElse(null);
        if (target == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 기존 게시글의 수정된 부분만 수정해 주기
        target.patch(article);
        Article updated = articleRepository.save(target);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    // DELETE
    // 게시글 삭제
    @DeleteMapping("/api/articles/{id}")
    private ResponseEntity<Article> delete(@PathVariable Long id) {
        Article target = articleRepository.findById(id).orElse(null);
        if (target == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        articleRepository.delete(target);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
