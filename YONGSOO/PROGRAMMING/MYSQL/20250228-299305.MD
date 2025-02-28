## 문제
http://school.programmers.co.kr/learn/courses/30/lessons/299305

## 해설
대장균 개체의 ID와 자식의 수를 출력하는 SQL문을 작성하세요.

자식이 없다면 자식의 수는 0으로 출력하세요.

개체의 ID에 대해 오름차순 정렬하세요

내가 새롭게 알게 된 것은 다음과 같다.

### COALESCE(컬럼, 대체값)

- NULL값을 다른 값으로 대체하는 함수이다.
`COALESCE(B.CHILD_COUNT, 0)`
- B.CHILD_COUNT가 NULL일 때 0으로 바꿔준다
- 자식이 없는 개체는 CHILD_TABLE에 존재하지 않으므로 NULL이 되기 때문이다.
- 그렇다면 자식이 없는 개체인지 판단하기위해 내가 만든 CHILD_COUNT_TABLE과 기존 테이블을 어떻게 연결해줄 수 있을까 ?

### LEFT JOIN

- 두개의 테이블을 합치는 기능이다.
- 왼쪽 테이블 (A)를 기준으로 연결하고, 오른쪽 테이블 (B)에 해당 데이터가 없으면 NULL로 둔다.
- 이것을 통해 자식이 없는 개체를 NULL로 가져올 수 있게된다.


## 입력
```
//ECOLI_DATA
ID	PARENT_ID	SIZE_OF_COLONY	DIFFERENTIATION_DATE	GENOTYPE
1	NULL	10	2019/01/01	5
2	NULL	2	2019/01/01	3
3	1	100	2020/01/01	4
4	2	17	2020/01/01	4
5	2	10	2020/01/01	6
6	4	101	2021/01/01	22
```

## 출력
```
ID	CHILD_COUNT
1	1
2	2
3	0
4	1
5	0
6	0
```

## 코드
```sql
WITH CHILD_COUNT_TABLE AS (
    SELECT 
        PARENT_ID AS ID,
        COUNT(*) AS CHILD_COUNT
    FROM ECOLI_DATA
    WHERE PARENT_ID IS NOT NULL
    GROUP BY PARENT_ID
)

SELECT A.ID, 
    COALESCE (B.CHILD_COUNT, 0) AS CHILD_COUNT
FROM ECOLI_DATA AS A
LEFT JOIN CHILD_COUNT_TABLE AS B
ON B.ID = A.ID
ORDER BY A.ID ASC
```