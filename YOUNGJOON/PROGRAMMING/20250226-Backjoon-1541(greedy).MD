# 코드

```c++
#include <iostream>
#include <vector>
#include <string>

using namespace std;


int main()
{
    string data;
    cin >> data;
    
    vector<int> numbers;
    vector<char> calcul;
    string tmp = "";
    int tmp_num;
    
    for (char c : data) {
        if ('0' <= c && c <= '9') {
            tmp += c;
        }
        else {
            tmp_num = stoi(tmp);
            if (calcul.size() == 0) {
                numbers.push_back(tmp_num);
                tmp = "";
            }
            else {
                if (calcul.back() == '+') {
                    calcul.pop_back();
                    int before = numbers.back();
                    numbers.pop_back();
                    before += tmp_num;
                    numbers.push_back(before);
                }
                else {
                    numbers.push_back(tmp_num);
                }
            }
            tmp = "";
            calcul.push_back(c);
        }
    }
    tmp_num = stoi(tmp);
    if (calcul.size() == 0) {
        numbers.push_back(tmp_num);
    }
    else {
        if (calcul.back() == '+') {
            calcul.pop_back();
            int before = numbers.back();
            numbers.pop_back();
            before += stoi(tmp);
            numbers.push_back(before);
        }
        else {
            numbers.push_back(tmp_num);
        }
    }
    
    int result = numbers[0];
    int num_size = numbers.size();
    for (int i=1; i<num_size; ++i) {
        result -= numbers[i];
    }
    
    cout << result;

    return 0;
}
```



> ## 문제
>
> 세준이는 양수와 +, -, 그리고 괄호를 가지고 식을 만들었다. 그리고 나서 세준이는 괄호를 모두 지웠다.
>
> 그리고 나서 세준이는 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다.
>
> 괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.
>
> ## 입력
>
> 첫째 줄에 식이 주어진다. 식은 ‘0’~‘9’, ‘+’, 그리고 ‘-’만으로 이루어져 있고, 가장 처음과 마지막 문자는 숫자이다. 그리고 연속해서 두 개 이상의 연산자가 나타나지 않고, 5자리보다 많이 연속되는 숫자는 없다. 수는 0으로 시작할 수 있다. 입력으로 주어지는 식의 길이는 50보다 작거나 같다.
>
> ## 해설
>
> 처음 보았을때 가장 낮은 수를 만드려면 모든 + 들을 먼저 계산하고 그 후 나머지 - 연산을 해결해주면 된다고 생각했다.
>
> 처음엔 그래서 재귀를 이용해 구현하려고 했으나... 진행하다보니 재귀적으로 구현하는데 생각해놓은 방식이 핏하게 어울리지 않아서 stack 식으로 진행하는게 코드를 짜는데 좀 더 수월할 것 같아 stack으로 진행했다.
>
> 주어진 식을 순회하면서 숫자를 만든다. 만약 연산자가 나타나면 연산자 스택에 들어있는 맨 뒤의 연산자를 확인한다. 현재 스택에 들어있는 가장 뒤에 있는 연산자가 +라면 현재 만들어진 숫자를 숫자 스택의 맨 뒤의 숫자와 더한다. - 라면 현재 숫자를 그냥 숫자 스택에 추가한다.
>
> 위와 같이하면 스택에 남아있는 모든 숫자들은 맨 앞 숫자에 대해서 계속해서 뺄셈만 해주면 되는 것이다. 그래서 숫자 스택의 맨 앞에 수를 꺼내고 이 후에 나머지 숫자들을 전부 해당 숫자에서 빼버리게 진행했다.
>
> 호기롭게 제출했는데 빈 배열에서 인덱스 값을 호출한다는 에러가 나타났다. 원인을 찾아보니
> 
> ``` 
> 12
> ```
> 
> 위와 같은 입력이 들어오면 연산자가 하나도 없기 때문에 연산자 스택의 맨 뒤의 값을 호출하는데 에러가 발생한 것이다. 허허 이런 입력이 들어올거라고 생각조차 하지 못했지만 위에 반드시 연산자가 들어온다는 조건 또한 준적이 없기때문에 당연히 발생할 수 있는 반례였다...
> 
> 꼭 주의하면서 풀자.. 이건 누구를 원망할 수도 없다... ㅠㅠ 더 친절하면 좋긴 하겠지만....
