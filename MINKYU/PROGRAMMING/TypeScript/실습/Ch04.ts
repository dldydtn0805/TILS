/* Q1.
숫자여러개를 array 자료에 저장해놨는데
가끔 '4', '5' 이런 식의 문자타입의 숫자가 발견되고 있습니다.
이걸 클리닝해주는 함수가 필요합니다. 
클리닝함수( ['1', 2, '3'] ) 이렇게 숫자와 문자가 섞인 array를 입력하면
[1,2,3] 이렇게 숫자로 깔끔하게 변환되어 나오는 클리닝함수를 만들어오고 타입지정까지 확실히 해보십시오.
모르는 부분은 구글검색해도 봐드림 
*/
function cleaning(array :(number | string)[]) :number[] {
    const result :number[] = [];

    // iter.forEach((값) => {내부코드}) 
    // 반복 가능한(iterable) 배열, 객체 등에 대하여 내부 값(val)을 가지고 반복문 진행 
    array.forEach((val) => {
        if (typeof val == "string") {
            result.push(parseFloat(val));
        } else {
            result.push(val);
        }
    })
    return result;
}
console.log(cleaning([123, '3']));
/*
지금 여러 변수에 선생님이 가르치고 있는 과목이 저장이 되어있습니다. 
과목 1개만 가르치는 쌤들은 문자 하나로 과목이 저장이 되어있고
과목 2개 이상 가르치는 쌤들은 array 자료로 과목들이 저장되어있습니다. 
'철수쌤' 같은 object 자료를 파라미터로 집어넣으면 
그 선생님이 가르치고 있는 과목중 맨 뒤의 1개를 return 해주는 함수를 만들어봅시다.
그리고 타입지정도 엄격하게 해보도록 합시다. 
*/
type subjectType = { subject : (string | string[])};
const name1:subjectType = { subject : 'math' };
const name2:subjectType = { subject : ['science', 'english'] };
const name3:subjectType = { subject : ['science', 'art', 'korean'] };

function getSubject(name :subjectType) :string {
    const subject:(string | string[]) = name.subject;
    // 해당 이름을 가진 선생님의 과목이 한 개일 경우
    if (typeof subject == 'string') {
        return subject;
    // 해당 이름을 가진 선생님의 과목이 여러 개일 경우
    } else if (Array.isArray(subject)) {
        const len :number = subject.length;
        return subject[len-1];
    // 해당 이름을 가진 선생님의 과목이 없을 경우
    } else {
        return "No Subject.";
    }
}
console.log(getSubject(name1));
console.log(getSubject(name2));
console.log(getSubject(name3));