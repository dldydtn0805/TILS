package com.example.firstproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor // 기본 생성자
@ToString
@Getter
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 생성
    private Long id;
    @Column
    private String title;
    @Column
    private String content;

    // 기존 게시글과 수정된 게시글 중 변경된 부분만 수정하는 메서드
    public void patch(Article article) {
        if (article.title != null) {
            this.title = article.title;
        }
        if (article.content != null) {
            this.content = article.content;
        }
    }

    // getter 메서드
//    public Long getId() {
//        return id;
//    }
}
