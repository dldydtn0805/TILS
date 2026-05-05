INSERT INTO article(title, content) VALUES('가', '1');
INSERT INTO article(title, content) VALUES('나', '2');
INSERT INTO article(title, content) VALUES('다', '3');

INSERT INTO article(title, content) VALUES('인생 영화를 적어보세요', '댓글에 적어봐!');
INSERT INTO article(title, content) VALUES('소울 푸드를 적어보세요', '댓글에 적어봐!');
INSERT INTO article(title, content) VALUES('취미를 적어보세요', '댓글에 적어봐!');

INSERT INTO comment(article_id, nickname, body) VALUES(4, '김민규', '안알려줌 ㅋ' );
INSERT INTO comment(article_id, nickname, body) VALUES(4, '조현기', '체인소 맨 : 레제편');
INSERT INTO comment(article_id, nickname, body) VALUES(4, '이승준', '방자전' );

INSERT INTO comment(article_id, nickname, body) VALUES(5, '김민규', '짬뽕' );
INSERT INTO comment(article_id, nickname, body) VALUES(5, '조현기', '치킨');
INSERT INTO comment(article_id, nickname, body) VALUES(5, '이승준', '피자' );

INSERT INTO comment(article_id, nickname, body) VALUES(6, '김민규', '롤' );
INSERT INTO comment(article_id, nickname, body) VALUES(6, '조현기', '야동 보기');
INSERT INTO comment(article_id, nickname, body) VALUES(6, '이승준', '음악 듣기');