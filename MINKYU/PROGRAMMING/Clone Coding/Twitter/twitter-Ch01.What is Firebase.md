# 클론 코딩

## Twitter

## Ch01. What is Firebase

출처 : [노마드코더 - 클론 코딩(트위터)](https://nomadcoders.co/nwitter/)

### Firebase

Firebase : 웹 서비스를 개발할 때 반복해서 사용하는 기능(ex. Authentication, API, DB, ...)들을 정형화해 제공하는 것

- 서버 없이 개발이 가능(Serverless)

#### 웹 서버 구축 과정

웹 서버를 구축하는 과정에서 Firebase는 어떻게 사용될까?

웹 서버는 브라우저가 요청하는 html, css, javascript를 전송해주는 서비스 프로그램

- 요청에 따라 정적인 컨텐츠를 전달(called 정적 서버)

백엔드 서버 : 웹 서버가 DB에 접속하기 위한 중간다리 역할

Firebase는 이러한 서버와 DB의 역할을 동시에 수행해준다

클라우드 서비스 : 인터넷으로 사용자가 필요한 기능을 서비스 형태로 제공받아 이용하는 방식

1. IaaS(Infrastructure as a Service) : 사용자에게 가상의 컴퓨터 환경을 제공

- 원격으로 사용 가능한 운영체제 없는 컴퓨터를 대여

2. PaaS(Platform as a Service) : 특정 운영체제가 설치된 가상의 컴퓨터를 대여하고 지속적인 관리

- AWS(IaaS와 PaaS를 아우르는 것)

3. SaaS(Software as a Service) : 서비스 제공자가 관리하는 애플리케이션을 제공하는 서비스

- Gmail, Google Drive, Dropbox 등

4. BaaS(Backend as a Service) : 이메일 알림, 사용자 인증, 소셜 로그인 등 백엔드와 DB 관련 기능 사용 로직 내장 서비스

- Firebase

#### Firebase 제공 서비스

1. Cloud FireStore : 안드로이드, ios, 웹서비스에서 DB 관련 코드 없이 DB 사용
2. Firebase ML : 머신러닝 기능을 모바일 기기에서 사용할 수 있게 하는 SDK(Software Development Kit)

- 웹 지원 X

3. Clouod Functions : 이미지 파일등의 데이터 저장 기능
4. Cloud Storage : 이미지 파일 등의 데이터 저장 기능 제공
5. Hosting : 웹 서비스 호스팅
6. Authentication : 여러 인증 로직을 사용자에게 제공
7. RealTime Database : DB에 데이터가 실시간 반영 및 사용자에게 동기화
