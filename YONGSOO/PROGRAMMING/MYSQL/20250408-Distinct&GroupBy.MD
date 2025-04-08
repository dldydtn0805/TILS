## Source

https://school.programmers.co.kr/learn/courses/30/lessons/62284

## Commentary

우유와 요거트를 동시에 구입한 장바구니가 있는지 알아보고자 한다

동시에 구입한 장바구니의 아이디를 조회하세요

결과는 장바구니의 아이디 순으로 나와야합니다

---

1. WITH 절
    - `WHERE NAME IN ("Milk", "Yogurt")`를 사용해 우유나 요거트를 가지는 행을 가져온다
    - `GROUP BY CART_ID, NAME`를 사용해 장바구니 아이디, 제품 이름 별로 묶는다
    - DISTINCT를 사용해 중복을 제거한다
    - 이렇게하면 우유나 요거트를 가지고 있는 장바구니를 중복 없이 가져올 수 있다.

2. 메인 쿼리
    - `GROUP BY CART_ID`를 사용해 장바구니 별로 묶는다
    - `HAVING COUNT(*) > 1`를 사용해 Milk와 Yogurt 모두 가진 장바구니를 거른다

----

테이블이 하나밖에 없어서 왜 4레벨인가 했더니, DISTINCT와 WITH절, HAVING, GROUP BY를 적절히 잘 응용해야 했다. 

쉬운데 안쉬운 문제네


## Input

```
//CART_PRODUCTS
ID	CART_ID	NAME	PRICE
1630	83	Cereal	3980
1631	83	Multipurpose Supply	3900
5491	286	Yogurt	2980
5504	286	Milk	1880
8435	448	Milk	1880
8437	448	Yogurt	2980
8438	448	Tea	11000
20236	1034	Yogurt	2980
20237	1034	Butter	4890
```

## Output
```
CART_ID
286
448
```

## Source Code

```sql

WITH MILK_AND_YOGURT_TABLE AS (
    SELECT DISTINCT CART_ID, NAME
    FROM CART_PRODUCTS
    WHERE NAME IN ("Milk", "Yogurt")
    GROUP BY CART_ID, NAME
)

SELECT CART_ID
FROM MILK_AND_YOGURT_TABLE
GROUP BY CART_ID
HAVING COUNT(*) > 1;
```