class Bungeobbang {
	// 1. Property
    name :string;           // 붕어빵 이름
    inside :string;         // 붕어빵 속 재료
    cookedDegree :number;   // 붕어빵 익힘 온도
    
    // 2. Constructor
	constructor(name :string, inside :string, cookedDegree :number){
		this.name = name; 
		this.inside = inside; 
        this.cookedDegree = cookedDegree;
	}

    // 3. Method
    introduce(){
        console.log("name : " + this.name);
        console.log("inside : " + this.inside);
        console.log("cooked Degree : " + this.cookedDegree + "'C");
    }
}

const boongBread1 = new Bungeobbang('z', 'd', 90);
console.log(boongBread1.introduce());

// prototype
console.log(Bungeobbang.prototype);

class Person {
    name :string;
    age :number;
    job :string;
    isMarried :boolean;

    constructor (name :string, age :number, job :string, isMarried :boolean) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.isMarried = isMarried;
    }

    isAdult () :boolean {
        if (this.age >= 20) {
            return true;
        }
        return false;
    }
}

const person1 = new Person("kim", 27, "student", false);
console.log(person1.isAdult());

/* Q1. Car 클래스를 만들고 싶습니다.
1. 대충 { model : '소나타', price : 3000 } 이렇게 생긴 object를 복사해주는 class를 만들어보십시오.
2. 그리고 복사된 object 자료들은 .tax() 라는 함수를 사용가능한데 현재 object에 저장된 price의 10분의1을 출력해주어야합니다. 
3. model과 price 속성의 타입지정도 알아서 잘 해보십시오. tax() 함수의 return 타입도요.  
*/
class Car {
    model :string;
    price :number;

    constructor (model :string, price :number = 0) {
        this.model = model;
        this.price = price;
    }

    tax() :number {
        return this.price/10;
    }
}
const car1 = new Car('소나타', 3001);
console.log(car1); //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()); //콘솔창 출력결과는 300

/* Q2. class인데 파라미터가 잔뜩 들어가는 class Word를 만들어봅시다.
1. object 만들 때 new Word() 소괄호 안에 숫자 혹은 문자를 입력하면 
2. 숫자는 전부 object 안의  num 속성 안에 array 형태로 저장되고 
3. 문자는 전부 object 안의 str 속성 안에 array 형태로 저장되는 class를 만들어봅시다.
4. class 만들 때 넣을 수 있는 숫자와 문자 갯수는 일단 제한은 없습니다. 그리고 타입 빼먹지 마셈 
*/

class Word {
    num :number[] = [];
    str :string[] = [];

    constructor (...params :(number | string)[]) {
        const numbers :number[] = [];
        const strings :string[] = [];
        params.forEach((param) => {
            if (typeof param === "string") {
                strings.push(param)
            } else if (typeof param == "number") {
                numbers.push(param)
            }
        })
        this.num = numbers;
        this.str = strings;
    }
}
const words = new Word('kim', 3, 5, 'park');
console.log(words.num) //[3,5]
console.log(words.str) //['kim', 'park'] 
