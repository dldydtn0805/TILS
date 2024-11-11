// Union Type
// 기본적인 변수타입의 Union : 할당 순간 정해짐
const 나의이름 :string | number = "kim";
const 나의나이 :(string | number) = 27;
console.log(나의이름);
console.log(나의나이);
// Array, Object 타입의 Union : 할당과 상관 없이 Union
let 숫자들 :(number | string)[];
숫자들 = [1, '2', 3];
let 내정보 :{이름 :(number | string), 나이 :(number | string), 결혼여부 :(string | boolean) };
내정보 = {
    이름 : "김민규",
    나이 : 27,
    결혼여부 : true,
};

// Any Type
let anyany :any;
anyany = 1;
anyany = "zzz";
anyany = undefined;
anyany = [];

// Unknown Type
let unknownunknown :unknown;
// 에러 발생 케이스
// 이미 unknown type을 부여한 변수를 다른 자료형의 변수들과 상호작용 할 때
// let 변수1 :string = unknownunknown;

// 여러 에러 확인
// 1. 값이 할당되지 않은 Union Type의 연산은 불가능
let 숫자하나 :string | number; // 변수(숫자하나)에 아직 타입이 할당되지 않음
// 숫자하나 + 1; // 에러 발생

// 2. Unknown Type도 마찬가지(이놈은 할당이 되어도 unknown임)
let 숫자둘 :unknown = 1;
// 숫자둘 + 1;
