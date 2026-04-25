package com.example.firstproject.controller;

import com.example.firstproject.dto.ArticleForm;
import com.example.firstproject.entity.Article;
import com.example.firstproject.repository.ArticleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@Slf4j
public class ArticleController {
    // SpringBoot 의존성 주입(DI)
    // 미리 생성해 놓은 레퍼지토리에 객체 주입
    // private ArticleRepository articleRepository = new ArticleRepositoryImpl();
    @Autowired
    private ArticleRepository articleRepository;
    
    // 새로운 게시글 작성 페이지 요청(get)
    @GetMapping("/articles/new")
    public String newArticleForm() {
        return "articles/new";
    }
    
    // 새로운 게시글 작성 요청(post)
    @PostMapping("/articles/create")
    public String createArticle(ArticleForm form) {
        // System.out.println(form.toString());
        log.info(form.toString());
        // 1. DTO -> Entity
        Article article = form.toEntity();
        System.out.println(article.toString());

        // 2. save Entity to DB using Repository
        Article saved = articleRepository.save(article);
        // System.out.println(saved.toString());
        log.info(saved.toString());
        return "";
    }
    
    // 특정 id값 게시글 페이지 요청(get)
    @GetMapping("/articles/{id}")
    public String show(@PathVariable Long id, Model model) {
        // 레퍼지토리가 DB에서 받아온 엔터티
        // Optional<Article> articleEntity = articleRepository.findById(id);
        Article articleEntity = articleRepository.findById(id).orElse(null);
        
        // model에 해당 엔터티를 등록
        // article이라는 이름으로 articleEntity를 model에 등록한다
        model.addAttribute("article", articleEntity);
        
        // 모델에 등록한 article을 활용하여 보여주는 뷰 페이지 반환
        return "articles/show";
    }
}
