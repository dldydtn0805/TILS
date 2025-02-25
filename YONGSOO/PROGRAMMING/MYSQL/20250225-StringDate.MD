## 문제
https://school.programmers.co.kr/learn/courses/30/lessons/157342

## 해설
CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블에서 평균 대여기간이 7일 이상인 자동차들의

자동차 ID와 평균 대여 기간 리스트를 출력하세요

평균 대여 기간은 소수점 두번째 자리에서 반올림하고, 결과는 평균 대여기간을 기준으로 내림차순 정리하고, 평균 대여기간이 같으면 자동차 ID를 기준으로 내림차순으로 정렬하세요.

새롭게 알게된 것은, 

1. DATEDIFF로, 날짜간의 차이를 바로 구할수 있다는 점이고,

2. WHERE절에서 AVG와 같은 집계함수를 사용할 수 없어서 HAVING절에 사용해야한다는 것이다.

이미 알고있던 사실도 있었지만, WHERE절과 HAVING절의 차이를 실제로 적용해본것이 의미있었다.


## 입력
```
// CAR_RENTAL_COMPANY_RENTAL_HISTORY
HISTORY_ID	CAR_ID	START_DATE	END_DATE
1	1	2022-09-27	2022-10-01
2	1	2022-10-03	2022-11-04
3	2	2022-09-05	2022-09-05
4	2	2022-09-08	2022-09-10
5	3	2022-09-16	2022-10-15
6	1	2022-11-07	2022-12-06
```
## 출력
```
CAR_ID	AVERAGE_DURATION
3	30.0
1	22.7
```

## 코드

```sql
SELECT CAR_ID, ROUND(AVG(DATEDIFF(END_DATE, START_DATE)+1), 1) AS AVERAGE_DURATION
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY CAR_ID
HAVING AVG(DATEDIFF(END_DATE, START_DATE)+1) >= 7
ORDER BY AVERAGE_DURATION DESC, CAR_ID DESC
```