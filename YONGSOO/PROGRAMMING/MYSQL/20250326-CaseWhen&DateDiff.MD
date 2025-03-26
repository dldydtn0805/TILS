## Source

https://school.programmers.co.kr/learn/courses/30/lessons/151141

## Commentary

CAR_RENTAL_COMPANY_CAR 테이블과 CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블과 CAR_RENTAL_COMPANY_DISCOUNT_PLAN 테이블에서 

자동차 종류가 트럭인 자동차의 대여 기록에 대해서

대여 기록별로 대여 금액 컬럼 명 (FEE)를 구하여 대여 기록 ID와 대여 금액 리스트를 출력하세요

결과는 FEE를 기준으로 내림차순 정렬하고

대여 금액이 같은 경우 대여 기록 ID를 기준으로 내림차순 정렬하세요

------

자동차 종류는 CAR_RENTAL_COMPANY_CAR, CAR_RENTAL_COMPANY_DISCOUNT_PLAN 테이블에서 CAR_TYPE 이다

대여 기록은 CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블이다

대여 금액은 CAR_RENTAL_COMPANY_CAR의 DAILY_FEE 와 CAR_RENTAL_COMPANY_DISCOUNT_PLAN의 DURATION_TYPE, DISCOUNT_RATE와 CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블의 START_DATE, END_DATE에 다섯가지 컬럼에 의해서 정해진다

결국 우리는 각 대여 기록별 대여 금액을 구하기 위해 세가지 테이블을 조인해서 구해야한다

----

로직은 다음과 같다

1. RENTAL_DURATION_TABLE
  - CAR_RENTAL_COMPANY_RENTAL_HISTORY와 CAR_RENTAL_COMPANY_CAR 테이블을 조인한다
  - 트럭 타입의 자동차만 선택한다
  - 각 렌탈 데여 기간을 계산한다 (시작일과 종료일의 차이 + 1)
  - 일일 대여 요금을 포함한다

2. 메인 쿼리
  - LEFT JOIN 을 사용하여 CAR_RENTAL_COMPANY_DISCOUNT_PLAN  테이블과 연결한다
  - 대여 기간에 따른 할인율을 적용한다
    - 7일 이상, 30일 이상, 90일 이상 기준으로 할인율이 다르다

3. FEE 계산
  - 할인율이 없으면, 일일 요금 * 대여기간
  - 할인율이 있으면, 일일 요금 * 대여기간 * (100-할인율)/100
  - 할인율이 높은 것만 MIN 함수와 GROUP BY를 활용해서 추적
  - TRUNCATE 함수로 소수점 자르기

4. 결과
  - 요금을 기준으로 내림차순 정렬
  - 같은 요금일 경우 HISTORY_ID로 내림차순 정렬





## Input
```
//CAR_RENTAL_COMPANY_CAR 

CAR_ID	CAR_TYPE	DAILY_FEE	OPTIONS
1	트럭	26000	가죽시트,열선시트,후방카메라
2	SUV	14000	스마트키,네비게이션,열선시트
3	트럭	32000	주차감지센서,후방카메라,가죽시트

//CAR_RENTAL_COMPANY_RENTAL_HISTORY 

HISTORY_ID	CAR_ID	START_DATE	END_DATE
1	1	2022-07-27	2022-08-02
2	1	2022-08-03	2022-08-04
3	2	2022-08-05	2022-08-05
4	2	2022-08-09	2022-08-12
5	3	2022-09-16	2022-10-15

//CAR_RENTAL_COMPANY_DISCOUNT_PLAN 

PLAN_ID	CAR_TYPE	DURATION_TYPE	DISCOUNT_RATE
1	트럭	7일 이상	5%
2	트럭	30일 이상	7%
3	트럭	90일 이상	10%
4	세단	7일 이상	5%
5	세단	30일 이상	10%
6	세단	90일 이상	15%
```


## Output
```
HISTORY_ID	FEE
5	892800
1	172900
2	52000
```

## Source Code

```sql

WITH RENTAL_DURATION_TABLE AS (
    SELECT A.CAR_ID, A.HISTORY_ID, B.DAILY_FEE,
        DATEDIFF(A.END_DATE, A.START_DATE)+1 AS RENTAL_DURATION
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY AS A
    JOIN CAR_RENTAL_COMPANY_CAR AS B
    ON A.CAR_ID = B.CAR_ID
    WHERE B.CAR_TYPE = "트럭"
)

SELECT DISTINCT A.HISTORY_ID, 
    CASE 
        WHEN B.DISCOUNT_RATE IS NULL THEN A.DAILY_FEE * A.RENTAL_DURATION
        ELSE MIN(TRUNCATE(A.DAILY_FEE * A.RENTAL_DURATION * (100-B.DISCOUNT_RATE)/100, 0)) 
    END AS FEE
FROM RENTAL_DURATION_TABLE AS A
LEFT JOIN (
    SELECT 
        CASE 
            WHEN DURATION_TYPE = "7일 이상" THEN 7
            WHEN DURATION_TYPE = "30일 이상" THEN 30
            WHEN DURATION_TYPE = "90일 이상" THEN 90
        END AS MIN_DURATION,
        DISCOUNT_RATE
    FROM CAR_RENTAL_COMPANY_DISCOUNT_PLAN 
    WHERE CAR_TYPE = "트럭"
) AS B
ON (A.RENTAL_DURATION >= B.MIN_DURATION)
GROUP BY A.HISTORY_ID
ORDER BY FEE DESC, A.HISTORY_ID DESC
```

