```js
// https://www.acmicpc.net/problem/2064
/* 해설

네트워크에 연결된 컴퓨터들은 각각 하나의 IP 주소를 갖는다.

이러한 IP 주소를 갖는 컴퓨터들이 모여 하나의 IP 네트워크를 구성한다

IP 네트워크는,

네트워크 주소 + 네트워크 마스크로 표현된다.


IP 주소는 네개의 바이트로 구성된다. 각각 10진수로 나타내고,

사이에 점을 찍어 주소를 표현한다.

바이트이므로 0~255 값을 가진다.

네트워크 주소와 네트워크 마스크도 같은 형식이다.

IP 네트워크에는 2^M개의 컴퓨터가 할당될수있다.

네트워크 주소는 앞의 32-M 자리가 임의의 수로 구성된다. 뒤의 M자리는 0으로 채워진다.

네트워크 마스크는 앞의 32-M자리가 1로 채워져있고, 뒤의 M자리는 0으로 채워진다

이와같은 IP 네트워크에는

앞의 32-M 자리가 네트워크 주소와 일치하는 모든 IP들이 포함된다.

어떤 네트워크에 속한 IP 주소들이 주어졌을때,  네트워크 주소와 마스크를 구해라

첫째줄에 네트워크 주소, 둘째줄에 네트워크 마스크를 출력한다

답이 여러개면,

가장 크기가 작은 (포함된 IP 주소가 가장 적은, M이 최소인) 네트워크를 구해라

간략히 말하면

IP 들을 받아,

네트워크 마스크와 네트워크 주소를 구성하면 된다.

IP 들을 순회하며,

M을 찾아야한다.

모든 IP 들을 32비트의 2진수로 바꾸었을 때,

32 비트를 순서대로 순회하며

IP 들의 I번째 비트가 모두 일치하지 않는 인덱스가 M이다.

이를 고려하여 0~M-1 인덱스까지 순회하며

네트워크 마스크는 1을 넣어준다.

네트워크 주소는 입력받은 IP 주소의

I번째 인덱스의 비트가 1이라면 1을 넣어주고 아니라면 0을 넣는다.

M~32 인덱스까지 순회하며

네트워크 마스크는 0을 넣어준다

네트워크 주소는 0을 넣어준다

이렇게하면 네트워크 주소와 마스크를 찾을 수 있다.
*/
/* 입력
3
194.85.160.177
194.85.160.183
194.85.160.178
//
*/
/* 출력
194.85.160.176
255.255.255.248
*/

const fs = require('fs')
let input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt"
).toString().trim().split('\n');

const solve = (inputLines) => {
    let idx = 0
    const computersIP = []

    const [N] = inputLines[idx++].split(' ').map(Number)
    for (let i = 0; i < N; i++) {
        const X = inputLines[idx++].split('.').map(Number)
        let bin = ''
        for (let j = 0; j < 4 ;j ++) {
            let cur = X[j].toString(2)
            while (cur.length < 8) {
                cur = '0' + cur
            }
            bin += (cur)
        }
        computersIP.push(bin)
    }

    let m
    let flag = true
    for (let i = 0; i < 32; i++) {
        if (flag) {
            for (let j = 1; j < N; j++) {
                if (computersIP[j][i] !== computersIP[j-1][i]) {
                    m = i
                    flag = false
                    break
                }
            }
        }
    }
    let networkIP = ''
    let networkMask = ''
    for (let i = 0; i < m; i++) {
        networkIP += computersIP[1][i]
        networkMask += '1'
    }
    for (let i = 0; i < 32-m; i++) {
        networkIP += '0'
        networkMask += '0'
    }

    const getIP = (X) => {
        let res = []
        for (let i = 0; i < 4; i++) {
            let cur = ''
            for (let j = 0; j < 8; j++) {
                cur += X[i*8+j]
            }
            res.push(parseInt(cur, 2))
        }
        return res.join('.')
    }
    if (m === undefined) {
        console.log(getIP(computersIP[0]))
        console.log('255.255.255.255')
    } else {
        console.log(getIP(networkIP))
        console.log(getIP(networkMask))
    }

}

solve(input)
```