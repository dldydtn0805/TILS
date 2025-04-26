# 클론 코딩

## Twitter

## Ch13. Query Data with Firestore DB

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### FireStore DB에서 데이터 쿼리하기

유저들이 트윗한 것들을 Timeline에 따라 화면에 보여주는 기능이 필요

- timeline.tsx에서 만들어 봅시다~

타임라인에 필요한 것

- 작성된 모든 트윗들을 최근 작성 순대로 보여주어야 한다

각 트윗 별로

- 작성자
- 작성 내역(tweet + photo(있을 경우))
- 작성일자
- 트윗 id

를 알아야 함!

즉,

1. Tweet 컴포넌트를 만들고,
2. TimeLine 컴포넌트에서 Tweets를 Firebase DB에서 Fetching하여 가져온 후, map을 활용하여 Tweet 컴포넌트에 파라미터로 데이터를 넘겨준다!

#### TimeLine

TimeLine에서는

- 작성된 모든 트윗들을 담는 배열인 tweets를 useState로 상태 변수로 저장한다
- tweets에 DB에 접근하여 가져온 데이터를 저장하기 위해 Fetch함수를 정의한다
- 정의된 Fetch 함수를 페이지 렌더링 시 호출될 수 있도록, useEffect 내부에서 호출한다
- 호출된 Fetch 함수로 인해 tweets에 저장된 배열 (ITweet 인터페이스 형태의 tweet요소들로 이루어진 배열)을 map을 이용하여 필요한 데이터를 Tweet 컴포넌트의 파라미터로 전달한다

```tsx
// timeline.tsx
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import Tweet from './tweet';

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

function TimeLine() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    const spanshot = await getDocs(tweetsQuery);
    const tweets = spanshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });

    setTweet(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export default TimeLine;
```

#### Tweet

Tweet에서는

- 전달받은 파라미터를 이용하여 트윗 내역을 보여준다

```tsx
import { styled } from 'styled-components';
import { ITweet } from './timeline';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
```
