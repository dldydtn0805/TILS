```sql
#https://school.programmers.co.kr/learn/courses/30/lessons/284530

/*해설
AIR_POLUTION 테이블에서 

수원 지역의 연도 별 평균 미세먼지 오염도와 평균 초미세먼지 오염도를 조회하라

평균 미세먼지 오염도와 평균 초미세먼지 오염도의 컬럼명은 각각 PM10, PM2.5로 하고, 소수 셋째자리에서 반올림하라
*/

/*입력
LOCATION1	LOCATION2	YM	PM_VAL1	PM_VAL2
경기도	수원	2018-01-01	48	27
경기도	수원	2018-02-01	51	30
경기도	수원	2018-03-01	52	21
경기도	수원	2018-04-01	52	20
경기도	수원	2018-05-01	45	19
경기도	수원	2018-06-01	39	17
경기도	수원	2018-07-01	27	15
경기도	수원	2018-08-01	26	16
경기도	수원	2018-09-01	21	12
경기도	수원	2018-10-01	31	18
경기도	수원	2018-11-01	56	21
경기도	수원	2018-12-01	44	27
서울시	노원	2018-11-01	25	45
경기도	용인	2018-02-01	14	21
*/

/*출력
YEAR	PM10	PM2.5
2018	41	20.25
*/

SELECT YEAR(YM) AS YEAR,
    ROUND(AVG(PM_VAL1),2) AS "PM10", 
    ROUND(AVG(PM_VAL2),2) AS "PM2.5"
FROM AIR_POLLUTION
WHERE LOCATION2 = "수원"
GROUP BY YEAR 
ORDER BY YEAR

```