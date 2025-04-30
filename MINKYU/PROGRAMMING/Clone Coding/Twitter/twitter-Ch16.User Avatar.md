# 클론 코딩

## Twitter

## Ch16. User Avatar

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### User Profile 컴포넌트

User Profile에 필요한 것들

1. Avatar 정보

- image
  - file 타입. image 확장자 상관 X
- name(있을 경우. 없을 경우에는 Anonymous)

2. 해당 사용자가 작성한 트윗 TimeLines

#### 1. Avatar 정보

Avatar 정보 : 그냥 단순하게, DB에서 정보 불러오면 됨

- user = auth.currentUser
  - user가 있을 경우, name과 profile을 불러오기

Avatar 수정 : 프로필 이름 수정, 프로필 사진 수정

- 주어진 image 클릭 시, 이미지 업데이트 가능
- 주어진 name 옆의 수정 버튼 클릭 시, 이름 업데이트 가능

#### 2. Tweet TimeLines

해당 프로필 사용자가 작성한 트윗들을 보여주는 컴포넌트 필요

- 앞서 작성한 TimeLines -> Tweet 컴포넌트에서 해당 사용자의 id값을 통해 DB 추출 시 가능할 듯

- where 기능을 사용해서 조건 추가 가능
  - where("userId", "===", user?.uid);
    이후 모든 것은 TimeLines 컴포넌트와 Tweets 컴포넌트와 동일하게 진행
