// literal types
// const는 변하지 못함
// const 이름 :'kim' | 'lee';
let 방향 :'left' | 'right' | 'up' | 'down';


// as const
// 1. 오브젝트.키 의 타입이 곧 해당 키에 대응하는 값이 된다
// typeof 자료.name === 'kim'
// 2. 오브젝트 내부 모든 속성들이 readonly가 된다
var 자료 = { 
    name : 'kim',
} as const;
