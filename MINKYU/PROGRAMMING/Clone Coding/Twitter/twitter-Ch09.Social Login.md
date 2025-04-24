# 클론 코딩

## Twitter

## Ch09. Social Login

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Social Login

Github 계정을 활용한 로그인이 가능하게 해보자!

1. Authentication의 Sign in method(로그인 방법) 클릭
2. Add new Product(새 제공업체) - Github 클릭
3. [https://github.com/settings/developers](https://github.com/settings/developers)로 이동
4. new OAuth app 클릭
5. 다음과 같이 항목 기입

- application name : Nwitter
- homepage URL(필요 없긴 함) : firebase에서 준 url 코드 복붙(~.com까지)
- Authorization callback URL : firebase에서 준 url 코드 복붙(끝까지 : ~/\_\_/auth/handler)
- Register application 클릭
- 그럼 이제 Client ID를 받을 수 있음!!
- Generate a new client secret 클릭 후 깃허브 로그인 -> 얻을 수 있음!!
- 미리 복사해놓기(일회성 키라서 다시 볼 수 없는 키임. 나중에 새로 만들기 귀찮으니까!)

6. firebase에 Client ID, Client Secret Key 기입 후 활성화

#### Social Login Component

깃허브 로그인이 가능하게끔 버튼을 만듭니다~~

- GithubAuthProvider를 사용해서 Github 계정으로 로그인이 가능하게끔 생성자 만들기
- 두 가지 방법으로 로그인 화면 보여주기
  - 1. popup(signInWithPopup) : 새로운 화면에 깃허브 로그인창을 띄워줌
  - 2. redirect(signInWithRedirect) : 현재 화면에 깃허브 로그인창을 띄워줌
- 로그인이 성공했을 경우, home으로 redirect(navigate('/'))
- 로그인이 실패했을 경우, 로그인 실패 메시지 보여주기!

해당 버튼을 로그인 화면, 계정 생성 화면에 추가 합시다~

```tsx
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { styled } from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github.svg" />
      Continue with Github
    </Button>
  );
}
```
