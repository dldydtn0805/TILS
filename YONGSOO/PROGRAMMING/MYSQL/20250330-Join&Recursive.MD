## Source
https://school.programmers.co.kr/learn/courses/30/lessons/301650

## Commentary 

3세대 대장균의 ID를 출력하는 SQL문을 작성하세요

결과는 대장균의 ID에 대해 오름차순 정렬하세요


----

PARENT_ID 가 NULL인 개체가 1세대,

각 1세대에서 분화된 것들이 2세대, 

2세대에서 분화된 것이 3세대, ....


이런식이다. 

따라서, 1세대를 구하고, 2세대를 구한 뒤, 

3세대를 구하면 될 것 같은데 ? 

---

1세대 구하는 것은 서브쿼리로 하면 되고, 

해당 쿼리와 테이블을 조인해서 2세대를 만들고, 

이것을 또 조인해서 3세대를 만들면 되는것 아닌가 ? 

정확히 처음 생각한대로 구현하니 맞았다 굿 

---

다른 사람들의 해설을 보니 `RECURSIVE CTE`를 사용해서 푸는 것을 확인했다

SQL에도 재귀가 있다고 ? ? 하면서 보니 참신한 방법이었다

### RECURSIVE CTE의 기본 구조

```sql
WITH RECURSIVE CTE AS (
    -- (1) Anchor Query: 최초의 데이터 선택
    SELECT ... FROM ... WHERE ... 
    
    UNION ALL
    
    -- (2) Recursive Query: 이전 결과를 기반으로 다음 단계 데이터 선택
    SELECT ... FROM ... JOIN CTE ON ...
)

-- (3) 최종적으로 사용할 데이터 선택
SELECT * FROM CTE;

```

- `Anchor Query` : 초기 데이터 선택
    - 재귀가 시작하는 기본 데이터를 가져옴
    - WHERE 절을 사용하여 최상위 노드를 선택할  수 있음

- `Recursive Query` : 재귀적으로 실행되는 부분
    - `JOIN CTE`를 통해 이전 단계의 결과를 사용하여 다음 단계의 데이터를 가져옴
    - UNION ALL 을 사용하여 새로운 데이터를 기존 데이터에 추가함

- 최종 SELECT 문
    - 재귀적으로 생성된 데이터를 활용하여 원하는 결과를 출력

- 주의할 점
    
    1. 재귀 종료 조건을 설명해야함
        - MySQL의 기본 재귀 깊이 제한 : 1000번
    2. 계층적 데이터에서 JOIN을 올바르게 설정해야함
        - `JOIN CTE ON ...` 에서 연결이 잘못되면 데이터가 누락되거나, 무한루프에 걸릴 수 있음
    3. 성능 고려 필요
        - 데이터가 많아지면 속도가 느려질 수 있음
        - 인덱스 최적화 필요 (`ID` 혹은 `PARENT_ID` 같은 컬럼)

## Input

```
//ECOLI_DATA

ID	PARENT_ID	SIZE_OF_COLONY	DIFFERENTIATION_DATE	GENOTYPE
1	NULL	10	2019/01/01	5
2	NULL	2	2019/01/01	3
3	1	100	2020/01/01	4
4	2	16	2020/01/01	4
5	2	17	2020/01/01	6
6	4	101	2021/01/01	22
7	3	101	2022/01/01	23
8	6	1	2022/01/01	27
```

## Output
```
ID
6
7
```

## Source Code

```sql


WITH GET_SECOND_GENERATION AS (
    SELECT A.ID
    FROM ECOLI_DATA AS A
    JOIN (
        SELECT ID
        FROM ECOLI_DATA
        WHERE PARENT_ID IS NULL
    ) AS B
    ON A.PARENT_ID = B.ID
)

SELECT A.ID
FROM ECOLI_DATA AS A
JOIN GET_SECOND_GENERATION AS B
ON A.PARENT_ID = B.ID
ORDER BY A.ID ASC
```


### Other Source Code

```sql

WITH RECURSIVE CTE AS (

    SELECT ID, 1 AS GEN
    FROM ECOLI_DATA
    WHERE PARENT_ID IS NULL
    
    UNION ALL
    
    SELECT A.ID, B.GEN + 1 AS GEN
    FROM ECOLI_DATA AS A
    JOIN CTE AS B
    ON A.PARENT_ID = B.ID
)

SELECT ID
FROM CTE
WHERE GEN = 3
ORDER BY ID ASC
```