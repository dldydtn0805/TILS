# 클론 코딩

## Twitter

## Ch07. CSS로 Create Account 페이지 만들기(Forms And UI)

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Forms and UI with style components

해야 할 것 : 계정 생성 페이지 CSS 만들기

- create-account.tsx에서 style-componens를 활용한 태그 만들기
  - Wrapper(div)
  - Title(h1)
  - Form(form)
  - Input(input)
  - Error(span)
- onChange, onSubmit 함수 만들기

1. CSS 속성 만들기

```tsx
// styled components
// 1. Wrapper
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
// 2. Title
const Title = styled.h1`
  font-size: 42px;
`;
// 3. Form
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
// 4. Input
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
// 5. Error
const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;
```

2. useState를 이용한 동적 상태 변수(name, email, password, isLoading, error 등) 만들기

- name, email, password는 각 input 태그에 name을 지정함으로써 e와 연결, value를 지정함으로써 set 연결

3. 사용자 정의 함수 만들기

- onChange(e) : change event 발생 시, 해당 event가 name, email, password에 따라 다른 호출
- onSubmit() : try - catch - finally를 이용해서 error 발생, 최종에 따라 다른 호출

```tsx
// name, email, password 변경 Event
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {
    target: { name, value },
  } = e;
  if (name == 'name') {
    setName(value);
  } else if (name == 'email') {
    setEmail(value);
  } else if (name == 'password') {
    setPassword(value);
  }
};
// form Event
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    // 1. create an account
    // 2. set user name
    // 3. redirect to HomePage
  } catch (e) {
    // 에러 내역 보여주기
    console.log(e);
  } finally {
    setIsLoading(false);
  }
  console.log(name, email, password);
};
```

#### firebase 활용한 authentication

우리는 앞서 firebase.ts에서 auth를 export 했다.

- 이를 잔인하게 이용해주지... 으흐흐
- onSubmit 함수 내에서 호출해보면 됨!

onSubmit함수에서 분기 처리

1. onSubmit 함수에서 try - catch문을 호출할 수 있는가?

- 로딩중이거나, name, email, password가 비어있을 경우 : 아예 안됨!
  - setError
- try 구문 시행 전에 error 메시지 초기화(setError('')) 및 isLoading 변경(setIsLoading(true))

2. try 구문 시행

- credentials 변수에 await 구문과 auth를 이용한 user creae
  - const credentials = await createUserWithEmailAndPassword(auth, email, password)
- 생성한 credentials를 update
  - await updateProfile(credentials.user, {displayName:name});
- 홈페이지로 navigate

3. 에러 발생 시, catch 구문 시행

- error 메시지 띄우기

4. 모든 비동기 호출 완료 후, isLoading 변경(setIsLoading(false));

```tsx
// form Event
const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // 로딩중이거나 비어있는 항목이 있을 경우
  if (isLoading || name === '' || email === '' || password === '') {
    setError('모든 필드를 채워주세요.');
    return;
  }

  setIsLoading(true);
  setError(''); // 이전 에러 초기화
  try {
    // 1. create an account
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(credentials.user);
    // 2. set user name
    await updateProfile(credentials.user, {
      displayName: name,
    });
    // 3. redirect to HomePage
    navigate('/');
  } catch (e) {
    // 에러 내역 보여주기
    console.log(e);
    // setError(e)
  } finally {
    setIsLoading(false);
  }
  // console.log(name, email, password);
};
```
