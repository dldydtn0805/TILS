package com.example.firstproject.repository;

import com.example.firstproject.entity.Article;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

// Article : 해당 레퍼지토리가 다루는 엔터티의 타입
// Long : 해당 레퍼지토리가 다루는 엔터티의 대푯값 타입
public interface ArticleRepository extends CrudRepository<Article, Long> {
    // 상속받은 CrudRepository의 findAll() 메서드 반환 타입 변경
    @Override
    ArrayList<Article> findAll();
}
