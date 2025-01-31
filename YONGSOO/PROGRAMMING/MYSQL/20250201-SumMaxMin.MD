```sql
#https://school.programmers.co.kr/learn/courses/30/lessons/299310
/*해설
분화된 연도, 분화된 연도별 대장균 크기의 편차, 대장균 개체의 ID를 출력하세요.

분화된 연도별 대장균 크기의 편차는 분화된 연도별 가장 큰 대장균의 크기 - 각 대장균의 크기로 구하며

결과는 연도에 대해 오름차순으로 정렬하고

같은 연도에 대해서는 대장균 크기의 편차에 대해 오름차순으로 정렬해주세요.

DATE_FORMAT은 문자열을 반환하고 YEAR 정수를 반환하기 때문에 오름차순으로 정렬하기 위해 YEAR을 사용한다.

*/
/*입력
ID	PARENT_ID	SIZE_OF_COLONY	DIFFERENTIATION_DATE	GENOTYPE
1	NULL	10	2019/01/01	5
2	NULL	2	2019/01/01	3
3	1	100	2020/01/01	4
4	2	10	2020/01/01	4
5	2	17	2020/01/01	6
6	4	101	2021/01/01	22
*/
/*출력
YEAR	YEAR_DEV	ID
2019	0	1
2019	8	2
2020	0	3
2020	83	5
2020	90	4
2021	0	6
*/
SELECT YEAR(A.DIFFERENTIATION_DATE) AS YEAR, 
    (
        SELECT MAX(B.SIZE_OF_COLONY)
        FROM ECOLI_DATA AS B
        WHERE YEAR(B.DIFFERENTIATION_DATE) = YEAR(A.DIFFERENTIATION_DATE)
    ) - A.SIZE_OF_COLONY AS YEAR_DEV,
    A.ID AS ID
FROM ECOLI_DATA AS A
ORDER BY  YEAR(A.DIFFERENTIATION_DATE) ASC, YEAR_DEV ASC
```