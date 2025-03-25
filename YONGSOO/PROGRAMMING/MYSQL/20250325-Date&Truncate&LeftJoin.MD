## Reference

https://school.programmers.co.kr/learn/courses/30/lessons/157339

## Commentary

CAR_RENTAL_COMPANY_CAR, CAR_RENTAL_COMPANY_RENTAL_HISTORY, CAR_RENTAL_COMPANY_DISCOUNT_PLAN

세 테이블에서 자동차 종류가 '세단' 혹은 'SUV'인 자동차 중

2022년 11월 1일부터 2022년 11월 30일까지 대여 가능하고

30일 간의 대여금액이 50만원 이상 200만원 미만인 자동차에 대해서

자동차 ID, 자동차 종류, 대여 금액 (FEE) 리스트를 출력하세요

결과는 대여 금액을 기준으로 내림차순 정렬하고 대여 금액이 같은 경우

자동차 종류를 기준으로 오름차순 정렬,

자동차 종류까지 같은 경우 자동차 ID를 기준으로 내림차순 정렬하세요

자동차 종류는 CAR_RENTAL_COMPANY_CAR 에서 CAR_TYPE

대여 기간은 CAR_RENTAL_COMPANY_RENTAL_HISTORY 에서 START_DATE, END_DATE

30일 간의 대여 금액은 CAR_RENTAL_COMPANY_CAR의 DAILY_FEE / CAR_RENTAL_COMPANY_DISCOUNT_PLAN의 DURATION_TYPE, DISCOUNT_RATE를 사용해서 알 수 있다

세 테이블을 적절히 조인하고 연산하면 결과를 출력 할 수 있을 것인데,

서브 쿼리를 사용해서 30일 간의 대여 금액을 구하고 이 금액이 50만원 이상 200만원 미만인 세단 혹은 SUV를 구하고

이렇게 구한 자동차들 중에서 대여 기간이 11월 1일부터 11월 30일 까지 가능한 자동차를 찾으면 된다

----

간만에 어려운 SQL 문제였다

로직은 다음과 같다

1. FEE_TABLE 임시 테이블 생성
     - CAR_RENTAL_COMPANY_CAR 테이블과 CAR_RENTAL_COMPANY_DISCOUNT_PLAN 테이블을 조인한다
    - 조건
        - 차종이 SUV 혹은 세단
        - 장기 렌탈 (30일 이상) 기준 월간 렌탈 요금이 50만원 이상, 200만원 미만인 차량
    - 월간 요금 계산 : 일일요금 * 30일 * 할인율을 적용한 요금

2. 메인 쿼리

    - FEE_TABLE에서 선택된 차량 중 2022년 11월에 대여되지 않은 차량을 찾는다
    - 조건
        - 대여 시작일이 11월 1일에서 30일 사이
        - 종료일이 11월 1일에서 30일 사이
        - 대여 기간이 11월을 완전히 포함


- 이 과정에서 TRUNCATE 함수를 사용하여 정수 이하의 부분은 버렸다

- LEFT JOIN을 사용하여 해당 기간을 포함하는 자동차를 찾고, CAR_ID가 NULL인 경우만 출력했다

-----

상당히 까다롭네 다양한 개념을 한번에 적용하려니까

역시 레벨 4는 어려워



## Input

```
//CAR_RENTAL_COMPANY_CAR
CAR_ID	CAR_TYPE	DAILY_FEE	OPTIONS
1	SUV	25000	가죽시트,열선시트,후방카메라
2	세단	14000	스마트키,네비게이션,열선시트
3	트럭	32000	주차감지센서,후방카메라,가죽시트
4	세단	12000	열선시트,후방카메라
5	세단	22000	스마트키,주차감지센서

//CAR_RENTAL_COMPANY_RENTAL_HISTORY
HISTORY_ID	CAR_ID	START_DATE	END_DATE
1	1	2022-08-27	2022-09-02
2	1	2022-10-03	2022-10-04
3	2	2022-10-05	2022-10-20
4	2	2022-10-10	2022-11-12
5	3	2022-10-16	2022-10-17

//CAR_RENTAL_COMPANY_DISCOUNT_PLAN
PLAN_ID	CAR_TYPE	DURATION_TYPE	DISCOUNT_RATE
1	트럭	7일 이상	5%
2	트럭	30일 이상	7%
3	트럭	90일 이상	10%
4	세단	7일 이상	5%
5	세단	30일 이상	10%
6	세단	90일 이상	15%
7	SUV	7일 이상	3%
8	SUV	30일 이상	8%
9	SUV	90일 이상	12%
```


## Output

```
CAR_ID	CAR_TYPE	FEE
5	세단	690000
1	SUV	621000
```


## Source Code

```sql
WITH FEE_TABLE AS (
    SELECT A.CAR_TYPE, A.DAILY_FEE, A.CAR_ID, TRUNCATE(A.DAILY_FEE * 30 * (100-B.DISCOUNT_RATE) / 100, 0) AS FEE
    FROM CAR_RENTAL_COMPANY_CAR AS A 
    JOIN (
        SELECT DISCOUNT_RATE, CAR_TYPE
        FROM CAR_RENTAL_COMPANY_DISCOUNT_PLAN
        WHERE DURATION_TYPE = "30일 이상"
        GROUP BY CAR_TYPE
    ) AS B
    ON A.CAR_TYPE = B.CAR_TYPE
    WHERE (A.CAR_TYPE = "SUV" OR A.CAR_TYPE = "세단") AND 500000 <= TRUNCATE(A.DAILY_FEE * 30 * (100-B.DISCOUNT_RATE) / 100, 0) AND TRUNCATE(A.DAILY_FEE * 30 * (100-B.DISCOUNT_RATE) / 100, 0) < 2000000
)

SELECT DISTINCT A.CAR_ID, A.CAR_TYPE, A.FEE
FROM FEE_TABLE AS A
LEFT JOIN (
    SELECT CAR_ID
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    WHERE ('2022-11-01' <= START_DATE AND START_DATE <= '2022-11-30') OR
        ('2022-11-01' <= END_DATE AND END_DATE <= '2022-11-30') OR
        (START_DATE < '2022-11-01' AND '2022-11-30' < END_DATE)
) AS B
ON A.CAR_ID = B.CAR_ID
WHERE B.CAR_ID IS NULL
ORDER BY A.FEE DESC, A.CAR_TYPE ASC, A.CAR_ID DESC

```