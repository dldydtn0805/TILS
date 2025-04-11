## Source

https://school.programmers.co.kr/learn/courses/30/lessons/131116


## Commentary 

FOOD_PRODUCT 테이블에서 식품 분류별로 가격이 제일 비싼 식품의 분류, 가격, 이름을 조회하세요

식품 분류가 과자, 국, 김치, 식용유인 경우만 출력하시고, 가격을 기준으로 내림차순 정렬하세요

----

식품 분류별로 GROUP BY 한 것을 WITH 절로 가져오고

분류가 과자, 국, 김치, 식용유인 것만 출력하면 될거같은데 ?

너무 쉬운거 아님? 

---

쉽긴했는데 카테고리별로 GROUP BY 하면 안된다. 

ROW_NUMBER로 랭킹을 매겨준 WITH 절을 가져와 랭킹이 1등인 것을 출력하면 됐다

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
//FOOD_PRODUCT
PRODUCT_ID	PRODUCT_NAME	PRODUCT_CD	CATEGORY	PRICE
P0018	맛있는고추기름	CD_OL00008	식용유	6100
P0019	맛있는카놀라유	CD_OL00009	식용유	5100
P0020	맛있는산초유	CD_OL00010	식용유	6500
P0021	맛있는케첩	CD_SC00001	소스	4500
P0022	맛있는마요네즈	CD_SC00002	소스	4700
P0039	맛있는황도	CD_CN00008	캔	4100
P0040	맛있는명이나물	CD_CN00009	캔	3500
P0041	맛있는보리차	CD_TE00010	차	3400
P0042	맛있는메밀차	CD_TE00001	차	3500
P0099	맛있는맛동산	CD_CK00002	과자	1800
```

## Output
```
CATEGORY	MAX_PRICE	PRODUCT_NAME
식용유	6500	맛있는산초유
과자	1800	맛있는맛동산
```

## Source Code
```sql
WITH PRICE_RANKING_TABLE AS (
    SELECT PRODUCT_NAME, PRODUCT_CD, CATEGORY, PRICE, ROW_NUMBER() OVER(PARTITION BY CATEGORY ORDER BY PRICE DESC) AS RANKING
    FROM FOOD_PRODUCT
)

SELECT CATEGORY, PRICE AS MAX_PRICE, PRODUCT_NAME
FROM PRICE_RANKING_TABLE
WHERE CATEGORY IN ("과자", "국", "김치", "식용유") AND RANKING = 1
ORDER BY PRICE DESC
```