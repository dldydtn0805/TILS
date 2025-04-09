## Source
https://school.programmers.co.kr/learn/courses/30/lessons/59413

## Commentary


보호소에서는 몇시에 입양이 가장 활발하게 일어났는지를 알아보려고 한다

0시부터 23시까지 각 시간대별로 입양이 몇건이나 발생했는지 조회하세요

결과는 시간대 순으로 정렬해야합니다

---

로직은 다음과 같다

1. `WITH RECURSIVE HOURS AS (...)`

- 0부터 23까지 숫자 (시간) 을 생성하는 재귀 CTE 이다
- 처음에는 0부터 시작하고 HOUR + 1 씩 증가하면서 23까지 생성된다
- 결과적으로 이 부분은 24개의 시간대를 만든다

2. `ANIMAL_OUTCOME_HOURS_TABLE AS (...)`

- ANIMAL_OUTS 테이블에서 DATETIME 컬럼을 기준으로 입양된 시각의 시간을 추출하고, 각 시간대별로 몇건의 입양이 있었는지 센다
- 입양이 없는 시간대는 포함되지 않는다

3. 최종 SELECT

- 모든 시간대를 기준으로,

- 실제 입양기록이 있는 시간대를 LEFT JOIN

- COALESCE를 사용해 입양 건수가 없으면 0으로 표시한다

----

RECURSIVE CTE를 사용하는 것이 미숙해서 바로 떠오르지 않았다...

RECURSIVE CTE는 WITH 바로 뒤에 와야한다는 것도 알게됐다 ...

쉽지않군

## Input

```
ANIMAL_ID	ANIMAL_TYPE	DATETIME	NAME	SEX_UPON_OUTCOME
A349480	Dog	2013-12-22 11:30:00	Daisy	Spayed Female
A349733	Dog	2017-09-27 19:09:00	Allie	Spayed Female
A349990	Cat	2018-02-02 14:18:00	Spice	Spayed Female
A349996	Cat	2018-02-02 14:17:00	Sugar	Neutered Male
A350276	Cat	2018-01-28 17:51:00	Jewel	Spayed Female
```

## Output

```
HOUR	COUNT
0	0
1	0
2	0
3	0
4	0
5	0
6	0
7	3
8	1
9	1
10	2
11	13
12	10
13	14
14	9
15	7
16	10
17	12
18	16
19	2
20	0
21	0
22	0
23	0
```

## Source Code

```sql
WITH RECURSIVE HOURS AS (
    SELECT 0 AS HOUR
    UNION ALL
    SELECT HOUR + 1
    FROM HOURS
    WHERE HOUR < 23
), ANIMAL_OUTCOME_HOURS_TABLE AS ( 
    SELECT HOUR(DATETIME) AS HOUR, COUNT(*) AS COUNT
    FROM ANIMAL_OUTS
    GROUP BY HOUR
)

SELECT H.HOUR, COALESCE(A.COUNT, 0) AS COUNT
FROM HOURS AS H
LEFT JOIN ANIMAL_OUTCOME_HOURS_TABLE AS A
ON H.HOUR = A.HOUR
ORDER BY H.HOUR

```