## 집계함수란

- 값에 대해서 특정 연산을 수행하는 함수

- 합계를 구하는 SUM, 평균을 구하는 AVG, 개수를 세는 COUNT 함수 등이 해당

### SUM

- 합계를 구하는 함수

- NULL 값이 있는 경우 : 무시하고 나머지 값으로만 합계를 구함

### AVG

- 평균을 구하는 함수

- NULL 무시한다

### MIN, MAX

- 최댓값과 최솟값을 구하는 함수


```sql
SELECT COUNT(TIME) AS FISH_COUNT
FROM FISH_INFO
WHERE YEAR(TIME) = 2021
```