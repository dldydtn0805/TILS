# 클론 코딩

## Twitter

## Ch12. Tweeting to Firestore

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Firestore

이제 할 것 : 트윗을 DB에 저장 및 스토리지에 파일 업로드

- Firestore 사용

Cloud Firestore : Firebase에서 사용 가능할 NoSQL 데이터베이스

- 테스트 모드에서 시작(Start in test mode)
  - Test Mode : 30일 뒤 모든 사용자가 DB의 데이터를 변경 불가능
  - 보안 설정을 바꿔야 가능
- test mode에서 Firestore 생성 후, firebase.ts 파일에서 storage, db 변수 정의

```tsx
// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyD_-HEsPT4aYc17E7b_JIvLHhJIHqkHths',
  authDomain: 'nwitter-213bd.firebaseapp.com',
  projectId: 'nwitter-213bd',
  storageBucket: 'nwitter-213bd.firebasestorage.app',
  messagingSenderId: '1092991846907',
  appId: '1:1092991846907:web:c0bf4ca63cd2f5e2e7235e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
```

정의한 db를 컴포넌트에서 사용(onSubmit 함수)

- 필요한 것 : 작성자(username, id)
- 작성 내역(tweet, file)
  - tweet은 db에 업로드
  - file은 Storage Service에 업로드
- 작성일자(createdAt)

```tsx
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase.ts';

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const user = auth.currentUser;
  console.log(user);
  if (!user || isLoading || tweet === '' || tweet.length > 200) {
    return;
  }
  try {
    setIsLoading(true);

    // db의 tweets 컬렉션에 Document(Data) 추가
    await addDoc(collection(db, 'tweets'), {
      tweet,
      createdAt: Date.now(),
      username: user.displayName || 'Anonymous',
      userId: user.uid,
    });
  } catch (e) {
    console.log(e);
  } finally {
    setIsLoading(false);
  }
};
```

Storage Service에 이미지 업로드 하는 방법

- 유저가 파일을 첨부했을 경우 : 업로드 필요
- 유저가 파일을 첨부하지 않았을 경우 : 업로드 X

1. Storage에서 Blaze 요금제로 Bucket 생성
2. 파일이 첨부되었는지 확인

- 첨부 되었을 경우
  - 해당 파일을 저장할 스토리지 경로 생성(locationRef)
  - 해당 경로에 파일을 Byte단위로 업로드
  - 해당 업로드 URL을 기존 tweet document에 photo의 value값으로 업데이트
- 첨부 되지 않을 경우
  - 끝!

최종 결과

```tsx
import { styled } from 'styled-components';
import { useState } from 'react';
// firebase
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebase.ts';

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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    // console.log(user);
    if (!user || isLoading || tweet === '' || tweet.length > 200) {
      return;
    }
    try {
      setIsLoading(true);

      // db의 tweets 컬렉션에 Document(Data) 추가
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || 'Anonymous',
        photo: null,
        userId: user.uid,
      });
      if (file) {
        // Storage의 tweets 폴더의 각 user.uid 별로 트윗 id에 업로드한 파일이 담기게 될 거임
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        // 해당 location에 해당 file을 Byte 단위로 업로드한다
        const result = await uploadBytes(locationRef, file);
        // 해당 업로드 결과 url(이미지 저장 url)
        const url = await getDownloadURL(result.ref);
        // document에 photo가 있기 때문에, url
        updateDoc(doc, {
          photo: url,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
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
  );
}

export default PostTweetForm;
```
