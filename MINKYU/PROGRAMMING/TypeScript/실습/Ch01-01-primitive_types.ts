// 1. 기본 타입 지정
// string, number, boolean ...
let 이름 :string = "kim";
let 나이 :number = 27;
let 결혼여부 :boolean = false;

// 2. array
// 타입 하나 지정
let 회원들 :string[] = ["kim", "park"];
// 여러 타입 지정
let 잡동사니 :(string | number | boolean)[] = ["뭐야", 1234, true];

// 3. object
let 나의정보 :{ name :string, age :number, birth :number } = { name : "kim", age : 27, birth :19980811 };


// 실습
// Q1. 나의 이름, 나이, 출생지역을 변수로 각각 저장하기
let myName :string = "Kim Min Kyu";
let myAge :number = 27;
let myHomeTown :string = "Uiwang";

// Q2. 내가 가장 좋아하는 곡과 가수 이름을 변수에 object 자료형으로 담기
let myFavoriteSingerInfo :{name :string, song :string} = {
    name : "Jason Mraz",
    song : "I'm Yours",
}

// Q3. 다음과 같은 자료의 타입 지정 하기
// let project = {
//     member : ['kim', 'park'],
//     days : 30,
//     started : true,
//   }
type projectType = { 
    member :string[],
    days :number,
    started :boolean,
}
let project :projectType = {
    member : ['kim', 'park'],
    days : 30,
    started : true,
}