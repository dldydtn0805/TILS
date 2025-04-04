## Source

https://school.programmers.co.kr/learn/courses/30/lessons/133027

## Commentary

7월 아이스크림 총 생산량과 상반기의 아이스크림 총 주문량을 더한 값이 큰 순서대로 상위 3개의 맛을 조회하라

FIRST_HALF 테이블에서 FLAVOR 별로 TOTAL_ORDER의 합을 구하고

JULY 테이블에서 FLAVOR 별로 TOTAL_ORDER의 합을 구한다

이 두 서브쿼리를 조인하고, TOTAL_ORDER의 합을 또 더한다

이 더한 값에서 상위 3개까지만 출력하면 끝이다

로직은 다음과 같다

1. 7월 주문량 집계

    - July 테이블에서 Flavor 별 총 주문량을 계산
    - Flavor 기준으로 그룹화

2. 상반기 데이터와 7월 주문량 합산
    - First_Half 테이블과 7월 주문량 테이블을 Flavor 기준으로 Join
    - 두 테이블 주문량을 합산하여 새로운 정렬 기준 생성

3. 랭킹 부여
    - 주문량 합계가 높은 순으로 ROW_NUMBER을 사용해 랭킹 매기기

4. 상위 3개 맛 선택
    - Ranking <= 3 조건을 사용해 상위 3개 맛만 선택
    - 랭킹 순으로 정렬

ROW_NUMBER을 사용해서 랭킹을 매길 수 있으면 쉽게 풀 수 있었다

### ROW_NUMBER VS RANK VS DENSE_RANK

- ROW_NUMBER() : 중복이 있어도 1,2,3,4,5,... 순서대로 부여

- RANK() : 같은 값이 있으면 같은 순위를 부여하지만, 다음 순위를 건너뜀 
    - 1, 1, 3, 4, 5 ...

- DENSE_RANK() : 같은 값이 있으면 같은 순위를 부여하고, 다음 순위를 건너뛰지 않음
    - 1, 1, 2, 3, 4, 5 ... 


`ROW_NUMBER() OVER(PARTITION BY FOOD_TYPE ORDER BY FAVORITES DESC)`

위 구절은, 음식 종류에 따라 카테고리를 나누고, 나눈 카테고리 안에서 즐겨찾기가 높은 순으로 정렬한다는 의미이다.



## Input
```
// FIRST_HALF
SHIPMENT_ID	FLAVOR	TOTAL_ORDER
101	chocolate	3200
102	vanilla	2800
103	mint_chocolate	1700
104	caramel	2600
105	white_chocolate	3100
106	peach	2450
107	watermelon	2150
108	mango	2900
109	strawberry	3100
110	melon	3150
111	orange	2900
112	pineapple	2900

//JULY
SHIPMENT_ID	FLAVOR	TOTAL_ORDER
101	chocolate	520
102	vanilla	560
103	mint_chocolate	400
104	caramel	460
105	white_chocolate	350
106	peach	500
107	watermelon	780
108	mango	790
109	strawberry	520
110	melon	400
111	orange	250
112	pineapple	200
208	mango	110
209	strawberry	220
```
## Output
```
FLAVOR
strawberry
mango
chocolate
```

## Source Code
```sql
WITH RANK_TABLE AS (
    SELECT A.FLAVOR, A.TOTAL_ORDER, ROW_NUMBER() OVER(ORDER BY (A.TOTAL_ORDER + B.JULY_TOTAL_ORDER) DESC) AS RANKING
    FROM FIRST_HALF AS A 
    JOIN (
        SELECT SUM(TOTAL_ORDER) AS JULY_TOTAL_ORDER, FLAVOR
        FROM JULY
        GROUP BY FLAVOR
    ) AS B
    ON A.FLAVOR = B.FLAVOR
)

SELECT FLAVOR
FROM RANK_TABLE
WHERE RANKING <= 3
ORDER BY RANKING ASC 
```

