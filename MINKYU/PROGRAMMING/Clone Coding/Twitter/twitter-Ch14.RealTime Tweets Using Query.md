# 클론 코딩

## Twitter

## Ch14. Realtime Tweets(Using Firestore DB Query)

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### 쿼리 가져오기

기존 TimeLine 컴포넌트에서 우리는...

- const snapshot = await getDocs(TweetsQuery);
- 우리가 정의한 TweetsQuery를 Document로부터 가져왔음
- 이 부분을 주석처리하고 한 번 새롭게 진행 해 봅시다!

우리가 할 것 : DB 및 쿼리와의 실시간(Realtime) 연결 생성

- onSnapShot() 함수를 활용

#### onSnapShot

onSnapshot : 쌓인 DB 데이터를 실시간으로 불러오는 함수

- 첫 번째 매개변수 : snapshot을 구독할 Firestore의 Collection
- 두 번째 매개변수 : Callback 함수(snapshot)

onSnapshot의 역할

- 추가, 삭제, 수정 등의 알림을 받으면 해당 쿼리의 문서를 쭉 보면서 필요한 데이터 추출
- 실시간 DB 연동!!!(새로고침이 없어도 알아서 변화사항이 화면에 랜더링 됨!)
- unsubscribe(구독 취소) 함수를 반환
  - 이벤트 리스터를 계속 켜 둘 경우, 비용을 지불해야 함
  - 유저가 보고 있지 않을 경우(onSnapshot을 호출하는 화면이 아닐 경우)에는 꺼놔도 됨!!
  - 즉, 타임라인 컴포넌트가 마운트 될 때 구독(subscribe)
  - 로그아웃 등으로 타임라인 컴포넌트가 언마운트 될 때 구독 취소(unsubscribe)

```tsx
import {collection, onSnapshot, query} from 'firebase/firestroe';

const unsubscribe = await onSnapshot(query(collection(컬렉션DB변수명, 컬렉션이름)), (snapshot) => {
  const array = snapshot.docs.map((doc) => {
    // map 내부
  }
    return;
  )
  // snapshot.docs의 객체들을 이용해 만든 배열인 array를 활용하여 무엇인가 하면 됨
})
```

onSnapShot 정리

1. 기존에는 getDoc 메서드를 통해 Firestore에 저장된 document를 가져왔다.

- getDoc(doc(Firestroe연결객체, collection이름, document이름))

2. getDoc 메서드가 useEffect 훅에서 호출될 경우, 새로고침을 통해 생성, 수정, 삭제된 트윗이 화면에 업데이트를 할 수 있다(불편..)
3. onSnapshot 메서드는 Firestore에 저장된 collection, document 등의 변경 사항을 실시간으로 감지하고 처리하기 위해 사용된다

- onSnapshot(query(collection(Firestore연결객체, collection이름)), (snapshot) => {
  // snapshot을 활용한 새로운 배열 객체를 만들어서 적용
  })

4. onSnapshot을 통해 지정한 collection을 실시간으로 구독하고, 해당 collection에서 변화가 발생할 경우 사용자 지정 callback 함수(snapshot)이 호출된다
5. onSnapshot은 구독 취소(unsubscribe)를 반환한다

- onSnapshot을 호출하는 컴포넌트가 mount될 때는 unsubscribe를 null로 지정한다(이벤트 리스터가 계속 호출되어야 하는 경우, 사용자가 해당 페이지를 랜더링한 경우)
- onSnapshot을 호출하는 컴포넌트가 unmount 될 때는 unsubscribe를 반환하게 한다(이벤트 리스터는 비용을 발생시키기 때문에, 사용자가 해당 페이지를 나가는 경우 호출할 필요가 없어짐)

6. 추가적으로, 모든 데이터를 다 불러오는 것은 비효율적이기 때문에, 페이지네이션 기능을 추가하는 것이 좋다(쿼리 제한)
