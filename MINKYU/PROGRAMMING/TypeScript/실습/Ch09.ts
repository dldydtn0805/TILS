/* Q1. interface 이용해서 간단하게 타입을 만들어봅시다
let 상품 = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }
이런 변수가 있는데 interface 키워드로 타입지정 이쁘게 하고 싶습니다. 어떻게 코드를 짜면 될까요?
무슨 타입일지는 알아서 기입합시다. 
*/

interface ProductIF {
    brand :string;
    serialNumber :number;
    model :string[];
}
const product1 :ProductIF = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] };

interface InformationIF {
    product :string;
    price :number;
}
type CartType = InformationIF[];
const myCart :CartType = [ 
    { product : '청소기', price : 7000 }, 
    { product : '삼다수', price : 800 } 
] 
console.log(myCart);

/* Q3. 위에서 만든 타입을 extends 해봅시다.
갑자기 서비스가 업데이트되어서 일부 상품은 card 속성이 들어가야합니다. 
*/
interface NewInformationIF extends InformationIF {
    card :boolean;
}

/* Q4. object 안에 함수를 2개 넣고 싶은데요 
1. 이 object 자료는 plus() 함수를 내부에 가지고 있으며 plus 함수는 파라미터 2개를 입력하면 더해서 return 해줍니다. 
2. 이 object 자료는 minus() 함수를 내부에 가지고 있으며 minus 함수는 파라미터 2개를 입력하면 빼서 return 해줍니다. 
이 object 자료를 어떻게 만들면 될까요? 
interface를 이용해서 object에 타입지정도 해보십시오. 
*/
type FunctionType = (x :number, y :number) => number;
const plus :FunctionType = function(x:number, y:number) {
    return x + y;
}
const minus :FunctionType = function(x:number, y:number) {
    return x - y;
}

interface MyObject {
    plus :FunctionType;
    minus :FunctionType;
}
const obj :MyObject = {
    plus(x, y) {
        return x + y;
    },
    minus(x, y) {
        return x - y;
    }    
}
