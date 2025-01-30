```sql
#https://school.programmers.co.kr/learn/courses/30/lessons/131697
/*해설
PRODUCT 테이블에서 판매중인 상품 중 

가장 높은 판매가를 출력하는 SQL문을 작성하세요

컬럼 명은 MAX_PRICE로 지정하세요.

*/
/*입력
PRODUCT_ID	PRODUCT_CODE	PRICE
1	A1000001	10000
2	A2000005	9000
3	C1000006	22000
*/
/*출력
MAX_PRICE
22000
*/
SELECT MAX(PRICE) AS MAX_PRICE
FROM PRODUCT

```

```sql
#https://school.programmers.co.kr/learn/courses/30/lessons/59415
/*해설
가장 최근에 들어온 동물은 언제 들어왔는지 조회하는 SQL문을 작성하세요
*/
/*입력
ANIMAL_ID	ANIMAL_TYPE	DATETIME	INTAKE_CONDITION	NAME	SEX_UPON_INTAKE
A399552	Dog	2013-10-14 15:38:00	Normal	Jack	Neutered Male
A379998	Dog	2013-10-23 11:42:00	Normal	Disciple	Intact Male
A370852	Dog	2013-11-03 15:04:00	Normal	Katie	Spayed Female
A403564	Dog	2013-11-18 17:03:00	Normal	Anna	Spayed Female
*/
/*출력
시간
2013-11-18 17:03:00
*/
SELECT MAX(DATETIME)
FROM ANIMAL_INS

```