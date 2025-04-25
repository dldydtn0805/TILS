# 클론 코딩

## Twitter

## Ch11. Post Tweet Form

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Tweet Form

Tweet Form 컴포넌트를 만들기 위해 해야 하는 것

1. 기본 틀 짜기
2. CSS 구성
3. useState 변수, onChange 함수, onSubmit 함수 구현

#### 1. 기본 틀 구성

비어있던 Home 컴포넌트에 트윗을 보낼 수 있는 Form 컴포넌트를 만들어 봅시다~

1. 트윗 내용과 이미지(필요 시)를 업로드할 수 있는 버튼 및 input이 필요

- text area
- label
- input

2. 이미지를 업로드하기 위해 사용되는 버튼인 lebel은 html에서 file로 인식해야 함

- htmlFor="file"

3. 업로드할 이미지를 받는 input은 file 타입이고, 이미지일 경우 확장자는 상관 없이 모두 받아님

- type="file"
- accept="image/\*" (image일 경우, 확장자는 상관 없이 받는다)

4. 트윗을 Post 하기 위해 클릭할 버튼인 input은 submit 타입이다

- type="submit"

즉, 기본 틀은 다음과 같다!

```tsx
import { styled } from 'styled-components';

const Wrapper = styled.div``;

const Form = styled.form``;

const TextArea = styled.textarea``;

const AttatchFileButton = styled.label``;

const AttatchFileInput = styled.input``;

const SubmitButton = styled.input``;

function PostTweetForm() {
  return (
    <Wrapper>
      <Form>
        <TextArea placeholder="Tweet Your Happening!" />
        <AttatchFileButton htmlFor="file">Add Photo</AttatchFileButton>
        <AttatchFileInput type="file" id="file" accept="image/*" />
        <SubmitButton type="submit" value="Post Tweet" />
      </Form>
    </Wrapper>
  );
}
export default PostTweetForm;
```

#### 2. CSS 구성

styled-components를 활용해서 Wrapper, Form, TextArea, AttatchFileButton, AttatchFileInput, SubmitButton을 구현해 봅시다

```tsx
const Wrapper = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttatchFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttatchFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  padding: 10px 0px;
  background-color: #1d9bf0;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.7;
  }
`;
```

#### 3. 필요한 기능 구현

1. 변수

- textArea의 값을 위한 useState
- file의 값을 위한 useState
- Loading 상태를 위한 useState

2. 함수

- 각 useState 상태변수 변화를 위한 onChange
- submit을 위한 onSubmit

```tsx
function PostTweetForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tweet, setTweet] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  function onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTweet(e.target.value);
  }
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e?.target;
    if (files && files.length == 1) {
      setFile(files[0]);
    }
  }
  return (
    <Wrapper>
      <Form>
        <TextArea
          rows={5}
          maxLength={200}
          onChange={onTextChange}
          value={tweet}
          placeholder="Tweet Your Happening!"
        />
        <AttatchFileButton htmlFor="file">
          {file ? 'Photo Added' : 'Add Photo'}
        </AttatchFileButton>
        <AttatchFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        <SubmitButton
          type="submit"
          value={isLoading ? 'Posting...' : 'Post Tweet'}
        />
      </Form>
    </Wrapper>
  );
}
```
