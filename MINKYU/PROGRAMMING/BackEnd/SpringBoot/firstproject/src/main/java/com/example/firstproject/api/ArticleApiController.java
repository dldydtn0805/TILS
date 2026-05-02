package com.example.firstproject.api;

import com.example.firstproject.dto.ArticleForm;
import com.example.firstproject.entity.Article;
import com.example.firstproject.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 클래스가 REST 컨트롤러임을 선언
@RestController
public class ArticleApiController {
    // 게시글 서비스 주입
    @Autowired
    private ArticleService articleService;

    // GET
    // 모든 게시글 조회
    @GetMapping("/api/articles")
    private List<Article> index() {
        return articleService.index();
    }

    // 단일 게시글 조회
    @GetMapping("/api/articles/{id}")
    private Article show(@PathVariable Long id) {
        return articleService.show(id);
    }

    // POST
    // 게시글 작성
    @PostMapping("/api/articles")
    private ResponseEntity<Article> create(@RequestBody ArticleForm dto) {
        Article created = articleService.create(dto);
        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    // PATCH
    // 게시글 수정
    @PatchMapping("/api/articles/{id}")
    private ResponseEntity<Article> update(@PathVariable Long id, @RequestBody ArticleForm dto) {
        Article updated = articleService.update(id, dto);
        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // DELETE
    // 게시글 삭제
    @DeleteMapping("/api/articles/{id}")
    private ResponseEntity<Article> delete(@PathVariable Long id) {
        Article deleted = articleService.delete(id);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
