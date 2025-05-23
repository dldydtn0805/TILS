## 문제
https://school.programmers.co.kr/learn/courses/30/lessons/301649

## 해설
대장균 개체의 크기를 내림차순으로 정렬했을때 

상위 0 ~ 25%를 CRITICAL

26 ~ 50%를 HIGH

51 ~ 75%를 MEDIUM

76 ~ 100%를 LOW라고 분류한다.

대장균 개체의 ID와 분류된 이름 [COLONY_NAME]를 출력하세요

결과는 개체의 ID에 대해 오름차순 정렬하세요

단, 총 데이터의 수는 4의 배수이며 같은 사이즈의 대장균 개체가 서로 다른 이름으로 분류되는 경우는 없다.

이를위해 우리는 우선 대장균 개체를 개체의 크기 순으로 정렬할 필요가 있다.

정렬한 가상 테이블을 기준으로 순위값을 주고

순위별로 대장균의 분류를 나누면 된다.

여기서 사용된 주요 SQL 함수들은 다음과 같다.

### ROW_NUMBER () OVER (ORDER BY ...) 

- 각 행에 고유한 순번을 매기는 함수

- 이 함수를 사용해서 대장균 개체들의 순위를 매길 수 있었음

- 결과적으로 가장 큰 개체가 1번, 다음 개체가 2번 ... 이런식으로 번호가 매겨진다.

- DENSE_RANK 또한 순위를 매기는 함수이다
    - ROW_NUMBER ()
        - 같은 값이 있어도 중복 없이 순위를 부여한다. 
        - 순서가 무조건 1, 2, 3, 4, 형태로 증가한다
        - 고유한 순서를 부여해야할 떄 사용한다 (페이징)

    - DENSE_RANK ()
        - 같은 값이 있으면 같은 순위를 부여한다.
        - 순위가 이를테면 1, 1, 2, 3 형태로 증가할 수 있다.
        - 같은 값이면 동일한 순위를 줘야할때 사용한다 (대회 점수 순위, 랭킹)


### COUNT(*) OVER()

- 전체 데이터의 개수를 구하는 함수

- COUNT(*)는 일반적으로 전체 행 개수를 구하지만, 이경우는 모든 행에 같은 개수 값이 들어간다. 
- 이 값이 각 행에서 동일하게 유지되므로, 순위를 비교하는데 사용할 수 있게 된다.


#### OVER ()

- 윈도우 함수를 사용할때 필요한 구문이다. 윈도우 함수가 데이터를 처리하는 방식을 결정한다.

- COUNT(), ROW_NUMBER(), RANK(), SUM() 같은 집계함수에 OVER()를 붙이면 윈도우 함수가 된다

- 예컨대 ORDER BY와 함께 사용하면 순위를 매길 수 있고, PARTITION BY를 추가하면 그룹별 집계도 가능하다.

- 일반적인 집계함수와 달리, 개별 행을 유지하면서 계산 결과를 보여준다.


이 문제를 풀며, 윈도우 함수에 대해 조금 알게되었다.

이 문제에서 DENSE_RANK가 아니라 ROW_NUMBER를 사용해야 하는 이유는 다음과 같다.

예를들어 DENSE_RANK를 사용하고 [101, 101, 100, 17, 16, 10, 2, 1]인 데이터가 들어온다면,

[1, 1, 2, 3, 4, 5, 6, 7]이 순위가 된다.

이 경우에 사실상 3등인 100은 CRITICAL에 배정될 수 있다는 것이다.

즉 개체가 정확히 4등분 되지 않을 수 있다는 것이다.

이런 상황을 배제하기 위해서 ROW NUMBER를 사용하여 올바른 분류를 할 수 있는 것이다.

이것이 가능한 이유는 문제의 조건에 다음이 있기 때문이다.

`단, 총 데이터의 수는 4의 배수이며 같은 사이즈의 대장균 개체가 서로 다른 이름으로 분류되는 경우는 없습니다.`


## 입력
```
//ECOLI_DATA
ID	PARENT_ID	SIZE_OF_COLONY	DIFFERENTIATION_DATE	GENOTYPE
1	NULL	10	2019/01/01	5
2	NULL	2	2019/01/01	3
3	1	100	2020/01/01	4
4	2	16	2020/01/01	4
5	2	17	2020/01/01	6
6	4	101	2021/01/01	22
7	6	101	2022/01/01	23
8	6	1	2022/01/01	27
```
## 출력

```
ID	COLONY_NAME
1	MEDIUM
2	LOW
3	HIGH
4	MEDIUM
5	HIGH
6	CRITICAL
7	CRITICAL
8	LOW
```
## 코드

```sql
WITH ECOLI_DATA_RANK AS (
    SELECT ID, 
        SIZE_OF_COLONY,
        ROW_NUMBER() OVER (ORDER BY SIZE_OF_COLONY DESC) AS RANKING,
        COUNT(*) OVER() AS TOTAL_RANK
    FROM ECOLI_DATA
)

SELECT ID,
    CASE
        WHEN RANKING <= TOTAL_RANK / 4 THEN "CRITICAL"
        WHEN RANKING <= TOTAL_RANK / 2 THEN "HIGH"
        WHEN RANKING <= TOTAL_RANK * 3 / 4 THEN "MEDIUM"
        ELSE "LOW"
    END AS COLONY_NAME
FROM ECOLI_DATA_RANK
ORDER BY ID
```