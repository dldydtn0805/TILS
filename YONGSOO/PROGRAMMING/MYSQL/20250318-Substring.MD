## 문제
https://school.programmers.co.kr/learn/courses/30/lessons/164670

## 해설

USED_GOODS_BOARD, USED_GOODS_USER 테이블에서 중고 거래 게시물을 3건 이상 등록한

사용자의 사용자 ID, 닉네임, 전체 주소, 전화번호를 조회하세요

이때, 전체 주소는 시, 도로명 주소, 상세 주소가 함께 출력되도록 해주시고,

전화번호의 경우 xxx-xxxx-xxxx 같은 형태로 하이픈 문자열 (-)을 삽입하여 출력하세요

결과는 회원 ID를 기준으로 내림차순 정렬하세요

USED_GOODS_USER 테이블에서 USER_ID, NICKNAME, CITY, STREET_ADDRESS1, STREET_ADDRESS2, TLNO 가 필요하고

USED_GOODS_BOARD 테이블에서 WRITER_ID 가 필요하다

USED_GOODS_BOARD 테이블에서 WRITER_ID 기준으로 GROUP BY 하고 COUNT를 세는 서브쿼리를 만들어서 USED_GOODS_USER와 조인하면 끝난다

새롭게 알게 된 것은 SUBSTRING() 함수다

### 기본 문법

`SUBSTRING(문자열, 시작위치, 길이)`

- 문자열 : 대상 문자열

- 시작 위치 : 추출을 시작할 위치 (1부터 시작)

- 길이 : 추출할 문자 개수 (생략가능, 생략하면 끝까지)


## 입력
```txt
//USED_GOODS_BOARD
BOARD_ID	WRITER_ID	TITLE	CONTENTS	PRICE	CREATED_DATE	STATUS	VIEWS
B0001	dhfkzmf09	칼라거펠트 코트	양모 70%이상 코트입니다.	120000	2022-10-14	DONE	104
B0002	lee871201	국내산 볶음참깨	직접 농사지은 참깨입니다.	3000	2022-10-02	DONE	121
B0003	dhfkzmf09	나이키 숏패팅	사이즈는 M입니다.	40000	2022-10-17	DONE	98
B0004	kwag98	반려견 배변패드 팝니다	정말 저렴히 판매합니다. 전부 미개봉 새상품입니다.	12000	2022-10-01	DONE	250
B0005	dhfkzmf09	PS4	PS5 구매로인해 팝니다.	250000	2022-11-03	DONE	111

//USED_GOODS_USER
USER_ID	NICKNAME	CITY	STREET_ADDRESS1	STREET_ADDRESS2	TLNO
dhfkzmf09	찐찐	성남시	분당구 수내로 13	A동 1107호	01053422914
dlPcks90	썹썹	성남시	분당구 수내로 74	401호	01034573944
cjfwls91	점심만금식	성남시	분당구 내정로 185	501호	01036344964
dlfghks94	희망	성남시	분당구 내정로 101	203동 102호	01032634154
rkdhs95	용기	성남시	분당구 수내로 23	501호	01074564564
```

## 출력
```txt
USER_ID	NICKNAME	전체주소	전화번호
dhfkzmf09	찐찐	성남시 분당구 수내로 13 A동 1107호	010-5342-2914
```

## 코드

```sql
SELECT A.USER_ID, A.NICKNAME, CONCAT(A.CITY, " ",A.STREET_ADDRESS1, " ", A.STREET_ADDRESS2) AS 전체주소, CONCAT(SUBSTRING(A.TLNO, 1, 3), "-",SUBSTRING(A.TLNO, 4, 4), "-",SUBSTRING(A.TLNO, 8, 4)) AS 전화번호
FROM USED_GOODS_USER AS A
JOIN (
    SELECT COUNT(*) AS BOARD_COUNT, WRITER_ID
    FROM USED_GOODS_BOARD
    GROUP BY WRITER_ID
    HAVING BOARD_COUNT >= 3
) AS B
ON A.USER_ID = B.WRITER_ID
ORDER BY A.USER_ID DESC
```