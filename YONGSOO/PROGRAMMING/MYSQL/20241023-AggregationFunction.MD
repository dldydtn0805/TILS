## 집계함수란

- 값에 대해서 특정 연산을 수행하는 함수

- 합계를 구하는 SUM, 평균을 구하는 AVG, 개수를 세는 COUNT 함수 등이 해당

### SUM

- 합계를 구하는 함수

- NULL 값이 있는 경우 : 무시하고 나머지 값으로만 합계를 구함

### AVG

- 평균을 구하는 함수

- NULL 무시한다

#### CASE 기본 개념

- WHEN - THEN 은 항상 같이 사용한다

- WHEN - THEN 개수 상관 없음

- ELSE 가 없고 , WHEN - THEN 조건 충족하지 않으면 NULL 값 반환

- 조건문 마지막에 END 꼭 써주기

- 별칭을 해주자 [CASE문 전체가 열 이름으로 출력되기 때문]

### MIN, MAX

- 최댓값과 최솟값을 구하는 함수



### 예시 코드

```sql
SELECT COUNT(TIME) AS FISH_COUNT
FROM FISH_INFO
WHERE YEAR(TIME) = 2021
```

```sql
SELECT CONCAT(MAX(LENGTH),'cm') AS MAX_LENGTH
FROM FISH_INFO
```

```sql
SELECT ROUND(AVG(
    CASE 
        WHEN LENGTH <= 10 OR LENGTH IS NULL THEN 10
        ELSE LENGTH
    END
),2) AS AVERAGE_LENGTH
FROM FISH_INFO
```