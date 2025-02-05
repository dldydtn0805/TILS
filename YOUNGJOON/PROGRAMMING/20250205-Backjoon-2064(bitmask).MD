# 코드

```c++
#include <iostream>
#include <sstream>
#include <vector>
#include <string>

using namespace std;

int N;
vector<long long> int_ip;

void get_ip()
{
    long long subnet_mask = (1ll << 32) - 1;
    bool is_over = false;
    int next = 0;
    while (!is_over) 
    {
        bool is_make = true;
        int base = subnet_mask & int_ip[0];
        for (int i=0; i<N; ++i) {
            int tmp = subnet_mask & int_ip[i];
            if (base != tmp) {
                subnet_mask &= ~(1 << next);
                next++;
                is_make = false;
                break;
            }
        }
        if (is_make == true) {
            is_over = true;
        }
    }
    long long network_ip = subnet_mask & int_ip[0];

    int shift = 32;
    for (int i=1; i<=4; ++i) {
        int octet = ((network_ip >> (shift - (8 * i))) & (1 << 8) - 1);
        cout << octet;
        if (i != 4) {
            cout << '.';
        }
    }
    cout << "\n";
    
    for (int i=1; i<=4; ++i) {
        int octet = ((subnet_mask >> (shift - (8 * i))) & (1 << 8) - 1);
        cout << octet;
        if (i != 4) {
            cout << '.';
        }
    }
    
    return;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> N;
    string ip;
    int_ip.resize(N, 0);
    
    for (int i=0; i<N; ++i) {
        cin >> ip;
        istringstream iss(ip);
        string tmp;
        while (getline(iss, tmp, '.')) {
            long long one_octet = stoi(tmp);
            int_ip[i] <<= 8;
            int_ip[i] |= one_octet;
        }
    }
    
    get_ip();

    return 0;
}

```



> ## 문제
>
> 네트워크에 연결되어 있는 컴퓨터들은 각각 하나의 IP 주소를 갖게 된다. 그리고 이러한 IP 주소를 갖는 컴퓨터들이 여러 개 모여서 하나의 IP 네트워크를 구성하게 된다. IP 네트워크는 ‘네트워크 주소’와 ‘네트워크 마스크’라는 두 개의 정보로 표현된다.
>
> IP 주소는 네 개의 바이트로 구성되어 있으며, 각각을 10진수로 나타내고(앞에 0을 붙이지 않은 형태로) 사이에 점을 찍어 주소를 표현한다. 바이트이기 때문에 각각의 수는 0부터 255까지의 값을 갖게 된다. 네트워크 주소와 네트워크 마스크 역시 같은 형식으로 나타낸다.
>
> IP 네트워크에 대해 올바르게 이해하기 위해서는 위와 같은 주소를 2진수로 이해하면 된다. 즉, 각각의 바이트를 8자리의 이진수로 나타내고, 이를 네 개 붙여놓은(앞에서부터) 32자리의 이진수를 생각해 보자. IP 네트워크에는 기본적으로 2m 개의 컴퓨터(혹은 IP 주소)가 할당될 수 있다. 이 경우의 네트워크 주소는 앞의 32-m 자리가 임의의 수(0 또는 1)로 구성되어 있고, 뒤의 m자리는 0으로 채워지게 된다. 네트워크 마스크는 앞의 32-m 자리가 1로 채워져 있고, 뒤의 m자리는 0으로 채워지게 된다. 이와 같은 IP 네트워크에는 앞의 32-m 자리가 네트워크 주소와 일치하는 모든 IP들이 포함되게 된다.
>
> 예를 들어 네트워크 주소가 194.85.160.176이고, 네트워크 마스크가 255.255.255.248인 경우를 생각해 보자. 이 경우, 이 네트워크에는 194.85.160.176부터 194.85.160.183까지의 8개의 IP 주소가 포함된다.
>
> 어떤 네트워크에 속해있는 IP 주소들이 주어졌을 때, 네트워크 주소와 네트워크 마스크를 구해내는 프로그램을 작성하시오. 답이 여러 개인 경우에는 가장 크기가 작은(포함되는 IP 주소가 가장 적은, 즉 m이 최소인) 네트워크를 구하도록 한다.
>
> ## 입력
>
> 첫째 줄에 정수 n(1 ≤ n ≤ 1,000)이 주어진다. 다음 n개의 줄에는 각 컴퓨터의 IP 주소가 주어진다.
>
> ## 해설
>
> 처음 문제를 봤을 때 주어지는 ip 주소의 최솟값과 최댓값을 찾아 두 ip 사이의 범위를 찾고 그 개수만큼 커버가 가능한 서브넷 마스크를 구하고 해당 서브넷 마스크를 임의의 ip 주소와 & 연산하여 네트워크 주소를 찾으려고 했다.
>
> 그래서 새로운 구조체를 선언했고 구조체에 크기가 4인 int형 리스트를 선언하고 이 구조체에 opreator를 이용하여 비교연산자에 대한 처리 방법을 정의하였다.
>
> 해당 방법을 이용해 ip주소의 대소를 파악하고 최댓값과 최솟값을 구하였다.
>
> 그런데 이 방법은 틀렸다... 흠.. 그래서 다방면으로 여러개의 테스트케이스를 다 넣어보았지만 계속 정답이었는데도 틀렸다는 판정만 받았다.. 그래서 같이 문제를 풀던 동료와 상의하여 새로운 방식을 찾아냈다.
>
> > 1. 서브넷 마스크는 반드시 뒤에서 부터 0이 되어온다.
> > 2. 서브넷 마스크의 경우의 수는 최대 32개밖에 안된다.
> > 3. 크기가 작은 순서대로 서브넷 마스크를 대입해보면서 모든 주소에 &연산을 했을때 단 하나의 주소 값이 나온다면 그때가 가장 최소의 서브넷 마스크가 된다.
> > 4. 3에서 구한 서브넷 마스크를 임의의 ip주소와 & 연산하면 네트워크 주소가 된다.
>
> 아주 획기적인 방법이었다! 굳이 어렵게 최소와 최대 사이의 ip 개수를 구할 필요가 없었다. 그래서 이를 이용해 주어진 ip주소들을 전부 순회하면서 임의의 서브넷 마스크를 대입해보았다.
>
> 그런데도 틀렸다! 이때는 정말로 뭐가 틀렸는지 알수가 없는 지경에 이르렀다... 구할 수 있는 모든 반례를 돌려보아도 전부 맞았는데 제출만 하면 틀렸다.. 따라서 의심이 갔던 상황 몇개를 적어본다..
>
> ```c++
> /******************************************************************************
> 
> Welcome to GDB Online.
> GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
> C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
> Code, Compile, Run and Debug online from anywhere in world.
> 
> *******************************************************************************/
> #include <iostream>
> #include <vector>
> #include <string>
> 
> using namespace std;
> 
> int N;
> vector<string> ip_address;
> vector<vector<int> > cut_octet;
> 
> struct my_address
> {
>     int numbers[4];
>     
>     bool operator<(const my_address& other) const {
>         if (numbers[0] != other.numbers[0]) return numbers[0] < other.numbers[0];
>         if (numbers[1] != other.numbers[1]) return numbers[1] < other.numbers[1];
>         if (numbers[2] != other.numbers[2]) return numbers[2] < other.numbers[2];
>         return numbers[3] < other.numbers[3];
>         
>     }
>     
>     bool operator>(const my_address& other) const {
>         return other < *this;
>     }
>     
>     bool operator==(const my_address& other) const {
>         return numbers[0] == other.numbers[0] && numbers[1] == other.numbers[1] && 
>         numbers[2] == other.numbers[2] && numbers[3] == other.numbers[3];
>     }
>     
>     bool operator!=(const my_address& other) const {
>         return !(*this == other);
>     }
> };
> 
> my_address subnet_mask, network_address;
> 
> void check_class()
> {
>     
>     for (int i=0; i<N; ++i) {
>         int octet = 0;
>         string tmp_ip = "";
>         for (char a : ip_address[i]) {
>             if (a != '.') {
>                 tmp_ip += a;
>             }
>             else {
>                 int int_ip = stoi(tmp_ip);
>                 cut_octet[octet][i] = int_ip;
>                 tmp_ip = "";
>                 octet++;
>             }
>         }
>         int int_ip = stoi(tmp_ip);
>         cut_octet[octet][i] = int_ip;
>     }
>     
>     return;
> }
> 
> void make_address()
> {
>     subnet_mask = {{255, 255, 255, 255}};
>     int next = 0;
>     int idx = 3;
>     my_address base;
>     bool is_over = false;
>     while (!is_over) {
>         my_address base = {{
>             (subnet_mask.numbers[0] & cut_octet[0][0]),
>             (subnet_mask.numbers[1] & cut_octet[1][0]),
>             (subnet_mask.numbers[2] & cut_octet[2][0]),
>             (subnet_mask.numbers[3] & cut_octet[3][0]),
>         }};
>         bool is_make = true;
>         
>         for (int i=0; i<N; ++i) {
>             my_address now = {{cut_octet[0][i], cut_octet[1][i], cut_octet[2][i], cut_octet[3][i]}};
>             my_address target = {{
>                 (subnet_mask.numbers[0] & now.numbers[0]), 
>                 (subnet_mask.numbers[1] & now.numbers[1]),
>                 (subnet_mask.numbers[2] & now.numbers[2]),
>                 (subnet_mask.numbers[3] & now.numbers[3]),
>             }};
>             
>             if (target != base) {
>                 is_make = false;
>                 subnet_mask.numbers[idx] &= ~(1 << next);
>                 next++;
>                 if (next == 8) {
>                     next = 0;
>                     idx--;
>                 }
>                 break;
>             }
>         }
>         if (is_make == true) {
>             is_over = true;
>         }
>     }
>     network_address = base;
>     
>     return;
> }
> 
> int main()
> {
>     ios_base::sync_with_stdio(false);
>     cin.tie(NULL);
>     
>     cin >> N;
>     string ip;
>     cut_octet.resize(4, vector<int>(N, 0));
>     
>     for (int i=0; i<N; ++i) {
>         cin >> ip;
>         ip_address.push_back(ip);
>     }
>     
>     check_class();
>     make_address();
>     
>     cout << network_address.numbers[0] << '.' << network_address.numbers[1] << '.' << network_address.numbers[2] << '.' << network_address.numbers[3] << "\n";
>     cout << subnet_mask.numbers[0] << '.' << subnet_mask.numbers[1] << '.' << subnet_mask.numbers[2] << '.' << subnet_mask.numbers[3];
> 
>     return 0;
> }
> 
> ```
>
> > 1. 주어진 ip주소를 1개씩 순회하여 char를 string에 합치면서 옥텟을 나누어 문제가 발생했다.
> > 2. 만들어진 옥텟별 string을 stoi를 하고 연산을 할때 문제가 발생했다.
> > 3. 선언한 자료형 my_address안에 선언한 리스트 numbers에 대한 opreator가 문제가 발생했다.
> > 4. 선언한 자료형 my_address안에 선언한 리스트 numbers를 초기화 하는 방식이 까다로워 문제가 발생했다.
> > 5. stoi하여 값을 저장할때 문제가 발생했다.
>
> 이정도의 문제를 예상하였고 결국 현재 코드에서 계속해서 진행하는건 불가능하다고 생각했다... 따라서 로직은 동일하지만 ip주소를 8개씩 4개로 끊지 않고 아에 비트마스킹을 32자리를 전부 사용하여 진행하는 방식을 채택하였다.
>
> 이와 같이 진행하는데도 고생한 것이 몇개 있는데 이를 말해보겠다.
>
> > 1. 32자리의 비트가 모두 1인 비트 만들기
> >
> >    - 처음 쓴 방법은 아래와 같다.
> >
> >      ```c++
> >      int subnet_mask = ((1 << 31) | (1 << 31) - 1));
> >      ```
> >
> >      이렇게 하니까 int자료형이 2^32 - 1까지의 범위이기도 해서 오버플로우가 발생했다 그래서 자료형을 long long으로 이용해야 했다.
> >
> >      ```c++
> >      long long subnet_mask = ((1 << 31) | (1 << 31) - 1));
> >      ```
> >
> >      이렇게 해도 오버플로우가 발생했다 단순히 1로 연산을 하면 자료형을 int로 보기 때문에 여전히 연산당시에 오버플로우가 나서 1 또한 long long이라는 것을 나타내야했다.
> >
> >      ```c++
> >      long long subnet_mask = ((1ll << 31) | (1ll << 31) - 1));
> >      ```
> >
> >      그런데 굳이 이렇게 복잡하게 할 필요가 없었다! 단순히 2^32에서 -1만 하면 동일한 값을 가질 수 있었다.
> >
> >      ```c++
> >      long long subnet_mask = (1ll << 32) - 1;
> >      ```
> >
> > 2. 32자리 비트를 8자리씩 끊어서 출력하기
> >
> >    - 생각해보면 32자리 비트를 유지하는 수라면 엄청나게 크다.. 그런데 출력방식은 255.255.255.255와 같다. 그래서 끊어서 출력해줄 필요가 있었다. 그런데 이걸 어떻게 끊어서 출력해야할지 생각이 잘 안났다..
> >
> >    - 따라서 다른 사람의 코드를 좀 참고 했는데 방법은 오른쪽으로 shift를 하면서 앞의 값을 밀고, 8자리 값을 11111111과 &연산을 하여 8자리를 끊어내 해당 값을 출력하는 방식이었다.
> >
> >      ```c++
> >      int shift = 32;
> >      for (int i=1; i<=4; ++i) {
> >          int octet = ((network_ip >> (shift - (8 * i))) & (1 << 8) - 1);
> >          cout << octet;
> >          if (i != 4) {
> >              cout << '.';
> >          }
> >      }
> >      ```
> >
> >      처음에는 앞에서 8자리를 뽑아야하니 24만큼 오른쪽으로 shift하고 8자리를 &연산으로 출력해냈다.
> >
> >      이후로는 9부터 8자리를 빼내야하니 16만큼 오른쪽으로 shift하는 방식으로 8자리씩 밀어내며 출력했다.
> >
> > 3. 주어지는 ip주소 sstream과 getline을 이용하여 받기
> >
> >    - 파이썬의 .split()을 기억하는가 그것과 아주 동일한 방식으로 원하는 문자를 기준으로 값을 끊어낼 수 있다.
> >
> >    - 처음 코드에서는 그냥 쌩으로 순회하면서 값을 꺼냈지만 해당 코드에서도 문제가 일어날 수도 있겠다는 생각을 했었기 때문에 이 또한 다른 방식으로 바꾸기로 했다.
> >
> >      ```c++
> >      for (int i=0; i<N; ++i) {
> >          cin >> ip;
> >          istringstream iss(ip);
> >          string tmp;
> >          while (getline(iss, tmp, '.')) {
> >              long long one_octet = stoi(tmp);
> >              int_ip[i] <<= 8;
> >              int_ip[i] |= one_octet;
> >          }
> >      }
> >      ```
> >
> >      위의 코드에서 주목해야할껀 getline()이 인자 3개를 가지고 있다는 것이다.
> >
> >      ```c++
> >      getline(istringstream, 나눈 값을 저장할 변수, 문자열을 나누는 기준)
> >      ```
> >
> >      위와 같은 방식으로 진행되는 것이었다. 간단한 문제에서도 많이 쓰이는 방식이니까 꼭 기억해두자.
> >
> > 4. 코드 실수
> >
> >    - 서브넷 마스크를 구할 때 임시 네트워크 주소와 현재 ip주소에 서브넷 마스크를 &연산한 값이 다르면 서브넷 마스크를 뒤에서 부터 0으로 바꾸고 진행하여 break를 걸어야 했는데 break를 하지 않자 틀린 값이 여러번 나왔고 단숨에 서브넷 마스크가 0.0.0.0이 되어버렸다. 이것 때문에 한번 틀렸는데 즉시 break문을 넣어주자 맞았다!
> >
> > #### 총평
> >
> > 하루 넘게 못푼 문제다 아에 반례부터 틀려먹고 헤맸다면 시원하게 남의 코드를 봤을텐데 거의 모든 반례를 맞추니까 아쉬워서 질질 끌려서 푼거같다... ip주소의 개념도 다시 상기시켜서 좋은 문제였고 다루기 버거워했던 비트마스킹도 다시 써서 의미있는 문제라고는 생각하지만... 왜 틀렸는지는 알지못해서 조금 아쉽다.. 구조체 정의에 대해서도 공부할 필요성을 많이 느낀다... 사실 문제도 자력으로 풀었다고 하기도 애매하기 때문에 더 열심히 공부해야겠다...
