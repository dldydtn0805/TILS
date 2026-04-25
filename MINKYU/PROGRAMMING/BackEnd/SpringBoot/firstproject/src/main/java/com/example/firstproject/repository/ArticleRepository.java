package com.example.firstproject.repository;

import com.example.firstproject.entity.Article;
import org.springframework.data.repository.CrudRepository;

// Article : 해당 레퍼지토리가 다루는 엔터티의 타입
// Long : 해당 레퍼지토리가 다루는 엔터티의 대푯값 타입
public interface ArticleRepository extends CrudRepository<Article, Long> {
}
