/* Q1. 문자를 집어넣으면 문자의 갯수, array를 집어넣으면 array안의 자료 갯수를 콘솔창에 출력해주는 함수는 어떻게 만들까요? 
연습삼아 Generic 이런걸로 만들어봅시다. 굳이 Generic 이런게 필요는 없겠지만요 
(동작 예시)
함수<string>('hello') 이렇게 사용하면 콘솔창에 5가 나와야합니다. 
함수<string[]>( ['kim', 'park'] ) 이렇게 사용하면 콘솔창에 2가 나와야합니다.  
*/
function numOfInput<T extends string | string[]> (param :T) :number {
    return param.length;
}

/* Q2. Animal 이라는 타입이 있습니다.

interface Animal {
    name : string;
    age : number 
}
let data = '{"name" : "dog", "age" : 1 }'
그리고 data라는 변수도 있습니다. object처럼 생겼지만 따옴표 쳐진 JSON 자료입니다. 

참고
- JSON 자료는 string 타입
- JSON 자료(string)을 object 자료로 변환하는 방법 : JSON.parse(JSON데이터)
data라는 JSON 자료를 object { } 자료로 변환을 해서 return 해주는 함수를 만들어보십시오.
근데 변환된 object의 타입은 Animal이 되었으면 좋겠는데 어떻게 코드를 짜면 될까요?
오늘 배운 Generic을 이용해서 구현해보도록 합시다.  
(동작 예시)
함수<Animal>(data) 이렇게 쓰면 이 자리에 { name : 'dog' , age : 1 } 이런 object 자료가 남아야합니다. 근데 타입은 Animal임
 */

interface dataType {
    name :string;
    age :number;
}
function returnObject<T> (data :string) :T {
    return JSON.parse(data);
}

let data = '{"name" : "dog", "age" : 1 }';
let objType:dataType = returnObject(data);
console.log(objType);