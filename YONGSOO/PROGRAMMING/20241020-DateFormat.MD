## DATE_FORMAT 함수

- 날짜 포맷이란 특정 날짜를 사용자가 원하는 형태로 변경하는 것으로, MySQL에서 기본적으로 제공해주는 날짜 포맷 함수인 DATE_FORMAT()함수에 변환할 날짜와 '-, .'등의 구분자를 넣어 사용합니다

- 날짜 포맷을 하기 위해서는 아래에 나와있는 포맷 문자를 넣은 뒤 구분자나 띄어쓰기 등을 사용하여 표현하면 됩니다

- `%Y` : 2021 [년]

- `%y` : 21 [년]

- `%m` : 01 [월]

- `%c` : 1 [월]

- `%M` : January [월]

- `%b` : Jan [월]

- `%d` : 01 [일]

- `%e` : 1 [일]

- `%T` : 12:30:00 [시간]

- `%r` : 12:30:00 AM [시간]

- `%W` : Wendnesday [요일]

- `%a` : Wed [요일]

- `%H` : 14 [24시간]

- `%l` : 02 [12시간]

- `%i` : 00 [분]

- `%S` : 00 [초]

## 예시 코드

```sql
SELECT B.TITLE, R.BOARD_ID, R.REPLY_ID, R.WRITER_ID, R.CONTENTS, DATE_FORMAT(R.CREATED_DATE, '%Y-%m-%d') AS CREATED_DATE
FROM USED_GOODS_REPLY AS R
JOIN USED_GOODS_BOARD AS B ON B.BOARD_ID = R.BOARD_ID
WHERE YEAR(B.CREATED_DATE) = 2022 AND MONTH(B.CREATED_DATE) = 10 
ORDER BY R.CREATED_DATE ASC, B.TITLE ASC
```