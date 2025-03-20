## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/131123

## 해설

REST_INFO 테이블에서 음식 종류별로 즐겨찾기 수가 가장 많은 식당의 음식 종류, ID, 식당 이름, 즐겨찾기 수를 조회하는 SQL문을 작성하세요

결과는 음식 종류를 기준으로 내림차순 정렬하세요

REST_INFO 테이블에서 REST_ID, REST_NAME, FOOD_TYPE, FAVORITES 가 필요하다

우리는 서브쿼리로, 음식 종류별로 즐겨찾기 수가 가장 많은 식당을 찾아야 한다.

그리고 REST_INFO과 REST_ID로 조인하면될 것이다. 

-----

원래는 REST_ID와 조인했는데, 이렇게 하니까 틀렸다고 결과가 나오더라

확인해보니, MAX(FAVORITES)는 음식 종류별로 가장 큰 즐겨찾기 수를 찾지만,

REST_ID가 함께 GROUP BY 되지 않아, 틀린 결과가 나온것이다.

따라서 서브쿼리에서

FOOD_TYPE 별로 MAX(FAVORITES)를 구하고

메인 쿼리에서 서브쿼리와 조인할때

FOOD_TYPE이 같은 행을 조인하면서, FAVORITES가 서브 쿼리에서 구한 MAX(FAVORITES)와 같은 행만 필터링 해야했다

이 방법을 통해 동일한 FOOD_TYPE 내에서 즐겨찾기 수가 같은 식당이 여러개 있어도 모두 포함 시킬 수 있는 것이다

### 다른 해설

혹은 ROW_NUMBER() 함수를 사용해서 해결 할 수 있다

- ROW_NUMBER() : 정렬 기준에 따라 각 행에 고유한 번호를 부여하는 함수

- OVER() : ROW_NUMBER() 같은 윈도우 함수가 어떤 기준으로 작동할지 정하는 기준

RANK_TABLE이라는 CTE 안에서 ROW_NUMBER함수 랭킹을 따로 만들어 줄 수 있다

`ROW_NUMBER() OVER(PARTITION BY FOOD_TYPE ORDER BY FAVORITES DESC)`

위 구절은, 음식 종류에 따라 카테고리를 나누고, 나눈 카테고리 안에서 즐겨찾기가 높은 순으로 정렬한다는 의미이다.

따라서 즐겨찾기가 높은 순으로 랭킹이 정렬되어 나오게 되는 것이다.

우리는 가장 높은 즐겨찾기인 가게를 알고싶으므로, `WHERE RANKING = 1`을 사용하여 1위 가게만 알 수 있을 것이다.

### ROW_NUMBER VS RANK VS DENSE_RANK

- ROW_NUMBER() : 중복이 있어도 1,2,3,4,5,... 순서대로 부여

- RANK() : 같은 값이 있으면 같은 순위를 부여하지만, 다음 순위를 건너뜀 
    - 1, 1, 3, 4, 5 ...

- DENSE_RANK() : 같은 값이 있으면 같은 순위를 부여하고, 다음 순위를 건너뛰지 않음
    - 1, 1, 2, 3, 4, 5 ... 



## 입력
```txt
//REST_INFO
REST_ID	REST_NAME	FOOD_TYPE	VIEWS	FAVORITES	PARKING_LOT	ADDRESS	TEL
00001	은돼지식당	한식	1150345	734	N	서울특별시 중구 다산로 149	010-4484-8751
00002	하이가쯔네	일식	120034	112	N	서울시 중구 신당동 375-21	NULL
00003	따띠따띠뜨	양식	1234023	102	N	서울시 강남구 신사동 627-3 1F	02-6397-1023
00004	스시사카우스	일식	1522074	230	N	서울시 서울시 강남구 신사동 627-27	010-9394-2554
00005	코슌스	일식	15301	123	N	서울특별시 강남구 언주로153길	010-1315-8729
```

## 출력
```txt
FOOD_TYPE	REST_ID	REST_NAME	FAVORITES
한식	00001	은돼지식당	734
일식	00004	스시사카우스	230
양식	00003	따띠따띠뜨	102
```

## 코드

```sql
SELECT A.FOOD_TYPE, A.REST_ID, A.REST_NAME, A.FAVORITES
FROM REST_INFO AS A
JOIN (
    SELECT MAX(FAVORITES) AS FAVORITES, FOOD_TYPE
    FROM REST_INFO
    GROUP BY FOOD_TYPE
) AS B
ON A.FAVORITES = B.FAVORITES AND A.FOOD_TYPE = B.FOOD_TYPE
ORDER BY A.FOOD_TYPE DESC
```

### 다른 코드

```sql
WITH RANK_TABLE AS (
    SELECT REST_ID, REST_NAME, FOOD_TYPE, FAVORITES,
        ROW_NUMBER() OVER (PARTITION BY FOOD_TYPE ORDER BY FAVORITES DESC) AS RANKING
    FROM REST_INFO
)

SELECT FOOD_TYPE, REST_ID, REST_NAME, FAVORITES
FROM RANK_TABLE
WHERE RANKING = 1
ORDER BY FOOD_TYPE DESC
```