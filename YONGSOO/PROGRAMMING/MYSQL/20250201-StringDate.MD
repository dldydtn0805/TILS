```sql
#https://school.programmers.co.kr/learn/courses/30/lessons/299308
/*해설
각 분기별 분화된 대장균의 개체 총 수를 출력하세요.
각 분기에는 'Q'를 붙이고,
분기에 대해 오름차순으로 정렬하세요.
대장균 개체가 분화되지 않은 분기는 없다.

✅ 1. CONCAT을 사용해서 6개의 행 값이 먼저 생성된다.
✅ 2. GROUP BY가 같은 값(QUARTER)을 가진 행들을 하나로 묶는다.
✅ 3. COUNT(*)로 각 그룹에 속한 행 개수를 센다.
✅ 4. 최종 결과가 출력된다.

*/
/*입력
ID	PARENT_ID	SIZE_OF_COLONY	DIFFERENTIATION_DATE	GENOTYPE
1	NULL	10	2019/01/01	5
2	NULL	2	2019/05/01	3
3	1	100	2020/01/01	4
4	2	17	2022/04/01	4
5	2	10	2020/09/01	6
6	4	101	2021/12/01	22
*/
/*출력
QUARTER	ECOLI_COUNT
1Q	2
2Q	2
3Q	1
4Q	1
*/
SELECT
    CONCAT(QUARTER(DIFFERENTIATION_DATE), 'Q') AS QUARTER,
    COUNT(*) AS ECOLI_COUNT
FROM ECOLI_DATA 
GROUP BY QUARTER
ORDER BY QUARTER
    
```