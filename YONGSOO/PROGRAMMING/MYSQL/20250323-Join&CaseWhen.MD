## 문제
https://school.programmers.co.kr/learn/courses/30/lessons/284528

## 해설

HR_DEPARTMENT, HR_EMPLOYEES, HR_GRADE 테이블을 이용해 사원별 성과금 정보를 조회하려한다

평가 점수별 등급과 등급에 따른 성과금 정보가 아래와 같다


기준 점수	평가 등급	성과금(연봉 기준)
96 이상	S	20%
90 이상	A	15%
80 이상	B	10%
이외	C	0%

사번, 성명, 평가등급, 성과금을 조회하세요

평가 등급의 컬럼명은 GRADE, 성과금의 컬럼명은 BONUS로 하세요

결과는 사번 기준으로 오름차순 정렬하세요


---

사번은, HR_EMPLOYEES 테이블의 EMP_NO 이다

성명은, HR_EMPLOYEES 테이블의 EMP_NAME 이다

평가등급은, HR_GRADE 테이블의 SCORE에 따라 판단해서 출력한다

성과금은, 평가등급에따라 연봉의 일정 비율로 나온다. 연봉은,  HR_EMPLOYEES 테이블의 SAL 이다

우선적으로 해야할 것은 서브쿼리를 사용해서 2022년 점수를 내는 것이다.

평가 기준은, 상반기 하반기 점수의 평균을 낸 점수를 기준으로 판단해야한다.

이렇게 나온 서브쿼리를 가지고 HR_EMPLOYEES와 조인해서, 

CASE WHEN 구문을 사용해서 적절히 출력해주면 끝이다

생각보다 레벨 4 난이도 쉬운데 ? 


## 입력

```

// HR_DEPARTMENT

DEPT_ID	DEPT_NAME_KR	DEPT_NAME_EN	LOCATION
D0001	법무팀	Law Dep	그렙타워 4층
D0002	인사팀	Human resources	그렙타워 4층
D0003	총무팀	General Affairs	그렙타워 4층

// HR_EMPLOYEES

EMP_NO	EMP_NAME	DEPT_ID	POSITION	EMAIL	COMP_TEL	HIRE_DATE	SAL
2017002	정호식	D0001	팀장	hosick_jung@grep.com	031-8000-1101	2017-03-01	65000000
2018001	김민석	D0001	팀원	minseock_kim@grep.com	031-8000-1102	2018-03-01	60000000
2019001	김솜이	D0002	팀장	somi_kim@grep.com	031-8000-1106	2019-03-01	60000000
2020002	김연주	D0002	팀원	yeonjoo_kim@grep.com	031-8000-1107	2020-03-01	53000000
2020005	양성태	D0003	팀원	sungtae_yang@grep.com	031-8000-1112	2020-03-01	53000000


// HR_GRADE

EMP_NO	YEAR	HALF_YEAR	SCORE
2017002	2022	1	92
2018001	2022	1	89
2019001	2022	1	94
2020002	2022	1	90
2020005	2022	1	92
2017002	2022	2	84
2018001	2022	2	89
2019001	2022	2	81
2020002	2022	2	91
2020005	2022	2	81

```

## 출력

```
EMP_NO	EMP_NAME	GRADE	BONUS
2017002	정호식	B	6500000
2018001	김민석	B	6000000
2019001	김솜이	B	6000000
2020002	김연주	A	7950000
2020005	양성태	B	5300000

```

## 코드

```java
SELECT A.EMP_NO, A.EMP_NAME, 
    CASE 
        WHEN B.SCORE >= 96 THEN "S"
        WHEN B.SCORE >= 90 THEN "A"
        WHEN B.SCORE >= 80 THEN "B"
        ELSE "C"
    END AS GRADE,
    CASE
        WHEN B.SCORE >= 96 THEN A.SAL * 0.2
        WHEN B.SCORE >= 90 THEN A.SAL * 0.15
        WHEN B.SCORE >= 80 THEN A.SAL * 0.1
        ELSE 0
    END AS BONUS
    
FROM HR_EMPLOYEES AS A
JOIN (
    SELECT SUM(SCORE)/COUNT(*) AS SCORE, EMP_NO      
    FROM HR_GRADE
    GROUP BY EMP_NO
) AS B
ON A.EMP_NO = B.EMP_NO
ORDER BY A.EMP_NO ASC

```